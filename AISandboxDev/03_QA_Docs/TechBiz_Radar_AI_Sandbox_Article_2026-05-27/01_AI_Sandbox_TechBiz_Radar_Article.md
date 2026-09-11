# AI-Powered Sandbox untuk Evaluasi Kualitas, Risiko, dan Kelayakan Model AI di Telkom AI CoE

Nama Penulis - NIK  
Divisi: AI & Security Platform / Telkom AI CoE  
Kategori: AI Use Case  
Tags: #TechBizRadar2.0 #UseCaseTechBiz #AI

## Abstrak

Adopsi generative AI di lingkungan enterprise membawa peluang besar, tetapi juga menimbulkan tantangan baru dalam pemilihan model yang aman, relevan, efisien, dan sesuai kebutuhan bisnis. Proses evaluasi model yang masih manual dan berbeda antar-unit dapat menyebabkan hasil penilaian tidak konsisten, sulit dibandingkan, dan kurang memadai untuk mendukung keputusan manajemen. Artikel ini mengusulkan AI-Powered Sandbox sebagai lingkungan evaluasi terkendali yang menggunakan AI untuk menilai kualitas, risiko, keamanan, biaya, dan kelayakan bisnis dari model AI sebelum digunakan lebih luas. Solusi ini memanfaatkan pendekatan AI-assisted evaluation seperti benchmark terstruktur, deteksi risiko, LLM-as-a-judge, scorecard, model card, serta human-in-the-loop review. Dengan AI Sandbox, Telkom AI CoE diharapkan dapat memperkuat standardisasi evaluasi model, meningkatkan visibilitas risiko, mendukung pemilihan model yang lebih cost-aware, dan membangun fondasi adopsi AI yang lebih terukur serta dapat ditelusuri.

Kata kunci: AI Sandbox, evaluasi model AI, generative AI, manajemen risiko AI, model card, scorecard, AI governance

## 1. PERMASALAHAN ATAU KEBUTUHAN BISNIS

Ketika adopsi generative AI semakin cepat, tantangan organisasi tidak lagi hanya memilih model yang paling pintar, tetapi memilih model yang aman, relevan, efisien, dan layak digunakan dalam konteks enterprise. Di lingkungan Telkom Group, berbagai tim mulai mengeksplorasi Large Language Model (LLM), AI agent, otomasi layanan, analisis dokumen, dan integrasi AI ke proses bisnis. Peluangnya besar, tetapi risikonya juga meningkat jika pemilihan model masih dilakukan berdasarkan demo singkat atau trial-and-error.

Setiap model AI memiliki karakteristik yang berbeda. Ada model yang bagus untuk percakapan umum, tetapi lemah dalam fakta lokal. Ada model yang cepat, tetapi kurang stabil. Ada model yang responsnya terlihat meyakinkan, tetapi berisiko menghasilkan halusinasi, membocorkan data sensitif, atau gagal menghadapi prompt yang bersifat manipulatif. Risiko seperti prompt injection dan sensitive information disclosure juga sudah diidentifikasi sebagai risiko penting dalam aplikasi berbasis LLM oleh OWASP [3].

Di sisi bisnis, masalahnya bukan hanya teknis. Jika setiap unit melakukan evaluasi dengan standar sendiri, hasilnya sulit dibandingkan. Model yang sama dapat dinilai layak oleh satu tim, tetapi dianggap berisiko oleh tim lain. Dokumentasi hasil uji juga sering tidak cukup rapi untuk menjadi dasar keputusan manajemen. Padahal, kerangka seperti NIST AI Risk Management Framework menekankan pentingnya proses untuk memetakan, mengukur, dan mengelola risiko AI secara berkelanjutan [1].

Bagi Telkom, kebutuhan bisnisnya menjadi jelas: sebelum AI digunakan lebih luas, perusahaan membutuhkan mekanisme evaluasi yang lebih terstruktur, terukur, dan dapat ditelusuri. Manajemen perlu melihat kualitas, risiko, batasan, biaya, dan rekomendasi penggunaan model sebelum model tersebut dipakai oleh unit bisnis, dimasukkan ke katalog model perusahaan, atau digunakan dalam platform pembangun AI agent dan workflow.

Dengan kata lain, pertanyaan utama dalam adopsi AI tidak lagi hanya "model mana yang paling pintar", tetapi "model mana yang aman, relevan, efisien, dan layak digunakan dalam konteks bisnis Telkom".

## 2. SOLUSI AI YANG DIUSULKAN

Solusi yang diusulkan adalah AI-Powered Sandbox, yaitu lingkungan evaluasi terkendali yang menggunakan AI untuk membantu menilai kualitas, keamanan, risiko, biaya, dan kesesuaian bisnis dari model AI sebelum digunakan lebih luas. AI Sandbox bukan hanya checklist governance atau tempat testing manual. AI Sandbox diposisikan sebagai sistem pendukung keputusan berbasis AI untuk membantu Telkom mengevaluasi AI lain secara lebih konsisten.

Konsep utamanya sederhana: sebelum sebuah model direkomendasikan untuk digunakan oleh unit bisnis, model tersebut masuk ke lingkungan sandbox. Di sana, model diuji menggunakan skenario bisnis dan skenario risiko. Hasilnya diubah menjadi scorecard, model card, risk level, dan rekomendasi penggunaan yang dapat dipahami oleh tim teknis maupun manajemen.

AI berperan di beberapa bagian proses evaluasi. Pada tahap awal, sandbox dapat menggunakan benchmark engine seperti AI Verify Project Moonshot untuk menjalankan pengujian model secara terstruktur [4]. Di atas fondasi tersebut, kemampuan AI dapat dikembangkan bertahap, misalnya:

- classifier untuk mendeteksi prompt atau output berisiko
- LLM-as-a-judge untuk menilai relevansi, kelengkapan, dan kepatuhan jawaban terhadap instruksi
- detector untuk harmful content, bias, toxic response, atau respons yang melanggar kebijakan
- automation untuk menguji prompt injection, jailbreak, data leakage, dan system prompt extraction
- scoring engine untuk menghitung quality score, risk level, business fit, dan cost-performance
- generative AI summarizer untuk membuat model card, ringkasan hasil evaluasi, dan catatan rekomendasi
- human-in-the-loop review untuk kasus yang ambigu atau berisiko tinggi

Alur kerja yang diusulkan adalah sebagai berikut:

1. Unit bisnis, platform team, atau model owner memilih model kandidat atau aplikasi AI yang ingin dievaluasi.
2. AI Sandbox menjalankan test prompt bisnis dan risk scenario.
3. Model kandidat menghasilkan respons.
4. AI evaluator memeriksa kualitas, relevansi, kelengkapan, dan instruction-following.
5. Security testing memeriksa prompt injection, jailbreak, kebocoran data, dan unsafe response.
6. Sistem menghitung scorecard dan risk level.
7. Generative AI membuat model card dan rekomendasi penggunaan.
8. Telkom AI CoE atau reviewer menentukan apakah model direkomendasikan, boleh digunakan terbatas, perlu perbaikan, atau belum direkomendasikan.

Dalam ekosistem yang lebih luas, hasil AI Sandbox dapat menjadi input untuk katalog model perusahaan, panduan pemilihan model bagi developer, dan rekomendasi penggunaan bagi tim yang membangun AI agent atau workflow. Jika sebuah use case AI nantinya dibuat menjadi endpoint layanan, hasil evaluasi sandbox juga dapat membantu menentukan kontrol apa yang perlu dipasang sebelum endpoint tersebut dibuka melalui katalog API internal.

Nilai tambah AI Sandbox dibandingkan pendekatan konvensional dapat dilihat dari perbedaan berikut:

| Aspek | Pendekatan Konvensional | Pendekatan AI-Powered Sandbox |
| --- | --- | --- |
| Metode uji | Manual, ad-hoc, dan sulit diulang | Terstruktur, reusable, dan terdokumentasi |
| Penilaian | Subjektif, tergantung penguji | Menggunakan metrik, rubric, dan AI-assisted evaluation |
| Dimensi evaluasi | Umumnya fokus pada akurasi atau demo | Mencakup kualitas, risiko, keamanan, privasi, biaya, dan business fit |
| Dokumentasi | Tersebar di file atau catatan tim | Tersimpan sebagai scorecard, model card, dan riwayat evaluasi |
| Keputusan | Sulit dibandingkan antar-model | Lebih mudah dibandingkan dan dijelaskan ke manajemen |

Penting untuk dicatat bahwa AI Sandbox tidak dimaksudkan untuk menjamin keamanan 100 persen atau menggantikan approval governance. Sandbox membantu menyediakan evidence, risk signal, dan rekomendasi agar keputusan bisnis dan governance dapat dilakukan dengan dasar yang lebih kuat. Pendekatan ini juga selaras dengan prinsip AI management system yang menekankan perlunya proses sistematis untuk mengelola risiko dan lifecycle AI [2].

## 3. TARGET PENGGUNA / UNIT

Target utama AI Sandbox adalah unit yang membutuhkan proses evaluasi model AI sebelum model tersebut dipakai lebih luas. Pengguna langsungnya meliputi Telkom AI CoE, AI & Security Platform Team, security, risk, compliance, tim pengelola katalog model, tim pengembang AI agent atau workflow, serta product atau digital service team yang ingin menggunakan AI dalam use case bisnis.

Bagi Telkom AI CoE, AI Sandbox dapat menjadi mekanisme standar untuk mengevaluasi model dan menyusun rekomendasi. Bagi tim platform, sandbox membantu proses onboarding model menjadi lebih tertib karena setiap model memiliki metadata, hasil uji, scorecard, dan riwayat evaluasi. Bagi tim security dan compliance, sandbox membantu mendeteksi risiko lebih awal sebelum model dipakai dalam aplikasi bisnis.

Bagi developer dan use case owner, manfaatnya bukan berarti mereka harus memahami seluruh detail teknis sandbox. Mereka cukup mendapatkan rekomendasi yang lebih jelas melalui katalog model perusahaan: model mana yang cocok, batasannya apa, kontrol apa yang perlu dipasang, dan apakah model tersebut direkomendasikan untuk use case tertentu. Bagi tim pembangun AI agent atau workflow, hasil sandbox dapat menjadi panduan pemilihan model yang lebih aman dan efisien.

Manajemen juga menjadi penerima manfaat penting. Dengan adanya scorecard dan ringkasan risiko, manajemen dapat melihat apakah sebuah model siap dipakai terbatas, perlu kontrol tambahan, atau belum layak digunakan. Ini membantu proses pengambilan keputusan sebelum investasi AI diperluas.

## 4. DAMPAK YANG DIHARAPKAN

AI Sandbox diharapkan dapat mengurangi trial-and-error dalam pemilihan model AI. Dengan adanya test scenario, scoring rubric, dan riwayat evaluasi, unit bisnis tidak perlu mengulang pengujian dari nol setiap kali memilih model. Evaluasi menjadi lebih konsisten dan lebih mudah dibandingkan.

Dampak berikutnya adalah peningkatan visibilitas risiko. Risiko seperti halusinasi, prompt injection, unsafe response, sensitive data leakage, dan output yang tidak konsisten dapat terdeteksi lebih awal. Hal ini penting karena risiko AI tidak selalu tampak dalam demo singkat, tetapi dapat muncul saat model digunakan dalam skenario bisnis nyata. Untuk konteks data pribadi, prinsip pelindungan data juga menjadi semakin penting sejak berlakunya UU Pelindungan Data Pribadi di Indonesia [6].

AI Sandbox juga mendukung pengambilan keputusan yang lebih cost-aware. Model yang paling mahal belum tentu paling cocok untuk semua use case. Sebaliknya, model yang lebih ringan mungkin cukup untuk skenario tertentu jika kualitas, risiko, dan latensinya sesuai. Dengan scorecard dan rekomendasi yang lebih terstruktur, pemilihan model dapat mempertimbangkan kualitas, risiko, biaya, dan business fit secara bersamaan.

Dari sisi governance, sandbox dapat menjadi fondasi awal untuk AI assurance di Telkom AI CoE. Sistem ini membantu menyimpan evidence, riwayat benchmark, hasil review, dan rekomendasi kontrol. Output tersebut dapat mendukung proses governance internal tanpa mengklaim bahwa sandbox otomatis menjadi sertifikasi final.

Secara praktis, dampak yang diharapkan meliputi:

- membantu standardisasi evaluasi model AI
- mempercepat eksperimen GenAI secara lebih terkendali
- meningkatkan kualitas rekomendasi model untuk use case bisnis
- memperkuat visibilitas manajemen terhadap risiko AI
- mendukung cost-aware model selection
- mengurangi peluang penggunaan AI yang tidak sesuai konteks atau terlalu berisiko
- menyediakan dasar awal untuk model card dan scorecard yang dapat digunakan ulang

## 5. RENCANA IMPLEMENTASI

Implementasi AI Sandbox sebaiknya dimulai sebagai MVP yang fokus, bukan langsung sebagai sistem sertifikasi besar. Tahap awal dapat difokuskan pada model prioritas di lingkungan Telkom AI CoE, misalnya model internal yang akan dipakai oleh beberapa use case atau akan dimasukkan ke katalog model perusahaan.

Rencana implementasi berikut disusun agar feasible sebagai pilot internal:

| Tahap | Aktivitas | Estimasi Waktu | Output |
| --- | --- | --- | --- |
| 1 | Identifikasi use case dan model prioritas | 1 minggu | Daftar model dan use case prioritas |
| 2 | Penyusunan test prompt dan risk scenario | 2 minggu | Prompt uji, risk scenario, dan scoring rubric |
| 3 | Integrasi model melalui API | 2 minggu | Koneksi model ke sandbox dan logging awal |
| 4 | Pengujian quality, safety, security, dan cost-performance | 2 minggu | Hasil evaluasi awal dan daftar risiko |
| 5 | Penyusunan scorecard dan model card | 1 minggu | Scorecard, risk level, dan rekomendasi penggunaan |
| 6 | Pilot internal Telkom AI CoE | 2 minggu | Feedback pengguna internal dan refinement |
| 7 | Integrasi lanjutan ke katalog model dan platform pengembangan AI | 2 minggu | Model card dan recommendation layer yang dapat digunakan oleh platform internal |

Pada tahap awal, AI Sandbox dapat memakai benchmark engine seperti Moonshot untuk baseline safety dan model evaluation. Endpoint model dapat distandarkan melalui gateway atau adapter API seperti LiteLLM agar akses ke berbagai model lebih konsisten dan lebih mudah diamati [5]. Backend sandbox dapat mengelola lifecycle pengujian, artifact, scorecard, dan riwayat evaluasi. Frontend sandbox dapat memberikan tampilan review yang mudah dipahami, termasuk status run, detail prompt dan respons, kategori risiko, serta rekomendasi.

Dalam pengembangan internal yang sudah berjalan, arah teknis ini sudah mulai dibangun melalui kombinasi frontend berbasis web, backend API, integrasi lifecycle run, validasi model management, dan fondasi benchmark berbasis Moonshot. Namun, untuk pilot bisnis yang lebih matang, integrasi ke inference model nyata, review gate, history comparison, dan model card yang siap dikonsumsi platform internal perlu terus diperkuat.

Tahap berikutnya dapat mengembangkan evaluasi yang lebih luas, misalnya evaluasi aplikasi RAG atau AI agent, red-team security testing, serta runtime guardrail untuk masking data sensitif atau blocking prompt berisiko. Pengembangan ini sebaiknya dilakukan bertahap setelah MVP scorecard dan review workflow stabil.

## Penutup

AI Sandbox dapat menjadi langkah praktis bagi Telkom untuk bergerak dari evaluasi model yang manual dan tersebar menuju proses yang lebih terukur, terdokumentasi, dan AI-assisted. Nilainya bukan hanya pada testing, tetapi pada kemampuan membantu pengambilan keputusan: model mana yang layak dipakai, model mana yang perlu kontrol tambahan, model mana yang perlu diperbaiki, dan model mana yang sebaiknya belum direkomendasikan.

Dengan pendekatan ini, Telkom AI CoE dapat membangun fondasi adopsi AI yang lebih aman, lebih terukur, dan lebih mudah diskalakan. AI Sandbox membantu menempatkan evaluasi kualitas, risiko, keamanan, dan kelayakan bisnis sebagai bagian dari proses kerja sebelum model AI dipakai luas oleh unit bisnis.

## Referensi

[1] National Institute of Standards and Technology. "Artificial Intelligence Risk Management Framework (AI RMF 1.0)." https://www.nist.gov/itl/ai-risk-management-framework  
[2] International Organization for Standardization. "ISO/IEC 42001: Artificial intelligence management system." https://www.iso.org/standard/81230.html  
[3] OWASP Foundation. "OWASP Top 10 for Large Language Model Applications." https://owasp.org/www-project-top-10-for-large-language-model-applications/  
[4] AI Verify Foundation. "Project Moonshot." https://aiverifyfoundation.sg/project-moonshot/  
[5] LiteLLM. "LiteLLM Documentation and Proxy Guardrails." https://docs.litellm.ai/  
[6] Pemerintah Republik Indonesia. "Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi." https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022  
[7] Zheng, L. et al. "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena." arXiv, 2023. https://arxiv.org/abs/2306.05685
