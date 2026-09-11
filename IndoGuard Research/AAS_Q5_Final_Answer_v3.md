# AAS Q5 Final Answer v3 - Constraints

The first constraint is platform integration. AgentLab is meant to make AI development faster, so a safety checker cannot become heavy bureaucracy. To manage this, I will start with practical risk scoring, logs, and human review rather than automatic blocking. I will also measure both risky outputs and false positives, so the safety layer improves trust instead of slowing innovation.

The second constraint is confidential data. Real employee prompts or business use cases may contain sensitive information that cannot be freely used for research or benchmarking. I will use ModelHub and Telkom's controlled AI Playground environment, anonymised or synthetic test cases where appropriate, and limited pilots before any wider testing. This keeps privacy and security risks under control.

The third constraint is Indonesian annotation quality. Safety labels for slang, mixed Indonesian-English, and regional context need clear guidelines and local reviewers. I will begin with standard and common colloquial Indonesian, use human-in-the-loop verification, and expand only when reviewer quality is reliable.

The fourth constraint is over-blocking and censorship risk. A safety checker can wrongly flag lawful discussion. I will design it as risk triage, not automatic censorship, with transparent taxonomy, human review, and evaluation of false positives, guided by UNESCO and OECD principles.

The fifth constraint is adoption. Employees may avoid safety checks if they see them as friction. I will show practical value through AgentLab and ModelHub pilots, training, and simple guidance before proposing wider institutional use.
