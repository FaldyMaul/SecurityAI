# AI Sandbox – Assessment Module Category Refinement v8.0

> **Purpose**: Align assessment modules with AI Verify Moonshot standards
> **Version**: 8.0 (Module Category Update)
> **Last Updated**: March 11, 2026
> **Priority**: **CRITICAL** - Standards alignment

---

## 🎯 Module Category Changes

### Old Structure (3 Packages)
```
❌ Core Trust
❌ Safety & Robustness
❌ Compliance
```

### New Structure (4 Categories aligned with AI Verify Moonshot)

```
✅ 1. Adversarial Attacks
✅ 2. Data Privacy
✅ 3. Undesirable Content
✅ 4. Hallucination & Inaccuracy
```

---

## 📋 Detailed Module Breakdown

### 1. Adversarial Attacks

**Purpose**: Test model resilience against malicious inputs

**Sub-modules / Recipes:**
| Recipe | Description | Standard |
|--------|-------------|----------|
| **Prompt Injection** | Test resistance to instruction hijacking | OWASP LLM01 |
| **Jailbreaking** | Test resistance to constraint bypass | AI Verify |
| **Prompt Leaking** | Test system prompt protection | AI Verify |
| **Adversarial Examples** | Test robustness to perturbed inputs | AI Verify |
| **General Module** | Mixed adversarial scenarios | AI Verify Moonshot |

**Total Tests**: ~25 tests
**Estimated Time**: 35-45 minutes

---

### 2. Data Privacy

**Purpose**: Test PII protection and data leakage prevention

**Sub-modules / Recipes:**
| Recipe | Description | Standard |
|--------|-------------|----------|
| **PII Disclosure** | Test protection of personal information | AI Verify |
| **Privacy Leakage** | Test training data extraction resistance | AI Verify |
| **Memory Attacks** | Test conversation history leakage | AI Verify |
| **General Module** | Mixed privacy scenarios | AI Verify Moonshot |

**Total Tests**: ~15 tests
**Estimated Time**: 20-30 minutes

---

### 3. Undesirable Content

**Purpose**: Test content safety and appropriateness

**Sub-modules / Recipes:**
| Recipe | Description | Standard |
|--------|-------------|----------|
| **SARA Content (Bahasa)** | Detection of Sensitive, Religious, Racial content in Indonesian | AI Verify + Indonesia |
| **Toxicity (Bahasa)** | Detection of toxic, harmful language in Indonesian | AI Verify + Indonesia |
| **Hate Speech** | Test hate speech generation prevention | AI Verify |
| **Harassment** | Test harassment facilitation prevention | AI Verify |
| **Self-Harm** | Test self-harm content prevention | AI Verify |
| **Violence** | Test violent content generation prevention | AI Verify |
| **Sexual Content** | Test sexually explicit content prevention | AI Verify |
| **General Module** | Mixed undesirable content scenarios | AI Verify Moonshot |

**Total Tests**: ~30 tests
**Estimated Time**: 40-50 minutes

---

### 4. Hallucination & Inaccuracy

**Purpose**: Test factual accuracy and reliability

**Sub-modules / Recipes:**
| Recipe | Description | Standard |
|--------|-------------|----------|
| **MMLU** | Massive Multitask Language Understanding benchmark | Standard AI |
| **Indonesian Context & Knowledge** | Test knowledge of Indonesian culture, geography, history | Indonesia-specific |
| **Bahasa Indonesia Fluency** | Test language fluency and grammar in Bahasa Indonesia | Indonesia-specific |
| **Regulatory Compliance** | Test knowledge of Indonesian regulations | Indonesia-specific |
| **UU PDP Compliance** | Test understanding of Personal Data Protection Law | UU PDP |
| **UU ITE & Digital Ethics** | Test understanding of Electronic Information Law | UU ITE |
| **Factuality** | Test factual accuracy on general knowledge | AI Verify |
| **Consistency** | Test response consistency across similar queries | AI Verify |
| **General Module** | Mixed hallucination scenarios | AI Verify Moonshot |

**Total Tests**: ~35 tests
**Estimated Time**: 45-60 minutes

---

## 🎨 UI/UX Implementation

### 1. Package Selection UI (BenchmarkWizard)

```tsx
// BenchmarkWizard.tsx - Package Selection
<div className="package-selection">
  <h3>Pilih Paket Penilaian</h3>
  <p className="subtitle">
    Pilih kategori penilaian yang ingin dijalankan. Anda dapat memilih beberapa kategori.
  </p>

  {/* Category Checkboxes with Expandable Details */}
  <div className="category-list">
    
    {/* Category 1: Adversarial Attacks */}
    <div className="category-item">
      <div className="category-header">
        <Checkbox
          checked={selectedCategories.includes('adversarial')}
          onChange={() => toggleCategory('adversarial')}
          label={
            <div className="category-label">
              <Shield size={20} />
              <span>Adversarial Attacks</span>
              <Badge variant="info">~25 tests</Badge>
            </div>
          }
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleExpand('adversarial')}
          aria-label="Lihat detail"
        >
          <ChevronDown 
            size={16} 
            className={expanded === 'adversarial' ? 'rotate-180' : ''} 
          />
        </Button>
      </div>

      {/* Expandable Recipe List */}
      {expanded === 'adversarial' && (
        <div className="recipe-list">
          <h4>Detail Testing:</h4>
          <ul className="recipe-items">
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Prompt Injection</span>
                <span className="recipe-desc">Test resistance to instruction hijacking</span>
              </div>
              <Badge variant="outline">OWASP LLM01</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Jailbreaking</span>
                <span className="recipe-desc">Test resistance to constraint bypass</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Prompt Leaking</span>
                <span className="recipe-desc">Test system prompt protection</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Adversarial Examples</span>
                <span className="recipe-desc">Test robustness to perturbed inputs</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item general">
              <div className="recipe-info">
                <span className="recipe-name">General Module</span>
                <span className="recipe-desc">Mixed adversarial scenarios</span>
              </div>
              <Badge variant="secondary">AI Verify Moonshot</Badge>
            </li>
          </ul>
          <p className="category-meta">
            Estimasi: 35-45 menit
          </p>
        </div>
      )}
    </div>

    {/* Category 2: Data Privacy */}
    <div className="category-item">
      <div className="category-header">
        <Checkbox
          checked={selectedCategories.includes('privacy')}
          onChange={() => toggleCategory('privacy')}
          label={
            <div className="category-label">
              <Lock size={20} />
              <span>Data Privacy</span>
              <Badge variant="info">~15 tests</Badge>
            </div>
          }
        />
        <Button variant="ghost" size="sm" onClick={() => toggleExpand('privacy')}>
          <ChevronDown size={16} />
        </Button>
      </div>

      {expanded === 'privacy' && (
        <div className="recipe-list">
          <h4>Detail Testing:</h4>
          <ul className="recipe-items">
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">PII Disclosure</span>
                <span className="recipe-desc">Test protection of personal information</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Privacy Leakage</span>
                <span className="recipe-desc">Test training data extraction resistance</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Memory Attacks</span>
                <span className="recipe-desc">Test conversation history leakage</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item general">
              <div className="recipe-info">
                <span className="recipe-name">General Module</span>
                <span className="recipe-desc">Mixed privacy scenarios</span>
              </div>
              <Badge variant="secondary">AI Verify Moonshot</Badge>
            </li>
          </ul>
          <p className="category-meta">Estimasi: 20-30 menit</p>
        </div>
      )}
    </div>

    {/* Category 3: Undesirable Content */}
    <div className="category-item">
      <div className="category-header">
        <Checkbox
          checked={selectedCategories.includes('undesirable')}
          onChange={() => toggleCategory('undesirable')}
          label={
            <div className="category-label">
              <AlertTriangle size={20} />
              <span>Undesirable Content</span>
              <Badge variant="info">~30 tests</Badge>
            </div>
          }
        />
        <Button variant="ghost" size="sm" onClick={() => toggleExpand('undesirable')}>
          <ChevronDown size={16} />
        </Button>
      </div>

      {expanded === 'undesirable' && (
        <div className="recipe-list">
          <h4>Detail Testing:</h4>
          <ul className="recipe-items">
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">SARA Content (Bahasa)</span>
                <span className="recipe-desc">Detection of Sensitive, Religious, Racial content in Indonesian</span>
              </div>
              <Badge variant="outline">AI Verify + ID</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Toxicity (Bahasa)</span>
                <span className="recipe-desc">Detection of toxic, harmful language in Indonesian</span>
              </div>
              <Badge variant="outline">AI Verify + ID</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Hate Speech</span>
                <span className="recipe-desc">Test hate speech generation prevention</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Harassment</span>
                <span className="recipe-desc">Test harassment facilitation prevention</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Self-Harm</span>
                <span className="recipe-desc">Test self-harm content prevention</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Violence</span>
                <span className="recipe-desc">Test violent content generation prevention</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Sexual Content</span>
                <span className="recipe-desc">Test sexually explicit content prevention</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item general">
              <div className="recipe-info">
                <span className="recipe-name">General Module</span>
                <span className="recipe-desc">Mixed undesirable content scenarios</span>
              </div>
              <Badge variant="secondary">AI Verify Moonshot</Badge>
            </li>
          </ul>
          <p className="category-meta">Estimasi: 40-50 menit</p>
        </div>
      )}
    </div>

    {/* Category 4: Hallucination & Inaccuracy */}
    <div className="category-item">
      <div className="category-header">
        <Checkbox
          checked={selectedCategories.includes('hallucination')}
          onChange={() => toggleCategory('hallucination')}
          label={
            <div className="category-label">
              <EyeOff size={20} />
              <span>Hallucination & Inaccuracy</span>
              <Badge variant="info">~35 tests</Badge>
            </div>
          }
        />
        <Button variant="ghost" size="sm" onClick={() => toggleExpand('hallucination')}>
          <ChevronDown size={16} />
        </Button>
      </div>

      {expanded === 'hallucination' && (
        <div className="recipe-list">
          <h4>Detail Testing:</h4>
          <ul className="recipe-items">
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">MMLU</span>
                <span className="recipe-desc">Massive Multitask Language Understanding benchmark</span>
              </div>
              <Badge variant="outline">Standard AI</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Indonesian Context & Knowledge</span>
                <span className="recipe-desc">Test knowledge of Indonesian culture, geography, history</span>
              </div>
              <Badge variant="outline">Indonesia</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Bahasa Indonesia Fluency</span>
                <span className="recipe-desc">Test language fluency and grammar in Bahasa Indonesia</span>
              </div>
              <Badge variant="outline">Indonesia</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Regulatory Compliance</span>
                <span className="recipe-desc">Test knowledge of Indonesian regulations</span>
              </div>
              <Badge variant="outline">Indonesia</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">UU PDP Compliance</span>
                <span className="recipe-desc">Test understanding of Personal Data Protection Law</span>
              </div>
              <Badge variant="outline">UU PDP</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">UU ITE & Digital Ethics</span>
                <span className="recipe-desc">Test understanding of Electronic Information Law</span>
              </div>
              <Badge variant="outline">UU ITE</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Factuality</span>
                <span className="recipe-desc">Test factual accuracy on general knowledge</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Consistency</span>
                <span className="recipe-desc">Test response consistency across similar queries</span>
              </div>
              <Badge variant="outline">AI Verify</Badge>
            </li>
            <li className="recipe-item general">
              <div className="recipe-info">
                <span className="recipe-name">General Module</span>
                <span className="recipe-desc">Mixed hallucination scenarios</span>
              </div>
              <Badge variant="secondary">AI Verify Moonshot</Badge>
            </li>
          </ul>
          <p className="category-meta">Estimasi: 45-60 menit</p>
        </div>
      )}
    </div>

  </div>

  {/* Summary */}
  <div className="selection-summary">
    <h4>Ringkasan Pilihan:</h4>
    <div className="summary-stats">
      <div className="stat">
        <span className="label">Kategori dipilih:</span>
        <span className="value">{selectedCategories.length} dari 4</span>
      </div>
      <div className="stat">
        <span className="label">Total tests:</span>
        <span className="value">{calculateTotalTests()} tests</span>
      </div>
      <div className="stat">
        <span className="label">Estimasi waktu:</span>
        <span className="value">{calculateTotalTime()} menit</span>
      </div>
    </div>
  </div>

  {/* Prompt Coverage */}
  <div className="prompt-coverage">
    <label>Cakupan Prompt</label>
    <Select
      value={promptPercentage}
      onChange={setPromptPercentage}
      options={[
        { value: 25, label: '25% (Cepat)' },
        { value: 50, label: '50% (Sedang)' },
        { value: 75, label: '75% (Lengkap)' },
        { value: 100, label: '100% (Penuh - Direkomendasikan)' }
      ]}
      defaultValue={100}  // ✅ Default to 100%
    />
    <p className="helper-text">
      Estimasi waktu total: {calculateTotalTime() * (promptPercentage / 100)} menit
    </p>
  </div>

  {/* Actions */}
  <div className="actions">
    <Button variant="outline" onClick={onCancel}>Batal</Button>
    <Button 
      variant="primary" 
      onClick={handleStart}
      disabled={selectedCategories.length === 0}
    >
      Jalankan Benchmark
    </Button>
  </div>
</div>
```

---

## 2. Results Display (ScoreCardGrid)

```tsx
// Results should map to the 4 categories
const categoryMapping = {
  'adversarial': {
    label: 'Adversarial Attacks',
    icon: Shield,
    color: 'var(--color-score-adversarial)',
    recipes: ['Prompt Injection', 'Jailbreaking', 'Prompt Leaking', 'Adversarial Examples', 'General Module']
  },
  'privacy': {
    label: 'Data Privacy',
    icon: Lock,
    color: 'var(--color-score-privacy)',
    recipes: ['PII Disclosure', 'Privacy Leakage', 'Memory Attacks', 'General Module']
  },
  'undesirable': {
    label: 'Undesirable Content',
    icon: AlertTriangle,
    color: 'var(--color-score-undesirable)',
    recipes: ['SARA Content (Bahasa)', 'Toxicity (Bahasa)', 'Hate Speech', 'Harassment', 'Self-Harm', 'Violence', 'Sexual Content', 'General Module']
  },
  'hallucination': {
    label: 'Hallucination & Inaccuracy',
    icon: EyeOff,
    color: 'var(--color-score-hallucination)',
    recipes: ['MMLU', 'Indonesian Context & Knowledge', 'Bahasa Indonesia Fluency', 'Regulatory Compliance', 'UU PDP Compliance', 'UU ITE & Digital Ethics', 'Factuality', 'Consistency', 'General Module']
  }
};
```

---

## 3. Findings Accordion

```tsx
// Findings should be categorized by the 4 main categories
<FindingsAccordion>
  <AccordionCategory 
    title="Adversarial Attacks" 
    icon={Shield}
    criticalCount={3}
    highCount={5}
  >
    <FindingItem
      recipe="Prompt Injection"
      severity="critical"
      description="Model failed to resist instruction hijacking attempt"
    />
    <FindingItem
      recipe="Jailbreaking"
      severity="high"
      description="Model bypassed safety constraints"
    />
  </AccordionCategory>

  <AccordionCategory 
    title="Data Privacy" 
    icon={Lock}
    criticalCount={1}
    highCount={2}
  >
    <FindingItem
      recipe="PII Disclosure"
      severity="critical"
      description="Model disclosed personal information"
    />
  </AccordionCategory>

  <AccordionCategory 
    title="Undesirable Content" 
    icon={AlertTriangle}
    criticalCount={2}
    highCount={4}
  >
    <FindingItem
      recipe="SARA Content (Bahasa)"
      severity="critical"
      description="Model generated SARA-related content in Indonesian"
    />
    <FindingItem
      recipe="Toxicity (Bahasa)"
      severity="high"
      description="Model generated toxic language in Indonesian"
    />
  </AccordionCategory>

  <AccordionCategory 
    title="Hallucination & Inaccuracy" 
    icon={EyeOff}
    criticalCount={0}
    highCount={3}
  >
    <FindingItem
      recipe="Indonesian Context & Knowledge"
      severity="high"
      description="Model showed incorrect knowledge about Indonesian geography"
    />
    <FindingItem
      recipe="UU PDP Compliance"
      severity="high"
      description="Model demonstrated incorrect understanding of PDP law"
    />
  </AccordionCategory>
</FindingsAccordion>
```

---

## 📁 Files to Modify

### Critical Files

| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/run/BenchmarkWizard.tsx` | Update package selection UI | **CRITICAL** |
| `03_Frontend/src/components/score/ScoreCardGrid.tsx` | Update category mapping | **CRITICAL** |
| `03_Frontend/src/components/findings/FindingsAccordion.tsx` | Update category structure | **CRITICAL** |
| `03_Frontend/src/lib/modules.ts` | ✅ CREATE NEW - Module definitions | **CRITICAL** |

### Supporting Files

| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/types/run.ts` | Add new module types | **HIGH** |
| `03_Frontend/src/messages/id.json` | Add translations | **HIGH** |
| `03_Frontend/src/styles/variables.css` | Add category colors | **MEDIUM** |

---

## 🎨 CSS Styling

```css
/* Category Selection UI */
.package-selection {
  padding: 24px;
  background: var(--color-surface);
  border-radius: 12px;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;
}

.category-item {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: all var(--transition-fast);
}

.category-item:hover {
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(21, 69, 188, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--color-bg-secondary);
}

.category-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 16px;
}

.category-label svg {
  color: var(--color-primary);
}

.recipe-list {
  padding: 16px;
  background: white;
  border-top: 1px solid var(--color-border);
}

.recipe-list h4 {
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.recipe-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recipe-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 6px;
  background: var(--color-bg-secondary);
}

.recipe-item.general {
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%);
  border: 1px solid var(--color-primary);
}

.recipe-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.recipe-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text-primary);
}

.recipe-desc {
  font-size: 12px;
  color: var(--color-text-muted);
}

.category-meta {
  margin-top: 16px;
  font-size: 13px;
  color: var(--color-text-secondary);
  font-style: italic;
}

.selection-summary {
  padding: 20px;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-bg-secondary) 100%);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  margin: 24px 0;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 12px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat .label {
  font-size: 12px;
  color: var(--color-text-muted);
}

.stat .value {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-primary);
}

.prompt-coverage {
  margin: 24px 0;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

/* Category Colors */
:root {
  --color-score-adversarial: #dc2626;  /* Red */
  --color-score-privacy: #2563eb;       /* Blue */
  --color-score-undesirable: #f59e0b;   /* Amber */
  --color-score-hallucination: #7c3aed; /* Purple */
}

@media (max-width: 768px) {
  .summary-stats {
    grid-template-columns: 1fr;
  }
  
  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
```

---

## ✅ Implementation Checklist

### Phase 1: Critical (Week 1)
- [ ] Create module definitions file
- [ ] Update BenchmarkWizard package selection
- [ ] Update ScoreCardGrid category mapping
- [ ] Update FindingsAccordion structure

### Phase 2: High (Week 2)
- [ ] Add all translations
- [ ] Add category colors
- [ ] Update type definitions
- [ ] Test expandable recipe lists

### Phase 3: Medium (Week 3)
- [ ] Polish mobile responsiveness
- [ ] Add animations
- [ ] Test all category combinations
- [ ] QA results display

---

## 📊 Module Summary Table

| Category | Tests | Time | Recipes | Standards |
|----------|-------|------|---------|-----------|
| **Adversarial Attacks** | ~25 | 35-45 min | 5 | OWASP LLM01, AI Verify |
| **Data Privacy** | ~15 | 20-30 min | 4 | AI Verify |
| **Undesirable Content** | ~30 | 40-50 min | 8 | AI Verify + Indonesia |
| **Hallucination & Inaccuracy** | ~35 | 45-60 min | 9 | AI Verify + Indonesia + UU PDP + UU ITE |
| **Total** | **~105** | **140-185 min** | **26** | Multiple |

---

**For Frontend Agent**: Start with creating the module definitions file, then update the BenchmarkWizard UI. All specifications are provided with implementation examples.

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
