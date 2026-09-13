# 0001: Local kite size calculator

Status: Accepted for implementation under the owner's feature request
Date: 2026-09-08
Owner: Hangin project owner

## Context

The owner requested a guide accepting rider weight, travel timing and level and returning three possible kite setups. The existing site is statically exported, has no customer-data service and uses direct contact links. Previously all components were Server Components.

## Options considered

1. Add only a static chart. Useful without JavaScript but does not meet the requested input/result flow.
2. Add a small local React client component inside a static page. Meets the request using existing dependencies.
3. Add a server or external calculator service. Requires an unnecessary hosting and data-processing boundary.

## Decision

Use option 2. `components/kite-size-calculator.tsx` is the isolated client boundary; the typed local reference model is `content/kite-size-guide.ts`. The route, static reference chart, source notes and contact links render at build time. Controls remain disabled until hydration; no input has a submission name. User data stays in React memory and never enters a URL, log, storage service, contact template or network request.

Authorization is the owner's explicit calculator feature request. This record does not authorize production deployment or treat generated planning estimates as business guarantees.

## Consequences

Static hosting remains unchanged. The calculator needs JavaScript; general guidance and contact still work without it. Airush's chart provides reference scenarios, while dates and levels produce explanatory context. No numerical wind forecast, inventory claim or model-specific promise is made. New client boundaries must remain narrowly scoped, preserving the server-rendered core.

## Verification

Pure model tests verify supported weights, input errors, dates, seasons and setup choices. Export tests verify source content, hydration gating, form labels and contact fallback. Browser review verifies input/result behavior, focus, no-JavaScript reading, responsive layout and absence of data egress. The regular fresh export, metadata and static-contract suite remains required.

## Sources

- [Feature and source record](../project/kite-size-guide.md), 2026-09-08.
- Installed Next.js 16.3.3 docs: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` and `01-app/02-guides/static-exports.md`, read 2026-09-08.
