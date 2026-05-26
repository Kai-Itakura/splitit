# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

pnpm + Turborepo monorepo (`pnpm-workspace.yaml`, `turbo.json`). The project is a 割り勘 (dutch-treat / bill-splitting) app.

- `apps/api` — NestJS 11 backend, Prisma 6 (PostgreSQL), JWT auth, Swagger at `/api`.
- `apps/web` — Next.js 15 App Router frontend (Tailwind v4, react-hook-form + zod).
- `packages/ui` — Shared React 19 component library (`@repo/ui`, shadcn-style on Radix + Tailwind). Consumed via `transpilePackages` in `apps/web`.
- `packages/types` — Shared TS types (`@repo/types`, e.g. `CurrencyType`).
- `packages/eslint-config`, `packages/typescript-config` — Shared configs.

## Common commands

Run from the repo root unless noted — Turbo fans the task out to every workspace that defines it.

| Task | Command |
| --- | --- |
| Install | `pnpm install` |
| Dev (all apps) | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Tests | `pnpm test` |
| Format | `pnpm format` |
| Regenerate web's OpenAPI types from running API | `pnpm codegen` |
| Generate Prisma client | `pnpm db:generate` |
| Generate Prisma typed SQL | `pnpm sql:generate` |
| Create/apply dev migrations | `pnpm db:migrate` |
| Push schema (no migration) | `pnpm db:push` |
| Apply migrations (prod) | `pnpm db:deploy` |
| Prisma Studio | `pnpm prisma-studio` |

### API-only (inside `apps/api`)

- Single Jest spec: `pnpm jest path/to/file.spec.ts` (add `-t "test name"` to filter).
- E2E: `pnpm test:e2e`.
- Watch / debug: `pnpm test:watch`, `pnpm test:debug`.
- Create a named migration without applying: `name=<migration-name> pnpm db:migrate:create-only`.

### Local infrastructure

- DB only (dev): `docker compose -f compose.db.dev.yml up -d --build` — Postgres on host `:5453`, env from `apps/api/.env.db.develop`.
- Full stack (prod-like): `docker compose -f compose.db.yml -f compose.yml up -d --build` — API on `:3005`, Prisma Studio on `:5555`, Postgres on `:5432`.

## Conventions

- Package manager is pinned (`packageManager: pnpm@8.6.8`); don't switch to npm/yarn.
- Prettier: `singleQuote`, `trailingComma: all`, `endOfLine: auto` (`.prettierrc`).
- Husky `pre-commit` runs `lint-staged`, which is configured per-app (`apps/api/.lintstagedrc`, `apps/web/.lintstagedrc`) to run `prettier --write` then `eslint --fix`.
- Comments and identifiers in `apps/api` and `apps/web` are frequently in Japanese — match the surrounding style.

## API architecture (`apps/api`)

DDD-style layering per feature module. Modules live in `src/modules/{auth,user,event-group,mail}` and each contains:

- `domain/` — `entities/`, `value-objects/`, `repositories/` (interfaces only), domain `services/`, and `model/`. Entities are constructed via `static create(...)` (new aggregate) or `static reconstruct(...)` (rehydrated from persistence) and expose behavior, not setters. See `event-group/domain/entities/event-group.entity.ts` for the canonical pattern: balance/settlement recalculation lives on the aggregate.
- `application/use-cases/` — One class per use case (`*.use-case.ts`) with an `execute(...)` method that loads via a repository, calls aggregate methods, then saves. Read paths use `application/query-service/` interfaces backed by `infrastructure/query-service/`.
- `infrastructure/repositories/` — Prisma-backed implementations of the domain repository interfaces.
- `presentation/` — Nest controllers + DTOs (class-validator). Controllers are typically guarded by `JWTGuard` and decorated with `@ApiTags` / `@ApiException` so the generated Swagger doc is accurate.

Repository and query-service bindings use DI **tokens** (e.g. `EventGroupRepositoryToken`, `UserRepositoryToken`, `EventGroupQueryServiceToken`) wired in each module's `*.module.ts`. When adding a new repository/query-service, add it to the module's `providers` via `{ provide: Token, useClass: Impl }`.

Cross-cutting infrastructure lives in `src/shared/`:

- `infrastructure/database/prisma/prisma.service.ts` — Prisma client wrapper, provided per module that needs it.
- `infrastructure/event/domain-event.{module,publisher}.ts` — Domain event bus (global `DomainEventModule` in `AppModule`). Entities raise events; subscribers (e.g. mail) react via NestJS `@nestjs/event-emitter`.
- `domain/value-objects/id.ts` — UUID-backed `Id` value object used by aggregates.
- `presentation/dto/message.dto.ts` — Standard `{ message: string }` controller response.

`src/main.ts` manually loads the DB env file (`.env.db.develop` in development, `.env.db` otherwise) **before** creating the Nest app — Prisma reads `DATABASE_URL` from `process.env` at construction time, so don't move this.

## Web architecture (`apps/web`)

Next.js App Router with route groups:

- `app/(auth)/` — login/signup, public.
- `app/(contents)/` — authenticated app shell (`/`, `/event/[eventId]`, `/profile`).
- `app/components/`, `app/lib/`, `app/util/` — shared client helpers.

`middleware.ts` runs on `/`, `/event/:path*`, `/profile/:path*` for GET requests. If the access-token cookie is missing it calls `POST /auth/refresh` with the refresh-token cookie, sets new cookies on the response, and otherwise redirects to `/login`.

API access goes through a typed `openapi-fetch` client in `openapi.config.ts`:

- The middleware injects `Authorization: Bearer <accessToken>` from cookies, caches the request, and on `401` retries once after refreshing tokens (or redirects to `/login`).
- Types come from `openapi/schema.d.ts`, generated by `pnpm codegen` (`openapi/generate-api-types.ts`) hitting the API's Swagger JSON at `${API_URL}/api-json`. **The API must be running** when you run `pnpm codegen`. Re-run it whenever API DTOs or controller shapes change.

## Prisma

- `prisma/schema/` uses the `prismaSchemaFolder` preview feature — schema is split across `event-group.prisma`, `expense.prisma`, `user.prisma`, etc. The base `schema.prisma` only declares generator/datasource.
- `prisma/sql/` holds typed SQL queries (`typedSql` preview feature); regenerate with `pnpm sql:generate`.
- All `db:*` scripts load `apps/api/.env.db.develop` via `dotenv-cli`; the deploy-only `db:deploy` script expects `DATABASE_URL` already in the environment.

## Turborepo tasks

`turbo.json` defines task graph + caching. Notable:

- `build` depends on `^build`; `lint` also depends on `^build` (so internal packages must build before downstream lint runs).
- `dev`, `db:migrate`, `prisma-studio`, `start:debug` are `persistent` (long-running).
- `sql:generate`, `db:*`, `clean`, `codegen` are uncached.
- Global env declared for Turbo: `API_URL`, `ACCESS_TOKEN_COOKIE_NAME`, `REFRESH_TOKEN_COOKIE_NAME`. `build` additionally sees `NEXT_PUBLIC_API_HOST`.
