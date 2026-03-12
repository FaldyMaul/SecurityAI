# Project Context: Change Summary (v2)

This document provides a "Before vs. After" summary of the key changes made to the AI Sandbox project to assist other agents in understanding the current state.

## 1. Routing & Internationalization
| Feature | Before (Broken) | After (Fixed) |
|---------|-----------------|---------------|
| **Directory Structure** | `src/app/(public)/page.tsx` (Mixed) | `src/app/[locale]/(group)/page.tsx` (Locale-nested) |
| **Root Layout** | Contained all providers; no `html`/`body` outside locale. | Root `layout.tsx` provides `html`/`body` for 404 support. |
| **Middleware** | Manual locale redirects; conflicting login logic. | Standard `next-intl` middleware with clean role-based guards. |
| **404 Handling** | Returned 404 for root `/`. | Correctly serves `/id` or `/en` based on detection. |

## 2. UI/UX & Design System
| Feature | Status/Change |
|---------|---------------|
| **Navbar** | Restored. Now correctly nested in `(public)` and `(auth)` layouts to avoid doubling. |
| **Color Palette** | Updated to Premium Dashboard Palette (#221C6A, #1545BC, #7740B5, #A4E7DE). |
| **Accessibility** | All text contrast (Muted/Secondary) now meets WCAG 2.1 AA standards. |
| **Hero Section** | Optimized gradient for readability; white text on dark navy/blue. |

## 3. QA & Business Logic (Human Review v2)
| Feature | Old Logic | New Logic (Current) |
|---------|-----------|---------------------|
| **Model Source** | Apilogy Import | **LiteLLM** (Primary config source). |
| **Assessment Setup** | Manual selection; no estimates. | Default "Select All"; dynamic time/consequence estimates. |
| **Benchmarking** | Page-locked; fragile polling. | **Background processing**; persistent polling across nav. |
| **Result Actions** | "Submit for Review". | **Publish** (Direct) vs **Rerun**. |
| **Publish Guards** | No restrictions. | **Blocked** if model has D or E scores (High Risk). |
| **History** | Single latest result. | Full **Benchmark History** with versioning. |

## 4. Key Implementation Notes for Agents
- **QA Bypass**: In `development`, setting `NEXT_PUBLIC_QA_BYPASS_LOGIN=true` (default) auto-logs you in as `admin` to `/models`.
- **Route Groups**: 
    - `(public)`: Home, Ranking.
    - `(auth)`: Login (uses `NavbarMinimal`).
    - `(internal)`: Dashboard, Models, Reports (requires `admin` or `model_owner`).
- **File Locations**:
    - Global Styles: `src/styles/variables.css`.
    - QA Docs: `AISandboxDev/03_QA_Docs/`.

---
*Created on: 2026-03-10*
