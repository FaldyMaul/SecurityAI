# 4. Deployment & CI/CD Integration

The AI Sandbox requires tight integration with Telkom DDP's deployment pipelines. Manual execution of the sandbox evaluation suite does not scale and introduces human error.

## 4.1 The Automated Pipeline Workflow

Automation ensures that every model change, fine-tuning pass, or prompt tweak is instantly evaluated against the risk baselines. This creates a "Continuous Assurance" posture required by regulators.

The pipeline triggers automatically upon merging to an integration branch (e.g., in GitLab CI or GitHub Actions):

1.  **Code & Weights Update**: A developer updates the code or pushes a new fine-tuned model (e.g., Qwen 3).
2.  **Environment Provisioning**: The CI/CD system provisions a secure, ephemeral container within the Sandbox environment. This sandbox instance receives the new model isolated from production systems.
3.  **The Test Suite Kicks Off**:
    *   **Unit Tests (Component-level)**: Simple assertions to ensure Input Filters sanitize inputs correctly (e.g., dropping HTML tags).
    *   **Automated Red-Teaming (Garak)**: The pipeline executes a rapid vulnerability scan. If the *Jailbreak Success Rate* is > 0%, the build fails immediately.
    *   **Functional Benchmarking (Promptfoo)**: The model is run against the "Golden Dataset" stored in MLflow. The CI/CD pipeline asserts that the ROUGE score or "LLM-as-a-judge" accuracy score has not degraded from the previous version.
4.  **Reporting**: Log the evaluation metrics directly to the **Assurance Dashboard** (e.g., Datadog, Prometheus, or natively in MLflow/Giskard Hub).
5.  **Approval Gate**: If all automated tests pass, the run is flagged for review by the **Subject Matter Experts (SMEs) / Blue Team PIC**. They manually spot-check the 5% sample and provide the final sign-off.
6.  **Production Deployment (Apilogy)**: The validated model is deployed to the Apilogy gateway.

## 4.2 Infrastructure Requirements

To support this continuous evaluation pipeline, Telkom DDP must provision the following infrastructure:

*   **Compute (GPU/TPU)**: The Sandbox requires its own dedicated GPU hardware. Evaluating models (especially generating thousands of adversarial requests) is extremely compute-intensive.
*   **The Artifact Store (MLflow)**: All "Golden Datasets," previous model weights, and evaluation run logs must be securely stored and versioned.
*   **The Evaluation Engine (Giskard Hub & Promptfoo)**: Central services that orchestrate the execution of tests and manage the "Testing Libraries."
*   **Assurance Dashboard**: A visualization layer to display overall portfolio risk and compliance scores for executive review (e.g., an AI Verify deployment).

## 4.3 Version Control and Rollbacks

*   **Prompt Management**: Treat System Prompts as code. They must be version-controlled in the repository alongside application logic.
*   **Testing Suites**: The Red-Teaming "Attack Datasets" and functional "Golden Datasets" must also be versioned. A model might pass today but fail next month when a novel prompt injection technique is added to the Attack Dataset.
*   **Rollback Mechanism**: If the Assurance Dashboard detects live production drift or emerging toxicity post-deployment (via an AI Firewall), the CI/CD pipeline must be configured to seamlessly roll back the Apilogy endpoint to the previous known-safe version.

---
*End of Master Playbook.*
