# 1. PERMASALAHAN ATAU KEBUTUHAN BISNIS

Dalam era transformasi digital yang masif di Telkom Group, adopsi teknologi Generative AI (GenAI), Large Language Model (LLM), dan kecerdasan buatan berbasis agen (*AI Agents*) telah berkembang dari sekadar eksperimen menjadi kebutuhan strategis di berbagai unit bisnis. Berbagai tim kini aktif menjajaki integrasi kecerdasan buatan untuk mengotomatisasi layanan pelanggan, analisis dokumen keuangan, hingga optimalisasi operasional jaringan. 

Namun, ekspansi adopsi yang cepat ini melahirkan tantangan kritis baru bagi organisasi. Saat ini, ratusan model AI—baik *open-source* maupun komersial—tersedia di pasar dengan karakteristik yang sangat beragam. Kenyataan di lapangan menunjukkan bahwa mengandalkan performa model di atas kertas atau sekadar uji coba berbasis demo visual sering kali berujung pada kegagalan operasional saat model tersebut dihadapkan pada skenario bisnis nyata (*enterprise-grade use case*).

Secara garis besar, adopsi AI di Telkom Group hari ini menghadapi tiga permasalahan utama:

1. **Uji Coba Manual dan "Trial-and-Error" yang Tidak Konsisten**: Uji coba model AI di berbagai unit bisnis saat ini masih bersifat ad-hoc, manual, dan subjektif. Tidak adanya standar evaluasi nasional di tingkat korporat menyebabkan tim pengembang di unit bisnis yang berbeda menguji model yang sama dengan metode yang berbeda, memicu inefisiensi biaya dan pengulangan kerja (*redundancy*).
2. **Spektrum Risiko AI yang Kritis dan Kompleks**: Penerapan LLM tidak terlepas dari risiko keamanan baru yang tidak dapat dideteksi oleh perangkat pemindai keamanan tradisional. Risiko tersebut meliputi **halusinasi** (model memberikan jawaban salah secara meyakinkan), **prompt injection** (manipulasi perintah untuk membajak instruksi model), **jailbreak** (tindakan melewati batasan keamanan model), hingga **kebocoran data sensitif** (PII/data rahasia korporat terungkap dalam respons publik). Risiko-risiko ini secara langsung berdampak pada kepatuhan regulasi seperti UU Pelindungan Data Pribadi (UU PDP).
3. **Ketidakpastian Biaya dan Latensi**: Model yang memiliki kapabilitas kognitif paling cerdas sering kali memiliki biaya API (token) yang sangat mahal dan latensi respons yang tinggi. Tanpa adanya pembandingan performa-terhadap-biaya (*cost-to-performance evaluation*) yang terstandarisasi, Telkom berpotensi mengalami pemborosan investasi digital secara signifikan.

Oleh karena itu, pertanyaan utama dalam adopsi AI di lingkungan Telkom Group saat ini tidak lagi hanya sekadar **"model mana yang paling pintar secara global"**, melainkan **"model mana yang aman, relevan, efisien, dan paling layak digunakan dalam konteks bisnis spesifik Telkom"**. Manajemen membutuhkan visibilitas dan kepastian tata kelola (*governance visibility*) sebelum skala adopsi AI ditingkatkan secara korporat.

---
**Referensi Akademis & Standar Industri:**
- *NIST AI RMF 1.0 (Artificial Intelligence Risk Management Framework)* merekomendasikan adanya mekanisme formal untuk memetakan (*Map*), mengukur (*Measure*), dan mengelola (*Manage*) risiko AI secara berkala sepanjang siklus hidup model.
- *ISO/IEC 42001 (Artificial Intelligence Management System)* menegaskan pentingnya proses verifikasi dan validasi (V&V) yang sistematis untuk memastikan integritas sistem kecerdasan buatan sebelum dilepas ke publik.
