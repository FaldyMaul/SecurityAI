# AI-Powered Sandbox untuk Evaluasi Kualitas, Risiko, dan Kelayakan Model AI di Telkom Group

Nama Penulis - NIK  
Divisi: AI & Security Platform / Telkom AI Center of Excellence  
Kategori: AI Use Case  
Tags: #TechBizRadar2.0 #UseCaseTechBiz #AI

## ABSTRAK

Adopsi generative AI di lingkungan enterprise membawa peluang besar bagi Telkom Group, tetapi juga menimbulkan kebutuhan baru untuk mengevaluasi model AI secara lebih terstruktur sebelum digunakan oleh unit bisnis atau menjadi bagian dari solusi AI untuk pelanggan B2B. Dalam praktik awal, pemilihan dan pengujian model masih berisiko dilakukan secara manual, berbeda antar-tim, dan sulit dibandingkan secara objektif. Kondisi ini menjadi penting karena model AI dapat memiliki risiko seperti halusinasi, prompt injection, respons tidak aman, kebocoran data sensitif, biaya tinggi, dan performa yang tidak konsisten. Artikel ini mengusulkan AI-Powered Sandbox sebagai lingkungan evaluasi terkendali yang menggunakan AI untuk membantu menilai kualitas, risiko, keamanan, biaya, dan kelayakan bisnis model AI. Solusi ini dapat menjadi bagian dari pilar guardrails, governance, dan security dalam pengelolaan AI Telkom Group. Pendekatan ini memanfaatkan benchmark terstruktur, AI-assisted evaluation, scorecard, model card, serta human-in-the-loop review. Pengembangan konsep dan prototype awal menunjukkan bahwa AI Sandbox dapat menjadi fondasi praktis untuk menstandarkan evaluasi model, meningkatkan visibilitas risiko, dan mendukung keputusan manajemen sebelum model digunakan lebih luas.

## KATA KUNCI

AI Sandbox, Evaluasi Model AI, Generative AI, Manajemen Risiko AI, Scorecard, Model Card, AI Governance

## 1. LATAR BELAKANG & KONTEKS KASUS

Telkom Group berada pada fase ketika penggunaan generative AI, Large Language Model (LLM), AI agent, dan otomasi berbasis AI mulai menjadi kebutuhan nyata di berbagai proses bisnis. AI tidak lagi hanya dilihat sebagai eksperimen teknologi, tetapi mulai dipertimbangkan untuk mendukung layanan pelanggan, analisis dokumen, pencarian informasi, produktivitas internal, hingga pengembangan solusi digital baru.

Konteks ini sejalan dengan tren global. McKinsey dalam survei State of AI 2025 mencatat bahwa 88% responden melaporkan organisasinya telah menggunakan AI secara reguler di setidaknya satu fungsi bisnis, naik dari 78% setahun sebelumnya. Survei yang sama juga mencatat bahwa 62% responden menyatakan organisasinya setidaknya sudah bereksperimen dengan AI agent, terdiri dari 23% yang mulai melakukan scaling dan 39% yang masih berada pada tahap eksperimen [1]. Artinya, AI sudah bergerak dari eksperimen terbatas menuju penggunaan operasional yang lebih luas, tetapi banyak organisasi masih menghadapi tantangan untuk melakukan scaling secara aman dan terukur.

Di sisi lain, semakin banyak model AI yang dapat digunakan, baik model internal, open-source, maupun layanan komersial. Setiap model memiliki karakteristik yang berbeda dari sisi kualitas jawaban, biaya, latency, keamanan, kemampuan bahasa, dan kesesuaian terhadap konteks bisnis Telkom. Model yang terlihat baik dalam demo belum tentu aman dan stabil saat dipakai dalam skenario enterprise.

Kondisi ini menimbulkan kebutuhan baru di lingkungan Telkom Group: perusahaan membutuhkan mekanisme untuk menilai model AI sebelum model tersebut direkomendasikan kepada unit bisnis, dipakai dalam solusi internal, atau menjadi bagian dari penawaran AI untuk pelanggan B2B. Evaluasi tidak cukup hanya melihat apakah model bisa menjawab pertanyaan. Evaluasi juga harus melihat apakah model aman, konsisten, sesuai kebutuhan, tidak mudah dimanipulasi, tidak membocorkan data sensitif, serta layak digunakan dari sisi biaya dan risiko.

Dalam konteks ini, AI Center of Excellence dapat dipahami sebagai fungsi orkestrasi yang membantu menyatukan arah adopsi AI, praktik governance, standardisasi evaluasi, dan pembelajaran lintas unit. Perannya bukan hanya membuat solusi AI, tetapi memastikan inisiatif AI memiliki guideline, guardrails, dan mekanisme evaluasi yang dapat digunakan bersama oleh unit bisnis, tim teknologi, security, dan product lifecycle.

Risiko ini juga punya implikasi finansial. IBM Cost of a Data Breach Report 2024 mencatat rata-rata biaya global insiden data breach mencapai USD 4,88 juta, naik sekitar 10% dari tahun sebelumnya [2]. Angka ini tidak berarti setiap risiko AI akan langsung menghasilkan kerugian sebesar itu, tetapi menunjukkan bahwa kegagalan pengelolaan data, keamanan, dan kontrol digital dapat berdampak sangat material bagi organisasi enterprise.

Kasus ini penting diangkat karena AI Sandbox dapat menjadi salah satu fondasi untuk membangun adopsi AI yang lebih terkendali di Telkom. Dengan adanya lingkungan evaluasi yang lebih terstruktur, Telkom dapat bergerak dari pendekatan trial-and-error menuju proses yang lebih measurable, repeatable, dan dapat dipertanggungjawabkan.

## 2. DESKRIPSI KASUS NYATA

Kasus ini berawal dari kebutuhan untuk membangun mekanisme evaluasi model AI di lingkungan Telkom Group. Dalam proses eksplorasi internal, terlihat bahwa adopsi AI membutuhkan lebih dari sekadar katalog model atau akses API. Perusahaan membutuhkan lapisan evaluasi yang dapat membantu menjawab apakah sebuah model layak digunakan untuk konteks tertentu, baik untuk kebutuhan internal maupun untuk solusi AI yang ditawarkan ke pelanggan enterprise.

Pada tahap awal, tim melakukan riset terhadap berbagai pendekatan dan tools untuk evaluasi AI, termasuk benchmark framework, security testing, guardrail, dan standar tata kelola AI. Riset internal juga mempertimbangkan kerangka seperti NIST AI Risk Management Framework, OWASP Top 10 for LLM Applications, ISO/IEC 42001, AI Verify Project Moonshot, serta kebutuhan lokal seperti privasi data, konteks Bahasa Indonesia, dan keselarasan dengan Undang-Undang Pelindungan Data Pribadi [3][4][5][6][8].

Berdasarkan riset tersebut, proposal AI Sandbox dirancang sebagai workspace internal untuk model registration, endpoint validation, benchmark execution, result review, scorecard, dan promotion eligibility. Dalam prototype MVP, beberapa bagian teknis awal juga disiapkan dan divalidasi, termasuk frontend berbasis web, backend API, model management, run lifecycle, score rendering, dan flow evaluasi berbasis benchmark. Setidaknya terdapat 4 workstream utama yang dibutuhkan dalam pengembangan awal: frontend, backend, AI engine, dan QA validation.

Pengembangan ini tidak langsung diarahkan menjadi sistem sertifikasi besar. Fokus awalnya adalah membangun alur praktis agar model dapat didaftarkan, diuji, menghasilkan skor, dan ditinjau oleh reviewer. Dengan demikian, AI Sandbox menjadi langkah awal untuk membangun evidence-based model evaluation, bukan sekadar portal atau checklist.

Pihak yang relevan dalam konteks ini meliputi AI Center of Excellence, AI & Security Platform Team, tim pengembang frontend, backend, AI engine, QA, serta stakeholder governance dan product lifecycle. Ruang lingkup kasus masih berada pada level proposal use case dan validasi prototype MVP internal, dengan rencana pengembangan lanjutan menuju integrasi model nyata, review gate, riwayat evaluasi, dan model card yang dapat digunakan platform internal lain.

## 3. ANALISIS PERMASALAHAN

Permasalahan utama yang ditemukan adalah belum adanya mekanisme evaluasi model AI yang cukup terstandar, terdokumentasi, dan mudah dibandingkan antar-model. Dalam kondisi ideal, setiap model AI yang akan digunakan oleh unit bisnis seharusnya memiliki hasil evaluasi yang jelas: kualitas jawaban, risiko keamanan, potensi kebocoran data, biaya penggunaan, batasan model, serta rekomendasi penggunaan.

Kondisi aktualnya, pengujian model berpotensi dilakukan secara berbeda oleh tiap tim. Ada tim yang fokus pada kualitas jawaban, ada yang lebih melihat kecepatan, ada yang hanya melihat demo, dan ada yang belum menguji aspek keamanan seperti prompt injection atau jailbreak. Akibatnya, keputusan penggunaan model dapat menjadi subjektif dan sulit dijadikan dasar manajemen.

Kesenjangan lain muncul pada aspek traceability. Jika hasil uji hanya tersimpan di catatan lokal atau dokumen terpisah, sulit untuk mengetahui model mana yang sudah diuji, skenario apa yang digunakan, risiko apa yang ditemukan, dan apakah model pernah diuji ulang setelah perbaikan. Padahal, untuk adopsi AI skala enterprise, riwayat evaluasi dan bukti teknis menjadi penting.

Akar penyebab dari masalah ini dapat diringkas menjadi beberapa hal:

- belum adanya scoring rubric yang seragam untuk model AI
- belum adanya workflow standar dari model registration hingga review
- evaluasi masih rentan dilakukan secara manual dan ad-hoc
- risiko LLM seperti prompt injection, hallucination, dan sensitive data leakage belum selalu diuji secara teknis
- hasil evaluasi belum selalu diterjemahkan menjadi rekomendasi bisnis yang mudah dipahami
- belum adanya penghubung yang kuat antara hasil teknis dan keputusan governance

Jika dibiarkan, masalah ini berpotensi menyebabkan tiga konsekuensi bisnis. Pertama, waktu evaluasi model menjadi lebih panjang karena pengujian berulang dilakukan oleh banyak tim. Kedua, risiko keamanan dan privasi baru terdeteksi setelah model dipakai dalam skenario nyata. Ketiga, manajemen tidak memiliki satu dashboard atau ringkasan risiko yang konsisten untuk membandingkan model dan mengambil keputusan.

Analisis ini menunjukkan bahwa masalahnya bukan hanya kebutuhan tools, tetapi kebutuhan proses end-to-end. Telkom membutuhkan sistem yang dapat menggabungkan evaluasi teknis, dokumentasi evidence, scoring, rekomendasi, dan review manusia dalam satu alur kerja yang jelas.

## 4. PENDEKATAN / SOLUSI

Pendekatan yang dilakukan adalah merancang AI-Powered Sandbox sebagai lingkungan evaluasi terkendali yang menggunakan AI untuk mengevaluasi model AI lain. Solusi ini dipilih karena kebutuhan Telkom bukan hanya menjalankan benchmark, tetapi membangun decision-support system yang dapat membantu model owner, reviewer, developer, dan manajemen memahami kelayakan sebuah model.

Secara konsep, AI Sandbox bekerja melalui beberapa lapisan. Pertama, model didaftarkan ke sistem dengan metadata dan endpoint yang relevan. Kedua, sistem memvalidasi koneksi model. Ketiga, benchmark atau skenario uji dijalankan untuk mengukur kualitas, risiko, keamanan, dan kesesuaian model. Keempat, hasil uji dinormalisasi menjadi scorecard, risk level, dan model card. Kelima, reviewer melakukan human-in-the-loop review untuk menentukan apakah model direkomendasikan, boleh digunakan terbatas, perlu perbaikan, atau belum direkomendasikan.

Untuk menjaga scope tetap realistis, solusi MVP dirancang dalam 7 tahap implementasi dengan estimasi sekitar 12 minggu: identifikasi model prioritas, penyusunan skenario uji, integrasi API, pengujian quality/safety/security/cost-performance, penyusunan scorecard, pilot internal, dan integrasi lanjutan ke platform internal. Angka ini bersifat estimasi implementasi MVP, bukan SLA final produksi.

AI berperan dalam proses ini melalui beberapa kemampuan:

- AI-assisted evaluation untuk menilai relevansi, kelengkapan, dan kualitas jawaban dengan pendekatan seperti LLM-as-a-judge yang tetap perlu dikontrol oleh rubric dan human review [9]
- detector atau classifier untuk mengenali prompt dan output berisiko
- security testing automation untuk prompt injection, jailbreak, data leakage, dan system prompt extraction
- scoring engine untuk menyusun quality score, risk level, dan business fit
- generative AI summarizer untuk membuat model card dan rekomendasi penggunaan

Pada tahap awal, pendekatan ini dapat dimulai dengan benchmark engine seperti AI Verify Project Moonshot untuk baseline evaluation [6]. Untuk pengembangan lanjutan, sandbox dapat diperluas dengan evaluasi aplikasi RAG atau AI agent, red-team testing, dan runtime guardrail melalui API gateway atau proxy layer seperti LiteLLM [7]. Namun, prinsip yang digunakan adalah tidak mengintegrasikan terlalu banyak tools sekaligus sebelum workflow MVP stabil.

Dalam prototype internal, beberapa komponen MVP telah mulai dibangun dan divalidasi sebagai pembuktian awal. Model management sudah diarahkan agar model dapat disimpan melalui UI dan tampil di list berbasis data backend. Lifecycle pengujian juga sudah divalidasi dari status queued, running, hingga completed. Score rendering dan metadata tanggal juga sudah diperbaiki agar hasil evaluasi lebih konsisten dibaca oleh pengguna.

Secara struktur output, MVP diarahkan menghasilkan minimal 4 bentuk informasi yang mudah dipakai stakeholder: scorecard, daftar temuan risiko, model card, dan rekomendasi keputusan. Pada baseline awal, scorecard juga dapat disusun ke dalam 4 dimensi risiko utama: adversarial attack, data privacy, safety atau undesirable content, serta hallucination atau truthfulness. Dari sisi keputusan, rekomendasi dapat disederhanakan menjadi 4 label awal: recommended, limited use, reassessment required, atau not recommended. Penyederhanaan ini penting agar hasil teknis tidak berhenti sebagai log, tetapi menjadi guidance bisnis.

Tantangan yang muncul selama implementasi awal adalah menjaga agar solusi tetap realistis. Beberapa komponen evaluasi masih berada pada tahap simulasi atau rencana pengembangan, sehingga klaim produk harus dijaga agar tidak terlihat seperti sistem yang sudah menjamin keamanan atau sertifikasi penuh. Tantangan lain adalah memastikan istilah dan output teknis dapat dipahami oleh stakeholder non-teknis.

Untuk mengatasi hal tersebut, pendekatan pengembangan dibuat bertahap. MVP difokuskan pada alur model registration, benchmark run, scorecard, dan review. Setelah itu, pengembangan dapat diperluas ke integration dengan inference model nyata, history comparison, review gate, governance workflow, dan model card yang dapat dikonsumsi platform internal lain.

## 5. HASIL DAN INSIGHT

Hasil utama dari eksplorasi dan prototype awal adalah terbentuknya arah produk yang lebih jelas: AI Sandbox bukan sekadar testing environment, tetapi trust preparation layer untuk membantu Telkom mengevaluasi model sebelum digunakan lebih luas. Prototype MVP juga menunjukkan bahwa workflow dasar dapat dibangun secara bertahap melalui integrasi frontend, backend, dan AI evaluation layer.

Secara internal, validasi awal MVP telah mencakup beberapa area yang dapat dijadikan indikator kemajuan. Model management sudah divalidasi untuk pembuatan model dan fallback saat backend tidak tersedia. Lifecycle run sudah divalidasi dari antrean ke proses berjalan hingga selesai. Score rendering dan metadata tanggal juga sudah diperbaiki agar tidak menampilkan hasil kosong atau tanggal fallback. Pada validasi lokal, alur evaluasi sudah dapat menjalankan contoh benchmark prompt-injection dengan 100 item uji dan menghasilkan scorecard 4 kategori, walaupun penilaian inference model masih menggunakan simulasi evaluator. Ini belum berarti platform siap produksi penuh, tetapi menunjukkan bahwa komponen dasar untuk alur evaluasi sudah mulai terbentuk.

Beberapa hasil dan pembelajaran yang diperoleh antara lain:

- model management perlu menjadi bagian awal dari sandbox, karena evaluasi tidak bisa dilakukan tanpa registry model yang jelas
- lifecycle pengujian harus transparan agar pengguna tahu apakah model masih queued, running, atau sudah selesai dievaluasi
- scorecard harus memiliki bentuk yang konsisten agar tidak membingungkan pengguna
- hasil teknis perlu diterjemahkan menjadi rekomendasi bisnis seperti recommended, limited use, reassessment required, atau not recommended
- fallback dan recovery system penting untuk menjaga usability saat backend belum stabil
- AI Sandbox harus tetap memiliki human review karena tidak semua keputusan risiko bisa diserahkan ke automation

Insight penting lainnya adalah bahwa evaluasi model AI harus diperlakukan sebagai proses berulang, bukan aktivitas satu kali. Model dapat berubah, prompt dapat berubah, data dapat berubah, dan risiko dapat muncul setelah model digunakan dalam konteks baru. Karena itu, history, version comparison, dan retesting menjadi kebutuhan penting dalam roadmap berikutnya.

Dari sisi bisnis, insight paling kuat adalah bahwa AI Sandbox membantu mengubah diskusi model dari opini menjadi evidence-based discussion. Daripada bertanya "model ini bagus atau tidak", tim dapat melihat kategori skor, contoh kegagalan, risiko utama, dan rekomendasi kontrol. Ini membuat pembahasan antara tim teknis, governance, dan manajemen menjadi lebih konkret.

Dengan pendekatan ini, impact yang dapat diformulasikan untuk fase berikutnya adalah pengurangan effort evaluasi manual, peningkatan konsistensi keputusan, dan peningkatan visibility risiko. Untuk menjaga akurasi, impact tersebut sebaiknya diukur melalui baseline pilot, misalnya rata-rata waktu evaluasi per model sebelum dan sesudah sandbox, jumlah skenario risiko yang diuji, jumlah model yang memiliki scorecard, jumlah temuan risiko yang terdeteksi sebelum production use, serta jumlah rekomendasi model yang dapat digunakan ulang oleh unit lain.

## 6. REKOMENDASI

Pengembangan AI Sandbox perlu dilanjutkan secara bertahap dengan fokus pada nilai bisnis dan kesiapan governance. Rekomendasi utama adalah memperkuat MVP agar siap digunakan sebagai pilot internal di lingkungan Telkom Group, terutama sebagai calon pilar guardrails, governance, dan security untuk evaluasi model AI sebelum diperluas ke banyak model atau unit.

Rekomendasi pengembangan berikutnya:

- menyelesaikan integrasi dengan model inference nyata agar evaluasi tidak hanya berbasis simulasi
- memperkuat review gate agar benchmark completed tidak langsung dianggap approved
- membangun history dan comparison agar hasil model dapat dibandingkan antar-versi atau antar-run
- menyusun scoring rubric yang mudah dipahami oleh manajemen dan unit bisnis
- mengembangkan model card sebagai output standar untuk katalog model perusahaan
- menambahkan risk scenario lokal seperti Bahasa Indonesia, SARA, data pribadi, dan konteks regulasi Indonesia
- menjaga human-in-the-loop review untuk keputusan berisiko tinggi
- menghubungkan hasil sandbox dengan platform internal lain secara bertahap setelah output review stabil

Untuk membuat impact lebih terukur, pilot berikutnya sebaiknya menetapkan KPI awal. Contoh KPI yang realistis adalah jumlah model yang dievaluasi, jumlah risk scenario per benchmark package, waktu rata-rata dari model registration sampai scorecard, persentase model yang membutuhkan reassessment, jumlah temuan high-risk yang terdeteksi sebelum penggunaan bisnis, dan jumlah model card yang dapat digunakan ulang oleh tim pengembang.

Jika solusi serupa ingin diterapkan pada konteks lain, hal yang perlu diperhatikan adalah pemilihan scope. AI Sandbox sebaiknya tidak dimulai sebagai platform besar dengan semua tools sekaligus. Lebih baik dimulai dari satu model prioritas, satu benchmark package, satu scoring model, dan satu alur review yang jelas. Setelah itu, cakupan dapat diperluas berdasarkan kebutuhan nyata.

Selain itu, dukungan dari tim governance dan product lifecycle sangat penting. Governance diperlukan untuk menetapkan rule dan control, sedangkan product lifecycle diperlukan untuk menetapkan stage, ownership, dan release path. Tanpa dua dukungan ini, sandbox berisiko menjadi tools teknis yang kuat tetapi belum sepenuhnya masuk ke proses pengambilan keputusan organisasi.

## 7. PENUTUP

Kasus pengembangan AI-Powered Sandbox menunjukkan bahwa adopsi AI di enterprise membutuhkan lebih dari sekadar akses ke model yang canggih. Organisasi juga membutuhkan mekanisme untuk mengevaluasi kualitas, risiko, biaya, dan kelayakan bisnis model sebelum digunakan secara luas.

AI Sandbox memberikan kontribusi sebagai fondasi awal untuk proses evaluasi AI yang lebih terstruktur, terdokumentasi, dan AI-assisted. Dengan pendekatan ini, Telkom Group dapat memperkuat standardisasi evaluasi model, meningkatkan visibilitas risiko, dan membantu manajemen mengambil keputusan berbasis evidence. AI Center of Excellence dapat berperan sebagai pengorkestrasi standar, praktik review, dan pembelajaran lintas unit agar adopsi AI tidak berjalan terfragmentasi.

Ke depan, AI Sandbox berpotensi menjadi bagian penting dalam tata kelola adopsi AI Telkom Group. Nilainya bukan hanya pada kemampuan menjalankan testing, tetapi pada kemampuannya menghubungkan hasil teknis dengan keputusan bisnis: model mana yang layak digunakan, model mana yang perlu kontrol tambahan, dan model mana yang perlu diperbaiki sebelum digunakan oleh unit bisnis.

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
