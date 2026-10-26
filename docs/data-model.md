# Data model (draft)

Money is BIGINT paisa. All timestamps are TIMESTAMPTZ (UTC). Real migrations come on Day 2.

## Types and sequences

```sql
CREATE TYPE user_role AS ENUM ('super_admin', 'finance_reviewer', 'content_editor', 'branch_lead', 'hr_lead');
CREATE TYPE branch_status AS ENUM ('forming', 'active', 'paused', 'closed');
CREATE TYPE application_status AS ENUM ('applied', 'accepted', 'declined');
CREATE TYPE report_status AS ENUM ('draft', 'submitted', 'returned', 'approved');
CREATE TYPE content_status AS ENUM ('draft', 'published');
CREATE SEQUENCE branch_code_seq;
CREATE SEQUENCE member_code_seq;
```

## People and branches

branches: id, code (BR-0001 from branch_code_seq, unique), name, city, status, created_at, updated_at

users: id, email (unique), password_hash, full_name, role, branch_id (required only for branch_lead), is_active, created_at

applications: id, full_name, email (unique, duplicate check), phone, city, preferred_branch_id, message, status, decided_by, decided_at, created_at

members: id, member_code (MB-00001 from member_code_seq, unique), application_id (UNIQUE, so one member per application), branch_id, full_name, email, phone, team, role_title, status, joined_at

## Money

collections: id, branch_id, amount_paisa (BIGINT, greater than 0), collected_on, note, created_by, created_at, sent_to_main_at (null = not yet sent), sent_by

weekly_reports: id, branch_id, week_start (the Monday), status, version, total_paisa, collection_count, snapshot (JSONB, frozen on approval), submitted_at, decided_by, decision_comment, approved_at, created_at; UNIQUE (branch_id, week_start)

## Audit

audit_logs: id, actor_id, action, entity, record_id, before_data (JSONB), after_data (JSONB), ip, created_at. Append-only: a trigger (Day 3) refuses UPDATE and DELETE.

## Public content (English and Urdu columns)

programs: id, title_en, title_ur, description_en, description_ur, status (draft or published), created_at

events: id, title_en, title_ur, description_en, description_ur, starts_at, location, status, created_at

content_pages: id, slug (unique), title_en, title_ur, body_en, body_ur, status, published_at, updated_at

## State tables

Branch lifecycle (Super Admin only):

- forming to active, forming to closed
- active to paused, active to closed
- paused to active, paused to closed
- closed: no way out. Branch codes are never reused.

Volunteer application (HR Lead):

- applied to accepted (creates the member in the same transaction)
- applied to declined
- nothing else is allowed

Weekly report:

- draft to submitted (Branch Lead of that branch)
- submitted to returned (Finance Reviewer, comment required)
- returned to submitted (Branch Lead resubmits)
- submitted to approved (Finance Reviewer; figures frozen into snapshot; locked, no more changes)
- A draft is auto-created for each active branch for each week.

Collection:

- logged, editable until created_at + 7 days, then locked (enforced on the server using an injectable clock)

Week boundary: Monday 00:00 to Sunday 23:59:59, Asia/Karachi time.
