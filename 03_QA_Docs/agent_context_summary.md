# Agent Context Summary

## Current Product Split

There are four connected tools:

1. `AI Sandbox`
2. `ModelHub`
3. `AgentLab`
4. `Apilogy`

Current delivery focus:

- mainly `AI Sandbox`
- partial `ModelHub`

Updated product truth:

- `AI Sandbox` is the internal model-owner workspace for intake, validation, benchmark runs, scoring, and review preparation
- `ModelHub` is the developer-facing leaderboard and discovery surface
- `AgentLab` will consume approved model guidance later
- `Apilogy` remains the capability catalog and marketplace

## Key Architectural Shifts

1. Locale-first routing is now under `src/app/[locale]`
2. middleware is simplified around `next-intl` and role-based access
3. internal routes mainly represent `AI Sandbox`
4. public ranking and model profile routes mainly represent `ModelHub`
5. `LiteLLM` is now the main endpoint access abstraction

## Current QA-Confirmed Logic

1. benchmarking runs in the background
2. benchmark history is required
3. version comparison is required
4. publish guards must block low-grade models from appearing in `ModelHub`
5. status rendering must come from shared backend state, not page-local logic

## Current UX Direction

1. keep internal review and external discovery separate
2. use Indonesian-first labels where possible
3. do not expose raw evidence or reviewer notes in `ModelHub`
4. make the sandbox next action explicit: rerun, review gate, or promotion eligibility

## Important Source Files

- `01_Planning/Product_Alignment_Update_2026-03-11.md`
- `AGENT_BRIDGE_GUIDE_2026-03-11.md`
- `03_QA_Docs/Context_Changes_Summary.md`
- `03_QA_Docs/UIUX_Agent_Feedback.md`
- `03_QA_Docs/Frontend_Agent_Feedback.md`

## Immediate Risks to Watch

- older docs still calling `ModelHub` pages sandbox pages
- builder journey still described as a sandbox journey in older files
- publication wording that sounds like a simple toggle instead of a promotion gate
- mixed Indonesian and English terminology in the UI
