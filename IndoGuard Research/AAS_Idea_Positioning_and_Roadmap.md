# AAS Idea Positioning and Roadmap

## Recommended Thesis

Indonesia should not only adopt generative AI quickly; it must adopt it safely. The academically stronger contribution is not simply to "build a guardrail product", but to research and validate an Indonesian AI safety evaluation framework for sovereign AI systems: a method for classifying and auditing unsafe prompts and outputs in formal Bahasa Indonesia, informal Bahasa Indonesia, and adversarial code-switching contexts.

The practical long-term implementation can become an Indonesian AI Guardrail for Sovereign AI Infrastructure. However, the scholarship narrative should foreground the research problem first: how to evaluate and reduce localized AI safety failures in Indonesian-language generative AI systems without turning safety classification into opaque censorship.

This is a better scholarship topic than a broad "National AI Inference Platform" because it is:

- Specific enough to be credible.
- Directly connected to cyber security and strong institutions.
- Technically aligned with AI master's study.
- Close to the applicant's current work at Telkom.
- Relevant to Australia-Indonesia cooperation on cyber security, digital transformation, research, and institutional links.

## Positioning

Primary AAS field:

- Strong Institutions

Main focus area:

- Cyber security

Supporting focus areas:

- Misinformation and disinformation
- Research and innovation
- Digital transformation
- Democratic strengthening, if the essay discusses public-sector trust and information integrity

## Academic Research Problem

The proposal should be framed as a rigorous research inquiry before it becomes an engineering roadmap.

Possible research questions:

- How do global and regional AI safety classifiers perform on formal Bahasa Indonesia, informal Bahasa Indonesia, and Indo-English adversarial prompts?
- Which categories of harm are most frequently misclassified in Indonesian institutional contexts, such as personal data leakage, fraud enablement, prompt injection, and misinformation risk?
- How can an Indonesian safety taxonomy distinguish between harmful operational content and legitimate political, religious, cultural, or public-interest speech?
- What evaluation protocol can measure both safety performance and over-blocking risk across language registers?
- Can a compact guardrail model or classifier be calibrated to reduce false negatives on high-risk harms while limiting false positives on lawful expression?

Suggested academic outputs:

- A localized AI safety taxonomy for Indonesian public-sector and enterprise AI use.
- A human-verified evaluation dataset focused on formal Indonesian, informal Indonesian, and Indo-English code-switching.
- A small proof-of-concept using one regional language only if data and annotator access are realistic.
- A benchmark report comparing Llama Guard, SEA-Guard, and an adapted Indonesian classifier.
- An ethical governance model for human review, auditability, and appeal.

Useful evaluation methods:

- Precision, recall, F1, AUPRC, false positive rate, and false negative rate by harm category.
- Error analysis by language register: formal, informal, slang, and code-switching.
- Inter-annotator agreement for taxonomy reliability, such as Cohen's kappa or Krippendorff's alpha if appropriate.
- Calibration analysis to assess whether risk scores match real review outcomes.

## What The Guardrail Should Do

The guardrail should be presented first as a research prototype and evaluation framework. Later, it can be deployed as a safety layer around LLM systems in a sovereign AI platform, AI playground, AI sandbox, enterprise chatbot, government assistant, or public-service AI system.

Core functions:

- Pre-input moderation: detect harmful, manipulative, illegal, or risky user prompts.
- Output moderation: detect unsafe model outputs before they reach users.
- Prompt injection detection: identify attempts to override system instructions or extract hidden context.
- PII leakage detection: flag personal data exposure or sensitive-data disclosure.
- Fraud and scam detection: identify AI requests that support phishing, impersonation, illegal lending, fake investment, or social engineering.
- Misinformation risk scoring: flag claims or generated content that may require fact-checking in public-service contexts.
- Audit evidence: produce logs, risk categories, and human-review queues for accountable governance.

## Indonesia-Specific Taxonomy

Start from global AI safety categories, then adapt them to Indonesia's institutional and cultural context.

Recommended categories:

- Cyber abuse and hacking assistance
- Prompt injection and jailbreak attempts
- Personal data leakage and privacy violation
- Financial fraud, scams, illegal lending, and impersonation
- Misinformation and disinformation
- Hate speech and identity-based harm
- Religious and ethnic sensitivity
- Child online safety and sexual exploitation risk
- Extremism and violent radicalisation support
- Self-harm
- Illegal advice and regulated activities
- Election and public-service manipulation
- Culturally sensitive harm, including local customs and historical controversies

## Language Scope

Phase 1:

- Formal Bahasa Indonesia
- Informal Bahasa Indonesia
- Common internet slang
- Indo-English code-switching

Phase 2:

- One regional language as proof of concept, selected based on annotator access and public-sector need.

Phase 3:

- Additional regional languages only after the framework is validated and institutional partners can support human verification.

Reviewer warning:

- Do not promise Javanese, Sundanese, and Minangkabau coverage as a near-term deliverable.
- It is safer to say the master's research will focus on formal/informal Bahasa Indonesia and code-switching, with one regional language as a feasibility study.

## Censorship and Rights-Preserving Governance

This is a critical vulnerability. The application must not sound like a plan to automate state or corporate censorship.

Stronger framing:

- The guardrail is a risk triage and human-review system, not an automated punishment or takedown engine.
- "Misinformation risk" should mean "requires verification or review", not "must be suppressed."
- The taxonomy must separate clearly harmful operational content, such as phishing instructions or personal data leakage, from lawful opinion, criticism, political speech, religious discussion, and cultural debate.
- Human reviewers, not the model alone, should decide ambiguous or high-impact cases.
- The system should keep audit logs, explain category labels, and allow review or appeal in sensitive deployments.
- The research should explicitly test over-blocking and false positives, not only unsafe content detection.

Ethical frameworks to cite or use as intellectual anchors:

- UNESCO Recommendation on the Ethics of Artificial Intelligence: human rights, dignity, transparency, fairness, and human oversight.
- OECD AI Principles: human-centric AI, transparency, robustness, security, safety, and accountability.
- NIST AI Risk Management Framework: govern, map, measure, and manage AI risks across the AI lifecycle.

## Why The Applicant Is Credible

Use evidence from the CV, but write the final answer personally.

Strong personal fit:

- The applicant already leads AI and Security Platform work at Telkom Indonesia.
- The applicant is involved in AI Playground and National AI Inference Platform work.
- The applicant maintains a National AI Sandbox for vulnerability assessment, security risk, and governance compliance.
- The applicant served on a Personal Data Protection Law Task Force.
- The applicant has already built AI systems with measurable outcomes, including 35 percent improvement in talent mapping accuracy and 14 percent churn reduction.
- The applicant has led teams, built products, won an AI operational excellence award, and mentored more than 1,000 people.

Suggested personal positioning:

"I am not coming to Australia to start learning AI from zero. I am coming because my current work now touches national-scale AI infrastructure, and I have reached the limit of what engineering experience alone can responsibly solve. I can build pipelines and platforms, but I need deeper academic training in NLP, LLM evaluation, algorithmic auditing, and responsible AI governance to understand the safety blind spots before these systems affect Indonesian citizens."

## Why The Scholarship Is Necessary Despite Current Experience

This is the over-qualification risk. The essay must answer it directly.

Do not let the panel think:

- "He is already a team lead, so he does not need a master's."
- "Telkom can pay for this as corporate R&D."
- "This is just a product feature for his employer."

Stronger answer:

- The applicant's experience proves readiness to execute, not completeness of knowledge.
- The missing capability is academic depth: NLP safety evaluation, multilingual robustness, annotation methodology, algorithmic auditing, and ethics-based governance.
- The current work creates responsibility. Because the applicant is already close to national-scale AI deployment, the risk of shallow self-learning is higher, not lower.
- AAS is justified because the beneficiary is Indonesian institutions and citizens, while Telkom is only the first practical deployment environment.

## Why UTS First

UTS Master of Artificial Intelligence is the strongest first preference because it connects technical AI with applied project work and ethical deployment.

Useful UTS elements from `Course_UTS.md`:

- Natural Language Processing sub-major
- The Ethics of Data and AI
- Technology and Innovation Management
- Emerging Topics in Artificial Intelligence
- Advanced Data Analytics Algorithms
- Technology Research Preparation
- Industry Project or Research Project

How to connect it:

- NLP helps build Indonesian language safety classifiers.
- Ethics of Data and AI supports responsible deployment and public trust.
- Technology and Innovation Management helps translate research into an institutional product.
- Research/Industry Project can become a localized evaluation framework and research prototype for an Indonesian AI guardrail.

## Why RMIT Second

RMIT Master of Artificial Intelligence is a strong second preference because it supports deployable AI engineering and applied research.

Useful RMIT elements from `Course_RMIT.md`:

- The AI Professional
- Practical Data Science with Python
- Artificial Intelligence
- Intelligent Decision Making
- Deep Learning
- Computational Machine Learning
- AI Postgraduate Project or Minor Thesis
- Cloud Computing, Big Data Processing, Big Data Management, Agent-Oriented Programming

How to connect it:

- Deep Learning and Computational Machine Learning support model development.
- Project/research options support prototype development and evaluation.
- Cloud and big data options support scalable deployment.

## Return-To-Indonesia Roadmap

### Short term: 0-12 months after return

Goal: build an institutional research prototype and evaluation benchmark.

Actions:

- Return to Telkom's AI and Security Platform team.
- Form a small cross-functional task force across AI engineering, security, legal/compliance, and product.
- Adapt global and regional safety taxonomies into an Indonesia-specific taxonomy.
- Build an evaluation set using formal Indonesian, informal Indonesian, and Indo-English adversarial samples.
- Add one regional-language proof of concept only if native-speaker annotation is feasible.
- Test the research prototype in the existing AI Playground or National AI Sandbox.

Possible measurable targets:

- Research prototype tested on at least 5 high-priority safety categories.
- Evaluation set covers formal Indonesian, informal Indonesian, Indo-English code-switching, and optionally 1 regional-language proof of concept.
- Prototype evaluated in at least 1 controlled internal AI sandbox.

### Medium term: 1-3 years after return

Goal: translate the research prototype into controlled enterprise and public-sector AI safety pilots.

Actions:

- Integrate pre-input and output risk scoring into Telkom AI Playground or sovereign AI services under human-review rules.
- Create audit evidence for AI safety risk classification.
- Collaborate with Indonesian academic partners and Australian contacts for evaluation and peer review.
- Run responsible AI literacy sessions for engineers, product managers, and government-facing teams.

Possible measurable targets:

- Guardrail tested across 10-20 internal and government-facing AI use cases.
- At least 500 practitioners trained through workshops or internal enablement.
- Publish a technical white paper or benchmark report with academic partners.

### Long term: 3-5 years after return

Goal: contribute to a national AI safety ecosystem.

Actions:

- Expand regional-language coverage only through multi-institution, human-verified collaboration.
- Propose AI guardrail standards for government and SOE AI deployments.
- Build partnerships with BSSN, Komdigi, BRIN, INA Digital, Telkom, universities, and Australian alumni.
- Contribute to Indonesia-Australia collaboration on secure and responsible AI.

Possible measurable targets:

- Guardrail adopted as a reference layer in national or SOE AI infrastructure.
- Indonesian AI safety benchmark maintained with multi-institution contributors.
- Annual AI safety report or public-sector implementation guide published.

## Risks and Mitigation

Risk: limited high-quality local-language safety data.

Mitigation:

- Start with a narrow taxonomy.
- Use human-verified annotation with native speakers.
- Build from IndoSafety-style methodology, not blind machine translation.

Risk: model false positives could block legitimate public-service use.

Mitigation:

- Use risk scoring and human review instead of automatic blocking for sensitive categories.
- Evaluate false positive and false negative rates by language variety.

Risk: government or enterprise adoption is slow.

Mitigation:

- Begin inside Telkom AI Playground and National AI Sandbox.
- Produce measurable pilot outcomes before proposing broader adoption.

Risk: guardrail can be seen as censorship.

Mitigation:

- Anchor the design in rights-preserving AI governance, including UNESCO, OECD, and NIST risk-management principles.
- Treat ambiguous misinformation or cultural content as "review required", not "blocked".
- Include transparent taxonomy, audit trails, appeals/human review, and clear governance.
- Measure false positives and over-blocking as explicit research risks.

Risk: resource intensity.

Mitigation:

- Start with a compact classifier or fine-tuned open model.
- Use the master's capstone to produce a validated research prototype, not a full national system.

## Best One-Sentence Version

I want to research and validate an Indonesian AI safety evaluation framework for sovereign AI systems, so Indonesia can deploy generative AI in government and strategic industries without ignoring local-language cyber abuse, fraud, misinformation, data leakage, over-blocking, and culturally specific safety risks.
