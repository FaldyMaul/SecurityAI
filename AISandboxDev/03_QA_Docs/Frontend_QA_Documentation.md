# AI Sandbox – Frontend (FE) QA Documentation (Finalized)

This document tracks the technical integrity and routing performance of the AI Sandbox frontend.

## 1. Technical Health (Post-Resolution)
| Feature | Status | Notes |
|---------|--------|-------|
| **Routing (404)** | ✅ PASS | Resolved by adding root `html/body` tags and `[locale]` structure. |
| **Localization** | ✅ PASS | `next-intl` correctly handles `localePrefix: 'never'` via middleware rewrites. |
| **Hydration** | ⚠️ WARN | Mismatch detected in `LocaleLayout` attributes (likely `data-jetski`). |
| **Color Palette** | ✅ PASS | New dashboard palette (#221C6A, #1545BC, #7740B5, #A4E7DE) implemented. |
| **CSS Variables** | ✅ PASS | All color tokens updated in `variables.css`. |
| **Component Styles** | ✅ PASS | SummaryTile, Home page, and ScoreBlock updated with new colors. |

## 2. Implementation Architecture
- **Structure**: `src/app/[locale]/(group)/page.tsx`. This allows `next-intl` to manage locale state while keeping URLs clean.
- **Root Layout**: Provides the shell for 404 pages. Uses `getLocale()` to sync `lang` attribute.
- **Middleware**: Pure `next-intl` implementation with simplified public/private route guards.

## 3. Color Palette Implementation

### 3.1 Updated Files
| File | Changes |
|------|---------|
| `src/styles/variables.css` | Added new primary, secondary, and accent color tokens |
| `src/lib/statusConfig.ts` | Updated `run_queued`, `run_in_progress`, `assessment_completed` to use new palette |
| `src/components/dashboard/SummaryTile.module.css` | Enhanced with gradient accent bars and improved hover states |
| `src/app/[locale]/(public)/home.module.css` | Updated hero gradient, model cards, step cards, trust section |

### 3.2 Color Usage Guidelines
| Element | Primary Color | Secondary Color | Accent Color |
|---------|---------------|-----------------|--------------|
| **Buttons (Primary)** | `#1545BC` (normal) → `#0f3494` (hover) | — | — |
| **Buttons (Secondary)** | — | `#7740B5` (normal) → `#5f3391` (hover) | — |
| **Links** | `#1545BC` | — | — |
| **Icons (Active)** | `#1545BC` on `#E8EEFC` background | — | — |
| **Success States** | — | — | `#A4E7DE` |
| **Score Rings (Good)** | `#1545BC` (60–79) | — | — |
| **Score Rings (Moderate)** | — | `#7740B5` (40–59) | — |

### 3.3 Gradient Patterns (Accessibility Optimized)

| Component | Gradient | Status |
|-----------|----------|--------|
| **Hero Section** | `linear-gradient(135deg, #221C6A 0%, #1545BC 50%, #0f3494 100%)` | ✅ FIXED - Dark colors only |
| **Summary Tile Accent** | `linear-gradient(90deg, #221C6A 0%, #1545BC 100%)` | ✅ Correct |
| **Model Card Accent** | `linear-gradient(90deg, #1545BC 0%, #7740B5 100%)` | ✅ Correct |
| **Approval Label** | `linear-gradient(135deg, #1545BC 0%, #7740B5 100%)` | ✅ Correct |
| **Trust Section** | `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)` | ✅ FIXED - Neutral colors |

### 3.4 ⚠️ FORBIDDEN Gradients

**DO NOT USE these gradients (Accessibility Violations):**

| Forbidden Gradient | Issue |
|--------------------|-------|
| `linear-gradient(..., #A4E7DE 100%)` | Light teal makes white text invisible (1.5:1 ratio) |
| `linear-gradient(135deg, #E8EEFC, #F3E8FC)` | Light colors with muted text - unreadable |
| Any gradient ending with pastel/light colors | White text becomes unreadable |

## 4. Regression Checklist
- [x] **Middleware**: No longer causes infinite loops or incorrect redirects to `/id`.
- [x] **Providers**: `QueryProvider` correctly wraps all children at the locale level.
- [x] **Styles**: `globals.css` imported once at the root to avoid CSS duplication.
- [x] **Color Consistency**: All components use CSS variables, not hardcoded hex values.
- [x] **Hover States**: Summary tiles and model cards have smooth transitions.

---

## 5. Technical Debt / Next Steps
- [ ] **Background Polling**: Persistence of benchmarking state across page refreshes and navigations.
- [ ] **Promotion Logic**: Verification of score-based guards (A/B/C only) for ModelHub.
- [ ] **LiteLLM Schema**: Validation of different provider configurations via LiteLLM.
4. **Mobile Navigation**: Implement responsive hamburger menu for mobile devices (<768px).
5. **Animation Performance**: Add `will-change` CSS property to animated elements.
6. **Dark Mode**: Implement dark mode variant using the same color palette.
7. **Component Documentation**: Update Storybook with new color tokens and usage examples.

## 6. Frontend Implementation Notes

### 6.1 Components Requiring Updates
| Component | Status | Notes |
|-----------|--------|-------|
| `StatusBadge` | ✅ Updated | Uses `statusConfig` with new CSS variables |
| `ScoreBlock` | ✅ Updated | `getScoreColor` uses new score ring colors |
| `SummaryTile` | ✅ Updated | Enhanced with gradient accent bars |
| `RankBadge` | ⚠️ Pending | Should use new palette for top-3 badges |
| `CompareBar` | ⚠️ Pending | Should use new primary/secondary colors |
| `DecisionDrawer` | ⚠️ Pending | Should use new color tokens for buttons |

### 6.2 CSS Animation Additions
```css
/* Pulse animation for urgent tiles (uses purple) */
@keyframes pulse-tile {
  0%, 100% { box-shadow: 0 0 0 0 rgba(119, 64, 181, 0.3); }
  50% { box-shadow: 0 0 0 8px rgba(119, 64, 181, 0); }
}

/* Slide-up animation for CompareBar */
@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

### 6.3 Browser Compatibility
| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Variables | ✅ | ✅ | ✅ | ✅ |
| CSS Gradients | ✅ | ✅ | ✅ | ✅ |
| CSS Animations | ✅ | ✅ | ✅ | ✅ |
| `backdrop-filter` | ✅ | ✅ | ✅ | ✅ |

## 7. Human Review – Technical Verification (v2)

### 7.1 Data & Integration
| ID | Test Category | Technical Checkpoint | Status |
|----|---------------|----------------------|--------|
| FE-15 | **LiteLLM Config** | Verify that `Add Model` payload correctly maps to LiteLLM provider schemas. | [ ] |
| FE-16 | **Background Task** | Check that `localStorage` or `Database` persists the "Running" state for benchmarks. | [ ] |
| FE-17 | **Polling Logic** | Ensure polling continues if the user leaves and returns to the report page. | [ ] |

### 7.2 Business Logic & Security
| ID | Test Category | Technical Checkpoint | Status |
|----|---------------|----------------------|--------|
| FE-18 | **Promotion Guard** | Server-side validation rejects "Promote to ModelHub" requests if `overall_score` is D or E. | [ ] |
| FE-19 | **LLM Summary API** | Verify integration with the summary endpoint for risk mitigation text. | [ ] |
| FE-20 | **History API** | Ensure history endpoint returns paginated previous versions with child scores. | [ ] |

### 7.3 Performance & UI State
| ID | Test Category | Technical Checkpoint | Status |
|----|---------------|----------------------|--------|
| FE-21 | **Fail Filter** | "Fail Only" filter correctly triggers a filtered re-query or client-side sort. | [ ] |
| FE-22 | **Time Estimates** | Validate the algorithm calculating "Estimated Time Remaining" based on prompt count. | [ ] |

---

## 8. Technical Debt / Next Steps
1. **Hydration**: Resolve `data-jetski-tab-id` mismatch in `LocaleLayout`.
2. **Error Boundaries**: Implement granular boundaries for the Ranking and Report widgets.
3. **Security**: Rotate session keys and enforce `SameSite=Lax` for role cookies.
