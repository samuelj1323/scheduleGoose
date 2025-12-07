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
- [x] **Database Integration**
  - [x] Set up Postgres/SQLite with Drizzle ORM.
  - [x] Create schemas for Users, Content, and Drafts.
- [x] **Authentication**
  - [x] Implement Better Auth for user management.

## Frontend (`apps/frontend`)
- [x] **Connect to Backend**
  - [x] Replace dummy data in `routes/index.tsx` with API fetch.
  - [x] Use `tanstack-query` or `fetch` for data loading.
- [x] **Scaffold Missing Components**
  - [x] Implement basic `ContentCalendar` component.
  - [x] Implement basic `PerformancePredictor` component.
  - [x] Implement basic `ThumbnailGenerator` component.
- [x] **Refine Schedule Component**
  - [x] Connect date picker to content filtering.

## AI & Advanced Features (The "Goose" Layer)
- [ ] **Performance Predictor**
  - [ ] Connect to AI service (e.g., OpenAI) to score titles/content.
  - [ ] Implement feedback loop from analytics.
- [ ] **Thumbnail Generator**
  - [ ] Integrate image generation API (DALL-E 3 / Stability).
  - [ ] Create templates/styles for generation.
- [ ] **Publishing & Analytics**
  - [ ] Add direct publishing integrations (YouTube, Twitter APIs).
  - [ ] Build analytics dashboard to track actual performance.
