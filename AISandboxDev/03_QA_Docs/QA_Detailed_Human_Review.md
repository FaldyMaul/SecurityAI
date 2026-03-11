# QA Documentation – Detailed Human Review Feedback

This document outlines specific QA checkpoints and improvements based on the human review conducted on 2026-03-10.

## 1. Overall UI & Design Consistency
| ID | Category | Requirement | Expected Behavior |
|----|----------|-------------|-------------------|
| UI-01 | Button Design | Sync styles/colors for: `Promote to ModelHub`, `Rerun`, `Mulai Benchmark`. | Constant visual weight and primary/secondary alignment. |
| UI-02 | Standard Buttons | Verify `Batal`, `Lanjutkan`, `Kembali`, `Run Benchmark` use correct tokens. | Must match standard design system variables. |

## 2. Dashboard Recap (Menu Dashboard)
| ID | Category | Requirement | Status |
|----|----------|-------------|--------|
| DB-01 | Metrics | Ensure the top recap displays exactly: `Total Model`, `Testing Berjalan`, `Testing Selesai`, `Sedang di-Review`, `Model dipromosikan`. | [ ] |

## 3. "Model Saya" Menu
| ID | Category | Requirement | Expected Behavior |
|----|----------|-------------|-------------------|
| MS-01 | Model Status | Show current status (Testing, Completed, Promoted) in the list. | Status badge is visible for every model. |
| MS-02 | Detail Link | Add button/link to "Detail Testing" for models that have completed tests. | Redirects to the specific run results page. |

## 4. Assessment & Testing Process
| ID | Category | Requirement | Expected Behavior |
|----|----------|-------------|-------------------|
| TP-01 | Package Standards | Verify package alignment with global standards (Moonshot benchmark). | Packages cover necessary risk categories. |
| TP-02 | Package Detail | Clickable "?" icon on assessment packages. | Opens modal/overlay with internal test details. |
| TP-03 | Rating UI | Fix font color for "Class Rating" (e.g., 'B'). | Font must be visible (e.g., black or dark gray) against background. |

## 5. Testing Results Detail (Deep Link)
| ID | Category | Requirement | Expected Behavior |
|----|----------|-------------|-------------------|
| RD-01 | Recipe Breakdown | Add "Expand All" option. | Expands all prompt/response rows at once. |
| RD-02 | LLM Justification | "Review" button for detailed AI recommendations. | Triggers LLM justification for each category. |
| RD-03 | Comparison | Version comparison view in results. | Users can compare different runs of the same model. |

## 6. Leaderboard & Publishing
| ID | Category | Requirement | Expected Behavior |
|----|----------|-------------|-------------------|
| LP-01 | In-app ModelHub | Direct to a ModelHub view within the current user context. | User stays in the application, not redirected to a public landing page. |
| LP-02 | Compare Limits | Allow comparison with others in ModelHub but hide their private data. | Only public scores/recap metadata are visible for other models. |

## 7. Logic Removals (MVP Scope)
| ID | Category | Requirement | Action |
|----|----------|-------------|--------|
| LR-01 | Review Queue | Remove "Antrean Review" from the main journey. | Hide menu but preserve the underlying code/logic concept for future regulation-heavy versions. |

---
*Generated based on Human Review Review (2026-03-10)*
