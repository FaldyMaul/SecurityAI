# Moonshot End-to-End QA Testing Guideline

This document outlines a complete manual test plan to verify that all core Moonshot features are functioning correctly and that no backend dependency 500 errors remain.

## Prerequisites
1. Ensure your API server is running on `127.0.0.1:5000`:
   ```powershell
   .\venv_311\Scripts\activate
   python -m moonshot web-api
   ```
2. Ensure your Web UI is running on `localhost:3000`:
   ```powershell
   cd moonshot-ui
   npm run dev
   ```
3. Ensure `.env` in the `moonshot-install` directory contains your active `OPENAI_API_KEY`.

---

## 1. Verify Connectors & Endpoints
1. Open http://localhost:3000 in your browser.
2. Go to **Endpoints** in the sidebar.
3. Validate that the endpoint **`openai-gpt35-turbo`** exists.
   - **Expected Result:** The endpoint is listed clearly and is configured to use the `openai-connector` with the `gpt-3.5-turbo` model. (It will automatically pick up the token from your `.env`).

## 2. Verify Cookbooks, Recipes, and Metrics Loading
The biggest hurdle previously was the 500 Internal Server Errors crashing the application during metric loading.
1. Click on **Cookbooks** in the sidebar.
   - **Expected Result:** The list of Cookbooks should load completely without any blank pages or server crash popups.
2. Click on **Recipes** in the sidebar.
   - **Expected Result:** A list of predefined recipes (a combination of prompts and metrics) should load immediately.
3. Click on **Metrics** in the sidebar.
   - **Expected Result:** You should see all loaded metrics, including the heavy ones like `answer_relevancy` and `q16_metric` (which have now been successfully lazy-loaded/installed).

## 3. Red Teaming (Automated Attack Modules)
Verify the `tf-keras` fix for the Transformers pipeline and ensure the language model correctly answers prompts.
1. Click on **Red Teaming** in the sidebar.
2. Click **Start New Session**.
3. Create a session named "QA Test Session".
4. Select the **`openai-gpt35-turbo`** endpoint.
5. Once inside the session:
   - **Manual Chat:** Type a simple greeting ("Hello") into the chat bar and send it.
     - *Expected Result:* The model actively responds.
   - **Automated Attack:** Click on the attack modules button (usually labeled "Automated Red Teaming" or represented by an icon in the chat interface) and load the **`Toxic Sentence Generator` (`toxic_sentence_generator`)**.
   - Run the automated attack.
   - **Expected Result:** The attack module will execute multiple adversarial prompts. It should successfully finish (Status: COMPLETED) without any Transformers/Keras tracebacks.

## 4. Benchmarking (End-to-End Evaluation & Token Tracking)
Run a full benchmark testing run to aggregate evaluations and **track Token Usage**.
1. Go to **Benchmarks** in the sidebar.
2. Click **New Benchmark** or select a Cookbook to run (e.g., a lightweight Cookbook representing your use-case).
3. Select the **`openai-gpt35-turbo`** endpoint as the target to test.
4. Start the Benchmark Run.
   - **Expected Result:** The progress bar should track across the different prompts and evaluation metrics without stalling.
5. Once complete, click on the **Results / Report** page for the run.
6. **Verify Token Usage:**
   - Look closely at the generated report or the detailed JSON outputs in the UI.
   - **Expected Result:** The report displays the number of **Prompt Tokens** and **Completion Tokens** consumed during the benchmark, successfully aggregated from the OpenAI API responses.

---

### Request for QA Results
After completing this manual QA checklist, please provide the results. Specifically, I am looking for:
1. **Did the Cookbooks, Recipes, and Metrics all load without any 500 errors?**
2. **Did the Toxic Sentence Generator complete successfully during Red Teaming?**
3. **Were the `Prompt Tokens` and `Completion Tokens` correctly populated in the final Benchmark report?**
4. **Did you encounter any other lingering UI or API errors?**
