# Paket AI Governance Acceptable Use Policy (AUP)

**Versi:** 0.1 untuk review stakeholder  
**Tanggal:** 7 September 2026  
**Penyusun:** Perspektif ModelHub (controlled AI inference platform)  
**Status:** Draft kerja; bukan nasihat hukum dan bukan penetapan status tool.

## 1. Tujuan paket

Paket ini menyiapkan dasar penetapan internal untuk penggunaan Artificial Intelligence (AI) yang aman, dapat dipertanggungjawabkan, dan tetap mendukung inovasi di lingkungan Telkom Indonesia. Prioritas paket adalah `01_Draft_AI_Governance_AUP.md`; artefak lain membuktikan, mengoperasionalkan, atau memetakan kebijakan tersebut.

Masalah yang hendak diatasi adalah penggunaan AI publik atau tidak terkelola yang dapat menyebabkan data internal, confidential/restricted, data pribadi, source code, dokumen pelanggan, atau informasi strategis diproses di luar kontrol Telkom. Kebijakan ini tidak melarang AI secara menyeluruh. Kebijakan memberi empat hal yang dapat dipakai karyawan: batas yang mudah dipahami, daftar/jalur **official / approved AI tools**, proses persetujuan untuk risiko lebih tinggi, dan escalation path apabila tool yang dibutuhkan belum tersedia.

## 2. Sudut pandang ModelHub

ModelHub diposisikan sebagai **kandidat controlled route** untuk inference AI, bukan otomatis sebagai route sovereign, compliant, official, atau production-scale. Nilai ModelHub dalam paket ini adalah memberi pola kontrol yang dapat diverifikasi: klasifikasi dan route policy, identitas dan akses, logging, register model/provider, evaluasi use case, serta jalur eskalasi. Setiap klaim capability maupun status ModelHub tetap tunduk pada evidence teknis, kontraktual, dan mandat organisasi yang tercatat di register evidence.

## 3. Scope

Kebijakan yang didraf berlaku untuk pekerja, tenaga alih daya, peserta magang, konsultan, dan pihak lain yang diberi akses ke sistem/data Telkom, serta unit yang menyediakan atau mengoperasikan AI untuk kebutuhan kerja. Cakupan mencakup penggunaan generative AI, predictive/analytical AI, AI assistant, coding assistant, image generation, RAG/knowledge base, agent/tool calling, dan automated decision support, baik tool internal, SaaS, API, maupun tool pihak ketiga.

Kebijakan mengatur perilaku penggunaan, status tool, approval lifecycle, exception, monitoring, dan enforcement. Kebijakan berlaku sebelum sebuah use case diuji di sandbox maupun dipakai dalam produksi, sesuai klasifikasi data dan tingkat dampaknya.

## 4. Out-of-scope

Paket ini tidak:

- menggantikan penilaian dampak pelindungan data/DPIA, security architecture review, vendor due diligence, DPA, pengadaan, atau persetujuan produk;
- menetapkan keputusan hukum akhir, dasar pemrosesan data pribadi, atau kewajiban sektoral tanpa review Legal dan DPO/Data Governance;
- menetapkan nama unit, jabatan, nomor NDE/SE, atau pejabat penandatangan secara fiktif;
- menyatakan lokasi data wajib Indonesia, Copilot/TelkomGPT/ModelHub aman, atau tool tertentu official tanpa bukti dan keputusan berwenang;
- menggantikan kebijakan keamanan informasi, klasifikasi data, manajemen risiko, SDM, pengadaan, atau incident response yang telah berlaku.

## 5. Definisi singkat

| Istilah | Arti kerja dalam paket ini |
|---|---|
| AI | Sistem berbasis mesin yang menghasilkan prediksi, rekomendasi, konten, atau keputusan dari input. |
| Generative AI | AI yang menghasilkan teks, kode, gambar, audio, video, atau konten baru. |
| official / approved tool | Tool/route dengan status tertulis dalam register resmi, scope data dan syarat yang jelas, serta owner yang ditetapkan. |
| controlled route | Route AI yang memiliki kontrol dan evidence yang dapat diverifikasi; istilah ini bukan label kepatuhan atau kedaulatan otomatis. |
| data residency | Lokasi geografis penyimpanan atau pemrosesan data; harus dibuktikan per layanan, fitur, dan konfigurasi. |
| Human-in-the-Loop | Manusia berwenang yang menilai dan tetap mengambil/menyetujui keputusan bermakna. |
| exception | Izin terbatas dan tercatat untuk menyimpang dari aturan normal, dengan kontrol kompensasi dan tanggal berakhir. |

## 6. Klasifikasi pernyataan dan aturan pembuktian

| Kelas | Arti | Cara pakai dalam paket |
|---|---|---|
| Fakta tervalidasi | Didukung artefak primer/otoritatif yang dapat ditunjukkan dan ditanggal-kan. | Boleh menjadi dasar langsung, dengan batas penerapan dicatat. |
| Pernyataan vendor | Klaim pada dokumentasi/kontrak vendor. | Dipakai sebagai input assessment; diverifikasi terhadap SKU, kontrak, konfigurasi, dan tenant Telkom. |
| Asumsi | Hipotesis kerja untuk melanjutkan draf. | Tidak boleh menjadi dasar approval atau status `Verified`. |
| Target | Kontrol yang hendak dibangun. | Ditulis sebagai requirement/roadmap, bukan capability saat ini. |
| Gap evidence | Bukti penting belum tersedia atau belum dapat diuji. | Status tool/use case ditahan `Pending Evidence` atau diberi kondisi. |

Kata **NITS** pada permintaan awal telah diverifikasi secara terminologis sebagai kemungkinan salah tulis untuk **NIST** (*National Institute of Standards and Technology*). Dokumen ini hanya memakai istilah dan rujukan **NIST**, khususnya AI RMF 1.0 dan NIST AI 600-1.

## 7. Asumsi kerja

1. Klasifikasi data Telkom yang berlaku dan skema delegation of authority belum diberikan sebagai evidence final; draf memakai kategori kerja `Public`, `Internal`, `Confidential/Restricted`, dan `Personal Data` yang harus disejajarkan oleh Data Governance/Legal.
2. SKU Microsoft 365 Copilot, tenant geo, status Advanced Data Residency (ADR), konfigurasi web grounding, connector/plug-in/agent, serta export/control evidence tenant Telkom belum diberikan.
3. Status TelkomGPT dan ModelHub belum ditetapkan sebagai official tool melalui keputusan organisasi yang dapat ditunjukkan.
4. Evidence internal yang tersedia dapat dipakai sebagai lead/assessment input, tetapi tidak mengalahkan kebutuhan bukti arsitektur aktual, kontrak/DPA, security testing, dan mandat owner.
5. Benchmark NDE/SE Tsel hanya akan dipakai setelah dokumen SharePoint dapat diakses secara sah. Jika tidak dapat diakses, struktur NDE/SE dalam paket ini bersifat generic-internal dan ditandai demikian.

## 8. Fakta awal yang tervalidasi dalam penyusunan

1. UU Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi adalah hukum Indonesia yang relevan untuk pemrosesan data pribadi, termasuk kewajiban pengendali/prosesor dan transfer data pribadi ke luar wilayah Indonesia. Penerapannya ke tiap use case tetap memerlukan review Legal/DPO.
2. NIST AI RMF 1.0 dan NIST AI 600-1 adalah benchmark manajemen risiko AI/Generative AI, bukan hukum Indonesia.
3. Regulation (EU) 2024/1689 (EU AI Act) memakai pendekatan berbasis risiko; relevansinya untuk Telkom perlu ditentukan berdasarkan aktivitas/penempatan sistem pada pasar Uni Eropa dan review Legal.
4. Dokumentasi Microsoft menempatkan batas perlindungan data Microsoft 365 Copilot pada layanan, SKU, tenant, fitur, dan konfigurasi tertentu. Hal tersebut tidak cukup untuk menyimpulkan semua data Copilot selalu tinggal pada tenant atau lokasi tertentu.

Detail sumber dan batas penerapan dicatat dalam `02_Regulatory_Standard_and_Policy_Mapping.md` dan `03_Official_AI_Tool_Assessment_Copilot_TelkomGPT_ModelHub.md`.

## 9. Open question / evidence yang belum tertutup

| ID | Pertanyaan atau evidence | Calon owner verifikasi | Dampak bila belum ada |
|---|---|---|---|
| OQ-01 | Mandat policy owner dan penerbit NDE/SE AI Governance. | Governance/Corporate Policy/Legal. | AUP tidak dapat ditetapkan secara sah. |
| OQ-02 | Klasifikasi data Telkom, data owner, dan aturan transfer yang berlaku. | Data Governance/DPO/Legal. | Batas input data tidak dapat difinalkan. |
| OQ-03 | SKU Copilot, tenant geo, ADR, konfigurasi web grounding, connector/agent, dan Purview/audit control. | M365 Service Owner/IT Architecture/CYS. | Status Copilot hanya `Pending Evidence`. |
| OQ-04 | Data flow, kontrak/DPA, retention/deletion, IAM, audit, VAPT, dan owner TelkomGPT. | TelkomGPT Product Owner/CYS/Legal/Procurement. | Status TelkomGPT hanya `Pending Evidence`. |
| OQ-05 | Data flow aktual per ModelHub route, daftar provider/model, data residency, logging, retention, IAM, VAPT, kontrak/DPA, dan incident process. | ModelHub Product Owner/IT Architecture/CYS/Legal/Procurement. | Tidak boleh memakai label sovereign/compliant/official. |
| OQ-06 | Benchmark NDE dan SE Tsel pada tautan SharePoint. | Requester/ITD Governance. | Draf NDE/SE tidak dapat mengklaim mengikuti struktur benchmark tersebut. |
| OQ-07 | Kewajiban sektoral Telkom/BUMN serta aturan PSE yang tepat bagi use case. | Legal/Compliance/Regulatory Affairs. | Mapping perlu dilengkapi sebelum penetapan. |

## 10. Keputusan yang diminta kepada stakeholder

| ID | Keputusan | Forum/pihak yang perlu memutuskan | Output minimal |
|---|---|---|---|
| D-01 | Model pemilik dan penerbit resmi AUP/NDE/SE. | Forum governance berwenang, Legal, sponsor eksekutif. | Mandat tertulis dan RACI final. |
| D-02 | Otoritas penetapan/pencabutan `official / approved AI tool`. | Policy owner, CYS, Legal/DPO, IT Architecture, Procurement. | Terms of reference dan daftar approver. |
| D-03 | Penyelarasan klasifikasi data dan data-use matrix. | Data Governance/DPO/Legal/CYS. | Matrix yang ditetapkan. |
| D-04 | Scope official Microsoft Copilot setelah assessment tenant/ADR. | M365 Service Owner/IT Architecture/CYS/Legal. | SKU, feature scope, data scope, configuration baseline. |
| D-05 | Status, service owner, dan jalur evaluasi TelkomGPT. | Sponsor bisnis/owner produk/CYS/Legal/Procurement. | Assessment signed-off atau penolakan. |
| D-06 | Peran ModelHub, kriteria controlled route, dan batas global route. | ModelHub owner/Architecture/CYS/Legal/DPO. | Route register dan status per route. |
| D-07 | Approver exception, SLA, masa berlaku maksimum, dan revocation. | Policy owner/CYS/Legal/DPO. | Exception authority matrix. |
| D-08 | Enforcement, training, komunikasi, dan consequence management. | HR, Compliance, CYS, policy owner. | Program implementasi dan escalation channel. |

## 11. Struktur paket

| Artefak | Peran |
|---|---|
| `01_Draft_AI_Governance_AUP.md` | Kebijakan utama dan keputusan operasional. |
| `02_Regulatory_Standard_and_Policy_Mapping.md` | Traceability sumber primer dan batas penerapan. |
| `03_Official_AI_Tool_Assessment_Copilot_TelkomGPT_ModelHub.md` | Status sementara per tool/route dan gap evidence. |
| `04_Governance_Operating_Model_RACI_and_Exception_Flow.md` | Opsi ownership, RACI, approval, dan exception. |
| `05_Draft_NDE_or_SE_AI_Governance_AUP.md` | Bahasa singkat untuk calon NDE/SE. |
| `06_Lampiran_AUP_Use_Case_Matrix_and_Decision_Tree.md` | Matrix karyawan/helpdesk, Mermaid, dan template. |
| `07_Evidence_Gap_and_Action_Register.xlsx` | Register operasional yang dapat ditindaklanjuti. |
| `Draft_NDE_SE_AI_Governance_AUP_v0.1.docx` | Salinan versi untuk sirkulasi internal. |

## 12. Cara menggunakan paket

1. Forum penetapan menutup keputusan D-01 sampai D-08 dan menunjuk owner.
2. Owner tool melengkapi evidence register; reviewer independen memvalidasi sebelum mengubah status tool.
3. Setelah matrix data dan official tool ditetapkan, AUP dipublikasikan bersama jalur request dan training.
4. Setiap use case berisiko atau exception mengikuti assessment tambahan; AUP bukan pengganti assessment tersebut.
