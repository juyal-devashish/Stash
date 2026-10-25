# Stash

A personal bookmark/link saver.

## Stack
- `client/` — React (Vite)
- `server/` — Express + PostgreSQL

## Running locally

1. Make sure Postgres is running locally (`brew services start postgresql@17`) and create the database once: `createdb stash`
2. Server setup:
   ```
   cd server
   cp .env.example .env
   npm install
   npm run migrate
   npm run dev
   ```
3. Client setup:
   ```
   cd client
   npm install
   npm run dev
   ```

Client runs on http://localhost:5173, API on http://localhost:4000.
