# Assessment Module Category Update - Summary

> **Created**: March 11, 2026
> **Priority**: **CRITICAL** - AI Verify Moonshot alignment

---

## 🎯 Module Category Changes

### Old Structure (❌ Deprecated)
```
❌ Core Trust
❌ Safety & Robustness  
❌ Compliance
```

### New Structure (✅ AI Verify Moonshot Aligned)

```
✅ 1. Adversarial Attacks
✅ 2. Data Privacy
✅ 3. Undesirable Content
✅ 4. Hallucination & Inaccuracy
```

---

## 📋 Module Breakdown

### 1. Adversarial Attacks (~25 tests, 35-45 min)
**Recipes:**
- Prompt Injection (OWASP LLM01)
- Jailbreaking (AI Verify)
- Prompt Leaking (AI Verify)
- Adversarial Examples (AI Verify)
- **General Module** (AI Verify Moonshot)

### 2. Data Privacy (~15 tests, 20-30 min)
**Recipes:**
- PII Disclosure (AI Verify)
- Privacy Leakage (AI Verify)
- Memory Attacks (AI Verify)
- **General Module** (AI Verify Moonshot)

### 3. Undesirable Content (~30 tests, 40-50 min)
**Recipes:**
- SARA Content (Bahasa) ← Indonesia-specific
- Toxicity (Bahasa) ← Indonesia-specific
- Hate Speech (AI Verify)
- Harassment (AI Verify)
- Self-Harm (AI Verify)
- Violence (AI Verify)
- Sexual Content (AI Verify)
- **General Module** (AI Verify Moonshot)

### 4. Hallucination & Inaccuracy (~35 tests, 45-60 min)
**Recipes:**
- MMLU (Standard AI)
- Indonesian Context & Knowledge ← Indonesia-specific
- Bahasa Indonesia Fluency ← Indonesia-specific
- Regulatory Compliance ← Indonesia-specific
- UU PDP Compliance ← Indonesia-specific
- UU ITE & Digital Ethics ← Indonesia-specific
- Factuality (AI Verify)
- Consistency (AI Verify)
- **General Module** (AI Verify Moonshot)

---

## 🎨 UI Changes Required

### Package Selection UI
```tsx
// User sees 4 checkboxes (one per category)
[✓] Adversarial Attacks       ~25 tests   [⌄]
    Detail Testing:
    • Prompt Injection (OWASP LLM01)
    • Jailbreaking (AI Verify)
    • Prompt Leaking (AI Verify)
    • Adversarial Examples (AI Verify)
    • General Module (AI Verify Moonshot)
    Estimasi: 35-45 menit

[✓] Data Privacy              ~15 tests   [⌄]
    Detail Testing:
    • PII Disclosure (AI Verify)
    • Privacy Leakage (AI Verify)
    • Memory Attacks (AI Verify)
    • General Module (AI Verify Moonshot)
    Estimasi: 20-30 menit

[ ] Undesirable Content       ~30 tests   [>]

[ ] Hallucination & Inaccuracy ~35 tests  [>]

Ringkasan Pilihan:
Kategori dipilih: 2 dari 4
Total tests: 40 tests
Estimasi waktu: 55-75 menit

Cakupan Prompt: [100% (Penuh - Direkomendasikan) ▼]
```

### Key UI Features
1. **Checkboxes** for each category (multi-select)
2. **Expandable dropdown** to see recipe details
3. **Summary section** showing selected count, total tests, estimated time
4. **Prompt coverage** selector (default 100%)
5. **General Module** in each category (AI Verify Moonshot standard)

---

## 📁 Files to Modify

### Critical (Create/Update)
1. **CREATE**: `03_Frontend/src/lib/modules.ts` - Module definitions
2. **UPDATE**: `03_Frontend/src/components/run/BenchmarkWizard.tsx` - Package selection
3. **UPDATE**: `03_Frontend/src/components/score/ScoreCardGrid.tsx` - Category mapping
4. **UPDATE**: `03_Frontend/src/components/findings/FindingsAccordion.tsx` - Category structure

### Supporting
1. `03_Frontend/src/types/run.ts` - Add module types
2. `03_Frontend/src/messages/id.json` - Translations
3. `03_Frontend/src/styles/variables.css` - Category colors

---

## 🎨 Category Colors

```css
:root {
  --color-score-adversarial: #dc2626;  /* Red */
  --color-score-privacy: #2563eb;       /* Blue */
  --color-score-undesirable: #f59e0b;   /* Amber */
  --color-score-hallucination: #7c3aed; /* Purple */
}
```

---

## ✅ QA Checklist

- [ ] 4 categories visible in package selection
- [ ] Each category has checkbox
- [ ] Each category has expandable dropdown
- [ ] Recipe details visible on expand
- [ ] General Module in each category
- [ ] Summary shows correct counts
- [ ] Time estimates accurate
- [ ] Prompt default is 100%
- [ ] Results display 4 category scores
- [ ] Findings grouped by 4 categories
- [ ] Indonesia-specific recipes labeled
- [ ] UU PDP & UU ITE recipes present

---

## 📖 Full Documentation

For complete specifications with code examples:
- **Read**: `Assessment_Module_Category_Refinement_v8.md` in `02_Product_UI/`

---

**For Frontend Agent**: 
1. Start with creating `modules.ts` with all definitions
2. Update BenchmarkWizard with new UI
3. Update results display components
4. Test expandable recipe lists

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
