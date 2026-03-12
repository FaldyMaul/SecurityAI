# AI Sandbox – Security Standard Compliance Addendum (March 2026)

> **Purpose**: Security standard compliance checkpoints for UI/UX QA
> **References**: ISO/IEC 42001, NIST AI RMF 1.0, OWASP LLM Top 10, Indonesian PDP
> **Last Updated**: March 10, 2026
> **Priority**: High (Regulatory Compliance)

---

## 1. Compliance Status Summary

| Standard | Current Status | Target | Priority |
|----------|----------------|--------|----------|
| **ISO/IEC 42001** | ⚠️ Partial | ✅ Full Alignment | High |
| **NIST AI RMF 1.0** | ✅ Strong | ✅ Enhanced | Medium |
| **OWASP LLM Top 10** | ✅ Strong | ✅ Enhanced | Medium |
| **Indonesian PDP** | ⚠️ Partial | ✅ Full Alignment | High |

---

## 2. ISO/IEC 42001 Compliance Checkpoints

### 2.1 A.5 Impact Assessment

**Requirement**: Formal impact assessment before deployment

**UI Component**: `ImpactAssessmentForm` (NEW)

**Checkpoint Criteria:**
- [ ] Form displays during model registration
- [ ] All fields are mandatory
- [ ] Validation shows clear error messages
- [ ] Data persists with model record

**Fields Required:**
1. Intended use case description (required)
2. Affected user groups (multi-select)
3. Potential risks matrix (high/medium/low)
4. Mitigation measures (required)
5. Data sources / training data (required)

**QA Test:**
```
GIVEN: Model Owner is registering a new model
WHEN:  They reach the Impact Assessment step
THEN:  All 5 fields are visible and required
AND:   Form cannot be submitted with empty fields
```

---

### 2.2 A.6 AI System Lifecycle

**Requirement**: Traceable lifecycle stages

**UI Component**: `LifecycleStageBadge` (NEW)

**Checkpoint Criteria:**
- [ ] Badge visible on model detail page
- [ ] Stage updates automatically with status changes
- [ ] Color-coded by lifecycle phase

**Lifecycle Mapping:**
| Model Status | ISO Stage | Badge Color |
|--------------|-----------|-------------|
| `draft` | Design | Gray |
| `validation_pending` | Develop | Blue |
| `endpoint_valid` | Develop | Blue |
| `assessment_completed` | Verify | Purple |
| `pending_review` | Validate | Amber |
| `approved` | Deploy | Green |
| `published` | Operate | Green |
| `restricted` | Monitor | Red |
| `not_approved` | Retire | Gray |

**QA Test:**
```
GIVEN: Model is in "pending_review" status
WHEN:  Admin views model detail page
THEN:  Lifecycle badge shows "Validate" stage
AND:   Badge color is amber
```

---

### 2.3 A.8 Information for Interested Parties

**Requirement**: Transparency for external stakeholders

**UI Component**: `AssuranceStatement` (NEW)

**Checkpoint Criteria:**
- [ ] Displays on public model profile
- [ ] Shows assessment scope
- [ ] Shows standards applied
- [ ] Shows validity period
- [ ] Shows assessor name

**Content Required:**
```
Assurance Statement

Standards Applied: ISO/IEC 42001 A.6, NIST AI RMF Measure
Assessment Date: [Date]
Valid Until: [Date + 1 year]
Assessor: [Admin name]
Assessment Scope: [Packages tested]
```

**QA Test:**
```
GIVEN: Public viewer is on published model profile
WHEN:  They scroll to Assurance Statement section
THEN:  All 5 content items are visible
AND:   Information matches backend data
```

---

### 2.4 A.9 Risk Treatment

**Requirement**: Documented risk treatment decisions

**UI Component**: Enhanced `DecisionDrawer` (MODIFY)

**Checkpoint Criteria:**
- [ ] Risk treatment options visible
- [ ] At least one treatment must be selected
- [ ] Treatment links to ISO 42001 controls

**Risk Treatment Options:**
- Apply Controls (A.9.1)
- Transfer Risk (A.9.2)
- Mitigate (A.9.3)
- Accept Risk (A.9.4)
- Avoid Risk (A.9.5)

**QA Test:**
```
GIVEN: Admin is reviewing a model
WHEN:  They open Decision Drawer
THEN:  5 risk treatment options are visible
AND:   At least one must be selected before confirm
```

---

## 3. NIST AI RMF Compliance Checkpoints

### 3.1 MAP Quadrant

**Requirement**: Context awareness

**Status**: ✅ Complete

**Existing Features:**
- Model intended use case field
- Provider information
- Suitability tags

---

### 3.2 MEASURE Quadrant

**Requirement**: Quantitative and qualitative metrics

**UI Component**: `NISTRMFMapping` (NEW)

**Checkpoint Criteria:**
- [ ] Shows RMF function coverage
- [ ] Color-coded by strength (strong/partial/gap)
- [ ] Displays on assessment results page

**RMF Functions:**
| Function | Status | Color |
|----------|--------|-------|
| MAP | Partial | Amber |
| MEASURE | Strong | Green |
| MANAGE | Strong | Green |
| GOVERN | Gap | Red |

**QA Test:**
```
GIVEN: User views assessment results
WHEN:  They scroll to NIST RMF section
THEN:  4 function badges are visible
AND:   Colors match status (green/amber/red)
```

---

### 3.3 MANAGE Quadrant

**Requirement**: Risk management decisions

**UI Component**: Enhanced `DecisionDrawer` (MODIFY)

**Checkpoint Criteria:**
- [ ] Decision options map to risk treatment
- [ ] Reasons are mandatory for negative decisions
- [ ] Audit trail captures all decisions

**Decision → RMF Mapping:**
| Decision | RMF Function |
|----------|--------------|
| Approve | MANAGE-1 |
| Approve with Controls | MANAGE-2 |
| Restrict | MANAGE-3 |
| Reassessment Required | MANAGE-4 |
| Not Approved | MANAGE-5 |

---

## 4. OWASP LLM Top 10 Compliance Checkpoints

### 4.1 Findings Categorization

**Requirement**: Map vulnerabilities to OWASP categories

**UI Component**: `OWASPBadge` (NEW)

**Checkpoint Criteria:**
- [ ] Each finding shows OWASP category
- [ ] Badge displays category code (LLM01-LLM10)
- [ ] Tooltip shows category name

**OWASP Mapping:**
| Code | Category | Example Test |
|------|----------|--------------|
| LLM01 | Prompt Injection | Jailbreak attempts |
| LLM02 | Insecure Output Handling | XSS via model output |
| LLM03 | Training & Data Poisoning | Dataset manipulation |
| LLM04 | Model Denial of Service | Resource exhaustion |
| LLM05 | Supply Chain | Compromised dependencies |
| LLM06 | Sensitive Info Disclosure | PII leakage |
| LLM07 | Insecure Plugin Design | Auth bypass via plugin |
| LLM08 | Excessive Agency | Unauthorized actions |
| LLM09 | Overreliance | Blind trust in output |
| LLM10 | Model Theft | Model extraction attacks |

**QA Test:**
```
GIVEN: User views findings accordion
WHEN:  They expand a finding row
THEN:  OWASP badge is visible (e.g., "LLM01")
AND:   Hover shows "Prompt Injection"
```

---

### 4.2 Evidence Panel Enhancement

**Requirement**: Show attack progression

**UI Component**: `ExploitChainDiagram` (NEW)

**Checkpoint Criteria:**
- [ ] Shows attack steps for critical findings
- [ ] Maps to MITRE ATLAS framework
- [ ] Color-coded by compromise status

**Attack Chain Stages:**
1. Initial Access (compromised/prevented)
2. Privilege Escalation (compromised/prevented)
3. Data Exfiltration (compromised/prevented)

**QA Test:**
```
GIVEN: Critical severity finding is displayed
WHEN:  User clicks "View Attack Chain"
THEN:  3-stage diagram is visible
AND:   Each stage shows compromised/prevented status
```

---

## 5. PDP (Personal Data Protection) Compliance Checkpoints

### 5.1 PII Masking

**Requirement**: Automatic PII detection and masking

**UI Component**: `PIIMaskedText` (NEW)

**Checkpoint Criteria:**
- [ ] PII auto-detected in prompts/responses
- [ ] Masked by default
- [ ] Reveal button with confirmation
- [ ] Audit log captures reveal events

**PII Patterns to Detect:**
```regex
Email:      \b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b
Card:       \b\d{16,}\b
SSN:        \b\d{3}-\d{2}-\d{4}\b
Phone:      \b\d{3}[-.]?\d{3}[-.]?\d{4}\b
```

**QA Test:**
```
GIVEN: Evidence panel shows prompt with email
WHEN:  Panel loads
THEN:  Email is masked as "[EMAIL]"
AND:   "Reveal" button is visible
```

---

### 5.2 Data Classification

**Requirement**: Visual data access boundaries

**UI Component**: `DataAccessBadge` (NEW)

**Checkpoint Criteria:**
- [ ] Badge visible on model cards
- [ ] Color-coded by classification
- [ ] Tooltip explains classification

**Classification Levels:**
| Level | Color | Label | Access |
|-------|-------|-------|--------|
| PUBLIC | Green | Public | Everyone |
| INTERNAL | Blue | Internal | Auth users only |
| CONFIDENTIAL | Amber | Confidential | Admin + Owner |
| RESTRICTED | Red | Restricted | Admin only |

**QA Test:**
```
GIVEN: Model has "CONFIDENTIAL" classification
WHEN:  User views model card
THEN:  Amber badge shows "Confidential"
AND:   Non-admin users see access warning
```

---

### 5.3 Audit Trail Export

**Requirement**: Immutable audit log export

**UI Component**: Export button in `AuditTrailTimeline`

**Checkpoint Criteria:**
- [ ] Export button visible on review detail page
- [ ] PDF format with digital signature
- [ ] Includes all decision events
- [ ] Timestamps in ISO 8601 format

**Export Content:**
```
AI Sandbox Audit Trail
======================
Model: [Name]
Review ID: [ID]

Decision History:
-----------------
[ISO Timestamp] - [Actor] - [Decision] - [Reason]
[ISO Timestamp] - [Actor] - [Decision] - [Reason]

Digital Signature: [Hash]
```

**QA Test:**
```
GIVEN: Admin completed review decision
WHEN:  They click "Export Audit Trail"
THEN:  PDF downloads with all events
AND:   Digital signature hash is present
```

---

## 6. Implementation Priority Matrix

### Critical (Phase 1 - Week 1-2)
| ID | Component | Standard | Priority |
|----|-----------|----------|----------|
| SEC-01 | `PIIMaskedText` | PDP | Critical |
| SEC-02 | `OWASPBadge` | OWASP | Critical |
| SEC-03 | `ImpactAssessmentForm` | ISO A.5 | Critical |
| SEC-04 | `LifecycleStageBadge` | ISO A.6 | Critical |

### High (Phase 2 - Week 3-4)
| ID | Component | Standard | Priority |
|----|-----------|----------|----------|
| SEC-05 | `NISTRMFMapping` | NIST | High |
| SEC-06 | Enhanced `DecisionDrawer` | ISO A.9 | High |
| SEC-07 | `DataAccessBadge` | PDP | High |
| SEC-08 | `AssuranceStatement` | ISO A.8 | High |

### Medium (Phase 3 - Week 5-6)
| ID | Component | Standard | Priority |
|----|-----------|----------|----------|
| SEC-09 | Audit Trail Export | ISO A.6 | Medium |
| SEC-10 | `VersionComparisonView` | ISO A.6.2 | Medium |
| SEC-11 | `ExploitChainDiagram` | OWASP | Medium |

---

## 7. QA Sign-Off Checklist

### Before Phase 1 Release
- [ ] All Critical components implemented
- [ ] PII masking tested with real data
- [ ] OWASP categories map correctly
- [ ] Impact assessment form validates
- [ ] Lifecycle badge updates on status change

### Before Phase 2 Release
- [ ] All High components implemented
- [ ] NIST RMF mapping displays correctly
- [ ] Risk treatment options save properly
- [ ] Data classification badges visible
- [ ] Assurance statement shows on public profiles

### Before Phase 3 Release
- [ ] All Medium components implemented
- [ ] Audit export generates valid PDF
- [ ] Version comparison shows accurate deltas
- [ ] Exploit chain visualizes attacks
- [ ] Full documentation updated

---

**For QA Agent**: Use this document as the primary reference for security standard compliance testing. Each checkpoint has specific pass/fail criteria.

**For Frontend Agent**: Implement components in priority order (Critical → High → Medium). All specifications are provided in `Security_Standard_Refinement.md`.
