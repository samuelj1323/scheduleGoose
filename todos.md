# Project Todos

## Infrastructure & Architecture
- [x] **Create Shared Types Package** (`@schedulegoose/types`)
  - [x] Move `IContentCard` and related types from frontend to this package.
  - [x] Configure `package.json` and `tsconfig.json` for the new package.
  - [x] Add dependency to frontend and backend apps.

## Backend (`apps/backend`)
- [x] **Implement Basic API**
  - [x] Set up `GET /content` endpoint.
  - [x] Set up `POST /content` endpoint.
  - [x] Implement in-memory storage (or simple DB setup) for initial development.

## Frontend (`apps/frontend`)
- [x] **Connect to Backend**
  - [x] Replace dummy data in `routes/index.tsx` with API fetch.
  - [x] Use `tanstack-query` or `fetch` for data loading.
- [x] **Scaffold Missing Components**
  - [x] Implement basic `ContentCalendar` component.
  - [x] Implement basic `PerformancePredictor` component.
  - [x] Implement basic `ThumbnailGenerator` component.
- [ ] **Refine Schedule Component**
  - [ ] Connect date picker to content filtering.

## Future / Optional
- [ ] Database integration (SQLite/Postgres + Drizzle/Prisma).
- [ ] Authentication.

