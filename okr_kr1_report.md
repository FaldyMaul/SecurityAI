# KR 1 Detail Report: AI Sandbox UI Components

**Target:** 20 widgets | **Actual:** 52 widgets | **Achievement:** 260%

---

## Complete Widget Inventory (52 TSX Components)

All components located under [`AISandboxDev/03_Frontend/src/components`](file:///d:/Work/PAM/SecurityAI/AISandboxDev/03_Frontend/src/components).

### A. Dashboard (2)
| # | File | Description |
|---|------|-------------|
| 1 | `dashboard/SummaryTile.tsx` | Metric card showing status counts (total models, active runs, completed, pending review) |
| 2 | `dashboard/SystemHealthStrip.tsx` | Real-time backend API and database connection health indicator |

### B. Findings (2)
| # | File | Description |
|---|------|-------------|
| 3 | `findings/EvidencePanel.tsx` | Displays prompt-level evidence for failed test cases (payload, output, classification) |
| 4 | `findings/FindingsAccordion.tsx` | Accordion widget grouping vulnerabilities by category (PII Leak, Injection, etc.) |

### C. Layout (5)
| # | File | Description |
|---|------|-------------|
| 5 | `layout/AppShell.tsx` | Main page layout wrapper managing responsive grid and theme context |
| 6 | `layout/NavbarMinimal.tsx` | Collapsible sidebar navigation header |
| 7 | `layout/NavItem.tsx` | Individual nav link with active state styling |
| 8 | `layout/PublicNavbar.tsx` | Public-facing navigation bar for unauthenticated views |
| 9 | `layout/Sidebar.tsx` | Sidebar menu with shortcuts to Models, Runs, Reviews, Settings |

### D. Model Management (3)
| # | File | Description |
|---|------|-------------|
| 10 | `model/EndpointValidationCard.tsx` | Status card triggering latency/connectivity checks against a model's API endpoint |
| 11 | `model/ModelForm.tsx` | Form wizard for registering new models and binding API endpoints |
| 12 | `model/WorkflowStepper.tsx` | 3-step stepper guiding benchmark setup (Model → Dataset → Metric) |

### E. Public (1)
| # | File | Description |
|---|------|-------------|
| 13 | `public/ForPublishersSection.tsx` | Landing page section for model publishers with onboarding guidance |

### F. Ranking & Comparison (5)
| # | File | Description |
|---|------|-------------|
| 14 | `ranking/CompareBar.tsx` | Horizontal bar chart comparing security scores across LLMs |
| 15 | `ranking/CompareTable.tsx` | Side-by-side tabular metric comparison |
| 16 | `ranking/ModelComparisonGrid.tsx` | Card grid showing summarized risk profiles |
| 17 | `ranking/RadarChartWrapper.tsx` | Radar chart for multi-dimensional security metrics |
| 18 | `ranking/RankBadge.tsx` | Dynamic badge mapping scores to safety tiers (A–E) |

### G. Results (2)
| # | File | Description |
|---|------|-------------|
| 19 | `results/PromptDetailModal.tsx` | Modal showing full prompt history, context, and token usage |
| 20 | `results/RecipeResultsTable.tsx` | Main results grid with recipe-level accuracy and pass/fail counts |

### H. Review & Governance (3)
| # | File | Description |
|---|------|-------------|
| 21 | `review/AuditTrailTimeline.tsx` | Timeline tracing governance history (Created → Tested → Approved) |
| 22 | `review/DecisionDrawer.tsx` | Slide-over drawer for approve/reject/request-changes decisions |
| 23 | `review/PublicationToggle.tsx` | Toggle switch controlling model publication state |

### I. Run & Benchmark Execution (6)
| # | File | Description |
|---|------|-------------|
| 24 | `run/AssessmentReport.tsx` | Full assessment report renderer with score breakdown |
| 25 | `run/BenchmarkWizard.tsx` | Multi-step wizard for configuring and launching benchmark runs |
| 26 | `run/LLMReviewModal.tsx` | Modal for reviewing LLM-generated evaluation responses |
| 27 | `run/PackageDetailModal.tsx` | Modal showing benchmark package details and dataset info |
| 28 | `run/RecipeBreakdown.tsx` | Breakdown view of individual recipe results within a run |
| 29 | `run/RunProgressTracker.tsx` | Real-time progress bar and log viewer for active evaluations |

### J. Score Visualization (3)
| # | File | Description |
|---|------|-------------|
| 30 | `score/ScoreBlock.tsx` | Single score block with HSL color-coded grading |
| 31 | `score/ScoreCardGrid.tsx` | Grid of score cards across multiple risk categories |
| 32 | `score/SeverityIndicator.tsx` | Visual indicator for severity level (Low/Medium/High/Critical) |

### K. Security-Specific (8)
| # | File | Description |
|---|------|-------------|
| 33 | `security/DataAccessBadge.tsx` | Badge showing data access classification level |
| 34 | `security/ExploitChainDiagram.tsx` | Diagram rendering attack chain visualization |
| 35 | `security/ImpactAssessmentForm.tsx` | Form for manual impact assessment scoring |
| 36 | `security/LifecycleStageBadge.tsx` | Badge indicating AI model lifecycle stage |
| 37 | `security/NISTRMFMapping.tsx` | Widget mapping findings to NIST AI RMF categories |
| 38 | `security/OWASPBadge.tsx` | Badge mapping vulnerabilities to OWASP Top 10 for LLMs |
| 39 | `security/PIIMaskedText.tsx` | Text renderer that masks PII data in preview |
| 40 | `security/VersionComparisonView.tsx` | Side-by-side version comparison of model security posture |

### L. Settings (3)
| # | File | Description |
|---|------|-------------|
| 41 | `settings/AvatarUpload.tsx` | Avatar image upload component for user profiles |
| 42 | `settings/DangerZone.tsx` | Danger zone panel for destructive actions (delete model, reset data) |
| 43 | `settings/ToggleRow.tsx` | Toggle row for boolean settings (notifications, dark mode, etc.) |

### M. Shared/Reusable (9)
| # | File | Description |
|---|------|-------------|
| 44 | `shared/AccessDenied.tsx` | Access denied page for unauthorized users |
| 45 | `shared/Button.tsx` | Reusable button component with variants |
| 46 | `shared/DataTable.tsx` | Generic sortable/filterable data table |
| 47 | `shared/EmptyStateBlock.tsx` | Empty state placeholder with illustration |
| 48 | `shared/Input.tsx` | Styled input field component |
| 49 | `shared/LanguageSwitcher.tsx` | i18n language switcher (ID/EN) |
| 50 | `shared/PageHeader.tsx` | Page header with title and subtitle |
| 51 | `shared/Skeleton.tsx` | Loading skeleton placeholder |
| 52 | `shared/StatusBadge.tsx` | Status badge (running, completed, failed, pending) |

---

## Backend Evidence
*   **FastAPI Entry:** [`06_Backend/app/main.py`](file:///d:/Work/PAM/SecurityAI/AISandboxDev/06_Backend/app/main.py) — 8 API routers (health, auth, models, runs, reviews, promote, ranking, users)
*   **Database:** `ai_sandbox.db` (SQLite async engine)
*   **Worker:** `app/worker.py` (background benchmark execution queue)
