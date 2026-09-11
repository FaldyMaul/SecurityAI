# Publisher Agent Backlog

Last updated: 2026-04-13

## 1. Agent Scope

Primary ownership:

- publishing path
- deployment documentation
- Cloudflare readiness
- recovery guidance

## 2. Quarter Focus

## Q2 2026

- keep the sandbox frontend publishable while the product workflow expands

## Q3 2026

- keep deployment guidance aligned with the more API-backed product

## Q4 2026

- support more mature release-readiness and operational publishing discipline

## 2A. Progress Checklist

- `[x]` Cloudflare deployment path was previously documented and stabilized
- `[~]` Publisher work has not been the main blocker during the current local MVP integration sprint
- `[ ]` release-readiness checklist refresh still pending
- `[ ]` deployment recovery docs may need another pass after backend/API-backed product behavior stabilizes further

## 2B. Note

Current sprint focus has been local MVP execution and integration quality, not publishing-path changes.

## 3. Detailed Backlog

## Epic PUB-1 - Cloudflare Publishing Stability

Goal:

- keep the frontend prototype publishable through the current Cloudflare path

### Story PUB-1.1

Title:

- maintain Cloudflare Pages native Git deployment as the standard path

### Story PUB-1.2

Title:

- keep root-directory and build-command documentation current

### Story PUB-1.3

Title:

- verify `nodejs_compat` and edge-runtime assumptions remain documented

## Epic PUB-2 - Deployment Recovery Documentation

Goal:

- make deployment recovery repeatable for future agents

### Story PUB-2.1

Title:

- keep deployment walkthrough updated with latest blockers and fixes

### Story PUB-2.2

Title:

- maintain a concise deployment guide for normal publishing flow

### Story PUB-2.3

Title:

- document known Windows-local build limitations versus Cloudflare-native path

## Epic PUB-3 - Release Readiness Support

Goal:

- support safer transition from prototype publishing to internal product release behavior

### Story PUB-3.1

Title:

- define release-readiness checklist for the sandbox frontend

### Story PUB-3.2

Title:

- document rollback or recovery guidance for bad publishes

## 4. Dependencies

- FE build behavior
- Cloudflare constraints
- PM and QA release-readiness expectations

## 5. Publisher Priority Order

1. Cloudflare publishing stability
2. deployment recovery documentation
3. release-readiness support

## 6. Prompt for Publisher Agent

Use this prompt when assigning work:

`You are the Publisher Agent for AI Sandbox. Keep the frontend publishable through the current Cloudflare Pages path while the product grows from prototype into an internal workflow tool. Prioritize deployment clarity, recovery guidance, edge-runtime compatibility, and release-readiness checklists. Do not redesign the product; make publishing and rollback predictable for other agents.`
