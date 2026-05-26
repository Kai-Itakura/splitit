# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## リポジトリ構成

pnpm + Turborepo のモノレポ（`pnpm-workspace.yaml`, `turbo.json`）。割り勘（dutch-treat）アプリ。

- `apps/api` — NestJS 11 バックエンド、Prisma 6（PostgreSQL）、JWT 認証、Swagger は `/api` で公開。
- `apps/web` — Next.js 15 App Router フロントエンド（Tailwind v4、react-hook-form + zod）。
- `packages/ui` — 共有 React 19 コンポーネントライブラリ（`@repo/ui`、Radix + Tailwind ベースの shadcn 風）。`apps/web` 側で `transpilePackages` 経由で利用。
- `packages/types` — 共有 TS 型（`@repo/types`、例：`CurrencyType`）。
- `packages/eslint-config`, `packages/typescript-config` — 共通設定。

## よく使うコマンド

特記がない限りリポジトリルートから実行する。Turbo が各ワークスペースにタスクを配信する。

| 用途 | コマンド |
| --- | --- |
| インストール | `pnpm install` |
| 開発（全アプリ） | `pnpm dev` |
| ビルド | `pnpm build` |
| Lint | `pnpm lint` |
| テスト | `pnpm test` |
| フォーマット | `pnpm format` |
| web の OpenAPI 型を再生成（API 起動が必要） | `pnpm codegen` |
| Prisma クライアント生成 | `pnpm db:generate` |
| Prisma typed SQL 生成 | `pnpm sql:generate` |
| 開発用マイグレーション作成・適用 | `pnpm db:migrate` |
| スキーマを push（マイグレーションなし） | `pnpm db:push` |
| マイグレーション適用（本番） | `pnpm db:deploy` |
| Prisma Studio | `pnpm prisma-studio` |

### API 限定（`apps/api` 内で実行）

- 単一の Jest spec を実行: `pnpm jest path/to/file.spec.ts`（`-t "テスト名"` で絞り込み可）。
- E2E: `pnpm test:e2e`。
- ウォッチ / デバッグ: `pnpm test:watch`、`pnpm test:debug`。
- 名前付きマイグレーションを適用せずに作成: `name=<migration-name> pnpm db:migrate:create-only`。

### ローカルインフラ

- DB のみ（開発用）: `docker compose -f compose.db.dev.yml up -d --build` — ホストの `:5453` で Postgres を起動、env は `apps/api/.env.db.develop`。
- フルスタック（本番相当）: `docker compose -f compose.db.yml -f compose.yml up -d --build` — API は `:3005`、Prisma Studio は `:5555`、Postgres は `:5432`。

## コーディング規約

- パッケージマネージャーは固定（`packageManager: pnpm@8.6.8`）。npm/yarn に切り替えないこと。
- Prettier: `singleQuote`、`trailingComma: all`、`endOfLine: auto`（`.prettierrc`）。
- Husky の `pre-commit` で `lint-staged` が走る。設定はアプリ単位（`apps/api/.lintstagedrc`, `apps/web/.lintstagedrc`）で、`prettier --write` → `eslint --fix` の順に実行される。
- `apps/api`・`apps/web` のコメントや識別子は日本語で書かれていることが多い。周囲のスタイルに合わせること。

## API アーキテクチャ（`apps/api`）

機能モジュールごとに DDD 風のレイヤリングを採用。`src/modules/{auth,user,event-group,mail}` に各モジュールがあり、それぞれ以下を含む。

- `domain/` — `entities/`、`value-objects/`、`repositories/`（インターフェースのみ）、ドメイン `services/`、`model/`。エンティティは `static create(...)`（新規作成）または `static reconstruct(...)`（永続化からの復元）で生成し、setter ではなく振る舞いを公開する。代表例は `event-group/domain/entities/event-group.entity.ts` — 残高・精算の再計算は集約に閉じている。
- `application/use-cases/` — ユースケース 1 つにつき 1 クラス（`*.use-case.ts`）。`execute(...)` でリポジトリから取得 → 集約のメソッド呼び出し → 保存、という流れ。参照系は `application/query-service/` のインターフェースを使い、実装は `infrastructure/query-service/` に置く。
- `infrastructure/repositories/` — ドメインのリポジトリインターフェースを Prisma で実装。
- `presentation/` — Nest のコントローラ + DTO（class-validator）。コントローラは基本的に `JWTGuard` でガードし、`@ApiTags` / `@ApiException` を付けて Swagger の生成結果が正確になるようにする。

リポジトリやクエリサービスの DI は **トークン**（例：`EventGroupRepositoryToken`、`UserRepositoryToken`、`EventGroupQueryServiceToken`）でバインドし、各モジュールの `*.module.ts` で配線する。新規追加時は `providers` に `{ provide: Token, useClass: Impl }` を加える。

横断的なインフラは `src/shared/` 配下。

- `infrastructure/database/prisma/prisma.service.ts` — Prisma クライアントのラッパー。必要なモジュールで `providers` に追加する。
- `infrastructure/event/domain-event.{module,publisher}.ts` — ドメインイベントバス（`AppModule` でグローバルに `DomainEventModule` を読み込む）。エンティティがイベントを発行し、購読者（mail など）が `@nestjs/event-emitter` で反応する。
- `domain/value-objects/id.ts` — UUID ベースの `Id` 値オブジェクト。集約で使用。
- `presentation/dto/message.dto.ts` — `{ message: string }` 形式の共通コントローラレスポンス。

`src/main.ts` では Nest アプリ生成 **前** に DB の env ファイル（開発時は `.env.db.develop`、それ以外は `.env.db`）を手動でロードしている。Prisma は構築時に `process.env.DATABASE_URL` を読むため、この順序を変えないこと。

## Web アーキテクチャ（`apps/web`）

Next.js App Router のルートグループ構成。

- `app/(auth)/` — ログイン / サインアップ。未認証で利用可。
- `app/(contents)/` — 認証後のアプリ本体（`/`、`/event/[eventId]`、`/profile`）。
- `app/components/`、`app/lib/`、`app/util/` — 共通クライアントヘルパー。

`middleware.ts` は `/`、`/event/:path*`、`/profile/:path*` の GET リクエストで動作する。アクセストークン Cookie がない場合は、リフレッシュトークン Cookie を使って `POST /auth/refresh` を叩き、レスポンスに新しい Cookie をセットする。失敗時は `/login` にリダイレクトする。

API アクセスは型付きの `openapi-fetch` クライアント（`openapi.config.ts`）経由。

- ミドルウェアが Cookie から `Authorization: Bearer <accessToken>` を付与し、リクエストをキャッシュ。`401` の場合は一度だけトークンをリフレッシュして再実行する（失敗時は `/login` へリダイレクト）。
- 型は `openapi/schema.d.ts` から取得し、`pnpm codegen`（`openapi/generate-api-types.ts`）で API の Swagger JSON（`${API_URL}/api-json`）から生成する。**`pnpm codegen` 実行時は API が起動している必要がある**。API の DTO やコントローラの形を変えたら必ず再生成すること。

## Prisma

- `prisma/schema/` は `prismaSchemaFolder` プレビュー機能を使用。スキーマは `event-group.prisma`、`expense.prisma`、`user.prisma` などに分割されており、ベースの `schema.prisma` は generator / datasource のみを宣言する。
- `prisma/sql/` は typed SQL クエリ（`typedSql` プレビュー機能）。`pnpm sql:generate` で再生成する。
- `db:*` スクリプトは `dotenv-cli` 経由で `apps/api/.env.db.develop` をロードする。デプロイ専用の `db:deploy` だけは `DATABASE_URL` が環境に設定済みであることを前提とする。

## Turborepo タスク

`turbo.json` でタスクグラフとキャッシュを定義。主な点：

- `build` は `^build` に依存。`lint` も `^build` に依存（内部パッケージのビルドが下流の lint より先に必要）。
- `dev`、`db:migrate`、`prisma-studio`、`start:debug` は `persistent`（長時間プロセス）。
- `sql:generate`、`db:*`、`clean`、`codegen` はキャッシュ無効。
- グローバル env: `API_URL`、`ACCESS_TOKEN_COOKIE_NAME`、`REFRESH_TOKEN_COOKIE_NAME`。`build` ではさらに `NEXT_PUBLIC_API_HOST` も参照される。
