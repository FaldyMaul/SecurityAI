# AI Sandbox – Security Standard Alignment Refinement (March 2026)

> **Purpose**: UI/UX refinements for ISO/IEC 42001, NIST AI RMF, and OWASP LLM Top 10 compliance
> **Version**: 3.0 (Security Standard Alignment)
> **Last Updated**: March 10, 2026
> **Priority**: High (Regulatory Compliance)

---

## 🎯 Executive Summary

This document outlines UI/UX refinements to align the AI Sandbox platform with:
- **ISO/IEC 42001** (AI Management System)
- **NIST AI RMF 1.0** (Risk Management Framework)
- **OWASP Top 10 for LLM Applications**
- **Indonesian PDP** (Personal Data Protection)

### Status Summary

| Standard | Current Status | Target | Priority |
|----------|----------------|--------|----------|
| **ISO/IEC 42001** | ⚠️ Partial | ✅ Full Alignment | High |
| **NIST AI RMF** | ✅ Strong | ✅ Maintain | Medium |
| **OWASP LLM Top 10** | ✅ Strong | ✅ Maintain | Medium |
| **PDP Compliance** | ⚠️ Partial | ✅ Full Alignment | High |

---

## 📋 Required UI/UX Refinements

### 1. ISO/IEC 42001 Alignment

#### 1.1 A.5 Impact Assessment (NEW Feature)

**Gap**: Formal "Impact Assessment" templates not integrated

**UI Refinement Required:**

**New Component**: `ImpactAssessmentForm`
- Location: `03_Frontend/src/components/model/ImpactAssessmentForm.tsx`
- Trigger: During model registration (after basic info)
- Fields:
  - Intended use case description
  - Affected user groups
  - Potential risks (high/medium/low)
  - Mitigation measures
  - Data sources used

**Implementation:**
```tsx
// Add to Add Model flow (after basic info step)
<Step id="impact-assessment" title="Impact Assessment">
  <ImpactAssessmentForm
    modelId={modelId}
    onSave={handleSaveImpact}
    required={true}
  />
</Step>

// Form fields
<ImpactAssessmentForm>
  <TextArea
    label="Intended Use Case"
    required
    helperText="Describe the specific context and purpose"
  />
  <MultiSelect
    label="Affected User Groups"
    options={['General Public', 'Employees', 'Customers', 'Minors', 'Vulnerable Groups']}
  />
  <RiskMatrix
    label="Potential Risks"
    categories={['Bias', 'Privacy', 'Security', 'Misuse']}
  />
  <TextArea
    label="Mitigation Measures"
    required
  />
  <Input
    label="Data Sources / Training Data"
    required
    helperText="List datasets used for training or fine-tuning"
  />
</ImpactAssessmentForm>
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/model/ImpactAssessmentForm.tsx` | ✅ CREATE NEW | High |
| `03_Frontend/src/app/[locale]/(internal)/models/new/page.tsx` | Add impact assessment step | High |
| `02_Product_UI/Design_System_Guide.md` | Document new component | Medium |

---

#### 1.2 A.6 AI System Lifecycle (Enhanced Audit Trail)

**Current**: `AuditTrailTimeline` shows decisions
**Enhancement**: Add lifecycle stage indicators

**UI Refinement:**

**Enhanced Component**: `LifecycleStageBadge`
- Shows current ISO 42001 lifecycle stage
- Stages: Design → Develop → Deploy → Operate → Monitor → Retire

**Implementation:**
```tsx
// Add to Model Detail page header
<LifecycleStageBadge stage={model.lifecycleStage} />

// Lifecycle stages mapping
const lifecycleStages = {
  draft: 'Design',
  validation_pending: 'Develop',
  endpoint_valid: 'Develop',
  assessment_completed: 'Verify',
  pending_review: 'Validate',
  approved: 'Deploy',
  published: 'Operate',
  restricted: 'Monitor',
  not_approved: 'Retire'
};
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/model/LifecycleStageBadge.tsx` | ✅ CREATE NEW | High |
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/page.tsx` | Add lifecycle badge | High |
| `03_Frontend/src/types/model.ts` | Add lifecycleStage field | High |

---

#### 1.3 A.8 Information for Interested Parties (Enhanced Transparency)

**Enhancement**: Add "Assurance Statement" section to public profiles

**UI Refinement:**

**New Section**: `AssuranceStatement`
- Location: Public model profile
- Shows: Assessment scope, standards applied, validity period

**Implementation:**
```tsx
// Add to public model profile page
<Card variant="outlined">
  <CardHeader>
    <h3>Assurance Statement</h3>
  </CardHeader>
  <CardBody>
    <div className="assurance-grid">
      <div className="assurance-item">
        <span className="label">Standards Applied:</span>
        <span className="value">ISO/IEC 42001 A.6, NIST AI RMF Measure</span>
      </div>
      <div className="assurance-item">
        <span className="label">Assessment Date:</span>
        <span className="value">{formatDate(assessmentDate)}</span>
      </div>
      <div className="assurance-item">
        <span className="label">Valid Until:</span>
        <span className="value">{formatDate(validUntil)}</span>
      </div>
      <div className="assurance-item">
        <span className="label">Assessor:</span>
        <span className="value">{assessorName}</span>
      </div>
    </div>
  </CardBody>
</Card>
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(public)/models/[id]/public/page.tsx` | Add assurance statement | Medium |
| `02_Product_UI/screens/Screen_Specs.md` | Update public profile spec | Low |

---

### 2. NIST AI RMF Alignment

#### 2.1 MEASURE Quadrant (Already Strong - Enhance Visualization)

**Enhancement**: Add NIST RMF mapping to scorecards

**UI Refinement:**

**New Component**: `NIST RMF Badge`
- Shows which RMF functions are covered
- Functions: MAP | MEASURE | MANAGE | GOVERN

**Implementation:**
```tsx
// Add to assessment results page
<NISTRMFMapping>
  <RMFBadge function="MAP" status="partial">
    Context awareness: {contextScore}%
  </RMFBadge>
  <RMFBadge function="MEASURE" status="strong">
    Metrics coverage: {measureScore}%
  </RMFBadge>
  <RMFBadge function="MANAGE" status="strong">
    Risk decisions: {manageScore}%
  </RMFBadge>
  <RMFBadge function="GOVERN" status="gap">
    Policy alignment: {governScore}%
  </RMFBadge>
</NISTRMFMapping>
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/score/NISTRMFMapping.tsx` | ✅ CREATE NEW | Medium |
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Add RMF mapping | Medium |

---

#### 2.2 MANAGE Quadrant (Enhance Decision Workflow)

**Enhancement**: Add risk treatment options to decision drawer

**UI Refinement:**

**Enhanced Component**: `DecisionDrawer` with risk treatment
- Add risk treatment field
- Link to specific controls from ISO 42001 Annex A

**Implementation:**
```tsx
// Enhance DecisionDrawer component
<DecisionDrawer>
  {/* Existing decision radio group */}
  <RadioGroup label="Decision" required>
    <Radio value="approve">Approve</Radio>
    <Radio value="approve_with_controls">Approve with Controls</Radio>
    <Radio value="restrict">Restrict</Radio>
    <Radio value="reassess">Reassessment Required</Radio>
    <Radio value="not_approve">Not Approved</Radio>
  </RadioGroup>

  {/* NEW: Risk Treatment */}
  <MultiSelect
    label="Risk Treatment (ISO 42001 A.9)"
    options={[
      'Apply Controls (A.9.1)',
      'Transfer Risk (A.9.2)',
      'Mitigate (A.9.3)',
      'Accept Risk (A.9.4)',
      'Avoid Risk (A.9.5)'
    ]}
    required
  />

  {/* Existing reason field */}
  <TextArea label="Decision Reason" required />
</DecisionDrawer>
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/review/DecisionDrawer.tsx` | Add risk treatment options | High |
| `03_QA_Docs/UIUX_QA_Documentation.md` | Update decision workflow | Medium |

---

### 3. OWASP LLM Top 10 Alignment

#### 3.1 Enhanced Findings Categorization

**Enhancement**: Map findings to OWASP LLM Top 10 categories

**UI Refinement:**

**Enhanced Component**: `FindingsAccordion` with OWASP tags
- Each finding shows OWASP LLM category
- Color-coded by severity

**Implementation:**
```tsx
// OWASP LLM Top 10 mapping
const owaspCategories = {
  'LLM01': 'Prompt Injection',
  'LLM02': 'Insecure Output Handling',
  'LLM03': 'Training & Data Poisoning',
  'LLM04': 'Model Denial of Service',
  'LLM05': 'Supply Chain Vulnerabilities',
  'LLM06': 'Sensitive Information Disclosure',
  'LLM07': 'Insecure Plugin Design',
  'LLM08': 'Excessive Agency',
  'LLM09': 'Overreliance',
  'LLM10': 'Model Theft'
};

// Add to each finding row
<FindingRow>
  <OWASPBadge category={finding.owaspCategory} />
  <SeverityIndicator level={finding.severity} />
  <FindingDescription text={finding.description} />
</FindingRow>
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/findings/FindingsAccordion.tsx` | Add OWASP category badges | High |
| `03_Frontend/src/components/findings/OWASPBadge.tsx` | ✅ CREATE NEW | High |
| `03_Frontend/src/types/run.ts` | Add owaspCategory field | High |

---

#### 3.2 Security Evidence Panel Enhancement

**Enhancement**: Add exploit chain visualization

**UI Refinement:**

**New Component**: `ExploitChainDiagram`
- Shows attack progression
- Maps to MITRE ATLAS framework

**Implementation:**
```tsx
// For critical/high severity findings
<ExploitChainDiagram>
  <Step number={1} title="Initial Access" status="compromised">
    Prompt injection via user input
  </Step>
  <Step number={2} title="Privilege Escalation" status="compromised">
    Jailbreak technique successful
  </Step>
  <Step number={3} title="Data Exfiltration" status="prevented">
    Sensitive data access blocked by guardrails
  </Step>
</ExploitChainDiagram>
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/findings/ExploitChainDiagram.tsx` | ✅ CREATE NEW | Medium |
| `03_Frontend/src/components/findings/EvidencePanel.tsx` | Add exploit chain view | Medium |

---

### 4. PDP (Personal Data Protection) Compliance

#### 4.1 Enhanced PII Masking

**Enhancement**: Automatic PII detection and masking in evidence panel

**UI Refinement:**

**Enhanced Component**: `EvidencePanel` with PII masking
- Auto-detect PII in prompts/responses
- Mask by default with option to reveal

**Implementation:**
```tsx
// PII detection and masking
const maskPII = (text: string) => {
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]')
    .replace(/\b\d{16,}\b/g, '[CARD_NUMBER]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]')
    .replace(/\b[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}\b/g, '[POSTAL_CODE]');
};

// In EvidencePanel
<EvidencePanel>
  <PIIMaskedText text={prompt} showRevealButton={true} />
  <PIIMaskedText text={response} showRevealButton={true} />
</EvidencePanel>
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/findings/EvidencePanel.tsx` | Add PII masking | High |
| `03_Frontend/src/components/findings/PIIMaskedText.tsx` | ✅ CREATE NEW | High |
| `03_Frontend/src/lib/piiDetector.ts` | ✅ CREATE NEW | High |

---

#### 4.2 Enhanced Access Control UI

**Enhancement**: Visual indicators for data access boundaries

**UI Refinement:**

**New Component**: `DataAccessBadge`
- Shows data classification level
- Color-coded by sensitivity

**Implementation:**
```tsx
// Data classification levels
const dataClassifications = {
  PUBLIC: { color: 'green', label: 'Public' },
  INTERNAL: { color: 'blue', label: 'Internal' },
  CONFIDENTIAL: { color: 'amber', label: 'Confidential' },
  RESTRICTED: { color: 'red', label: 'Restricted' }
};

// Add to model cards and detail pages
<DataAccessBadge classification={model.dataClassification} />
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/shared/DataAccessBadge.tsx` | ✅ CREATE NEW | Medium |
| `03_Frontend/src/components/model/ModelCard.tsx` | Add data classification | Medium |
| `03_Frontend/src/types/model.ts` | Add dataClassification field | Medium |

---

### 5. Audit Trail Enhancements

#### 5.1 Immutable Audit Log Export

**Enhancement**: Export audit trail as signed PDF

**UI Refinement:**

**New Feature**: Export audit trail button
- Location: Review detail page
- Format: PDF with digital signature
- Includes: All decisions, timestamps, actor names

**Implementation:**
```tsx
// Add to Review Detail page
<Button
  variant="outline"
  leftIcon={<Download />}
  onClick={handleExportAuditTrail}
>
  Export Audit Trail (PDF)
</Button>

// Export includes:
// - All decision events
// - Timestamps (ISO 8601)
// - Actor names and roles
// - Digital signature hash
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/review/AuditTrailTimeline.tsx` | Add export button | Medium |
| `03_Frontend/src/lib/auditExport.ts` | ✅ CREATE NEW | Medium |

---

#### 5.2 Versioned Benchmark Comparison

**Enhancement**: Side-by-side version comparison

**UI Refinement:**

**New Component**: `VersionComparisonView`
- Compare scores across benchmark versions
- Show delta indicators (↑ ↓ →)

**Implementation:**
```tsx
<VersionComparisonView>
  <ComparisonRow>
    <Label>Overall Score</Label>
    <Version v1={85} v2={82} />
    <Delta value={-3} trend="down" />
  </ComparisonRow>
  <ComparisonRow>
    <Label>Security</Label>
    <Version v1={90} v2={92} />
    <Delta value={+2} trend="up" />
  </ComparisonRow>
</VersionComparisonView>
```

**File Changes Required:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/score/VersionComparisonView.tsx` | ✅ CREATE NEW | Medium |
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/page.tsx` | Add comparison tab | Medium |

---

## 📁 Complete File Change Summary

### 🆕 New Components to Create

| Component | Location | Priority | Purpose |
|-----------|----------|----------|---------|
| `ImpactAssessmentForm.tsx` | `03_Frontend/src/components/model/` | High | ISO A.5 compliance |
| `LifecycleStageBadge.tsx` | `03_Frontend/src/components/model/` | High | ISO A.6 lifecycle |
| `NISTRMFMapping.tsx` | `03_Frontend/src/components/score/` | Medium | NIST RMF visualization |
| `OWASPBadge.tsx` | `03_Frontend/src/components/findings/` | High | OWASP categorization |
| `ExploitChainDiagram.tsx` | `03_Frontend/src/components/findings/` | Medium | Attack visualization |
| `PIIMaskedText.tsx` | `03_Frontend/src/components/findings/` | High | PDP compliance |
| `DataAccessBadge.tsx` | `03_Frontend/src/components/shared/` | Medium | Data classification |
| `VersionComparisonView.tsx` | `03_Frontend/src/components/score/` | Medium | Version delta |

### 📝 Files to Modify

| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/new/page.tsx` | Add impact assessment step | High |
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/page.tsx` | Add lifecycle badge, comparison tab | High |
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Add NIST RMF mapping | Medium |
| `03_Frontend/src/app/[locale]/(public)/models/[id]/public/page.tsx` | Add assurance statement | Medium |
| `03_Frontend/src/components/review/DecisionDrawer.tsx` | Add risk treatment options | High |
| `03_Frontend/src/components/findings/FindingsAccordion.tsx` | Add OWASP categories | High |
| `03_Frontend/src/components/findings/EvidencePanel.tsx` | Add PII masking, exploit chain | High |
| `03_Frontend/src/components/review/AuditTrailTimeline.tsx` | Add export button | Medium |
| `03_Frontend/src/types/model.ts` | Add lifecycleStage, dataClassification | High |
| `03_Frontend/src/types/run.ts` | Add owaspCategory field | High |

### 📚 Documentation to Update

| Document | Change | Priority |
|----------|--------|----------|
| `02_Product_UI/Design_System_Guide.md` | Document new components | Medium |
| `02_Product_UI/Color_Contrast_Guide.md` | Add security color guidance | Low |
| `03_QA_Docs/UIUX_QA_Documentation.md` | Add security checkpoints | High |
| `03_QA_Docs/Frontend_QA_Documentation.md` | Add technical checkpoints | High |
| `03_QA_Docs/FRONTEND_HANDOFF_COMPLETE.md` | Update with security features | Medium |

---

## ✅ Implementation Priority

### Phase 1: Critical Security (Week 1-2)
1. ✅ PII masking in evidence panel
2. ✅ OWASP category badges
3. ✅ Impact assessment form
4. ✅ Lifecycle stage badge

### Phase 2: Compliance (Week 3-4)
1. ✅ NIST RMF mapping
2. ✅ Enhanced decision drawer with risk treatment
3. ✅ Data access badges
4. ✅ Assurance statement

### Phase 3: Audit & Assurance (Week 5-6)
1. ✅ Audit trail export
2. ✅ Version comparison view
3. ✅ Exploit chain diagram
4. ✅ Full documentation update

---

## 📊 Compliance Status After Implementation

| Standard | Before | After |
|----------|--------|-------|
| **ISO/IEC 42001** | ⚠️ Partial | ✅ **Full Alignment** |
| **NIST AI RMF** | ✅ Strong | ✅ **Enhanced** |
| **OWASP LLM Top 10** | ✅ Strong | ✅ **Enhanced** |
| **PDP Compliance** | ⚠️ Partial | ✅ **Full Alignment** |

---

**For Frontend Agent**: Start with Phase 1 (Critical Security) components. All specifications are provided above with implementation examples.
