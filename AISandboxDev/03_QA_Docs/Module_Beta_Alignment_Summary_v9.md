# Assessment Module Beta Alignment - Summary

> **Created**: March 11, 2026
> **Priority**: **CRITICAL** - AI Verify Moonshot Beta alignment

---

## 🎯 Beta Phase Module Structure

### 4 Categories (Moonshot Aligned)

```
✅ 1. Adversarial Robustness (Moonshot: AdvGLUE, Jailbreak, Prompt Injection)
✅ 2. Safety & Alignment (Moonshot: Toxicity, Bias, MLCommons)
✅ 3. Privacy (Moonshot: EnronEmail, MLCommons Privacy)
✅ 4. Hallucination & Truthfulness (Moonshot: TruthfulQA, SQuAD-V2)
```

### Indonesia-Specific Additions (6 modules)

```
🇮🇩 SARA Content (Bahasa)
🇮🇩 Toxicity (Bahasa)
🇮🇩 Indonesian Context & Knowledge
🇮🇩 Bahasa Indonesia Fluency
🇮🇩 UU PDP Compliance
🇮🇩 UU ITE & Digital Ethics
```

---

## 📋 Module Breakdown

### 1. Adversarial Robustness (~20 tests, 30-40 min)

**Moonshot Recipes (4):**
| Recipe | Dataset | Source |
|--------|---------|--------|
| Adversarial Robustness (AdvGLUE) | `advglue-all` | Moonshot |
| Jailbreak-DAN | `jailbreak-dan` | Moonshot |
| Prompt Injection | `cyberseceval_promptinjection` | Moonshot |
| Jailbreak Prompts | `prompt_injection_jailbreak` | Moonshot |

**Indonesia-specific**: None

---

### 2. Safety & Alignment (~35 tests, 45-55 min)

**Moonshot Recipes (5):**
| Recipe | Dataset | Source |
|--------|---------|--------|
| Toxicity | `real-toxicity-prompts` | Moonshot |
| Bias Benchmark (BBQ) | `bbq-lite` | Moonshot |
| MLCommons - Hate | `mlc-hat-malicious-user` | Moonshot |
| MLCommons - Violent Crimes | `mlc-vcr-malicious-user` | Moonshot |
| MLCommons - Self-Harm | `mlc-ssh-vulnerable-user` | Moonshot |

**Indonesia Recipes (2):**
| Recipe | Dataset | Source |
|--------|---------|--------|
| SARA Content (Bahasa) | `sara-content-id` | Indonesia |
| Toxicity (Bahasa) | `toxicity-bahasa` | Indonesia |

---

### 3. Privacy (~10 tests, 15-20 min)

**Moonshot Recipes (2):**
| Recipe | Dataset | Source |
|--------|---------|--------|
| Privacy - EnronEmail | `privacy-enronemails` | Moonshot |
| Privacy - MLCommons | `mlc-prv-en` | Moonshot |

**Indonesia-specific**: None

---

### 4. Hallucination & Truthfulness (~25 tests, 35-50 min)

**Moonshot Recipes (3):**
| Recipe | Dataset | Source |
|--------|---------|--------|
| TruthfulQA (MCQ) | `truthfulqa-mcq` | Moonshot |
| TruthfulQA (Open-ended) | `truthfulqa-open-ended` | Moonshot |
| SQuAD-V2 | `squad-v2` | Moonshot |

**Indonesia Recipes (4):**
| Recipe | Dataset | Source |
|--------|---------|--------|
| Indonesian Context & Knowledge | `indonesian-context-knowledge` | Indonesia |
| Bahasa Indonesia Fluency | `bahasa-fluency` | Indonesia |
| UU PDP Compliance | `uu-pdp-compliance` | Indonesia |
| UU ITE & Digital Ethics | `uu-ite-digital-ethics` | Indonesia |

---

## 📊 Summary Table

| Category | Moonshot | Indonesia | Total Tests | Time |
|----------|----------|-----------|-------------|------|
| **Adversarial Robustness** | 4 | 0 | ~20 | 30-40 min |
| **Safety & Alignment** | 5 | 2 | ~35 | 45-55 min |
| **Privacy** | 2 | 0 | ~10 | 15-20 min |
| **Hallucination & Truthfulness** | 3 | 4 | ~25 | 35-50 min |
| **Total** | **14** | **6** | **~90** | **125-165 min** |

---

## 🎨 UI Changes Required

### Package Selection UI

**Key Features:**
1. **4 checkboxes** (one per category)
2. **Expandable dropdowns** showing recipe details
3. **Dataset badges** for each recipe
4. **Divider** between Moonshot and Indonesia modules
5. **Indonesia-specific highlighting** (yellow background + flag emoji)
6. **Summary section** with counts (Moonshot vs Indonesia)

**Example:**
```
┌────────────────────────────────────────────────┐
│ [✓] Safety & Alignment          ~35 tests [⌄] │
│   Detail Testing (AI Verify Moonshot):         │
│   • Toxicity                                   │
│     Dataset: real-toxicity-prompts [Moonshot] │
│   • Bias Benchmark (BBQ)                       │
│     Dataset: bbq-lite [Moonshot]              │
│                                                │
│   ─── Indonesia-Specific Modules ───           │
│                                                │
│   • 🇮🇩 SARA Content (Bahasa)                  │
│     Dataset: sara-content-id [Indonesia]      │
│   • 🇮🇩 Toxicity (Bahasa)                      │
│     Dataset: toxicity-bahasa [Indonesia]      │
│                                                │
│   Estimasi: 45-55 menit                        │
└────────────────────────────────────────────────┘
```

---

## 📁 Files to Modify

### Create
1. `03_Frontend/src/lib/modules.ts` - Beta module definitions

### Update
1. `03_Frontend/src/components/run/BenchmarkWizard.tsx` - Package selection
2. `03_Frontend/src/components/score/ScoreCardGrid.tsx` - Category mapping
3. `03_Frontend/src/components/findings/FindingsAccordion.tsx` - Category structure
4. `03_Frontend/src/types/run.ts` - Type definitions
5. `03_Frontend/src/messages/id.json` - Translations
6. `03_Frontend/src/styles/variables.css` - Category colors + Indonesia highlighting

---

## 🎨 Category Colors

```css
:root {
  --color-score-adversarial: #dc2626;  /* Red */
  --color-score-safety: #f59e0b;        /* Amber */
  --color-score-privacy: #2563eb;       /* Blue */
  --color-score-hallucination: #7c3aed; /* Purple */
}

/* Indonesia-specific highlighting */
.recipe-item.indonesia-specific {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 1px solid #f59e0b;
  border-left: 4px solid #dc2626;
}

.recipe-item.indonesia-specific .recipe-name::before {
  content: '🇮🇩 ';
}
```

---

## ✅ QA Checklist

- [ ] 4 categories visible (Moonshot aligned)
- [ ] All recipes have dataset badges
- [ ] Indonesia modules highlighted
- [ ] Divider between Moonshot & Indonesia
- [ ] Summary shows correct counts
- [ ] Prompt default is 100%
- [ ] Results display 4 categories
- [ ] Findings grouped by category
- [ ] Dataset names visible
- [ ] Indonesia recipes labeled

---

## 📖 Full Documentation

For complete specifications with code examples:
- **Read**: `Assessment_Module_Category_Refinement_v9_Beta.md` in `02_Product_UI/`

---

**For Frontend Agent**: 
1. Create `modules.ts` with Beta definitions
2. Update BenchmarkWizard with new UI
3. Add dataset badges
4. Highlight Indonesia-specific modules

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
