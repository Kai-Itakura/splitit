FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk update
RUN apk add --no-cache libc6-compat && \
    corepack enable && \
    pnpm install turbo @nestjs/cli --global

FROM base AS builder
RUN apk add --no-cache openssl
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
COPY . .
RUN turbo prune api --docker

FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/out/full/ .

RUN pnpm install --frozen-lockfile
COPY turbo.json turbo.json
RUN npx prisma generate --schema apps/api/prisma/schema
RUN turbo run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

COPY --from=installer --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=installer --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /app/apps/api/package.json ./apps/api/package.json
COPY --from=installer --chown=nodejs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=installer --chown=nodejs:nodejs /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=installer --chown=nodejs:nodejs /app/apps/api/prisma ./apps/api/prisma

USER nodejs
WORKDIR /app/apps/api
RUN npx prisma generate
CMD node dist/main.js



# WORKDIR /app
# RUN npm i -g turbo
# COPY . .
# RUN turbo prune api --docker

# FROM base AS installer
# RUN apk update
# RUN apk add -no--cache lib6-compat
# WORKDIR /app

# COPY --from=builder /app/out/json/ .
# RUN npm install

# COPY --from=builder /app/out/full/ .

# RUN npx turbo builder

# FROM base AS runner
# WORKDIR /app

# RUN addgroup --system --gid 1001 nestjs
# RUN adduser --system --uid 1001 nestjs
# USER nestjs

# CMD 

# COPY package*.json ./

# RUN apt-get update && apt-get install -y vim

# RUN npm install && npm install -g @nestjs/cli


