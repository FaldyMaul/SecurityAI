# Function Breakdown: AI Sandbox Standards Mapping and Gap Analysis

## 1. Goal

Position the sandbox as an evidence and assurance system by mapping the current toolchain to `ISO/IEC 42001`, `NIST AI RMF`, and `OWASP LLM Top 10`, while showing the current gaps.

## 2. Assumptions

- Technical tooling can provide evidence, not full compliance.
- Coverage comes from combined tooling, workflow evidence, and documentation.
- AI Verify crosswalks are the baseline reference model.
- Governance, lifecycle, and supplier controls require non-tooling processes.

## 3. Scope

- Standards coverage mapping by framework and tool.
- Gap analysis for weak coverage areas.
- Recommended compliance roadmap for now, next, and later.

Out of scope:

- Certification-ready control implementation.
- Full policy authoring across the organization.
- Legal interpretation of every framework clause.

## 4. Risks

- Stakeholders overclaim compliance based on test outputs alone.
- Weak governance areas remain invisible because technical coverage looks strong.
- Tool-to-control mapping is not traceable enough for auditors.
- Gaps in third-party, policy, and resource controls remain unowned.

## 5. Subtasks

- Convert mapping into a control coverage matrix with evidence types.
- Identify mandatory non-technical controls needed beside the sandbox.
- Define which findings map to which framework statements.
- Prioritize the top gaps to close in MVP versus later phases.
- Create governance handoff points for policy and supplier management owners.

## 6. Subtasks for Product_UI (`02_Product_UI`)

- Design scorecard views that distinguish technical evidence from governance coverage.
- Add standards mapping labels and evidence references to findings views.
- Create reviewer screens for compliance-oriented drill-down, not just benchmark scores.

## 7. Subtasks for QA_Docs (`03_QA_Docs`)

- Produce the control-to-evidence traceability matrix.
- Document framework coverage caveats and non-coverage statements.
- Define audit evidence packaging for ISO, NIST, and OWASP references.
- Create review templates for gap acceptance or remediation tracking.
