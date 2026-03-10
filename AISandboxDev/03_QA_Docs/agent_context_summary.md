# Agent Context: Summary of Changes

## 🚀 Key Architectural Shifts
1. **Locale-First Routing**: All routes are now under `src/app/[locale]`. The root `layout.tsx` provides the base `<html>` and `<body>` to support Next.js 15's 404 handling.
2. **Middleware**: Simplified. It handles local detection via `next-intl` and role-based access.
3. **QA Bypass**: In dev mode, `/login` redirects to `/models` with an `admin` role automatically for faster testing.

## 🎨 UI/UX Refinement
1. **Navbars**: Fixed layout nesting. `PublicNavbar` is for public routes, `NavbarMinimal` is for auth. No more double navbars.
2. **Design**: Implemented a new palette (Navy/Blue/Purple/Teal). Verified WCAG contrast for all text.
3. **Premium Feel**: Added hover transitions, gradient accent bars, and improved hero section readability.

## 🔍 New QA Logic (Human Review v2)
1. **LiteLLM**: Shifted from Apilogy to LiteLLM for model imports.
2. **Background Tasks**: Redesigned benchmarking to run in the background. Users can navigate away without breaking the test.
3. **Publishing Guards**: A model cannot be "Published" to the leaderboard if it has a score of D or E.
4. **History**: Added Benchmark History to track multiple runs and versions.

## 📂 Documentation Structure
- `03_QA_Docs/UIUX_QA_Documentation.md`: Visual and interaction checkpoints.
- `03_QA_Docs/Frontend_QA_Documentation.md`: Technical and integration checkpoints.
- `03_QA_Docs/Context_Changes_Summary.md`: This file.
