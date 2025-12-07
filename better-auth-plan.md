# Better Auth Integration Plan

## 1. Backend Setup
- [x] Install `better-auth`.
- [x] Update Drizzle Schema (`src/db/schema.ts`) to match Better Auth requirements.
  - [x] `user` table (changed id to text, added verified/image fields).
  - [x] `session` table.
  - [x] `account` table (for OAuth).
  - [x] `verification` table.
- [ ] Run migration `pnpm db:push` to update Supabase.
- [ ] Create `apps/backend/src/auth.ts`:
  - [ ] Initialize `betterAuth` with Drizzle adapter.
  - [ ] Configure `socialProviders: { google: ... }`.
- [ ] Mount in `apps/backend/src/index.ts`:
  - [ ] `app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw))`
- [ ] Update `.env` with:
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`
  - [ ] `BETTER_AUTH_SECRET`
  - [ ] `BETTER_AUTH_URL` (http://localhost:8787)

## 2. Frontend Setup
- [x] Install `better-auth`.
- [ ] Create `apps/frontend/src/lib/auth-client.ts`.
- [ ] Create `apps/frontend/src/routes/login.tsx`.
- [ ] Update `apps/frontend/src/routes/index.tsx`:
  - [ ] Check `useSession`.
  - [ ] Redirect to `/login` if no session.

## 3. Google Cloud Console (You need to do this)
- [ ] Create OAuth Credentials.
- [ ] Set Redirect URI to `http://localhost:8787/api/auth/callback/google`.

