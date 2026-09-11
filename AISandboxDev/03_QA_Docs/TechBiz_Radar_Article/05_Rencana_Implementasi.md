# 5. RENCANA IMPLEMENTASI

Agar adopsi **AI-Powered Sandbox** berjalan secara efektif dan terukur di lingkungan Telkom Group, rencana implementasi dirancang menggunakan pendekatan bertahap (*phased approach*) dengan fokus awal pada pengembangan Minimum Viable Product (MVP) untuk model prioritas sebelum diperluas ke seluruh ekosistem korporat.

Berikut adalah tabel rencana kerja taktis estimasi penyelesaian implementasi fase awal:

| Tahap | Aktivitas Utama | Estimasi Waktu | Target Output / Deliverables |
| :--- | :--- | :--- | :--- |
| **1. Identifikasi Use Case & Model Prioritas** | Menyeleksi model AI prioritas (seperti *Telkom AI / Qwen 30B*) dan menentukan batasan kasus penggunaan uji. | 1 Minggu | Daftar model prioritas dan dokumen batasan kasus penggunaan uji (*MVP Scope*). |
| **2. Penyusunan Skenario & Rubrik Pengujian** | Menyusun pustaka skenario pengujian kognitif, skenario serangan (*adversarial attacks*), filter sensitivitas lokal (SARA), dan rubrik penilaian terstandar. | 2 Minggu | Repositori prompt uji, basis data skenario risiko, dan dokumen pedoman rubrik penilaian (*scoring rubric*). |
| **3. Koneksi API & Integrasi Gateway** | Menghubungkan model kandidat ke lingkungan Sandbox menggunakan adapter *LiteLLM* untuk monitoring token dan latensi. | 2 Minggu | Jalur integrasi API model yang tervalidasi dan sistem pencatatan logs awal yang aktif. |
| **4. Otomatisasi Pengujian Teknis** | Menjalankan pipa pengujian otomatis untuk mengukur akurasi kognitif (*DeepEval*), etika (*Giskard*), dan kerentanan (*Garak & PyRIT*). | 2 Minggu | Kumpulan file JSON data hasil pengujian mentah (*raw evaluation data*) dan daftar temuan risiko teknis. |
| **5. Penyusunan Skor & Model Card** | Mengonversi data pengujian menjadi visualisasi skor kuantitatif terpusat dan menghasilkan resume kelayakan (*Model Card*) otomatis berbasis GenAI. | 1 Minggu | Dashboard visual scorecard, penetapan tingkat risiko model, dan dokumen resume *Model Card* terbitan awal. |
| **6. Uji Coba Internal (Pilot Project)** | Menjalankan simulasi proses review tata kelola oleh tim *Telkom AI CoE* untuk mengevaluasi kegunaan laporan hasil Sandbox. | 2 Minggu | Laporan umpan balik dari pengguna internal (*pilot feedback*) dan optimasi parameter sistem (*refinement*). |
| **7. Integrasi Hilir (ModelHub & AgentLab)** | Menghubungkan resume kelayakan model dari Sandbox agar dapat dibaca langsung oleh katalog pengembang di *ModelHub* dan pembuat agen di *AgentLab*. | 2 Minggu | Antarmuka integrasi katalog terpadu (*leaderboard integration*) yang siap dikonsumsi oleh tim produk digital. |

Melalui peta jalan implementasi yang ramping dan realistis ini, AI-Powered Sandbox diharapkan dapat langsung memberikan nilai guna nyata (*quick wins*) bagi pengujian model AI prioritas di Telkom dalam waktu singkat, sekaligus membangun fondasi arsitektur kokoh untuk ekspansi tata kelola kecerdasan buatan yang lebih luas di masa depan.

---
**Referensi Akademis & Standar Industri:**
- Strategi implementasi bertahap (*phased rollout*) ini selaras dengan metodologi *NIST AI RMF 1.0 (Section 4.2)* yang menyarankan organisasi untuk memulai mitigasi risiko AI pada skala prioritas kecil terlebih dahulu guna menguji sensitivitas alat ukur sebelum diterapkan pada skala enterprise yang masif.
- Pentingnya otomatisasi dalam pipeline pengujian ditekankan dalam praktik terbaik rekayasa AI modern (*MLOps / LLMOps*), di mana evaluasi terus-menerus (*Continuous Evaluation*) diintegrasikan langsung sebagai bagian dari siklus rilis berkelanjutan (CI/CD) produk teknologi.
