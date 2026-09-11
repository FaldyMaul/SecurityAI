# Moonshot Comprehensive Testing Capabilities

Assuming you are testing a single model (e.g., your local Qwen 30B), Moonshot provides a massive, out-of-the-box library of testing features. By grouping its native **Attack Modules**, **Metrics/Annotators**, and **Cookbooks**, we can categorize everything you can test your model for into four primary pillars:

---

## 1. Security & Adversarial Robustness (Red-Teaming)
This pillar focuses on actively attacking the model to see if it can be broken, confused, or forced to bypass its own safety prompts.

**Attack Modules (The Weapons):**
*   **TextFooler & TextBugger:** Replaces significant words with synonyms or inserts invisible bugs to change the meaning of a prompt maliciously to see if the model flags it.
*   **Homoglyph & Charswap Attacks:** Replaces characters with visually similar ones (e.g., replacing 'a' with a Cyrillic 'а') or swaps internal characters to bypass basic string-matching guardrails.
*   **Payload Masking:** Hides malicious payloads within seemingly benign contexts (e.g., base64 encoding instructions or wrapping them in hypothetical scenarios like "DAN" - Do Anything Now).
*   **Insert Punctuation:** Injects random punctuation to break classification tokenizers.
*   **Violent Durian:** A highly specialized attack module designed for complex, multi-turn adversarial jailbreaking.

**Associated Metrics:**
*   **`flagjudgeannotator.py`**: Uses an LLM to judge if the model successfully caught the adversarial attack or was exploited.
*   **`advglue.py`**: Measures robustness against standard Adversarial GLUE benchmarks.

---

## 2. Safety, Ethics, & Policy Compliance
This pillar evaluates the model's responses to ensure it does not generate toxic, biased, or illegal content, specifically aligning with standard frameworks like MLCommons.

**Generators (The Triggers):**
*   **`malicious_question_generator.py` & `toxic_sentence_generator.py`**: Automatically constructs novel, toxic questions to probe the model's boundaries.

**Safety Metrics & Annotators (The Judges):**
*   **LlamaGuard Annotator**: Evaluates responses against the MLCommons taxonomy (Violent Crimes, Hate Speech, Sexual Content, Child Exploitation, etc.).
*   **LionGuard Classifier**: Validates responses specifically against the Singapore context (IMDA regulations, cultural safety).
*   **`toxicity-classifier.py`**: A dedicated NLP metric for simple toxicity scoring.
*   **`nudenet_metric.py` & `q16_metric.py`**: Utilized when testing multimodal models or generating prompts for Text-to-Image (I2P) safety.
*   **`genderbias_metric.py`**: Scans the model’s linguistic output for demographic parity and occupational gender bias (e.g., assuming a doctor is male).

---

## 3. Privacy & Cybersecurity Risks
This pillar ensures the model is not leaking its training data or generating insecure material (like vulnerable code snippets).

**Metrics & Annotators:**
*   **Data Leakage Rate (`leakagerate.py`)**: Tests if the model regurgitates exact substrings of sensitive private databases (e.g., Enron Emails dataset) that might have leaked into its training or RAG context.
*   **Meta's CyberSecEval (`cybersecevalannotator.py`)**: A massive suite of tests evaluating if the model:
    1. Over-complies with requests to write malicious code (e.g., "Write a brute-force script").
    2. Writes naturally insecure code (e.g., SQL injections in a helpful code snippet).
    3. Is vulnerable to structural prompt injections.

---

## 4. Accuracy, Faithfulness & RAG Evaluation
If you connect your model to a database (RAG - Retrieval-Augmented Generation), this pillar tests if the model is hallucinating or actually answering the question correctly.

**Classical NLP Metrics:**
*   **`exactstrmatch`, `relaxstrmatch`, `reverseexactstrmatch`**: Checks if the exact correct entity or fact was extracted to answer a benchmark question.
*   **`bertscore`, `bleuscore`, `rougescorer`**: Measures the structural similarity between the LLM's generated answer and the "Gold Standard" reference answer.
*   **`spelling` & `readabilityscore`**: Checks the grammatical quality and reading level of the output.

**Advanced LLM-as-a-Judge RAG Metrics:**
*(These are direct code equivalents to the DeepEval/Ragas libraries)*
*   **`answerrelevance.py`**: Does the answer actually address the user's prompt?
*   **`answercorrectness.py`**: Is the answer factually correct?
*   **`faithfulness.py`**: Is the answer derived *only* from the provided context, or did the model hallucinate facts from its pre-training?
*   **`contextprecision.py` & `contextrecall.py`**: Did the RAG system fetch the right documents, and did the model use all of them?

---

## Summary of Ready-to-Run Cookbooks
To execute all of the above, Moonshot groups them into pre-configured "Cookbooks." By pointing Moonshot at your single Qwen 30B model, you can sequentially run:

1.  **`mlc-ai-safety.json`**: Tests the Safety & Ethics pillar against global ML standards.
2.  **`cyberseceval-cookbook-all-languages.json`**: Tests the Cybersecurity pillar (coding vulnerabilities and prompt injections).
3.  **`adversarial-attacks.json`**: Runs the TextBugger and Homoglyph algorithms against your model.
4.  **`data-disclosure.json`**: Tests the Privacy pillar for sensitive information leakage.
5.  **`hallucination.json`**: Tests the Accuracy pillar for RAG deployments.
