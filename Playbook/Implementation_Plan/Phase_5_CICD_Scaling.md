# Phase 5: Continuous CI/CD Integration & Scaling (Ongoing)

## Objective
Move the Sandbox from a pilot "gated" manual process into a fully automated, scalable security pipeline. This phase ensures that every change to an AI model (like a weight update, a new LoRA, or even a modified System Prompt) automatically triggers the testing suite before the update can be pushed to production.

## Key Deliverables
1. **Apilogy CI/CD Pipeline Integration**: The Sandbox is embedded into the standard Apilogy deployment workflow (e.g., using GitHub Actions, GitLab CI, or Jenkins).
2. **"Self-Serve" Testing API**: A documented toolkit allowing product teams to test their own models locally before formally submitting them to the National Sandbox.
3. **Advanced Threat Capability Updates**: Integration of complex testing modalities (e.g., Vision model testing, Audio Deepfake detection) beyond standard text LLMs.
4. **Automated Retraining Loop**: Establishing a mechanism where failed tests and novel jailbreaks are automatically added back into the Telkom "Golden Dataset" for future tests.

## Team Structure & Resource Allocation

*   **Infrastructure (Beno)**: *Role: Manage the CI/CD pipeline infrastructure and scale the compute resources (GPUs for testing) automatically based on Sandbox load.*
*   **AI Engineers (Dhiaul, Jabbar) & Data/AI PM (Faldy)**: *Role: Continually refine the automated testing scripts and manage the "Self-Serve" API documentation and support for internal Telkom development teams.*
*   **Scrum Master (Edo)**: *Role: Coordinate the sprint planning to onboard new business units and external government models into the automated Sandbox.*
*   **Red Team (Dicky, Syarif, Wawan)**: *Role: Research next-generation attacks (e.g., Data Poisoning via RAG, multi-modal prompt injections).*
*   **Blue Team (Ardy, Danar, Tyo, Fajar)**: *Role: Monitor the Assurance Dashboards across all deployed models and continuously update the Security Baseline as national regulations evolve.*

### ⚠️ Projected Talent / Resource Needs
*   **DevOps / MLOps Engineer**: Dedicated resources to manage the complex orchestration of spinning up model instances, running intensive tests via GPUs, collecting results, and tearing them down automatically within a CI/CD pipeline.
*   **Multi-Modal AI Specialist**: As the Sandbox expands to test Vision and Audio models (like Whisper V3 or text-to-image generators), engineers specialized in validating the safety of these specific data types will be required.

## Implementation Steps

1.  **CI/CD Pipeline Configuration**:
    *   *Action*: Infrastructure (Beno) configures the MLOps pipeline to trigger the Phase 2 testing scripts automatically off any "Commit" or "Pull Request" aimed at a production model registry in Apilogy.
2.  **Develop "Self-Serve" Tools**:
    *   *Action*: AI Engineers package a lightweight version of the Sandbox (e.g., a streamlined Promptfoo config and a PyRIT CLI tool) that developers can run locally on their laptops.
3.  **Establish Continuous Feedback Loop**:
    *   *Action*: When the Red Team discovers a novel jailbreak in the wild (or from a Bug Bounty program), they immediately add it to the central "Golden Dataset." This ensures all future CI/CD runs test against the new vulnerability.
4.  **Scale to Government & External Partners**:
    *   *Action*: PM (Faldy) and Management (Hadi/FAN) begin onboarding external models (e.g., from other State-Owned Enterprises or KOMINFO initiatives) into the automated Sandbox pipeline.

## Verification & Review
*   Demonstrate a fully automated MLOps workflow: A developer pushes a known-vulnerable prompt update to a staging model. The CI/CD pipeline automatically runs the Sandbox tests, flags the vulnerability, blocks the deployment, and immediately alerts the Blue Team via Slack/Datadog.
