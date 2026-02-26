# Phase 3: Pilot Assessment & Calibration (Weeks 7-9)

## Objective
Execute the first real-world tests using the newly deployed Sandbox Platform. This phase involves running select Telkom Apilogy models through the automated pipeline, performing manual red teaming to catch edge cases, and calibrating the automated scoring systems (LLM-as-a-Judge) using human expert feedback.

## Key Deliverables
1. **Pilot Assessment Reports**: Detailed technical findings from Sandbox runs on 2-3 priority models (e.g., Qwen 3 30B, Terra AI ID Check, Whisper V3).
2. **Red Teaming Pipeline & SOP**: Documented workflows for manual adversarial attacks that augment automated testing.
3. **LLM-Judge Calibration Matrix**: A mapping of automated test scores against human SME evaluations to tune the Sandbox's accuracy.
4. **Initial Guardrails / Mitigation Recommendations**: Practical prompt filtering or system prompt hardening strategies based on the vulnerabilities discovered.

## Team Structure & Resource Allocation

*   **Red Team (Dicky, Syarif, Wawan)**: *Role: Execute manual adversarial attacks (jailbreaks, prompt injections) that the automated tools missed. Document successful attack vectors.*
*   **Blue Team (Ardy, Danar, Tyo, Fajar)**: *Role: Act as Subject Matter Experts (SMEs). Review the outputs of both the automated tools (Garak/Giskard) and the manual Red Team attacks. Determine if the model's behavior violates the defined Security Baseline.*
*   **AI Engineers (Dhiaul, Jabbar)**: *Role: Adjust the LLM-Judge prompts and scoring logic based on the Blue Team's feedback. Implement the recommended Guardrails directly onto the Apilogy endpoints.*

### ⚠️ Projected Talent / Resource Needs
*   **Domain-Specific SMEs**: Assessing nuances like cultural bias or specialized legal/medical accuracy requires subject matter experts outside the core security team. Depending on the model being tested, temporary consultation with domain SMEs is necessary.
*   **Prompt Engineers**: To effectively write and tune the "System Prompts" and "Guardrail Prompts" required to fix the vulnerabilities found in the models.

## Implementation Steps

1.  **Select Pilot Candidates**:
    *   *Action*: Identify 2-3 diverse models currently hosted on Apilogy (e.g., one general LLM, one task-specific model like ID Check).
2.  **Execute Automated Testing Suite**:
    *   *Action*: Run the selected models through the full battery of automated tests (Promptfoo, PyRIT, Giskard) using the V1.0 Golden Dataset.
3.  **Conduct Manual Red Teaming**:
    *   *Action*: The Red Team attempts to bypass the model's safety filters using novel, undocumented techniques (especially Indonesian-language nuances).
4.  **HITL Calibration Session**:
    *   *Action*: The Blue Team compares the automated scores against the actual text outputs. If the automated tool flagged a safe response as "Toxic" (False Positive), the AI Engineers adjust the tool's scoring logic.
5.  **Develop Mitigation Strategies**:
    *   *Action*: Based on failures, devise practical fixes (e.g., updating the model's system prompt to explicitly refuse political queries, or adding an output filter regex for PII).

## Verification & Review
*   Present the "Pilot Assessment Reports" to the Security & AI Manager (FAN) to validate that the Sandbox is accurately identifying high-risk vulnerabilities without excessive false positives.
