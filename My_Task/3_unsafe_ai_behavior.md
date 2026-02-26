# Backlog #3: Define Unsafe AI Behavior

**Assignee**: AI Engineer & Compliance Team
**Status**: Draft

> **As Security & Compliance**
> I want to clearly define unsafe AI behavior
> So that runtime guardrails can prevent misuse when the AI system is deployed in production.

## ✅ Acceptance Criteria Status
- [x] Unsafe behavior definition document exists
- [x] Behavior categorized (Ethical / Security / Legal / Operational)
- [x] Each behavior has detection rule
- [x] Each behavior has response action
- [ ] Red team validates at least 5 scenarios (Pending PyRIT / Garak execution)

---

## 🏗️ Step 1: Behavior Identification Workshop

Based on the cross-functional workshop (Legal, Compliance & AI Engineering), the following key misuse scenarios were identified:

1. **Hate Speech & Discrimination**: Generating offensive, biased, or exclusionary language.
2. **Sensitive Data Disclosure**: Revealing restricted corporate information, PII, passwords.
3. **Hallucinated Official Statement**: Fabricating non-existent company policies or financial statements.
4. **Policy Bypass**: Utilizing explicit jailbreaks to override the system's operational constraints.
5. **Prompt Injection Exploitation**: Executing hidden malicious commands embedded in user-supplied documents.
6. **Unauthorized Data Retrieval**: Bypassing API Gateway constraints to view RAG context meant for other tenants.

---

## 📝 Step 2: Unsafe Behavior Categorization & Detailing

### 1. Hate Speech & Discrimination
*   **Target Category**: ⚖️ **Ethical / Legal**
*   **Behavior Description**: The AI generates slurs, biased stereotypes, or exclusionary language regarding protected groups.
*   **Detection Rule**: 
    - Keyword pattern: Hate speech dictionaries via Regex.
    - Contextual classifier rule: **Giskard** toxicity evaluation score > 0.8
*   **Response Action**: Block response; Alert / Alarm notification to moderation queue.
*   **Red Team Validation**: Giskard automated test suite injects demographic bias probes.

### 2. Sensitive Data Disclosure
*   **Target Category**: 🔒 **Security / Legal**
*   **Behavior Description**: The AI outputs user PII, internal passwords, or confidential trade secrets.
*   **Detection Rule**: 
    - Keyword pattern: Regex for KTP, Credit Cards, internal URIs.
    - Contextual classifier rule: **LLM Guard** deanonymization confidence > 0.85
*   **Response Action**: Mask response (redact entity); Log event to Datadog.
*   **Red Team Validation**: PyRIT attempts Training Data Reconstruction attacks.

### 3. Hallucinated Official Statement
*   **Target Category**: ⚙️ **Operational / Legal**
*   **Behavior Description**: The AI invents non-existent company policies, fake HR guidelines, or wrong financial data with high confidence.
*   **Detection Rule**: 
    - Contextual classifier rule: Grounding and hallucination evaluation via **LLM Guard** or **Giskard**.
    - Threshold score: RAG relevance score < 0.70 combined with high output assertion.
*   **Response Action**: Alert / Alarm notification (Flag as low confidence); Append disclaimer to user.
*   **Red Team Validation**: Giskard factual consistency probes.

### 4. Policy Bypass
*   **Target Category**: ⚙️ **Operational / Security**
*   **Behavior Description**: User attempts to use social engineering (e.g., "DAN" - Do Anything Now) to make the AI ignore safety rules.
*   **Detection Rule**: 
    - Keyword pattern: Match against known jailbreak payloads in **Garak** database.
    - Contextual classifier rule: Intent classification model detects adversarial framing.
*   **Response Action**: Block response; Log event to Datadog targeting User ID.
*   **Red Team Validation**: PyRIT adaptive multi-turn jailbreak attempts.

### 5. Prompt Injection Exploitation
*   **Target Category**: 🔒 **Security**
*   **Behavior Description**: Hidden instructions in ingested PDFs or malicious prompts that hijack the AI to perform unauthorized actions (e.g., sending emails).
*   **Detection Rule**: 
    - Contextual classifier rule: **LLM Guard** input scanner detects hidden commands (Prompt Injection heuristic).
    - Threshold score: Injection probability > 0.90
*   **Response Action**: Block response; Escalate to SecOps via Alarm notification.
*   **Red Team Validation**: Garak static prompt injection suites.

### 6. Unauthorized Data Retrieval
*   **Target Category**: 🔒 **Security / Legal**
*   **Behavior Description**: AI successfully queries the Vector DB for documents the user does not have Apilogy RBAC scopes to view.
*   **Detection Rule**: 
    - Detection logic: Token scope mismatch at the API Gateway (**LiteLLM / Apilogy**).
    - Threshold score: Binary (Access Denied).
*   **Response Action**: Block response; Log severity critical event to Datadog.
*   **Red Team Validation**: Manual Red Team verification simulating compromised tokens.

---

## 🔒 Step 3: Detection Logic & Response Strategy Implementation

### Global Detection Logic Overview
1.  **Keyword Patterns**: Executed directly at the **LiteLLM** proxy layer using fast regex matching to enable immediate query drops before incurring inference costs.
2.  **Contextual Classifier Rules**: Handled by **LLM Guard** acting as a real-time middleware interceptor immediately before and after the LLM call.
3.  **Threshold Scores**: Configured dynamically within LLM Guard and the UI Gateway. A hallucination score > 0.8 triggers a block, while > 0.6 triggers a warning.

### Response Strategy Overview
1.  **Block Response**: Instantly halts inference execution; returns strict HTTP 403 or generic "I cannot fulfill this request" error to the user interface.
2.  **Mask Response**: Uses the **Presidio** engine within **LLM Guard** to replace sensitive entities with placeholders (e.g., `[REDACTED_NIK]`) before the stream reaches the user.
3.  **Alert / Alarm Notification**: High-severity webhooks dispatched directly to the SecOps Slack/Teams channel and the Security Portal Dashboard.
4.  **Log Event to Datadog**: Asynchronous forwarding of the secure metadata payload (User Hash, Attempt Category, Latency) via the **LiteLLM** standard logging integration, guaranteeing no raw prompts are stored.
