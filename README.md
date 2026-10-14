# Battle Bangun Ruang 1v1 — Mode Rebutan

Game kuis bangun ruang untuk dua kelompok, cocok ditampilkan di Smart TV. Soal pertama **belum muncul sebelum tombol “Mulai Pertandingan” ditekan**.

## Cara menjalankan
1. Ekstrak folder ZIP.
2. Buka VS Code.
3. Pilih **File → Open Folder**, lalu pilih folder `Battle-Bangun-Ruang-1v1-Rebutan`.
4. Buka `index.html` dan jalankan melalui browser, atau gunakan ekstensi **Live Server**.
5. Hubungkan laptop ke Smart TV memakai HDMI atau screen mirroring.
6. Atur nama kelompok jika diperlukan.
7. Tekan **Mulai Pertandingan** untuk menampilkan soal pertama.
8. Saat soal muncul, kedua perwakilan berebut menekan tombol kelompok masing-masing. Kelompok yang lebih dulu menekan tombol mendapat kesempatan menjawab.

## Aturan permainan
- Ada 12 soal bangun ruang dengan tingkat **sangat mudah**.
- Soal pertama hanya tampil setelah tombol **Mulai Pertandingan** ditekan.
- Kelompok yang lebih cepat menekan tombol rebutan mendapat kesempatan menjawab.
- Setelah rebutan dimenangkan, kelompok tersebut memiliki waktu **10 detik** untuk memilih jawaban.
- Jika jawaban benar, kelompok mendapat **10 poin**. Jawaban salah mendapat **0 poin**.
- Jika waktu 10 detik habis, soal **hangus**, tidak ada poin, dan game otomatis berpindah ke soal berikutnya setelah jeda singkat.
- Jika menjawab sebelum waktu habis, guru dapat menekan **Soal berikutnya** untuk melanjutkan.
- Setelah semua soal selesai, skor akhir dan pemenang ditampilkan.

## Struktur folder
- `index.html` — struktur halaman.
- `css/style.css` — tampilan layar dan timer.
- `js/game.js` — mekanisme rebutan, hitung mundur, skor, dan pergantian soal.
- `js/questions.js` — bank soal sangat mudah.
- `assets/images/` dan `assets/sounds/` — tempat aset gambar/suara tambahan (opsional).

Game berjalan di browser tanpa server atau instalasi tambahan. Font eksternal akan dipakai bila koneksi internet tersedia; jika tidak, browser menggunakan font pengganti.
