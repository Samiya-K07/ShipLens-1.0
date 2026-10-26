# ADR-001: Technology stack

Status: Accepted

Date: 2026-10-26

Author: Isbah (Member B)

## Context

The handbook requires an allowed backend, PostgreSQL, GitHub Actions, Docker and Render. We have two weeks and both of us already know PERN.

## Decision

PERN in plain JavaScript: PostgreSQL, Express, React (built with Vite) and Node.js 24. One repo with server/ and client/. In production Express serves the built React files, so we ship one Docker image and one Render service. Database access uses the pg package with SQL migrations (node-pg-migrate).

## Alternatives considered

- Next.js full-stack: allowed, but we know it less well.
- Prisma ORM: we prefer plain SQL we understand and can defend (transactions, sequences, triggers, row locks).
- TypeScript: skipped to save learning time.
- Separate frontend and backend deployments: more setup and two services to run.

## Consequences

One deployment and one CI pipeline. We write more SQL ourselves and must always use parameterised queries. React renders in the browser, so we keep the public pages light to reach Lighthouse 90+.
