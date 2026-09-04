# Architecture decision records

Status: Current process
Last verified: 2026-09-04

Create an ADR for a decision that changes system structure, deployment, security or privacy boundaries, shared interfaces, data ownership, or an important dependency. Examples include abandoning static export, selecting a CMS, selecting a booking or commerce provider, adding browser analytics, choosing the locale URL model, or adopting a production host.

Name records `NNNN-short-decision-name.md`, starting with `0001`. Use this complete structure:

```markdown
# NNNN: Decision title

Status: Proposed | Accepted | Rejected | Superseded by NNNN
Date: YYYY-MM-DD
Owner: named role or person

## Context

Facts, constraints, and the decision that must be made.

## Options considered

Viable choices and meaningful tradeoffs.

## Decision

The selected choice and why it fits the requirements.

## Consequences

Positive, negative, operational, security, privacy, and migration effects.

## Verification

How implementation and later reviews prove continued compliance.

## Sources

Primary references with access dates.
```

An accepted or rejected ADR is immutable. If circumstances change, create a new record and mark the old one `Superseded by NNNN`. Keep proposed ADRs out of implementation authority until an owner accepts them.

This process follows the AWS description of ADRs as records of context, decision, and consequences, with accepted records replaced through superseding decisions rather than rewritten history: <https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html> (accessed 2026-09-04).
