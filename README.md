# 🐧 Linux Zero to Hero — Production Platform

সম্পূর্ণ বাংলায় লিনাক্স লার্নিং প্ল্যাটফর্ম — **industry production architecture**.

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 · React 19 · TypeScript |
| Auth | Auth.js v5 (JWT) · bcrypt cost 12 |
| Database | Prisma · SQLite (dev) · PostgreSQL-ready |
| Validation | Zod on all mutating APIs |
| Rate limit | Sliding-window (in-memory; Upstash-ready) |
| Security | CSP · HSTS · X-Frame-Options · server-only quiz answers |
| CI | GitHub Actions (lint · typecheck · test · build) |
| Deploy | Dockerfile multi-stage · Vercel-compatible |

## Features

- 12 modules · 42 lessons · 10 practices · 7 quizzes
- **Server-side quiz grading** (answers not trusted from client)
- **Server-authoritative points** for lessons & exercises (anti-cheat)
- Auth: register / login / protected dashboard & profile
- Real DB leaderboard & progress
- Rate limits on register, quiz, progress APIs
- Error boundary · security headers

## Quick start

```bash
npm install
cp .env.example .env
# set AUTH_SECRET: openssl rand -base64 32

npx prisma db push
npx tsx prisma/seed.ts   # demo@linuxworld.dev / Demo1234
npm run dev
```

## Production (PostgreSQL)

1. In `prisma/schema.prisma` set `provider = "postgresql"`
2. Set `DATABASE_URL` to your Postgres URL
3. `npx prisma migrate dev --name init` (or `db push`)
4. Deploy with Docker or Vercel

```bash
docker build -t linux-zero-to-hero .
docker run -p 3000:3000 --env-file .env linux-zero-to-hero
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Prisma generate + Next build |
| `npm start` | Production server |
| `npm test` | Unit tests (Vitest) |
| `npm run db:push` | Sync schema |
| `npm run db:seed` | Seed demo user |
| `npm run typecheck` | `tsc --noEmit` |

## Security model

- Passwords: bcrypt (12 rounds)
- Quiz keys: `src/lib/quiz-answers.ts` only on server
- Lesson/exercise points taken from server content, not client body
- Middleware protects `/dashboard`, `/profile`
- Rate limits: register 5/15m · quiz 30/h · progress 60/min per user+IP
- Headers: CSP, HSTS, X-Content-Type-Options, Referrer-Policy

## CI

`.github/workflows/ci.yml` runs on push/PR to `main`:
install → prisma → lint → typecheck → test → build

## Project layout

```
prisma/            schema + seed
src/app/api/       auth, progress, quiz, leaderboard
src/lib/auth/      Auth.js
src/lib/db/        Prisma singleton
src/lib/services/  Business logic
src/lib/rate-limit.ts
src/middleware.ts
.github/workflows/ci.yml
Dockerfile
```

## License

MIT
