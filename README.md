# ShipLens: Branch-to-Head-Office Platform

A secure web platform that connects volunteer branches to head office and runs the organisation's public website. Built for ShipLens Challenge #01.

- Live: <Render URL, added on Day 2>
- Walkthrough video: <link, added on Day 13>
- Team: Samiya Khan (@Samiya-K07), Isbah (Member B; GitHub handle to be added)

## Test logins (fake data only, filled on Day 3 and Day 13)

Super Admin, Finance Reviewer, Content Editor, Branch Lead, HR Lead: <email> / <password>

## Tech stack

PostgreSQL, Express, React (Vite), Node.js 24, Docker, GitHub Actions, Render.

## Run locally

1. Install Node.js 24, Git and Docker Desktop.
2. Copy the environment file: `cp .env.example .env`
3. Start everything: `docker compose up --build`
4. Open http://localhost:3000 (health check: http://localhost:3000/health)

## Development without Docker for the app

1. `docker compose up -d db`
2. In server/: `npm install`, then `npm run dev`
3. In client/: `npm install`, then `npm run dev`, then open http://localhost:5173

## Environment variables

See [.env.example](.env.example). Each variable is explained as we add it.

## Run tests

In server/: `npm test` (coverage is added on Day 2).

## Load the sample data

Added on Day 9.

## Documentation

docs/adr, docs/api.md, docs/permissions.md, docs/handover.md

## Credits

List every library or template used and its licence.

## Licence

MIT
