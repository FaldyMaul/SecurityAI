# AI Sandbox – UI Copy

> Source: `Product_UI_Specification.md` §4, §5
> Languages: Bahasa Indonesia (`id`) — primary · English (`en`) — fallback
> Format: Locale keys ready for `next-intl` / `react-intl` JSON files

---

## 1. Navigation

| Key | ID | EN |
|-----|----|----|
| `nav.mymodels` | Model Saya | My Models |
| `nav.addmodel` | + Tambah Model | + Add Model |
| `nav.runs` | Eksekusi | Runs |
| `nav.results` | Hasil | Results |
| `nav.dashboard` | Dasbor | Dashboard |
| `nav.reviewqueue` | Antrean Review | Review Queue |
| `nav.allmodels` | Semua Model | All Models |
| `nav.publication` | Publikasi | Publication |
| `nav.system` | Sistem | System |
| `nav.ranking` | Peringkat | Ranking |
| `nav.compare` | Bandingkan | Compare |
| `nav.home` | Beranda | Home |
| `nav.profiles` | Profil Model | Model Profiles |

---

## 2. Actions

| Key | ID | EN |
|-----|----|----|
| `action.savedraft` | Simpan Draf | Save Draft |
| `action.validate` | Validasi Endpoint | Validate Endpoint |
| `action.validatecontinue` | Validasi & Lanjutkan | Validate & Continue |
| `action.startrun` | Mulai Benchmark | Start Benchmark |
| `action.rerun` | Jalankan Ulang | Rerun |
| `action.submitreview` | Ajukan untuk Review | Submit for Review |
| `action.approve` | Setujui | Approve |
| `action.approvewithcontrols` | Setujui dengan Kontrol | Approve with Controls |
| `action.restrict` | Batasi | Restrict |
| `action.reassess` | Minta Evaluasi Ulang | Request Reassessment |
| `action.notapprove` | Tolak | Not Approved |
| `action.publish` | Publikasikan | Publish |
| `action.hide` | Sembunyikan | Hide |
| `action.compare` | Bandingkan Model | Compare Models |
| `action.selectmodel` | Pilih Model | Select Model |
| `action.retry` | Coba Lagi | Retry |
| `action.viewscorecard` | Lihat Scorecard | View Scorecard |
| `action.viewdetails` | Lihat Detail | View Details |
| `action.goback` | Kembali | Go Back |
| `action.clearfilters` | Hapus Filter | Clear Filters |
| `action.gotoreview` | Buka Review | Go to Review |
| `action.confirmdecision` | Konfirmasi Keputusan | Confirm Decision |
| `action.backtoranking` | Kembali ke Peringkat | Back to Ranking |
| `action.revalidate` | Validasi Ulang | Re-validate |

---

## 3. Status Labels

| Key | ID | EN |
|-----|----|----|
| `status.draft` | Draf | Draft |
| `status.validationPending` | Validasi Tertunda | Validation Pending |
| `status.endpointValid` | Endpoint Tervalidasi | Endpoint Valid |
| `status.validationFailed` | Validasi Gagal | Validation Failed |
| `status.runQueued` | Dalam Antrean | Queued |
| `status.runInProgress` | Sedang Berjalan | Running |
| `status.runFailed` | Benchmark Gagal | Run Failed |
| `status.pendingReview` | Menunggu Review | Pending Review |
| `status.approved` | Disetujui | Approved |
| `status.approvedWithControls` | Disetujui dengan Kontrol | Approved with Controls |
| `status.restricted` | Dibatasi | Restricted |
| `status.reassessmentRequired` | Evaluasi Ulang Diperlukan | Reassessment Required |
| `status.notApproved` | Tidak Disetujui | Not Approved |
| `status.published` | Dipublikasikan | Published |
| `status.hidden` | Disembunyikan | Hidden |

---

## 4. Score Labels

| Key | ID | EN |
|-----|----|----|
| `score.trust` | Kepercayaan Model | Model Trust |
| `score.security` | Keamanan | Security |
| `score.privacy` | Privasi | Privacy |
| `score.readiness` | Kesiapan Aplikasi | Application Readiness |
| `score.compliance` | Cakupan Kepatuhan | Compliance Coverage |

---

## 5. Severity Labels

| Key | ID | EN |
|-----|----|----|
| `severity.critical` | Kritis | Critical |
| `severity.high` | Tinggi | High |
| `severity.medium` | Sedang | Medium |
| `severity.low` | Rendah | Low |
| `severity.info` | Informasi | Info |

---

## 6. Form Labels & Placeholders

| Key | ID | EN |
|-----|----|----|
| `form.modelName` | Nama Model | Model Name |
| `form.modelName.placeholder` | Masukkan nama model | Enter model name |
| `form.provider` | Penyedia / Tim | Provider / Team |
| `form.baseModel` | Model Dasar | Base Model |
| `form.endpointUrl` | URL Endpoint | Endpoint URL |
| `form.endpointUrl.placeholder` | https://api.example.com/v1 | https://api.example.com/v1 |
| `form.authMethod` | Metode Autentikasi | Auth Method |
| `form.apiKey` | API Key | API Key |
| `form.modelVersion` | Versi Model | Model Version |
| `form.intendedUseCase` | Tujuan Penggunaan | Intended Use Case |
| `form.description` | Deskripsi | Description |
| `form.reviewerNotes` | Catatan Reviewer | Reviewer Notes |
| `form.reviewerNotes.placeholder` | Tambahkan catatan untuk keputusan ini… | Add notes for this decision… |
| `form.reason` | Alasan | Reason |
| `form.reason.placeholder` | Jelaskan alasan keputusan ini… | Explain the reason for this decision… |
| `form.search` | Cari… | Search… |

---

## 7. Form Validation Errors

| Key | ID | EN |
|-----|----|----|
| `error.required.modelName` | Nama model wajib diisi | Model name is required |
| `error.required.provider` | Penyedia wajib diisi | Provider is required |
| `error.required.endpointUrl` | URL endpoint wajib diisi | Endpoint URL is required |
| `error.invalid.endpointUrl` | URL endpoint tidak valid | Invalid endpoint URL |
| `error.required.authMethod` | Pilih metode autentikasi | Select an auth method |
| `error.required.apiKey` | API key wajib diisi | API key is required |
| `error.required.reason` | Alasan wajib diisi | Reason is required |
| `error.minLength` | Minimal {min} karakter | Minimum {min} characters |
| `error.maxLength` | Maksimal {max} karakter | Maximum {max} characters |

---

## 8. Confirmation Dialogs

### Submit for Review

| Attribute | ID | EN |
|-----------|----|----|
| Title | Ajukan Model untuk Review? | Submit Model for Review? |
| Body | Setelah diajukan, Anda tidak dapat mengubah hasil benchmark ini. Lanjutkan? | Once submitted, you cannot modify this benchmark result. Continue? |
| Confirm | Ajukan | Submit |
| Cancel | Batal | Cancel |

### Approve Model

| Attribute | ID | EN |
|-----------|----|----|
| Title | Setujui Model Ini? | Approve This Model? |
| Body | Model akan tersedia untuk dipublikasikan. Pastikan semua temuan telah ditinjau. | The model will become available for publication. Make sure all findings have been reviewed. |
| Confirm | Setujui | Approve |
| Cancel | Batal | Cancel |

### Restrict Model

| Attribute | ID | EN |
|-----------|----|----|
| Title | Batasi Model Ini? | Restrict This Model? |
| Body | Model tidak akan muncul di halaman peringkat. Alasan wajib diisi. | The model will not appear on the ranking page. A reason is required. |
| Confirm | Batasi | Restrict |
| Cancel | Batal | Cancel |

### Publish Model

| Attribute | ID | EN |
|-----------|----|----|
| Title | Publikasikan ke Peringkat? | Publish to Ranking? |
| Body | Model akan terlihat oleh semua pengguna di halaman peringkat publik. | The model will be visible to all users on the public ranking page. |
| Confirm | Publikasikan | Publish |
| Cancel | Batal | Cancel |

### Rerun Benchmark

| Attribute | ID | EN |
|-----------|----|----|
| Title | Jalankan Ulang Benchmark? | Rerun Benchmark? |
| Body | Hasil sebelumnya akan tetap tersimpan sebagai riwayat. | Previous results will be preserved in the run history. |
| Confirm | Jalankan Ulang | Rerun |
| Cancel | Batal | Cancel |

---

## 9. Empty / Error / Loading / Success / Permission-Denied States

### Empty States

| Page | Title (ID) | Description (ID) | CTA (ID) |
|------|-----------|-------------------|----------|
| My Models | Belum ada model | Mulai dengan mendaftarkan model AI pertama Anda. | + Tambah Model |
| Review Queue | Tidak ada review yang tertunda | Semua model telah ditinjau. | — |
| Ranking | Belum ada model yang dipublikasikan | Model yang disetujui akan muncul di sini. | — |
| Filter no results | Tidak ada model yang cocok | Coba ubah filter atau kata kunci pencarian Anda. | Hapus Filter |
| Run History | Belum ada eksekusi | Jalankan benchmark pertama untuk model ini. | Mulai Benchmark |

### Loading States

| Page | Pattern |
|------|---------|
| My Models | 5 skeleton rows matching table columns |
| Review Queue | 5 skeleton rows |
| Ranking | 6 skeleton cards |
| Model Detail | Full-page skeleton (stepper + cards + table) |
| Endpoint Validation | Spinner inside card + "Memvalidasi endpoint…" |
| Benchmark Run | Animated progress bar + "Benchmark sedang berjalan…" |

### Error States

| Page | Title (ID) | CTA (ID) |
|------|-----------|----------|
| My Models | Gagal memuat daftar model | Coba Lagi |
| Ranking | Gagal memuat peringkat | Coba Lagi |
| Model Detail | Gagal memuat detail model | Coba Lagi |
| Review Detail | Gagal memuat detail review | Coba Lagi |
| Generic API | Terjadi kesalahan. Coba lagi nanti. | Coba Lagi |
| Endpoint Validation | Validasi gagal — {error_code} | Coba Lagi |
| Benchmark Run | Benchmark gagal | Jalankan Ulang |

### Success States

| Trigger | Feedback (ID) | Type |
|---------|--------------|------|
| Draft saved | Draf berhasil disimpan | Toast |
| Endpoint validated | Endpoint tervalidasi ✓ | Inline badge |
| Benchmark completed | Benchmark selesai — lihat scorecard | Toast + inline |
| Review submitted | Model berhasil diajukan untuk review | Toast |
| Decision set | Keputusan berhasil ditetapkan | Toast |
| Model published | Model berhasil dipublikasikan | Toast |

### Permission-Denied State

| Attribute | ID | EN |
|-----------|----|----|
| Title | Akses ditolak | Access denied |
| Description | Anda tidak memiliki izin untuk melihat halaman ini. | You do not have permission to view this page. |
| CTA | Kembali | Go Back |

### Inline Banners

| Condition | Label (ID) | Subtext (ID) |
|-----------|-----------|-------------|
| Model restricted | Model ini dibatasi | Hubungi admin untuk informasi lebih lanjut. |
| Evidence unavailable | Bukti tidak tersedia | Data bukti untuk temuan ini sedang diproses atau telah kedaluwarsa. |
| Model unpublished | Profil model ini tidak lagi tersedia | Model telah dihapus dari publikasi. |

---

## 10. Microcopy & Contextual Help

| Location | ID | EN |
|----------|----|-----|
| Add Model source hint | Pilih sumber endpoint: masukkan manual atau impor dari Apilogy | Choose endpoint source: enter manually or import from Apilogy |
| Benchmark package card | Paket Kepercayaan Inti Indonesia — menguji keamanan, privasi, bias, dan kepatuhan untuk konteks Indonesia | Indonesia Core Trust Package — tests security, privacy, bias, and compliance for the Indonesian context |
| Scorecard disclaimer | Skor ini mencerminkan hasil benchmark otomatis, bukan keputusan akhir. | This score reflects automated benchmark results, not a final decision. |
| Decision disclaimer | Keputusan Anda akan dicatat dan dapat diaudit. | Your decision will be recorded and is auditable. |
| Public profile footer | Penilaian dilakukan oleh AI Sandbox · Hasil terakhir diperbarui {date} | Assessment by AI Sandbox · Last updated {date} |
| Compare max reached | Maksimal 3 model untuk perbandingan | Maximum 3 models for comparison |
| Run queue position | Posisi antrean: #{position} | Queue position: #{position} |
| Run elapsed | Waktu berjalan: {duration} | Elapsed: {duration} |
| Audit trail entry | {date} — {action} oleh {actor} | {date} — {action} by {actor} |

---

## 11. Indonesia-Specific Terminology

These terms appear in benchmark results and must be in the locale files:

| Key | ID | EN |
|-----|----|----|
| `term.sara` | SARA (Suku, Agama, Ras, Antargolongan) | SARA (Ethnicity, Religion, Race, Inter-group) |
| `term.pdp` | UU Pelindungan Data Pribadi (UU PDP) | Personal Data Protection Law (PDP Law) |
| `term.radikalisme` | Konten Radikal | Radical Content |
| `term.hoaks` | Hoaks / Misinformasi | Hoax / Misinformation |
| `term.ujaran_kebencian` | Ujaran Kebencian | Hate Speech |
| `term.pornografi` | Konten Pornografi | Pornographic Content |
| `term.penipuan` | Penipuan / Fraud | Fraud / Scam |

---

## 12. Date & Number Formatting

| Format | ID (`id-ID`) | EN (`en-US`) |
|--------|-------------|-------------|
| Date | `dd/MM/yyyy` | `MMM d, yyyy` |
| Date + time | `dd/MM/yyyy HH:mm` | `MMM d, yyyy h:mm a` |
| Score | `Intl.NumberFormat` — no decimals | Same |
| Percentage | `{n}%` | `{n}%` |

Use `Intl.DateTimeFormat` and `Intl.NumberFormat` with the active locale.
