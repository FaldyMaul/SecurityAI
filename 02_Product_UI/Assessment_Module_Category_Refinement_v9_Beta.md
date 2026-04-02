# AI Sandbox – Assessment Module Category Refinement v9.0 (Beta)

> **Purpose**: Align with AI Verify Moonshot Phase Beta + Indonesia-specific modules
> **Version**: 9.0 (Beta Alignment)
> **Last Updated**: March 11, 2026
> **Priority**: **CRITICAL** - Moonshot alignment for Beta phase

---

## 🎯 Module Categories (Beta Phase)

Based on **AI Verify Moonshot** (https://aiverify-foundation.github.io/moonshot/resources/recipes/)

### 4 Main Categories:

```
✅ 1. Adversarial Robustness (Moonshot: AdvGLUE, Jailbreak, Prompt Injection)
✅ 2. Safety & Alignment (Moonshot: Toxicity, Bias, Harmful Content)
✅ 3. Privacy (Moonshot: EnronEmail, MLCommons Privacy)
✅ 4. Hallucination & Truthfulness (Moonshot: TruthfulQA, RealtimeQA)
```

### Indonesia-Specific Additions:

```
🇮🇩 SARA Content Detection (Bahasa Indonesia)
🇮🇩 Toxicity in Bahasa Indonesia
🇮🇩 Indonesian Context & Knowledge
🇮🇩 Bahasa Indonesia Fluency
🇮🇩 UU PDP Compliance (Personal Data Protection)
🇮🇩 UU ITE & Digital Ethics
```

---

## 📋 Detailed Module Breakdown (Beta)

### 1. Adversarial Robustness

**Moonshot Alignment**: AdvGLUE, Jailbreak-DAN, Prompt Injection

**Sub-modules / Recipes:**
| Recipe | Dataset | Source | Tests |
|--------|---------|--------|-------|
| **Adversarial Robustness (AdvGLUE)** | `advglue-all` | Moonshot | Word-level & sentence-level adversarial attacks |
| **Jailbreak-DAN** | `jailbreak-dan` | Moonshot | Common jailbreak methods (DAN, etc.) |
| **Prompt Injection** | `cyberseceval_promptinjection` | Moonshot | Prompt injection attacks |
| **Jailbreak Prompts** | `prompt_injection_jailbreak` | Moonshot | Harmful jailbreak queries |

**Total Tests**: ~20 tests
**Estimated Time**: 30-40 minutes
**Indonesia-specific**: None (use Moonshot standard)

---

### 2. Safety & Alignment

**Moonshot Alignment**: Toxicity, Bias, MLCommons AI Safety

**Sub-modules / Recipes:**
| Recipe | Dataset | Source | Tests |
|--------|---------|--------|-------|
| **Toxicity** | `real-toxicity-prompts` | Moonshot | Toxic phrase generation |
| **Bias Benchmark (BBQ)** | `bbq-lite` | Moonshot | Social biases (age, disability, gender, etc.) |
| **MLCommons - Hate** | `mlc-hat-malicious-user` | Moonshot | Hate speech generation |
| **MLCommons - Violent Crimes** | `mlc-vcr-malicious-user` | Moonshot | Violent crime facilitation |
| **MLCommons - Self-Harm** | `mlc-ssh-vulnerable-user` | Moonshot | Self-harm content |
| **🇮🇩 SARA Content (Bahasa)** | `sara-content-id` | **Indonesia** | Sensitive, Religious, Racial content in Indonesian |
| **🇮🇩 Toxicity (Bahasa)** | `toxicity-bahasa` | **Indonesia** | Toxic language in Indonesian |

**Total Tests**: ~35 tests (including 2 Indonesia-specific)
**Estimated Time**: 45-55 minutes

---

### 3. Privacy

**Moonshot Alignment**: EnronEmail, MLCommons Privacy

**Sub-modules / Recipes:**
| Recipe | Dataset | Source | Tests |
|--------|---------|--------|-------|
| **Privacy - EnronEmail** | `privacy-enronemails` | Moonshot | Private information leakage |
| **Privacy - MLCommons** | `mlc-prv-en` | Moonshot | Sensitive personal information |

**Total Tests**: ~10 tests
**Estimated Time**: 15-20 minutes
**Indonesia-specific**: None (use Moonshot standard)

---

### 4. Hallucination & Truthfulness

**Moonshot Alignment**: TruthfulQA, RealtimeQA, SQuAD-V2

**Sub-modules / Recipes:**
| Recipe | Dataset | Source | Tests |
|--------|---------|--------|-------|
| **TruthfulQA (MCQ)** | `truthfulqa-mcq` | Moonshot | Truthfulness in multiple-choice |
| **TruthfulQA (Open-ended)** | `truthfulqa-open-ended` | Moonshot | Truthfulness in generation |
| **SQuAD-V2** | `squad-v2` | Moonshot | Hallucination in QA |
| **🇮🇩 Indonesian Context & Knowledge** | `indonesian-context-knowledge` | **Indonesia** | Indonesian culture, geography, history |
| **🇮🇩 Bahasa Indonesia Fluency** | `bahasa-fluency` | **Indonesia** | Language fluency and grammar |
| **🇮🇩 UU PDP Compliance** | `uu-pdp-compliance` | **Indonesia** | Personal Data Protection Law knowledge |
| **🇮🇩 UU ITE & Digital Ethics** | `uu-ite-digital-ethics` | **Indonesia** | Electronic Information Law knowledge |

**Total Tests**: ~25 tests (including 4 Indonesia-specific)
**Estimated Time**: 35-50 minutes

---

## 🎨 UI/UX Implementation

### Package Selection UI (BenchmarkWizard)

```tsx
// BenchmarkWizard.tsx - Beta Phase Package Selection
<div className="package-selection">
  <h3>Pilih Paket Penilaian</h3>
  <p className="subtitle">
    Pilih kategori penilaian yang ingin dijalankan. 
    Modul berdasarkan AI Verify Moonshot + Indonesia-specific.
  </p>

  {/* Category Checkboxes with Expandable Details */}
  <div className="category-list">
    
    {/* Category 1: Adversarial Robustness */}
    <div className="category-item">
      <div className="category-header">
        <Checkbox
          checked={selectedCategories.includes('adversarial')}
          onChange={() => toggleCategory('adversarial')}
          label={
            <div className="category-label">
              <Shield size={20} />
              <span>Adversarial Robustness</span>
              <Badge variant="info">~20 tests</Badge>
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

      {expanded === 'adversarial' && (
        <div className="recipe-list">
          <h4>Detail Testing (AI Verify Moonshot):</h4>
          <ul className="recipe-items">
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Adversarial Robustness (AdvGLUE)</span>
                <span className="recipe-desc">Word-level & sentence-level adversarial attacks</span>
                <span className="dataset-badge">Dataset: advglue-all</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Jailbreak-DAN</span>
                <span className="recipe-desc">Common jailbreak methods (DAN, etc.)</span>
                <span className="dataset-badge">Dataset: jailbreak-dan</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Prompt Injection</span>
                <span className="recipe-desc">Prompt injection attacks</span>
                <span className="dataset-badge">Dataset: cyberseceval_promptinjection</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Jailbreak Prompts</span>
                <span className="recipe-desc">Harmful jailbreak queries</span>
                <span className="dataset-badge">Dataset: prompt_injection_jailbreak</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
          </ul>
          <p className="category-meta">
            Estimasi: 30-40 menit
          </p>
        </div>
      )}
    </div>

    {/* Category 2: Safety & Alignment */}
    <div className="category-item">
      <div className="category-header">
        <Checkbox
          checked={selectedCategories.includes('safety')}
          onChange={() => toggleCategory('safety')}
          label={
            <div className="category-label">
              <AlertTriangle size={20} />
              <span>Safety & Alignment</span>
              <Badge variant="info">~35 tests</Badge>
            </div>
          }
        />
        <Button variant="ghost" size="sm" onClick={() => toggleExpand('safety')}>
          <ChevronDown size={16} />
        </Button>
      </div>

      {expanded === 'safety' && (
        <div className="recipe-list">
          <h4>Detail Testing (AI Verify Moonshot):</h4>
          <ul className="recipe-items">
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Toxicity</span>
                <span className="recipe-desc">Toxic phrase generation</span>
                <span className="dataset-badge">Dataset: real-toxicity-prompts</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Bias Benchmark (BBQ)</span>
                <span className="recipe-desc">Social biases (age, disability, gender, etc.)</span>
                <span className="dataset-badge">Dataset: bbq-lite</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">MLCommons - Hate</span>
                <span className="recipe-desc">Hate speech generation</span>
                <span className="dataset-badge">Dataset: mlc-hat-malicious-user</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">MLCommons - Violent Crimes</span>
                <span className="recipe-desc">Violent crime facilitation</span>
                <span className="dataset-badge">Dataset: mlc-vcr-malicious-user</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">MLCommons - Self-Harm</span>
                <span className="recipe-desc">Self-harm content</span>
                <span className="dataset-badge">Dataset: mlc-ssh-vulnerable-user</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            
            <Divider label="Indonesia-Specific Modules" />
            
            <li className="recipe-item indonesia-specific">
              <div className="recipe-info">
                <span className="recipe-name">🇮🇩 SARA Content (Bahasa)</span>
                <span className="recipe-desc">Sensitive, Religious, Racial content in Indonesian</span>
                <span className="dataset-badge">Dataset: sara-content-id</span>
              </div>
              <Badge variant="secondary">Indonesia</Badge>
            </li>
            <li className="recipe-item indonesia-specific">
              <div className="recipe-info">
                <span className="recipe-name">🇮🇩 Toxicity (Bahasa)</span>
                <span className="recipe-desc">Toxic language in Indonesian</span>
                <span className="dataset-badge">Dataset: toxicity-bahasa</span>
              </div>
              <Badge variant="secondary">Indonesia</Badge>
            </li>
          </ul>
          <p className="category-meta">Estimasi: 45-55 menit</p>
        </div>
      )}
    </div>

    {/* Category 3: Privacy */}
    <div className="category-item">
      <div className="category-header">
        <Checkbox
          checked={selectedCategories.includes('privacy')}
          onChange={() => toggleCategory('privacy')}
          label={
            <div className="category-label">
              <Lock size={20} />
              <span>Privacy</span>
              <Badge variant="info">~10 tests</Badge>
            </div>
          }
        />
        <Button variant="ghost" size="sm" onClick={() => toggleExpand('privacy')}>
          <ChevronDown size={16} />
        </Button>
      </div>

      {expanded === 'privacy' && (
        <div className="recipe-list">
          <h4>Detail Testing (AI Verify Moonshot):</h4>
          <ul className="recipe-items">
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Privacy - EnronEmail</span>
                <span className="recipe-desc">Private information leakage</span>
                <span className="dataset-badge">Dataset: privacy-enronemails</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">Privacy - MLCommons</span>
                <span className="recipe-desc">Sensitive personal information</span>
                <span className="dataset-badge">Dataset: mlc-prv-en</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
          </ul>
          <p className="category-meta">Estimasi: 15-20 menit</p>
        </div>
      )}
    </div>

    {/* Category 4: Hallucination & Truthfulness */}
    <div className="category-item">
      <div className="category-header">
        <Checkbox
          checked={selectedCategories.includes('hallucination')}
          onChange={() => toggleCategory('hallucination')}
          label={
            <div className="category-label">
              <EyeOff size={20} />
              <span>Hallucination & Truthfulness</span>
              <Badge variant="info">~25 tests</Badge>
            </div>
          }
        />
        <Button variant="ghost" size="sm" onClick={() => toggleExpand('hallucination')}>
          <ChevronDown size={16} />
        </Button>
      </div>

      {expanded === 'hallucination' && (
        <div className="recipe-list">
          <h4>Detail Testing (AI Verify Moonshot):</h4>
          <ul className="recipe-items">
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">TruthfulQA (MCQ)</span>
                <span className="recipe-desc">Truthfulness in multiple-choice</span>
                <span className="dataset-badge">Dataset: truthfulqa-mcq</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">TruthfulQA (Open-ended)</span>
                <span className="recipe-desc">Truthfulness in generation</span>
                <span className="dataset-badge">Dataset: truthfulqa-open-ended</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            <li className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">SQuAD-V2</span>
                <span className="recipe-desc">Hallucination in QA</span>
                <span className="dataset-badge">Dataset: squad-v2</span>
              </div>
              <Badge variant="outline">Moonshot</Badge>
            </li>
            
            <Divider label="Indonesia-Specific Modules" />
            
            <li className="recipe-item indonesia-specific">
              <div className="recipe-info">
                <span className="recipe-name">🇮🇩 Indonesian Context & Knowledge</span>
                <span className="recipe-desc">Indonesian culture, geography, history</span>
                <span className="dataset-badge">Dataset: indonesian-context-knowledge</span>
              </div>
              <Badge variant="secondary">Indonesia</Badge>
            </li>
            <li className="recipe-item indonesia-specific">
              <div className="recipe-info">
                <span className="recipe-name">🇮🇩 Bahasa Indonesia Fluency</span>
                <span className="recipe-desc">Language fluency and grammar</span>
                <span className="dataset-badge">Dataset: bahasa-fluency</span>
              </div>
              <Badge variant="secondary">Indonesia</Badge>
            </li>
            <li className="recipe-item indonesia-specific">
              <div className="recipe-info">
                <span className="recipe-name">🇮🇩 UU PDP Compliance</span>
                <span className="recipe-desc">Personal Data Protection Law knowledge</span>
                <span className="dataset-badge">Dataset: uu-pdp-compliance</span>
              </div>
              <Badge variant="secondary">Indonesia</Badge>
            </li>
            <li className="recipe-item indonesia-specific">
              <div className="recipe-info">
                <span className="recipe-name">🇮🇩 UU ITE & Digital Ethics</span>
                <span className="recipe-desc">Electronic Information Law knowledge</span>
                <span className="dataset-badge">Dataset: uu-ite-digital-ethics</span>
              </div>
              <Badge variant="secondary">Indonesia</Badge>
            </li>
          </ul>
          <p className="category-meta">Estimasi: 35-50 menit</p>
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
      <div className="stat">
        <span className="label">Moonshot modules:</span>
        <span className="value">{countMoonshotModules()}</span>
      </div>
      <div className="stat">
        <span className="label">Indonesia modules:</span>
        <span className="value">{countIndonesiaModules()}</span>
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

## 📊 Module Summary Table (Beta)

| Category | Moonshot Modules | Indonesia Modules | Total Tests | Time |
|----------|------------------|-------------------|-------------|------|
| **Adversarial Robustness** | 4 | 0 | ~20 | 30-40 min |
| **Safety & Alignment** | 5 | 2 | ~35 | 45-55 min |
| **Privacy** | 2 | 0 | ~10 | 15-20 min |
| **Hallucination & Truthfulness** | 3 | 4 | ~25 | 35-50 min |
| **Total** | **14** | **6** | **~90** | **125-165 min** |

---

## 🎨 CSS Styling

```css
/* Indonesia-specific highlighting */
.recipe-item.indonesia-specific {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 1px solid #f59e0b;
  border-left: 4px solid #dc2626;
}

.recipe-item.indonesia-specific .recipe-name::before {
  content: '🇮🇩 ';
}

.dataset-badge {
  display: block;
  font-size: 11px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  margin-top: 4px;
  padding: 2px 6px;
  background: var(--color-bg-tertiary);
  border-radius: 4px;
  width: fit-content;
}

/* Divider between Moonshot and Indonesia modules */
.divider-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.divider-label::before,
.divider-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}
```

---

## 📁 Files to Modify

### Critical Files

| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/lib/modules.ts` | ✅ CREATE NEW - Beta module definitions | **CRITICAL** |
| `03_Frontend/src/components/run/BenchmarkWizard.tsx` | Update package selection UI | **CRITICAL** |
| `03_Frontend/src/components/score/ScoreCardGrid.tsx` | Update category mapping | **CRITICAL** |
| `03_Frontend/src/components/findings/FindingsAccordion.tsx` | Update category structure | **CRITICAL** |

### Module Definitions (modules.ts)

```typescript
// Beta Phase Module Definitions
export const BETA_MODULES = {
  adversarial: {
    id: 'adversarial',
    name: 'Adversarial Robustness',
    icon: 'Shield',
    recipes: [
      {
        id: 'advglue',
        name: 'Adversarial Robustness (AdvGLUE)',
        dataset: 'advglue-all',
        source: 'Moonshot',
        description: 'Word-level & sentence-level adversarial attacks'
      },
      {
        id: 'jailbreak-dan',
        name: 'Jailbreak-DAN',
        dataset: 'jailbreak-dan',
        source: 'Moonshot',
        description: 'Common jailbreak methods (DAN, etc.)'
      },
      {
        id: 'prompt-injection',
        name: 'Prompt Injection',
        dataset: 'cyberseceval_promptinjection',
        source: 'Moonshot',
        description: 'Prompt injection attacks'
      },
      {
        id: 'jailbreak-prompts',
        name: 'Jailbreak Prompts',
        dataset: 'prompt_injection_jailbreak',
        source: 'Moonshot',
        description: 'Harmful jailbreak queries'
      }
    ],
    estimatedTime: '30-40',
    testCount: 20
  },
  safety: {
    id: 'safety',
    name: 'Safety & Alignment',
    icon: 'AlertTriangle',
    recipes: [
      {
        id: 'toxicity',
        name: 'Toxicity',
        dataset: 'real-toxicity-prompts',
        source: 'Moonshot',
        description: 'Toxic phrase generation'
      },
      {
        id: 'bias-bbq',
        name: 'Bias Benchmark (BBQ)',
        dataset: 'bbq-lite',
        source: 'Moonshot',
        description: 'Social biases (age, disability, gender, etc.)'
      },
      {
        id: 'mlc-hate',
        name: 'MLCommons - Hate',
        dataset: 'mlc-hat-malicious-user',
        source: 'Moonshot',
        description: 'Hate speech generation'
      },
      {
        id: 'mlc-vcr',
        name: 'MLCommons - Violent Crimes',
        dataset: 'mlc-vcr-malicious-user',
        source: 'Moonshot',
        description: 'Violent crime facilitation'
      },
      {
        id: 'mlc-ssh',
        name: 'MLCommons - Self-Harm',
        dataset: 'mlc-ssh-vulnerable-user',
        source: 'Moonshot',
        description: 'Self-harm content'
      },
      // Indonesia-specific
      {
        id: 'sara-content-id',
        name: 'SARA Content (Bahasa)',
        dataset: 'sara-content-id',
        source: 'Indonesia',
        description: 'Sensitive, Religious, Racial content in Indonesian',
        indonesiaSpecific: true
      },
      {
        id: 'toxicity-bahasa',
        name: 'Toxicity (Bahasa)',
        dataset: 'toxicity-bahasa',
        source: 'Indonesia',
        description: 'Toxic language in Indonesian',
        indonesiaSpecific: true
      }
    ],
    estimatedTime: '45-55',
    testCount: 35
  },
  privacy: {
    id: 'privacy',
    name: 'Privacy',
    icon: 'Lock',
    recipes: [
      {
        id: 'enron-email',
        name: 'Privacy - EnronEmail',
        dataset: 'privacy-enronemails',
        source: 'Moonshot',
        description: 'Private information leakage'
      },
      {
        id: 'mlc-privacy',
        name: 'Privacy - MLCommons',
        dataset: 'mlc-prv-en',
        source: 'Moonshot',
        description: 'Sensitive personal information'
      }
    ],
    estimatedTime: '15-20',
    testCount: 10
  },
  hallucination: {
    id: 'hallucination',
    name: 'Hallucination & Truthfulness',
    icon: 'EyeOff',
    recipes: [
      {
        id: 'truthfulqa-mcq',
        name: 'TruthfulQA (MCQ)',
        dataset: 'truthfulqa-mcq',
        source: 'Moonshot',
        description: 'Truthfulness in multiple-choice'
      },
      {
        id: 'truthfulqa-open',
        name: 'TruthfulQA (Open-ended)',
        dataset: 'truthfulqa-open-ended',
        source: 'Moonshot',
        description: 'Truthfulness in generation'
      },
      {
        id: 'squad-v2',
        name: 'SQuAD-V2',
        dataset: 'squad-v2',
        source: 'Moonshot',
        description: 'Hallucination in QA'
      },
      // Indonesia-specific
      {
        id: 'indonesian-context',
        name: 'Indonesian Context & Knowledge',
        dataset: 'indonesian-context-knowledge',
        source: 'Indonesia',
        description: 'Indonesian culture, geography, history',
        indonesiaSpecific: true
      },
      {
        id: 'bahasa-fluency',
        name: 'Bahasa Indonesia Fluency',
        dataset: 'bahasa-fluency',
        source: 'Indonesia',
        description: 'Language fluency and grammar',
        indonesiaSpecific: true
      },
      {
        id: 'uu-pdp',
        name: 'UU PDP Compliance',
        dataset: 'uu-pdp-compliance',
        source: 'Indonesia',
        description: 'Personal Data Protection Law knowledge',
        indonesiaSpecific: true
      },
      {
        id: 'uu-ite',
        name: 'UU ITE & Digital Ethics',
        dataset: 'uu-ite-digital-ethics',
        source: 'Indonesia',
        description: 'Electronic Information Law knowledge',
        indonesiaSpecific: true
      }
    ],
    estimatedTime: '35-50',
    testCount: 25
  }
};

export type ModuleId = keyof typeof BETA_MODULES;
export type Recipe = typeof BETA_MODULES[ModuleId]['recipes'][number];
```

---

## ✅ Implementation Checklist

### Phase 1: Critical (Week 1)
- [ ] Create `modules.ts` with Beta definitions
- [ ] Update BenchmarkWizard package selection
- [ ] Update ScoreCardGrid category mapping
- [ ] Update FindingsAccordion structure

### Phase 2: High (Week 2)
- [ ] Add all translations
- [ ] Add dataset badges
- [ ] Add Indonesia-specific highlighting
- [ ] Add divider labels (Moonshot vs Indonesia)

### Phase 3: Medium (Week 3)
- [ ] Polish mobile responsiveness
- [ ] Add animations
- [ ] Test all category combinations
- [ ] QA results display with dummy data

---

## 📊 Beta Phase Summary

**Moonshot Modules**: 14 recipes (aligned with AI Verify Moonshot)
**Indonesia Modules**: 6 recipes (Indonesia-specific)
**Total**: 20 recipes across 4 categories

**Datasets**: All aligned with Moonshot datasets + Indonesia-specific datasets

**For Beta Phase**: Use dummy data for Indonesia-specific modules until datasets are ready.

---

**For Frontend Agent**: Start with creating `modules.ts` with Beta definitions. All Moonshot recipes are documented with exact dataset names.

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
