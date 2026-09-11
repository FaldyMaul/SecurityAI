# FE Agent Guideline - Recipe Results Table Restoration v12

## Tujuan
Mengembalikan pengalaman hasil penilaian ke mode tabel yang lebih cepat discan dan bisa difilter per kategori, sambil mempertahankan tambahan informasi `method`, `dataset`, temuan ringkas, dan rekomendasi ringkas.

## Ringkasan Perubahan UX
1. Hapus pola kartu per recipe (card stack) karena membuat layar panjang.
2. Gunakan satu tabel recipe dengan filter kategori di atas tabel.
3. Pertahankan kemampuan lihat detail prompt melalui tombol `Lihat Prompt`.
4. Gunakan expandable row untuk menampilkan temuan/rekomendasi ringkas, bukan halaman/section terpisah.
5. Hindari duplikasi informasi antar section.

## Prinsip UI
1. Scannable first: user melihat semua recipe dalam satu viewport tabel.
2. Progressive disclosure: detail hanya muncul saat user expand row.
3. Single source of truth: data recipe ditampilkan satu kali di tabel.
4. Consistency: kolom dan aksi sama untuk setiap recipe.

## Struktur Halaman Hasil (Latest Tab)
1. Header run + status
2. Overall/category summary (tetap)
3. `Hasil Detail Per Recipe`
4. Category filter tabs
5. Recipe table + row expansion
6. Prompt modal per recipe

## Komponen dan File yang Diubah
1. `03_Frontend/src/components/results/RecipeResultsTable.tsx`
2. `03_Frontend/src/components/results/RecipeResultsTable.module.css`
3. `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx`
4. `03_Frontend/src/types/run.ts`

## Komponen yang Dihapus
1. `03_Frontend/src/components/results/ConsolidatedRecipeCard.tsx`
2. `03_Frontend/src/components/results/ConsolidatedRecipeCard.module.css`
3. `03_Frontend/src/components/results/RecipeResultCard.tsx`
4. `03_Frontend/src/components/results/RecipeResultCard.module.css`

## Spesifikasi Tabel Recipe
Kolom wajib:
1. Recipe
2. Method
3. Dataset
4. Score
5. Status
6. Aksi

Aksi wajib:
1. Tombol `Lihat Prompt`
2. Tombol expand/collapse row

## Filter Kategori
Filter tabs:
1. Semua Recipe
2. Adversarial Robustness
3. Safety & Alignment
4. Privacy
5. Hallucination & Truthfulness

Behavior:
1. Tab `Semua Recipe` menampilkan semua row.
2. Tab kategori hanya menampilkan row kategori terkait.
3. Jumlah row harus sinkron dengan filter aktif.

## Expanded Row (Ringkas)
Bagian yang ditampilkan saat expand:
1. Temuan ringkas (maksimal 3 item + indikator jumlah total)
2. Rekomendasi ringkas (maksimal 2 item + indikator jumlah total)

Catatan:
1. Jika data temuan kosong, tampilkan pesan eksplisit `Tidak ada temuan pada recipe ini.`
2. Jangan duplikasi detail prompt di expanded row; detail prompt ada di modal.

## Prompt Modal
Sumber trigger:
1. Klik tombol `Lihat Prompt` pada row.

Isi modal:
1. Nama recipe
2. Method
3. Dataset
4. Daftar prompt/response dari findings (jika ada)
5. Catatan temuan per item

Fallback:
1. Jika tidak ada finding prompt, tampilkan pesan `Tidak ada prompt temuan untuk recipe ini.`

## Data Contract
`SelectedRecipeResult` minimal:
1. `recipeId`
2. `categoryId`
3. `categoryName`
4. `recipeName`
5. `method`
6. `dataset`
7. `score`
8. `grade`
9. `status`
10. `totalTests`
11. `passed`
12. `failed`
13. `critical`
14. `findings[]`
15. `recommendations[]`

## Aturan Konten
1. Jangan gunakan label branding "Moonshot" di UI user-facing.
2. Gunakan istilah netral: `Method` dan `Dataset`.
3. Bahasa UI tetap konsisten Indonesia untuk label dan aksi.

## QA Acceptance Checklist
1. Tabel menampilkan semua recipe saat `Semua Recipe` aktif.
2. Filter kategori bekerja dan hasilnya benar.
3. Kolom method dan dataset terlihat jelas.
4. Tombol `Lihat Prompt` membuka modal yang benar.
5. Expand/collapse row berjalan normal.
6. Temuan dan rekomendasi ringkas tampil tanpa duplikasi section lain.
7. Tidak ada card UI recipe lama yang tersisa.
8. Mobile tetap usable dengan horizontal scroll tabel.

## Regression Checklist
1. `npm run lint` harus lolos.
2. Latest tab dan history tab tetap berfungsi.
3. Publish/Rerun action tidak berubah.
4. Version comparison tetap tampil normal.
5. LLM review modal tidak terdampak.

## Catatan Teknis Implementasi
1. Tetap gunakan normalisasi hasil run agar legacy fixture tetap kompatibel.
2. Jika recipe tidak ada detail prompt, gunakan fallback message (jangan kosong diam).
3. Hindari query ulang data eksternal; gunakan data normalized di halaman run.
