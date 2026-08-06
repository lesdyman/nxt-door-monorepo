# nxt-backend

NestJS backend for the Next Door app. Part of the `nxt_door` pnpm monorepo — see the [root README](../README.md) for monorepo-wide setup.

See [API.md](./API.md) for the full endpoint reference (auth, listings, saved-listings, users, places, uploads).

## Setup

Dependencies are installed from the monorepo root, not from inside this folder:

```bash
cd ..
pnpm install
```

## Running the app

From this folder, or from the root via `pnpm --filter nxt-backend <script>`:

```bash
pnpm run start        # plain start
pnpm run start:dev    # watch mode (use this day-to-day)
pnpm run start:prod   # run the compiled build (dist/main.js)
```

## Tests

```bash
pnpm run test         # unit tests
pnpm run test:e2e     # e2e tests
pnpm run test:cov     # unit tests with coverage
```

## Build

```bash
pnpm run build   # compiles src/ -> dist/ via tsconfig.build.json
```

## Nest CLI cheatsheet

The Nest CLI (`@nestjs/cli`, already a dev dependency) generates boilerplate so you don't hand-write every controller/service/module. Run these from `nxt-backend/`:

```bash
# full REST resource in one go: controller + service + module + DTOs + entity,
# and auto-registers the module in app.module.ts
pnpm exec nest g resource <name>
# → prompts for transport (pick "REST API") and whether to generate CRUD stubs (pick "Yes")

# generate pieces individually, if you don't want the whole resource
pnpm exec nest g controller <name>
pnpm exec nest g service <name>
pnpm exec nest g module <name>

# other useful generators
pnpm exec nest g guard <name>        # route guards (e.g. auth)
pnpm exec nest g interceptor <name>
pnpm exec nest g pipe <name>
pnpm exec nest g filter <name>       # exception filters
```

`nest g resource <name>` is the one to reach for whenever adding a new domain entity (e.g. `users`, `reviews`, `interactions` — see `docs/backend-technical-specification.pdf` at the monorepo root for the full list of entities/endpoints this backend needs to support `nxt-app`).

## Project structure

```
src/
├── app.module.ts        # root module — imports every feature module
├── main.ts               # entry point (bootstraps Nest, reads PORT env var)
└── listings/             # example of a generated resource
    ├── listings.controller.ts   # HTTP routes (GET/POST/PATCH/DELETE /listings)
    ├── listings.service.ts      # business logic — currently stubbed, no DB wired up yet
    ├── listings.module.ts
    ├── dto/
    │   ├── create-listing.dto.ts   # empty — needs class-validator decorators
    │   └── update-listing.dto.ts   # PartialType(CreateListingDto)
    └── entities/
        └── listing.entity.ts       # empty — shape depends on the ORM you pick (TypeORM/Prisma/...)
```

No database/ORM is connected yet — `ListingsService` methods currently just return placeholder strings. Filling in the entity + DTOs + wiring an ORM is the next step before this resource does anything real.

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS CLI reference](https://docs.nestjs.com/cli/overview)
- [class-validator](https://github.com/typestack/class-validator) — used by DTOs for request validation
