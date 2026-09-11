# Support Needed to Governance and Product Lifecycle Team 2026-04-15

Last updated: 2026-04-15

Dokumen ini merangkum support yang dibutuhkan dari:

- tim `Governance`
- tim `Product Lifecycle`

Scope dokumen ini adalah seluruh stack `Telkom AI Playground`:

- `AI Sandbox`
- `ModelHub`
- `AgentLab`
- `APIHub`
- `Executive Control Plane`

Tujuan dokumen ini:

- memberi daftar support yang konkret
- memperjelas keputusan apa yang dibutuhkan dari masing-masing tim
- membantu sinkronisasi grand plan, grand map, dan operating model lintas produk

---

## 1. Ringkasan Singkat

Secara umum:

- tim `Governance` dibutuhkan untuk menetapkan policy, control, review gate, approval model, dan data boundary
- tim `Product Lifecycle` dibutuhkan untuk menetapkan stage, owner, release gate, operating model, dan transisi antar-produk

Prinsip utama yang harus dijaga:

- `AI Sandbox` adalah shadow layer sebelum `ModelHub`
- `ModelHub` hanya menampilkan model yang sudah lolos proses internal yang sesuai
- `AgentLab` membangun use case atau agent
- `APIHub` bukan hanya source API untuk `AgentLab`, tetapi juga bisa menjadi layer exposure untuk endpoint hasil use case dari `AgentLab`
- `Executive Control Plane` membaca usage, observability, governance, dan lifecycle status lintas stack

---

## 2. Tabel Support Needed - Governance Team

| No | Area | Support yang Dibutuhkan | Output yang Diharapkan | Produk Terdampak | Kenapa Dibutuhkan Sekarang | Prioritas |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Governance model | Menetapkan operating governance model untuk stack ini: Telkom-led, consortium, atau hybrid | keputusan model governance dan RACI awal | semua produk | tanpa model governance, approval dan escalation path tidak jelas | `P0` |
| 2 | Review gate policy | Mendefinisikan rule kapan model dianggap `review_ready`, `restricted`, `reassessment_required`, atau `promotion_ready` | review-state policy dan decision matrix | `AI Sandbox`, `ModelHub` | saat ini kita sudah masuk fase review gate dan promotion workflow | `P0` |
| 3 | Promotion eligibility | Menentukan syarat minimum model boleh naik dari `AI Sandbox` ke `ModelHub` | promotion checklist dan approval criteria | `AI Sandbox`, `ModelHub` | boundary sandbox ke catalog harus dijaga rapat | `P0` |
| 4 | Data classification | Menentukan data mana yang boleh tampil ke user umum dan mana yang harus tetap internal | klasifikasi data internal vs curated vs public | semua produk | agar evidence internal tidak bocor ke `ModelHub`, `APIHub`, atau executive summary | `P0` |
| 5 | Regulatory alignment | Menyusun alignment minimum terhadap `UU PDP`, `NIST AI RMF`, `ISO/IEC 42001`, dan local ethics context | standards mapping baseline | `AI Sandbox`, `Executive Control Plane` | dibutuhkan untuk review summary dan assurance story | `P1` |
| 6 | Guardrail policy | Menentukan baseline category policy untuk harmful content, privacy, jailbreak, prompt injection, dan local Indonesian context | policy matrix untuk moderation dan blocking | `AI Sandbox`, `ModelHub`, `AgentLab`, `APIHub` | supaya kontrol lintas produk konsisten | `P1` |
| 7 | Human review ownership | Menetapkan siapa reviewer final untuk model, use case, dan exposed endpoint | reviewer ownership map | `AI Sandbox`, `AgentLab`, `APIHub` | agar jelas siapa approve model dan siapa approve endpoint hasil use case | `P1` |
| 8 | Audit and retention | Menetapkan masa simpan evidence, logs, reviewer note, dan approval decision | retention and audit policy | `AI Sandbox`, `Executive Control Plane` | observability dan evidence sudah mulai terbentuk, tapi retention belum baku | `P1` |
| 9 | Partner and external exposure rule | Menentukan kapan model atau endpoint boleh diekspos ke partner atau external consumer | external exposure criteria | `ModelHub`, `APIHub` | penting sebelum stack masuk fase external expansion | `P1` |
| 10 | Risk acceptance path | Menentukan alur jika model punya risk sedang tapi tetap ingin dipakai secara terbatas | exception and risk acceptance process | semua produk | dibutuhkan supaya tidak semua kasus mentok di binary approve vs reject | `P2` |

---

## 3. Tabel Support Needed - Product Lifecycle Team

| No | Area | Support yang Dibutuhkan | Output yang Diharapkan | Produk Terdampak | Kenapa Dibutuhkan Sekarang | Prioritas |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Product stage definition | Menetapkan stage lifecycle untuk tiap produk: concept, pilot, internal beta, governed release, external-ready | lifecycle stage matrix per produk | semua produk | saat ini tiap produk masih berbeda tingkat kematangannya | `P0` |
| 2 | Cross-product flow | Mendefinisikan flow resmi dari `AI Sandbox` ke `ModelHub`, lalu ke `AgentLab` dan `APIHub` | cross-product lifecycle map | semua produk | grand map perlu source of truth yang jelas | `P0` |
| 3 | Product owner boundary | Menentukan owner utama per produk dan owner untuk handoff antar-produk | ownership matrix | semua produk | supaya tidak terjadi overlap decision antara sandbox, catalog, builder, dan marketplace | `P0` |
| 4 | Release gate definition | Menentukan gate apa saja sebelum fitur dianggap siap dipakai internal atau external | release gate framework | semua produk | saat ini engineering progress sudah jalan, tapi release discipline belum seragam | `P0` |
| 5 | MVP vs next-phase boundary | Memilah fitur mana yang benar-benar MVP dan mana yang masuk next phase | MVP scope decision log | semua produk | untuk menghindari scope creep saat tim mulai mengerjakan grand stack | `P1` |
| 6 | Model lifecycle | Menentukan lifecycle model dari intake sampai curated listing dan possible retirement | model lifecycle state map | `AI Sandbox`, `ModelHub` | penting untuk model versioning, rerun, dan reassessment | `P1` |
| 7 | Use case lifecycle | Menentukan lifecycle use case atau agent yang dibuat di `AgentLab` sampai jadi endpoint di `APIHub` | use case to endpoint lifecycle map | `AgentLab`, `APIHub` | ini sekarang sudah jadi kebutuhan eksplisit | `P1` |
| 8 | Endpoint lifecycle | Menentukan lifecycle endpoint hasil use case: draft, internal test, internal publish, governed publish, external publish | endpoint lifecycle state map | `APIHub`, `AgentLab` | penting karena `APIHub` juga jadi exposure layer, bukan hanya catalog | `P1` |
| 9 | Sunset and replacement policy | Menentukan kapan model, agent, atau endpoint harus di-deprecate, di-retire, atau diganti | sunset policy | `ModelHub`, `AgentLab`, `APIHub` | penting untuk reliability dan product hygiene jangka menengah | `P2` |
| 10 | KPI and success metrics | Menentukan KPI per produk dan KPI lintas-stack | KPI framework | semua produk, terutama `Executive Control Plane` | tanpa KPI, executive view akan hanya jadi dashboard tanpa meaning | `P1` |

---

## 4. Tabel Support Needed - Joint Governance + Product Lifecycle

| No | Topic Bersama | Support yang Dibutuhkan | Output yang Diharapkan | Produk Terdampak | Prioritas |
| --- | --- | --- | --- | --- | --- |
| 1 | Approval chain | Menyatukan approval chain untuk model, use case, dan endpoint | approval chain map | semua produk | `P0` |
| 2 | Role separation | Menetapkan boundary antara `Model Owner`, `Reviewer`, `Builder`, `Platform Admin`, dan `Catalog Curator` | role and responsibility matrix | semua produk | `P0` |
| 3 | Internal vs curated vs exposed state | Menentukan definisi state internal, curated, dan exposed secara konsisten | state glossary lintas produk | semua produk | `P0` |
| 4 | Evidence to summary transformation | Menentukan bagaimana evidence internal diubah menjadi summary untuk `ModelHub` atau `Executive Control Plane` | summary publication rule | `AI Sandbox`, `ModelHub`, `Executive Control Plane` | `P1` |
| 5 | Agent endpoint publishing rule | Menentukan kapan output `AgentLab` boleh dipublish sebagai endpoint di `APIHub` | publishing criteria untuk use case endpoint | `AgentLab`, `APIHub` | `P1` |
| 6 | External expansion rule | Menentukan kapan stack siap diperluas ke partner, ministry, atau external consumer | external readiness criteria | `ModelHub`, `APIHub`, `Executive Control Plane` | `P1` |

---

## 5. Rekomendasi Urutan Engagement

Urutan support yang paling masuk akal:

1. `Governance` finalize review gate, promotion rule, dan data boundary
2. `Product Lifecycle` finalize stage, owner, dan release gate per produk
3. keduanya menyepakati lifecycle lintas produk dari model sampai endpoint
4. setelah itu baru grand roadmap dan grand architecture diturunkan lebih detail ke agent teknis

---

## 6. Suggested Ask ke Governance Team

Pertanyaan yang perlu dibawa:

- apa definisi minimum model dianggap aman untuk dipromosikan dari `AI Sandbox` ke `ModelHub`?
- evidence apa yang harus tetap internal dan evidence apa yang boleh jadi curated summary?
- siapa approver final untuk model, use case, dan endpoint?
- bagaimana exception process jika model atau use case ingin dipakai terbatas walau belum fully green?

---

## 7. Suggested Ask ke Product Lifecycle Team

Pertanyaan yang perlu dibawa:

- apa lifecycle resmi untuk model, use case, dan endpoint?
- apa gate tiap stage untuk `AI Sandbox`, `ModelHub`, `AgentLab`, dan `APIHub`?
- kapan output `AgentLab` dianggap cukup matang untuk dipublish ke `APIHub`?
- bagaimana KPI dan owner tiap produk dibedakan tapi tetap sinkron?

---

## 8. Practical Conclusion

Kalau diringkas:

- `Governance` dibutuhkan untuk menetapkan rule
- `Product Lifecycle` dibutuhkan untuk menetapkan stage dan ownership
- keduanya dibutuhkan bersama untuk mengubah stack ini dari sekadar kumpulan tools menjadi product ecosystem yang benar-benar bisa dioperasikan

Dokumen ini bisa dipakai sebagai bahan briefing awal sebelum membuat:

- grand roadmap lintas produk
- cross-product RACI
- governance decision log
- product lifecycle map
