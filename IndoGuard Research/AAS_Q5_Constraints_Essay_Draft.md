# AAS Q5 Essay Draft - Constraints

The first constraint is the scarcity of high-quality Indonesian adversarial safety data. Harmful prompts may appear in slang, mixed English-Indonesian, or regional linguistic context, and careless translation from English will miss local meaning. To manage this, I will restrict the initial scope to standardized and common colloquial Indonesian, using human-in-the-loop verification before any regional-language expansion.

The second constraint is over-blocking and censorship risk. A safety classifier can wrongly flag lawful discussion, especially in political, religious, or cultural topics. If designed poorly, a guardrail can damage trust instead of protecting users. I will design the system as risk triage, not automatic blocking. Ambiguous cases should go to human review, the taxonomy should be transparent, and evaluation must measure false positives as seriously as unsafe outputs. I will anchor this approach in UNESCO and OECD principles on transparency, accountability, and human oversight.

The third constraint is data access, privacy, and operational resources. Safety testing may require sensitive examples, secure infrastructure, and annotators who understand local context. I will use Telkom's controlled sandbox, anonymised or synthetic test cases where appropriate, and limited pilots before expanding.

The fourth constraint is institutional adoption. SOEs and government agencies may resist new AI cyber security protocols if they seem complex or unproven. I will first prove the concept inside Telkom's National AI Sandbox, generate clear evaluation data, and then use this evidence to engage BSSN, Komdigi, and relevant public-sector partners, framing the work as shared public value, not only as one organisation's internal product.
