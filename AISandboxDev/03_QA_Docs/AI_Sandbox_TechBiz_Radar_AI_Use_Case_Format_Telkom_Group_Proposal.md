# AI-Powered Sandbox untuk Evaluasi Kualitas, Risiko, dan Kelayakan Model AI di Telkom Group

Nama Penulis - NIK  
Divisi: AI & Security Platform / Telkom AI Center of Excellence  
Kategori: AI Use Case  
Tags: #TechBizRadar2.0 #UseCaseTechBiz #AI

## 1. PERMASALAHAN ATAU KEBUTUHAN BISNIS

Telkom Group berada pada fase ketika penggunaan generative AI, Large Language Model (LLM), AI agent, dan otomasi berbasis AI mulai masuk ke berbagai proses bisnis. AI tidak lagi hanya menjadi eksperimen teknologi, tetapi mulai dipertimbangkan untuk mendukung layanan pelanggan, analisis dokumen, pencarian informasi, produktivitas internal, pengembangan solusi digital, dan potensi penawaran AI untuk pelanggan B2B.

Tren ini sejalan dengan perkembangan global. McKinsey dalam survei State of AI 2025 mencatat bahwa 88% responden melaporkan organisasinya telah menggunakan AI secara reguler di setidaknya satu fungsi bisnis, naik dari 78% setahun sebelumnya. Survei yang sama juga mencatat bahwa 62% responden menyatakan organisasinya setidaknya sudah bereksperimen dengan AI agent, terdiri dari 23% yang mulai melakukan scaling dan 39% yang masih berada pada tahap eksperimen [1]. Artinya, adopsi AI sudah bergerak cepat, tetapi banyak organisasi masih mencari cara agar penggunaan AI dapat diskalakan secara aman, terukur, dan dapat dikendalikan.

Di lingkungan enterprise seperti Telkom Group, tantangannya bukan lagi hanya mencari model AI yang paling pintar. Pertanyaan yang lebih penting adalah: model mana yang aman, relevan, efisien, konsisten, dan layak digunakan untuk konteks bisnis tertentu. Setiap model memiliki karakteristik berbeda dari sisi kualitas jawaban, latency, biaya, kemampuan bahasa, keamanan, risiko halusinasi, dan kepatuhan terhadap kebijakan internal.

Dalam praktiknya, pemilihan dan pengujian model AI masih berisiko dilakukan secara manual, berbeda antar-tim, dan sulit dibandingkan secara objektif. Satu tim bisa fokus pada kualitas jawaban, tim lain fokus pada biaya, sementara aspek seperti prompt injection, jailbreak, sensitive data leakage, toxic response, atau hallucination belum tentu diuji dengan standar yang sama. Model yang terlihat bagus pada demo belum tentu aman ketika dipakai dalam proses bisnis nyata atau saat menjadi komponen dari solusi AI untuk pelanggan.

Risiko ini juga memiliki implikasi finansial dan reputasi. IBM Cost of a Data Breach Report 2024 mencatat rata-rata biaya global insiden data breach mencapai USD 4,88 juta, naik sekitar 10% dari tahun sebelumnya [2]. Angka tersebut tidak berarti setiap risiko AI akan langsung menghasilkan kerugian sebesar itu, tetapi menunjukkan bahwa kegagalan pengelolaan data, keamanan, dan kontrol digital dapat berdampak material bagi organisasi enterprise.

Karena itu, Telkom Group membutuhkan mekanisme evaluasi model AI yang lebih terstruktur sebelum model direkomendasikan kepada unit bisnis, digunakan dalam solusi internal, atau menjadi bagian dari penawaran AI B2B. Mekanisme ini perlu menjawab kebutuhan operasional yang sangat praktis: model apa yang sudah diuji, skenario apa yang digunakan, risiko apa yang ditemukan, berapa skornya, apakah model layak digunakan, dan kontrol apa yang perlu ditambahkan sebelum masuk ke penggunaan lebih luas.

Dalam konteks ini, AI Center of Excellence dapat dipahami sebagai fungsi orkestrasi yang membantu menyatukan arah adopsi AI, praktik governance, standardisasi evaluasi, dan pembelajaran lintas unit. Perannya bukan hanya membuat solusi AI, tetapi membantu memastikan inisiatif AI memiliki guideline, guardrails, dan mekanisme evaluasi yang dapat digunakan bersama oleh unit bisnis, tim teknologi, security, dan product lifecycle.

## 2. SOLUSI AI YANG DIUSULKAN

Solusi yang diusulkan adalah AI-Powered Sandbox, yaitu lingkungan evaluasi terkendali yang menggunakan AI untuk membantu menilai kualitas, risiko, keamanan, biaya, dan kelayakan bisnis model AI sebelum model tersebut digunakan lebih luas. Solusi ini dapat menjadi bagian dari pilar guardrails, governance, dan security dalam pengelolaan AI Telkom Group.

AI Sandbox bukan sekadar checklist pengujian manual. AI Sandbox diposisikan sebagai AI-assisted decision-support system untuk membantu Telkom menentukan apakah sebuah model layak digunakan, perlu dibatasi, perlu diperbaiki, atau belum direkomendasikan. Dengan pendekatan ini, evaluasi model dapat bergerak dari trial-and-error menuju proses yang lebih measurable, repeatable, dan berbasis evidence.

Jenis AI dan automation yang digunakan dalam solusi ini dapat mencakup beberapa kemampuan:

- AI-assisted evaluation untuk menilai relevansi, kelengkapan, dan kualitas jawaban dengan pendekatan seperti LLM-as-a-judge yang tetap perlu dikontrol oleh rubric dan human review [9]
- classifier atau detector untuk mengenali prompt dan output berisiko
- security testing automation untuk prompt injection, jailbreak, data leakage, dan system prompt extraction
- scoring engine untuk menyusun quality score, risk level, business fit, dan cost-performance
- generative AI summarizer untuk membantu menyusun model card, ringkasan temuan, dan rekomendasi penggunaan
- human-in-the-loop review untuk keputusan berisiko tinggi atau hasil evaluasi yang ambigu

Alur kerja sederhana AI Sandbox adalah sebagai berikut:

1. Model candidate didaftarkan ke sistem dengan metadata, owner, endpoint, dan konteks penggunaan.
2. Sistem memvalidasi koneksi endpoint atau akses model.
3. Sandbox menjalankan benchmark dan skenario uji, misalnya prompt injection, data privacy, hallucination, safety, dan local context.
4. Model menghasilkan respons terhadap test prompt atau risk scenario.
5. AI evaluator dan scoring engine menilai respons berdasarkan rubric.
6. Sistem menyusun scorecard, risk level, daftar temuan, dan model card.
7. Reviewer melakukan human review untuk menentukan rekomendasi penggunaan.
8. Output evaluasi dapat digunakan oleh platform internal, katalog model perusahaan, tim product, atau unit bisnis sebagai dasar keputusan.

Pada tahap awal, pendekatan ini dapat dimulai dengan benchmark engine seperti AI Verify Project Moonshot untuk baseline evaluation [6]. Untuk pengembangan lanjutan, sandbox dapat diperluas dengan evaluasi aplikasi RAG atau AI agent, red-team testing, dan runtime guardrail melalui API gateway atau proxy layer seperti LiteLLM [7]. Riset internal juga perlu mengacu pada standar yang relevan seperti NIST AI Risk Management Framework, OWASP Top 10 for LLM Applications, ISO/IEC 42001, dan Undang-Undang Pelindungan Data Pribadi [3][4][5][8].

Nilai tambah dibanding pendekatan konvensional cukup jelas. Pada pendekatan manual, pengujian cenderung subjektif, tidak seragam, sulit dibandingkan, dan dokumentasinya tersebar. Dengan AI Sandbox, pengujian dapat menggunakan skenario yang reusable, hasilnya terdokumentasi, skor dapat dibandingkan antar-model atau antar-versi, dan rekomendasi lebih mudah dipahami oleh stakeholder non-teknis.

Prototype awal yang sudah disiapkan menunjukkan bentuk MVP yang realistis. Beberapa komponen dasar yang dapat menjadi fondasi adalah frontend berbasis web, backend API, model management, run lifecycle, score rendering, dan flow evaluasi berbasis benchmark. Pada validasi lokal, alur evaluasi sudah dapat menjalankan contoh benchmark prompt-injection dengan 100 item uji dan menghasilkan scorecard 4 kategori, walaupun penilaian inference model masih menggunakan simulasi evaluator. Artinya, fondasi workflow sudah dapat dibuktikan, tetapi masih perlu dilanjutkan ke integrasi model nyata dan pilot terbatas.

## 3. TARGET PENGGUNA / UNIT

Target pengguna utama AI Sandbox adalah pihak-pihak yang terlibat dalam pemilihan, pengujian, pengelolaan, dan persetujuan penggunaan model AI di Telkom Group.

Pengguna utama:

- Model owner atau model vendor internal yang ingin mendaftarkan model untuk dievaluasi.
- AI & Security Platform Team yang mengelola workflow evaluasi, endpoint, guardrails, dan integrasi teknis.
- Reviewer atau evaluator yang meninjau hasil benchmark, risiko, dan rekomendasi penggunaan.
- AI Center of Excellence sebagai fungsi orkestrasi standardisasi, pembelajaran lintas unit, dan governance AI.

Unit yang terdampak atau menerima manfaat:

- Unit bisnis yang ingin menggunakan AI untuk proses internal atau layanan pelanggan.
- Tim product dan digital service yang membutuhkan model AI yang aman dan sesuai use case.
- Tim security, risk, compliance, dan data protection yang membutuhkan visibility terhadap risiko AI.
- Tim platform yang mengelola katalog model, API, agent workflow, atau layanan AI internal.
- Manajemen yang membutuhkan ringkasan risiko dan kelayakan sebelum AI digunakan lebih luas.

Bagi unit bisnis, manfaat utama AI Sandbox adalah mendapatkan rekomendasi model yang lebih jelas: model mana yang cocok untuk use case tertentu, batasan apa yang perlu diperhatikan, dan risiko apa yang perlu dikontrol. Bagi tim security dan governance, sandbox membantu mendeteksi risiko lebih awal sebelum model dipakai dalam proses bisnis. Bagi manajemen, sandbox memberikan ringkasan yang lebih mudah dibaca dalam bentuk scorecard, model card, risk level, dan rekomendasi keputusan.

## 4. DAMPAK YANG DIHARAPKAN

Dampak utama yang diharapkan adalah meningkatnya kualitas pengambilan keputusan dalam adopsi AI. AI Sandbox membantu Telkom Group mengubah proses evaluasi model dari opini dan demo menjadi evidence-based discussion. Daripada hanya bertanya "model ini bagus atau tidak", stakeholder dapat melihat skor, kategori risiko, contoh kegagalan, riwayat pengujian, dan rekomendasi kontrol.

Secara kualitatif, dampak yang diharapkan meliputi:

- mengurangi trial-and-error dalam pemilihan model AI
- meningkatkan konsistensi standar evaluasi antar-unit
- mempercepat proses review awal sebelum model digunakan
- meningkatkan visibility terhadap risiko seperti prompt injection, hallucination, toxic response, dan sensitive data leakage
- membantu unit bisnis memilih model berdasarkan kualitas, risiko, biaya, dan kesesuaian use case
- mendukung tata kelola AI yang lebih terstruktur di lingkungan Telkom Group
- memperkuat kesiapan Telkom ketika membangun solusi AI untuk pelanggan B2B

Secara kuantitatif, dampak pada fase pilot sebaiknya diterjemahkan langsung ke target bisnis. Target ini bukan klaim hasil aktual, tetapi ukuran keberhasilan yang realistis untuk membuktikan value AI Sandbox:

| Dampak Bisnis | Target Pilot yang Diusulkan | Makna untuk Telkom Group |
|---|---:|---|
| Mengurangi risiko penggunaan AI tanpa review | 0 model AI pilot masuk rekomendasi penggunaan tanpa scorecard dan review | Tidak ada model yang langsung dipakai hanya karena demo terlihat bagus |
| Mengurangi exposure risiko data pribadi | 100% model pilot diuji terhadap skenario data privacy dan sensitive data leakage | Membantu mengurangi risiko pelanggaran data pribadi yang dalam UU PDP dapat dikenai denda administratif sampai 2% dari pendapatan atau penerimaan tahunan terhadap variabel pelanggaran [8] |
| Mempercepat keputusan awal pemilihan model | Scorecard awal tersedia dalam <= 1 hari kerja setelah model siap diuji | Unit bisnis tidak perlu menunggu evaluasi manual yang berulang antar-tim |
| Mengurangi duplikasi evaluasi manual | Target pengurangan 30-50% pengujian ulang untuk use case/model yang sama | Hasil evaluasi dapat digunakan ulang oleh tim product, security, dan business owner |
| Meningkatkan readiness solusi AI B2B | 1-2 solusi AI B2B pilot memiliki model card, risk summary, dan recommendation note | Proposal AI ke pelanggan lebih siap menjawab pertanyaan security, compliance, dan reliability |
| Memperkuat assurance dalam penjualan solusi AI | 100% solusi AI B2B pilot membawa evidence pack sederhana: scorecard, risk finding, dan control recommendation | AI Sandbox menjadi trust layer, bukan hanya internal testing tool |
| Mengurangi risiko temuan terlambat | Minimal 1 daftar finding risiko per model, termasuk pass/fail dan rekomendasi mitigasi | Risiko seperti prompt injection, hallucination, toxic output, atau data leakage dapat diketahui sebelum model dipakai |
| Meningkatkan governance visibility | 100% model pilot memiliki status recommended, limited use, reassessment required, atau not recommended | Manajemen mendapat bahasa keputusan yang lebih jelas, bukan hanya log teknis |

Dengan kata lain, target paling sederhana untuk pilot bukan "zero risk", karena risiko AI tidak mungkin dihilangkan sepenuhnya. Target yang lebih tepat adalah "zero unreviewed AI model" untuk model yang masuk proses rekomendasi. Untuk konteks B2B, value-nya bukan hanya mengurangi risiko internal, tetapi juga membuat solusi AI Telkom lebih mudah dipercaya karena memiliki evidence bahwa model sudah diuji, risikonya diketahui, dan kontrolnya direkomendasikan.

Dari sisi prototype, indikator awal yang sudah dapat dijadikan pembelajaran adalah terbentuknya alur model management, lifecycle pengujian dari queued ke running hingga completed, scorecard 4 kategori, dan perbaikan metadata hasil agar tanggal dan skor dapat dibaca konsisten. Ini belum berarti sistem siap produksi penuh, tetapi cukup untuk menunjukkan bahwa solusi dapat dikembangkan menjadi pilot internal yang lebih serius.

Dalam jangka menengah, AI Sandbox berpotensi menjadi trust preparation layer sebelum model AI masuk ke penggunaan luas. Output-nya dapat membantu menentukan apakah model masuk kategori recommended, limited use, reassessment required, atau not recommended. Empat label ini membuat hasil teknis lebih mudah diterjemahkan menjadi keputusan bisnis.

## 5. RENCANA IMPLEMENTASI

Implementasi AI Sandbox sebaiknya dilakukan bertahap agar risiko teknis, governance, dan adopsi pengguna dapat dikelola. Fokus awal bukan membangun sistem sertifikasi besar, tetapi membuktikan workflow yang sederhana: model dapat didaftarkan, diuji, menghasilkan scorecard, ditinjau reviewer, dan menghasilkan rekomendasi.

Kebutuhan data dan sistem awal:

- daftar model prioritas dan use case yang akan diuji
- metadata model, endpoint, owner, dan konteks penggunaan
- test prompt dan risk scenario untuk quality, safety, security, privacy, dan hallucination
- scoring rubric dan risk level definition
- backend API untuk model registration, benchmark run, result storage, dan run history
- frontend dashboard untuk model list, run lifecycle, scorecard, dan review
- benchmark engine seperti AI Verify Moonshot untuk baseline evaluation
- governance rule untuk review gate dan rekomendasi penggunaan

Pihak yang perlu dilibatkan:

- AI Center of Excellence untuk arah standar, prioritas use case, dan knowledge management
- AI & Security Platform Team untuk desain sistem dan integrasi teknis
- Security, risk, compliance, dan data protection untuk risk scenario dan control requirement
- Product lifecycle team untuk stage, ownership, dan release path
- Unit bisnis atau product owner sebagai pengguna hasil rekomendasi
- QA dan reviewer untuk validasi hasil evaluasi

Contoh timeline implementasi MVP:

| Tahap | Aktivitas | Estimasi Waktu | Output |
|---|---|---:|---|
| 1 | Identifikasi use case dan model prioritas | 1 minggu | Daftar model candidate, owner, dan konteks penggunaan |
| 2 | Penyusunan test prompt, risk scenario, dan scoring rubric | 2 minggu | Paket benchmark awal untuk quality, safety, privacy, dan security |
| 3 | Integrasi model melalui API atau endpoint gateway | 2 minggu | Koneksi model ke sandbox dan logging awal |
| 4 | Implementasi model management dan run lifecycle | 2 minggu | Model registration, run status, run history, dan result storage |
| 5 | Pengujian benchmark dan penyusunan scorecard | 2 minggu | Scorecard, risk level, category result, dan daftar temuan |
| 6 | Human review dan rekomendasi penggunaan | 1 minggu | Label rekomendasi: recommended, limited use, reassessment required, atau not recommended |
| 7 | Pilot internal dan refinement | 2 minggu | Feedback pilot, improvement backlog, dan readiness untuk integrasi lanjutan |

Total estimasi MVP adalah sekitar 12 minggu. Estimasi ini adalah rencana awal untuk pilot, bukan SLA final produksi. Setelah pilot stabil, pengembangan dapat dilanjutkan ke integrasi model inference nyata, history comparison, version comparison, automated model card, review gate yang lebih formal, dan integrasi bertahap ke platform internal lain.

Untuk menjaga keberhasilan implementasi, scope awal sebaiknya tetap sempit. AI Sandbox dapat dimulai dari satu atau dua model prioritas, satu benchmark package, empat dimensi risiko utama, dan satu alur review yang jelas. Setelah workflow terbukti, cakupan dapat diperluas ke model lain, skenario lokal Bahasa Indonesia, red-team testing, dan evaluasi AI agent atau RAG application.

## PENUTUP

AI Sandbox diusulkan sebagai fondasi praktis untuk membantu Telkom Group mengelola adopsi AI secara lebih aman, terukur, dan berbasis evidence. Nilainya bukan hanya pada kemampuan menjalankan benchmark, tetapi pada kemampuannya menghubungkan hasil teknis dengan keputusan bisnis: model mana yang layak digunakan, model mana yang perlu kontrol tambahan, dan model mana yang perlu diperbaiki sebelum digunakan oleh unit bisnis atau solusi pelanggan.

Dengan pendekatan bertahap, AI Sandbox dapat menjadi bagian dari pilar guardrails, governance, dan security dalam ekosistem AI Telkom Group. AI Center of Excellence dapat berperan sebagai pengorkestrasi standar dan pembelajaran lintas unit, sementara tim platform, security, product lifecycle, dan unit bisnis menjalankan proses evaluasi yang lebih konsisten. Ini menjadi langkah awal untuk bergerak dari trial-and-error AI adoption menuju trusted AI adoption.

## REFERENSI

[1] McKinsey & Company. "The State of AI in 2025: Agents, Innovation, and Transformation." 2025. https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai  
[2] IBM. "Cost of a Data Breach Report 2024." 2024. https://www.ibm.com/reports/data-breach  
[3] National Institute of Standards and Technology. "Artificial Intelligence Risk Management Framework (AI RMF 1.0)." https://www.nist.gov/itl/ai-risk-management-framework  
[4] International Organization for Standardization. "ISO/IEC 42001: Artificial intelligence management system." https://www.iso.org/standard/81230.html  
[5] OWASP Foundation. "OWASP Top 10 for Large Language Model Applications." https://owasp.org/www-project-top-10-for-large-language-model-applications/  
[6] AI Verify Foundation. "Project Moonshot." https://aiverifyfoundation.sg/project-moonshot/  
[7] LiteLLM. "LiteLLM Documentation and Proxy Guardrails." https://docs.litellm.ai/  
[8] Pemerintah Republik Indonesia. "Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi." https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022  
[9] Zheng, L. et al. "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena." arXiv, 2023. https://arxiv.org/abs/2306.05685
