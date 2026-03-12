# Product_UI Task Index

This folder contains detailed UI delivery tasks derived from the planning documents in `01_Planning`.

## Brief Summary

### Main goals

- build the sandbox MVP UI for model submission, benchmarking, review, publication, and discovery
- make trust results understandable for both reviewers and builders
- prepare the UI to later surface scores into `AgentLab` and trust signals alongside `Apilogy`

### Main pain points

- the workflow spans multiple roles with different visibility and actions
- raw benchmark output is too technical for business or governance users
- review and publication states can easily become ambiguous without clear UI control
- imported endpoints from `Apilogy` and manual external endpoints must feel consistent

### Stack

- `React` / `Next.js`
- `TypeScript`
- **Legion UI** (`@legion-ui-kit/react-core`) as the base design system
- Custom AI Sandbox components extending Legion UI
- backend APIs from `FastAPI`
- model access normalized through `LiteLLM`

### Design System

**Primary:** [Legion UI Design System](https://6420e4161e2acdd49d1d3e4b-hfuodunylt.chromatic.com/?path=/docs/welcome--docs)

**Package:** `@legion-ui-kit/react-core` (already installed in `03_Frontend/package.json`)

**Integration Guide:** See `Design_System_Guide.md` for component usage and import guidelines.

**Key Legion UI Components Used:**
- `Button`, `Input`, `Card`, `Badge`, `Skeleton`
- `Modal`, `Alert`, `Tooltip`, `Tabs`, `Select`
- `Checkbox`, `Radio`, `Switch`, `Avatar`
- `Breadcrumb`, `Pagination`, `Progress`, `Spinner`
- `Divider`, `Dropdown`

**AI Sandbox Custom Components:**
- `StatusBadge` (extends Legion UI `Badge`)
- `ScoreBlock`, `ScoreCardGrid` (trust score visualization)
- `WorkflowStepper`, `FindingsAccordion`, `EvidencePanel`
- `DecisionDrawer`, `CompareBar`, `CompareTable`
- `RadarChart`, `RunProgressTracker`

### Color Palette (Dashboard Theme)

The AI Sandbox uses a custom color palette built on top of Legion UI tokens:

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Navy | `#221C6A` | Headers, sidebar, primary dark |
| Primary Blue | `#1545BC` | Main actions, links |
| Secondary Purple | `#7740B5` | Secondary actions, highlights |
| Accent Teal | `#A4E7DE` | Success states, accents |

See `Design_System_Guide.md` §2 for full color token documentation.

### Language

- primary product language is expected to support Indonesian business users
- UI should be localization-ready for Bahasa Indonesia and English
- benchmark and score outputs may include Indonesia-specific terminology, policy labels, and risk tags

### Benchmark tools

- `Moonshot` as the MVP benchmark engine
- later support for `DeepEval`, `PyRIT`, `Garak`, and `LLM Guard`
- UI should present results from these tools as one unified trust workflow

## UX and User Journey Summary

This folder already covers the main UX flow, but mostly as delivery tasks. The source UX logic comes from:

- `01_Planning/AI_Sandbox_Main_User_UX_Journeys.md`
- `01_Planning/AI_Sandbox_Personas_and_User_Journeys.md`

The main product loop is:

1. model is submitted
2. endpoint is validated
3. benchmark is run
4. result is reviewed
5. approved result is published
6. builders use the published result to choose a model

Main personas carried into this folder:

- `Model Owner`: submit model, validate endpoint, run benchmark, inspect scorecard, decide whether to submit for review or rerun
- `Admin / Reviewer`: open review queue, inspect evidence, set decision, control publication
- `Use Case Builder / Product Owner`: browse ranked models, compare options, inspect restrictions, choose a model for a use case
- `Public Viewer`: read the published summary only, without internal evidence or admin detail

UX principles that should guide all files in this folder:

- next action must always be obvious
- internal review must stay separate from public publication
- raw benchmark logs should stay behind drill-down views
- scores must be translated into decision-friendly language
- role visibility must be explicit, not implicit

Recommended execution order:

1. `01_UI_Foundation_and_Information_Architecture.md`
2. `02_UI_Core_Workflows.md`
3. `03_UI_Role_Based_Access_and_States.md`
4. `04_UI_Scorecards_Ranking_and_Discovery.md`
5. `05_UI_Handoff_Checklist.md`

Primary goal:

- turn the planning artifacts into page-level, state-level, and component-level UI work for the sandbox MVP

Main user groups:

- `Model Owner`
- `Admin / Reviewer`
- `Use Case Builder / Product Owner`
- `Public Viewer`

## Legion UI Integration

### Import Guidelines

**Always use Legion UI components as the base:**

```tsx
// ✅ Correct - Use Legion UI directly
import { Button, Input, Card, Badge } from '@legion-ui-kit/react-core';

// ✅ Correct - Use AI Sandbox wrappers
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { StatusBadge } from '@/components/shared/StatusBadge';

// ❌ Avoid - Don't create duplicate components
import { Button } from '@/components/ui/Button'; // Don't do this
```

### Component Mapping

| Need | Legion UI Component | AI Sandbox Wrapper |
|------|---------------------|-------------------|
| Buttons | `Button` | `@/components/shared/Button` |
| Inputs | `Input` | `@/components/shared/Input` |
| Status badges | `Badge` | `@/components/shared/StatusBadge` |
| Cards | `Card` | `@/components/dashboard/SummaryTile` |
| Loading | `Skeleton`, `Spinner` | `@/components/shared/Skeleton` |
| Dialogs | `Modal` | Direct usage |
| Notifications | `Alert` | Direct usage |

### Documentation

- **Legion UI Storybook:** https://6420e4161e2acdd49d1d3e4b-hfuodunylt.chromatic.com/
- **Design System Guide:** `Design_System_Guide.md` (this folder)
- **Refinement Summary:** `UI_Refinement_Summary_March2026.md`
