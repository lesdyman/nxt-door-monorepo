# nxt_door — monorepo

A pnpm workspace combining the Next Door mobile app and backend.

## Structure

```
nxt_door/
├── nxt-app/              React Native (Expo) app
├── nxt-backend/          NestJS backend
└── packages/
    └── shared-types/     shared types/DTOs (@nd/shared-types)
```

## Setup

You need pnpm (via corepack, if not enabled yet):

```bash
corepack enable pnpm
```

Install dependencies for all packages in the monorepo (run from the `nxt_door` root):

```bash
pnpm install
```

## Mobile app (nxt-app)

Start the Metro / Expo dev server:

```bash
pnpm --filter nxt-app start
# or, shorter, from the root:
pnpm app
```

Run on a specific platform:

```bash
pnpm --filter nxt-app ios      # iOS simulator
pnpm --filter nxt-app android  # Android emulator
pnpm --filter nxt-app web      # web version
```

Before the first iOS run, install CocoaPods (the native folders were copied without `Pods`):

```bash
cd nxt-app/ios && pod install
```

Linting and formatting:

```bash
pnpm --filter nxt-app lint
pnpm --filter nxt-app format
```

## Backend (nxt-backend)

Start in development (watch) mode:

```bash
pnpm --filter nxt-backend start:dev
# or, shorter, from the root:
pnpm backend
```

Build and production mode:

```bash
pnpm --filter nxt-backend build
pnpm --filter nxt-backend start:prod
```

Tests:

```bash
pnpm --filter nxt-backend test        # unit
pnpm --filter nxt-backend test:e2e    # e2e
pnpm --filter nxt-backend test:cov    # with coverage
```

## Shared types (packages/shared-types)

The `@nd/shared-types` package is linked into both apps as `workspace:*` — edit it directly in `packages/shared-types/src/index.ts`, and changes are immediately available in both `nxt-app` and `nxt-backend` without a separate build step.

## Useful commands

Add a dependency to a single package:

```bash
pnpm --filter nxt-app add <package>
pnpm --filter nxt-backend add <package>
```

Run a command across all packages at once:

```bash
pnpm -r <command>
```
