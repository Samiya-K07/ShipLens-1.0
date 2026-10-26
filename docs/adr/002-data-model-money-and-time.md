# ADR-002: Data model, money and time

Status: Accepted

Date: 2026-10-26

Author: Isbah (Member B)

## Context

The handbook requires exact money handling, UTC storage with Pakistan time display, database-generated unique codes, a 7-day lock and weekly report boundaries.

## Decision

- Money is stored as BIGINT paisa, never floating point.
- All timestamps are TIMESTAMPTZ, stored in UTC and shown in Asia/Karachi time.
- Week boundary: Monday 00:00 to Sunday 23:59:59 Asia/Karachi. weekly_reports.week_start holds the Monday date.
- Branch codes (BR-0001) and member IDs (MB-00001) come from PostgreSQL sequences. They stay unique under concurrent requests and are never reused, even after a rollback or a closed branch.
- The 7-day collection lock is created_at plus 7 days, enforced in the service layer with an injectable clock so tests can check day 6 and day 8.
- Approved weekly reports keep a frozen JSONB snapshot and cannot change again.
- The audit log is append-only and written in the same transaction as each change.
- The full table draft is in docs/data-model.md.

## Alternatives considered

- NUMERIC for money: also allowed, but whole paisa as integers is simpler to sum and test.
- Application-generated codes: can collide when two admins act at once.

## Consequences

Amounts are shown by dividing by 100 in the UI. Gaps in code numbers are possible and acceptable.
