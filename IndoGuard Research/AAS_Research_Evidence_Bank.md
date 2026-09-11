# AAS Research Evidence Bank

Topic: Indonesian AI Guardrail for Sovereign AI Infrastructure

Primary AAS alignment: Strong Institutions.

Specific focus areas: Cyber security, misinformation and disinformation, research and innovation, digital transformation.

## Core Argument

Indonesia is moving toward wider generative AI adoption in government, public services, state-owned enterprises, and strategic industries. The risk is not only whether Indonesia can build or use AI, but whether AI can be evaluated and governed safely in Bahasa Indonesia, informal Indonesian, and adversarial code-switching contexts. A nationally contextualised AI safety evaluation framework can help Indonesia understand where current guardrail models fail before public-sector and enterprise AI systems are deployed at scale.

This idea should be framed as:

Indonesian AI Safety Evaluation Framework for Sovereign AI Infrastructure

Avoid overclaiming:

- Do not say "no Indonesian AI safety model exists."
- Safer claim: "Existing safeguard models have started to support Indonesian, but Indonesia still needs a nationally contextualised guardrail aligned with local languages, institutional risk, regulation, fraud patterns, misinformation, and public-sector deployment needs."
- Do not present the master's work as a full national product rollout. Present it as a rigorous evaluation framework, taxonomy, dataset, and research prototype that can later inform deployment.

## Academic Reframing After Strict Review

The initial idea was too product-oriented. A stronger academic framing is:

"I want to investigate how Indonesian-language generative AI safety failures occur across formal, informal, and code-switched prompts, and develop an evaluation framework that can measure both unsafe-content detection and over-blocking risk in institutional AI systems."

Why this is stronger:

- It shows a research question, not just an implementation plan.
- It creates room for scholarly methods: dataset design, annotation reliability, model comparison, error analysis, calibration, and ethical governance.
- It addresses the censorship dilemma by measuring false positives and requiring human review.
- It makes the master's degree necessary because the applicant needs theoretical and methodological training, not only platform engineering experience.

## Why This Problem Is Urgent

### 1. Indonesia's cyber threat surface is already large

BSSN's 2024 cyber security landscape reported 330,527,636 traffic anomalies in Indonesia, including 26,771,610 phishing activities, 514,508 ransomware activities, and 2,487,041 APT activities. It also reported 241 suspected data breach incidents and more than 56 million data exposure findings affecting 461 Indonesian stakeholders.

Use in application:

- This supports the claim that cyber security in Indonesia is already operating at national scale.
- It also supports the need for preventive controls, not only incident response.
- AI guardrails can be positioned as one preventive layer for AI-enabled public and enterprise systems.

Source:

- BangkalanKab-CSIRT summary of BSSN Lanskap Keamanan Siber Indonesia 2024: https://csirt.bangkalankab.go.id/posts/lanskap-keamanan-siber-indonesia-tahun-2024
- BSSN report URL referenced in academic sources: https://www.bssn.go.id/wp-content/uploads/2025/02/LANSKAP-KEAMANAN-SIBER-2024-1.pdf

### 2. Online fraud and scams are severe public harms

OJK reported that from the launch of the Indonesia Anti-Scam Centre in November 2024 to 23 May 2025, IASC received 128,281 reports, involving 208,333 reported accounts, with total reported financial losses of IDR2.6 trillion and IDR163 billion of victim funds blocked.

Use in application:

- This is a concrete economic and social harm.
- Fraud and scams are relevant to AI guardrails because malicious actors can use generative AI for impersonation, phishing, social engineering, fake customer-service scripts, and automated fraud content.
- A Bahasa Indonesia safety model can help identify fraud-supporting prompts and unsafe outputs in local context.

Source:

- OJK International Information Hub, May 2025 Monthly Board of Commissioners Meeting: https://institute.ojk.go.id/iru/policy/detailpolicy/13725/the-financial-services-sector-stable-and-resilient-supporting-the-acceleration-of-national-economic-growth-monthly-board-of-commissioners-meeting-may-2025

### 3. Misinformation and disinformation remain a democratic risk

Australia Awards Indonesia lists "Misinformation and disinformation" under the Strong Institutions focus areas. DFAT also notes that Australia's Democratic Resilience Pilot Program in Indonesia promotes civil liberties and counters misinformation and disinformation.

Komdigi's 2024 performance report states that in 2024, 436 hoax contents were filtered and 423 counter-hoax contents were produced by Ditjen IKP channels. A Komdigi journal article on the 2024 presidential election also states that in early 2024 the Ministry handled 2,882 hoax contents spread on social media, including 203 election-related hoaxes.

Use in application:

- This links the idea to democratic strengthening and strong institutions.
- The guardrail is not a censorship tool. It should be framed as an institutional safety layer for AI deployments and risk triage, with human review and accountable governance.

Sources:

- Australia Awards Indonesia Priority Fields of Study: https://www.australiaawardsindonesia.org/content/33/12/priority-fields-of-study?sub=true
- DFAT Objective 3 Strong Institutions: https://www.dfat.gov.au/geo/indonesia/development-assistance/australia-partnership-indonesia/objective-3-strong-institutions-and-cross-cutting-priorities
- Komdigi LAKIP Ditjen IKP 2024: https://djkpm.komdigi.go.id/assets/files/laporan-kinerja-2024.pdf
- Komdigi journal article on 2024 election hoaxes: https://jkd.komdigi.go.id/index.php/jskm/article/download/5682/2094

### 4. Existing global guardrails have Indonesian-language gaps

Meta's Llama Guard 3-1B is designed for content safety classification in LLM inputs and outputs. Its model card lists supported languages as English, French, German, Hindi, Italian, Portuguese, Spanish, and Thai. Indonesian is not listed.

Use in application:

- This is strong evidence for a technical and linguistic gap.
- Phrase carefully: "a widely used global guardrail does not list Indonesian among supported languages."

Source:

- Meta Llama Guard 3-1B model card: https://huggingface.co/meta-llama/Llama-Guard-3-1B

### 5. Indonesia-specific AI safety research proves the local-language problem

The IndoSafety paper, published in EMNLP 2025, presents a human-verified safety evaluation dataset for the Indonesian context. It covers formal Indonesian, colloquial Indonesian, Javanese, Sundanese, and Minangkabau. The paper finds that Indonesian-centric LLMs often generate unsafe outputs, especially in colloquial and local-language settings.

Use in application:

- This proves the need is research-backed, not speculative.
- It also gives a credible starting point for a future research or capstone project.
- It should be cited as evidence that culturally grounded safety evaluation is needed.

Source:

- Azmi et al., "IndoSafety: Culturally Grounded Safety for LLMs in Indonesian Languages", ACL Anthology, EMNLP 2025: https://aclanthology.org/2025.emnlp-main.465/

### 6. Regional models exist, which makes the opportunity more precise

AI Singapore's SEA-Guard model card says the model is designed specifically for Southeast Asia and supports Burmese, English, Indonesian, Malay, Tagalog, Tamil, Thai, and Vietnamese. It also advises human oversight and secondary verification, because the model may hallucinate or produce ungrounded outputs.

Use in application:

- Do not ignore SEA-Guard. Mention it as evidence that regional AI safety is emerging.
- The opportunity is to build deeper Indonesian institutional adaptation: Indonesian legal context, public-sector risk taxonomies, local-language expansion, fraud patterns, child online safety, and SOE/government deployment needs.
- This should be framed as evaluation and adaptation, not claiming to invent a completely new category from nothing.

Sources:

- Qwen-SEA-Guard-8B model card: https://huggingface.co/aisingapore/Qwen-SEA-Guard-8B-2602
- SEA-Guard paper page: https://huggingface.co/papers/2602.01618

### 7. Ethical AI frameworks help avoid the censorship trap

The proposal must be anchored in rights-preserving AI governance, not only "safety" language.

Use in application:

- UNESCO's AI ethics recommendation emphasises human rights, dignity, transparency, fairness, and human oversight.
- OECD AI Principles emphasise human-centric AI, transparency, robustness, security, safety, and accountability.
- NIST AI RMF provides a practical risk-management cycle: govern, map, measure, and manage.
- These frameworks support a design where the model triages risk and supports review, rather than automatically suppressing speech.

Sources:

- UNESCO Recommendation on the Ethics of Artificial Intelligence: https://www.unesco.org/en/articles/recommendation-ethics-artificial-intelligence
- OECD AI Principles: https://www.oecd.org/en/topics/ai-principles.html
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework

### 8. Australia-Indonesia cooperation supports this direction

Australia Awards Indonesia states that priority fields align with the Australia-Indonesia Development Partnership Plan 2024-2028 and include Strong Institutions, with focus areas such as Cyber security, Misinformation and disinformation, and Research and innovation.

DFAT states that Australia and Indonesia recognise the importance of open, secure, stable, accessible, and peaceful cyberspace. A renewed MoU on Enhanced Cyber Security and Critical Technology Cooperation was signed in Jakarta on 20 August 2025.

Use in application:

- This shows the proposed study is not only personally relevant; it fits bilateral priorities.
- It also supports potential partnerships with Australian universities, Australian alumni, DFAT-linked programs, and Indonesian institutions.

Sources:

- Australia Awards Indonesia Priority Fields of Study: https://www.australiaawardsindonesia.org/content/33/12/priority-fields-of-study?sub=true
- DFAT Indonesia Country Brief: https://www.dfat.gov.au/geo/indonesia/indonesia-country-brief

### 9. UTS is the stronger first preference for this idea

UTS Master of Artificial Intelligence includes core AI and data analytics subjects, an NLP sub-major, The Ethics of Data and AI, Technology and Innovation Management, Technology Research Preparation, and either an Industry Project or Research Project.

Use in application:

- Connect UTS to the technical pieces: NLP, LLM evaluation, model safety classification, deployment, and evaluation.
- Connect UTS to the governance pieces: ethics of data and AI, stakeholder communication, and technology management.
- Position the capstone as an evaluation framework and research prototype for Indonesian AI safety, not simply a product MVP.

Sources:

- Local file: `Course_UTS.md`
- UTS course page: https://www.uts.edu.au/study/find-a-course/master-artificial-intelligence

### 10. RMIT is a credible second preference

RMIT Master of Artificial Intelligence includes Deep Learning, Computational Machine Learning, Intelligent Decision Making, AI Professional, Cloud Computing, Big Data, and a project or research stream.

Use in application:

- RMIT can be positioned as a second route to strengthen applied AI engineering and research capability.
- It is especially relevant for building deployable systems, not only research prototypes.

Sources:

- Local file: `Course_RMIT.md`
- RMIT course page: https://www.rmit.edu.au/study-with-us/levels-of-study/postgraduate-study/masters-by-coursework/master-of-artificial-intelligence-mc271

## Strongest Personal Evidence From CV

Use these as raw material. The final application should be written by the applicant.

- Current role: AI and Security Platform Team Lead at Telkom Indonesia.
- Leads AI Playground projects and National AI Inference Platform work as part of an AI Center of Excellence.
- Develops National AI Sandbox for testing, evaluation, vulnerability assessment, AI security risk, and governance compliance.
- Built AI-based talent matching system for BP BUMN, improving enterprise talent mapping accuracy by 35 percent.
- Served on the Personal Data Protection Law Task Force at Telkom.
- Led WAD, an AI product that won INAICA 2025 Operational Excellence Award.
- Reduced IndiHome churn by 14 percent using predictive modeling with 90 percent predictive accuracy.
- Built Inalyst, reached more than 1,000 active enterprise users and more than IDR1 billion recorded revenue.
- Mentored more than 1,000 students and professionals in data analytics and AI.

Reviewer warning:

- These achievements prove implementation credibility, but they can also create an over-qualification problem.
- The application should not sound like Telkom needs a sponsored product manager.
- The applicant should emphasise a technical and academic wall: engineering platforms is not the same as designing a validated, rights-preserving, multilingual AI safety evaluation method.
- Telkom should be framed as the first deployment environment; Indonesian citizens and institutions are the beneficiaries.

## Recommended Evidence-To-Claim Mapping

| Claim | Evidence |
|---|---|
| Indonesia needs AI safety as part of strong institutions | AAS priority fields include Strong Institutions, Cyber security, Misinformation and disinformation |
| The cyber risk is national scale | BSSN 330.5 million anomalies in 2024 |
| Fraud is harming citizens economically | OJK IASC IDR2.6 trillion reported losses by May 2025 |
| Local-language safety is a real research gap | IndoSafety findings on unsafe outputs in colloquial and local languages |
| Global guardrails are not enough | Llama Guard 3-1B does not list Indonesian as supported |
| Regional work exists but needs national adaptation | SEA-Guard supports Indonesian but advises oversight and is regional, not Indonesia-specific institutional deployment |
| Applicant can execute but still needs academic depth | Telkom AI Platform, National AI Sandbox, PDP Task Force, BUMN AI matching, WAD award, plus the stated gap in NLP safety evaluation and algorithmic auditing |
| Australia is the right study destination | Australia-Indonesia cyber MoU, AAS Strong Institutions focus, UTS NLP/ethics/project structure |

## Suggested Project Name Options

- IndoGuard AI: Indonesian AI Safety Guardrail for Sovereign AI
- Nusantara AI Guardrail
- Bahasa Indonesia AI Safety Guardrail
- Indonesian AI Guardrail for Sovereign AI Infrastructure

Most scholarship-friendly option after refinement:

Indonesian AI Safety Evaluation Framework for Sovereign AI Infrastructure
