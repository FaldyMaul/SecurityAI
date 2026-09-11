# Laporan Aktivitas dan Progress: Evaluasi & Keamanan Model LLM Telkom AI

Berikut adalah rincian aktivitas dan progres terkini terkait eksekusi *AI Sandbox*, evaluasi keamanan (*Red-Teaming*), dan perencanaan tindak lanjut tata kelola AI.

### 1. Planning: Research, Benchmark, & Regulatory Contribution
- **Eksekusi:** Melakukan riset penerapan ekosistem *AI Sandbox* dan melakukan *benchmarking* pengembangan menggunakan kerangka pengujian AI Verify Singapore, standar keamanan ISO, dan panduan NIST AI RMF. Di ranah regulasi, tim secara aktif telah melakukan **review dan memberikan feedback terhadap draf Perpres Etika AI kepada Kementerian Komunikasi dan Digital (Komdigi)** sebagai bentuk kontribusi Telkom dalam membangun ekosistem AI nasional yang bertanggung jawab.
- **Monitoring:** Menyusun rumusan dokumen *gap analysis* dari postur keamanan, kondisi sistem, dan tata kelola AI Telkom saat ini terhadap standar framework pengujian keamanan global dan lokal yang berlaku.

### 2. Planning: Deployment Baseline AI Verify Moonshot & Initial Assessment
- **Eksekusi:** Menjalankan inisialisasi awal (*running initial model*) dan melakukan instalasi (deploy) *AI Verify Moonshot* sebagai platform *benchmark* awal untuk mengukur parameter keamanan, risiko, dan pedoman model. Pada tahap ini, tim telah **menyelesaikan Initial Assessment terhadap model LLM Telkom AI**, yang mencakup simulasi **red-teaming dasar**. Fokus evaluasi dilakukan secara spesifik pada metrik kerentanan *Adversarial Attacks* dan *Hallucination*, untuk kemudian menghasilkan **perumusan root-cause (akar penyebab)** celah keamanan berdasarkan hasil *baseline* pengujian saat ini.
- **Monitoring:** Secara teknis memastikan berjalannya *logging model*, stabilitas *API connectivity*, serta memantau generasi output pelaporan tercetak secara periodik dan terstruktur (contoh rekam jejak: `result_telkomai_full_run_1.json`, log `combined_result.json`, dan dokumen *HTML/PDF Risk Report*).

### 3. Planning: Research for Indonesia AI Sandbox & Guardrails Mitigation
- **Eksekusi:** Merencanakan draf perancangan (development) "Indonesia AI Sandbox", di mana instrumen pengujian tidak hanya bersandar pada standar kebahasaan global, tetapi juga diinvestigasi secara khusus menggunakan *benchmark* konten lokal Nusantara. Menindaklanjuti temuan celah dari *Initial Assessment*, tim saat ini sedang berfokus pada **penyiapan dan riset penerapan layer guardrails keamanan tambahan menggunakan arsitektur liteLLM** untuk memfilter input/output berisiko tinggi.
- **Monitoring:** Melaksanakan rapat sinkronisasi *sprint review* dan dokumentasi laporan mingguan yang merangkum rincian *scope* pengujian lokal, tata kelola lokalisasi data Indonesia, serta kemajuan integrasi *guardrails proxy*.
