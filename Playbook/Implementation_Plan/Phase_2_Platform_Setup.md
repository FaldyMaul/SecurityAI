# Phase 2: Core Platform Setup & Tool Selection (Weeks 4-6)

## Objective
Transition from policy design to technical deployment. This phase focuses on building the underlying infrastructure for the "Testing Engine" and selecting the best-in-class automated assessment tools (open-source or commercially viable) to plug into the pipeline.

## Key Deliverables
1. **AI Control Plane & Gateway Reference Implementation**: Setup API proxies for model invocation (via Apilogy).
2. **AI Playground Environment**: A secure offline or heavily sandboxed environment (using Agentlab / Flowise OSS) for safe, rapid prototyping and destructive testing.
3. **Core Assessment Tools Integration**: Installation and basic configuration of chosen tools (e.g., Garak, PyRIT, Promptfoo, Giskard).
4. **"Golden Dataset" V1.0**: The first iteration of Telkom-specific testing prompts and expected ground-truth answers.

## Team Structure & Resource Allocation

*   **Infrastructure (Beno)**: *Role: Provision the necessary compute resources, configure network isolation for the AI Playground, and establish logging pipelines to Datadog.*
*   **AI Engineers (Dhiaul, Jabbar)**: *Role: Deploy the open-source testing frameworks (Promptfoo, Giskard). They will handle the technical integration connecting the assessment tools to the target models hosted on Apilogy.*
*   **Red Team (Dicky, Syarif, Wawan)**: *Role: Implement and tune adversarial prompt generation tools (Garak, PyRIT) to automate jailbreak attempts.*

### ⚠️ Projected Talent / Resource Needs
*   **Data Engineers / Curators**: Building a robust "Golden Dataset" requires high-quality, domain-specific data (e.g., Indonesian language nuances, Telkom internal policies). The team may need domain experts to curate and label this dataset effectively. Without accurate datasets, automated scoring (LLM-as-a-Judge) is unreliable.
*   **DevSecOps Engineer**: To ensure the Sandbox tools themselves are securely deployed and integrated into standard CI/CD pipelines without introducing new vulnerabilities.

## Implementation Steps

1.  **Deploy the AI Playground**:
    *   *Action*: Stand up isolated instances of Agentlab/Flowise. Ensure this environment cannot connect to production databases or external, non-whitelisted APIs.
2.  **Tool Setup & Configuration**:
    *   *Action*: Install PyRIT/Garak for security testing, and Promptfoo/Giskard for functional/bias testing. Create dedicated API keys for these tools to interact with Apilogy models.
3.  **Dataset Engineering**:
    *   *Action*: Curate 100-500 specific test cases covering: (a) Standard conversational queries, (b) Queries attempting to extract PII, (c) Queries containing culturally specific bias triggers.
4.  **Logging & Monitoring Setup**:
    *   *Action*: Push all prompt logs, model responses, and tool scores into Datadog for centralized viewing and baseline metric establishment.

## Verification & Review
*   Demonstrate a "mock" end-to-end automated API call where a test prompt is sent through the Gateway, processed by a model, and the interaction is successfully logged in Datadog.
