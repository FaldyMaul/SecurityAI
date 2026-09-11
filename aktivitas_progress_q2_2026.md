# AKTIVITAS YANG DILAKUKAN (PROGRESS 100%)
**SESUAI DENGAN RENCANA PROGRAM RISK TREATMENT, TELAH DILAKUKAN KEGIATAN DAN ACTIVITY TREATMENT SEBAGAI BERIKUT:**

---

## 1. Deploy LiteLLM Proxy & Guardrails Setup (Completed: W3 Apr – W3 Jun)

**Eksekusi:**
- Melakukan instalasi dan deployment **LiteLLM Proxy** sebagai core API gateway untuk seluruh model AI internal. (Done: W3-W4 Apr)
- Mengkonfigurasi **29 guardrail content filter rules** pada LiteLLM gateway mencakup kategori Bias, Claims, Harmful Content, Safety, dan Prompt Injection. (Done: W1-W2 Jun)
- Melakukan konfigurasi bypass khusus pada endpoint evaluator langsung ke OpenAI API untuk menghindari interferensi guardrail proxy selama penilaian berlangsung. (Done: W3 Jun)

**Monitoring:** Memantau respons logging gateway terhadap error 403/405 dan memvalidasi stabilitas konektor kustom untuk menangkap pengecualian guardrail secara anggun. (Done: W3 Jun)

---

## 2. Eksplorasi AI Verify Moonshot & Standar Keamanan AI (Completed: W1 Apr – W2 Jun)

**Eksekusi:**
- Melakukan riset dan kajian standar keamanan internasional seperti **ISO 42001**, **NIST AI RMF**, serta draf **Perpres Etika AI** Kementerian Komdigi. (Done: W1-W2 Apr)
- Melakukan eksplorasi fungsionalitas dan uji coba framework **AI Verify Moonshot** (Singapore) sebagai assessment tool utama keamanan LLM. (Done: W3-W4 May)
- Merancang draf rekomendasi rancangan **Indonesia AI Sandbox** untuk adaptasi instrumen pengujian berbasis regulasi lokal Nusantara. (Done: W1-W2 Jun)

**Monitoring:** Menyusun dokumentasi gap analysis tata kelola keamanan AI terhadap framework kepatuhan global dan regulasi lokal. (Done: W2 Jun)

---

## 3. Deploy Model Gemma & Full Security Assessment (Completed: W1 May – W4 Jun)

**Eksekusi:**
- Melakukan deployment model baru **gemma-4-26B-A4B-it** pada gateway agar dapat terhubung dengan API internal. (Done: W1-W2 May)
- Melakukan setup **ModelHub** untuk registrasi, versioning, dan penyelarasan endpoint konektor model pada platform Sandbox. (Done: W4 May)
- Menjalankan komprehensif **Full Run security assessment** pada model Gemma dengan parser MCQ normalisasi untuk hasil akhir: Data Disclosure 100%, Adversarial Attacks 81%, dan Hallucination 88%. (Done: W3-W4 Jun)

**Monitoring:** Membandingkan database hasil run sebelum dan sesudah guardrails diaktifkan untuk memastikan metrik keamanan meningkat secara deterministik. (Done: W4 Jun)

---

## Plan

- **Q1 2026 [COMPLETED]:** Penyelesaian Initial Assessment model LLM Telkom AI, red-teaming dasar, dan perumusan root-cause dari baseline awal (evaluasi Adversarial & Hallucination).
- **Q2 2026 [COMPLETED]:** Eksplorasi standar keamanan AI, deployment LiteLLM & Gemma, eksplorasi AI Verify Moonshot, setup 29 guardrail rules, dan pelaksanaan full security assessment.
- **Q3 2026 [IN PROGRESS]:** Perluasan testbed AI Sandbox terhadap module Indonesian Fact dan Undesirable Content khusus lokal. Pengembangan pengujian hallucination berbasis RAG.
- **Q4 2026 [PLANNED]:** Final comprehensive testing terhadap release candidate model di platform Sandbox. Validasi ulang semua parameter untuk sertifikasi "Low Risk" (A).
