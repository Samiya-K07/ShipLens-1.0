# Permission table

Rows are actions, columns are roles. Code and tests must match this file exactly.

Allow = permitted. Own branch = only records of the user's own branch. Deny = server returns 403.
A person who is not logged in gets 401 for protected actions.

| Action | Super Admin | Finance Reviewer | Content Editor | Branch Lead | HR Lead |
|---|---|---|---|---|---|
| users.manage | Allow | Deny | Deny | Deny | Deny |
| branches.read | Allow | Allow | Deny | Own branch | Allow |
| branches.create_update | Allow | Deny | Deny | Deny | Deny |
| branches.change_status | Allow | Deny | Deny | Deny | Deny |
| applications.read | Allow | Deny | Deny | Deny | Allow |
| applications.decide | Deny | Deny | Deny | Deny | Allow |
| members.read | Allow | Deny | Deny | Own branch | Allow |
| members.write | Allow | Deny | Deny | Own branch | Deny |
| collections.read | Allow | Allow | Deny | Own branch | Deny |
| collections.create_edit | Deny | Deny | Deny | Own branch | Deny |
| collections.mark_sent | Deny | Allow | Deny | Deny | Deny |
| reports.read | Allow | Allow | Deny | Own branch | Deny |
| reports.submit | Deny | Deny | Deny | Own branch | Deny |
| reports.approve_return | Deny | Allow | Deny | Deny | Deny |
| dashboard.read | Allow | Allow | Deny | Own branch | Deny |
| exports.csv_pdf | Allow | Allow | Deny | Own branch | Deny |
| content.write_publish | Allow | Deny | Allow | Deny | Deny |
| audit.read | Allow | Deny | Deny | Deny | Deny |

Public (no login): view published pages, programs, events and branches; submit the volunteer application form.

## Reasoning

- Super Admin oversees but cannot approve reports, decide applications or edit collections, so money and hiring stay with the right people (separation of duties).
- Finance Reviewer is the only role that approves or returns reports and marks collections as sent to the main account.
- HR Lead is the only role that accepts or declines applicants.
- Branch Lead only ever sees and changes their own branch.

These are proposed answers to the open questions. Review them with Member A; ADR-009 will record the reasoning later.
