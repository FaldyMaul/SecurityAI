# 3. TARGET PENGGUNA / UNIT

Implementasi **AI-Powered Sandbox** dirancang untuk melayani berbagai pemangku kepentingan di lingkungan Telkom Group secara terintegrasi. Dengan menyediakan antarmuka pengguna (*User Interface*) yang disesuaikan berdasarkan peran (*role-based access control*), Sandbox ini membagi pengguna utama dan penerima manfaat bisnis ke dalam beberapa kategori strategis:

## 3.1 Pengguna Utama Platform (Primary Users)

1. **Telkom AI CoE (Center of Excellence)**: Bertindak sebagai pengelola utama dan otoritas tertinggi (*governance authority*) yang melakukan penelaahan keputusan (*human review*) berdasarkan bukti teknis (*technical evidence*) hasil pengujian Sandbox untuk menerbitkan sertifikasi rekomendasi model di Telkom Group.
2. **Tim AI & Security Platform**: Menggunakan platform ini untuk memelihara pipa integrasi alat pengujian (*automated testing pipeline*), memperbarui pustaka serangan injeksi (*adversarial database*), dan memastikan interkoneksi adapter *LiteLLM* berjalan stabil.
3. **Tim ModelHub & AgentLab**: Sebagai integrator hilir (*downstream consumers*) yang mengonsumsi hasil skor, batasan model (*restrictions*), dan *Model Card* terverifikasi untuk disajikan di katalog pencarian pengembang (*ModelHub*) serta panduan konfigurasi pembuatan agen pintar (*AgentLab*).
4. **Pemilik Kasus Penggunaan (Use Case / Product Owners)**: Tim pengembang aplikasi digital di berbagai Divisi (seperti Digital Business, Enterprise Service, atau Consumer Service) yang ingin mendaftarkan model khusus hasil *fine-tuning* mereka untuk diuji kelayakannya sebelum dideploy ke lingkungan produksi (*production environment*).

## 3.2 Penerima Manfaat Bisnis (Business Beneficiaries)

- **Manajemen Tingkat Atas (C-Level & Executive Management)**: Mendapatkan visibilitas tata kelola yang jernih (*governance visibility*) mengenai tingkat kepatuhan regulasi (seperti kepatuhan UU PDP) dan peta risiko AI secara korporat sebelum menyetujui ekspansi anggaran adopsi AI berskala besar.
- **Tim Security, Risk, and Compliance (SRC) Telkom**: Dapat mengidentifikasi celah kerentanan model sejak fase pengembangan awal (*shift-left security approach*) tanpa harus melakukan audit manual yang memakan waktu lama.
- **Para Pengembang Aplikasi (*Developers*)**: Mendapatkan panduan yang jelas dan instan mengenai model mana yang memiliki efisiensi biaya kognitif terbaik (*cost-aware model recommendation*) untuk spesifikasi kasus penggunaan tertentu, menghindari pemborosan alokasi token API.

---
**Referensi Akademis & Standar Industri:**
- Integrasi peran dalam tata kelola AI selaras dengan *NIST AI RMF 1.0 (Section 2.1)* yang menggarisbawahi pentingnya keterlibatan seluruh aktor sistem AI (*AI system actors*) dalam memikul tanggung jawab risiko kolektif, mulai dari tim pengembang hingga pengambil kebijakan korporasi.
