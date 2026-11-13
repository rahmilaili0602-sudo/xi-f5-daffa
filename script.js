
/* =========================================================
   TAHAP 3 (JavaScript) - Membuat website CV menjadi interaktif
   Fitur:
   1. Teks mengetik otomatis
   2. Mode gelap / terang
   3. Menu hamburger (HP)
   4. Animasi muncul saat scroll + skill bar
   5. Validasi form kontak
   6. Tahun footer otomatis
   ========================================================= */

/* ---------- 1. Teks mengetik otomatis ----------
   TANTANGAN: ganti isi array "kalimat" dengan peranmu sendiri */
const kalimat = [
  "Siswa SMAN 1 Padang",
  "Calon Web Developer",
  "Pembelajar Kreatif"
];
const elTyping = document.getElementById("typing");
let idxKalimat = 0;
let idxHuruf = 0;
let menghapus = false;

function ketik() {
  const teksSaatIni = kalimat[idxKalimat];

  if (!menghapus) {
    idxHuruf++;                                   // tambah 1 huruf
  } else {
    idxHuruf--;                                   // hapus 1 huruf
  }
  elTyping.textContent = teksSaatIni.substring(0, idxHuruf);

  let jeda = menghapus ? 50 : 100;

  if (!menghapus && idxHuruf === teksSaatIni.length) {
    menghapus = true;                             // selesai mengetik -> tunggu, lalu hapus
    jeda = 1500;
  } else if (menghapus && idxHuruf === 0) {
    menghapus = false;                            // selesai menghapus -> kalimat berikutnya
    idxKalimat = (idxKalimat + 1) % kalimat.length;
    jeda = 400;
  }
  setTimeout(ketik, jeda);
}
ketik();

/* ---------- 2. Mode gelap / terang ---------- */
const tombolTema = document.getElementById("theme-btn");

// Ingat pilihan tema pengunjung (try-catch agar aman jika penyimpanan diblokir)
try {
  if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("gelap");
    tombolTema.textContent = "☀️";
  }
} catch (e) { /* abaikan */ }

tombolTema.addEventListener("click", function () {
  document.body.classList.toggle("gelap");
  const gelap = document.body.classList.contains("gelap");
  tombolTema.textContent = gelap ? "☀️" : "🌙";
  try { localStorage.setItem("tema", gelap ? "gelap" : "terang"); } catch (e) {}
});

/* ---------- 3. Menu hamburger ---------- */
const tombolMenu = document.getElementById("menu-btn");
const menu = document.getElementById("nav-menu");

tombolMenu.addEventListener("click", function () {
  menu.classList.toggle("buka");
});
// Tutup menu setelah salah satu link diklik
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("buka");
  });
});

/* ---------- 4. Animasi saat di-scroll ---------- */
const pengamat = new IntersectionObserver(function (daftar) {
  daftar.forEach(function (entri) {
    if (entri.isIntersecting) {
      entri.target.classList.add("muncul");

      // Jika section ini punya skill bar, isi lebarnya sesuai data-level
      entri.target.querySelectorAll(".isi").forEach(function (bar) {
        bar.style.width = bar.dataset.level + "%";
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(function (sec) {
  pengamat.observe(sec);
});

/* ---------- 5. Validasi form kontak ---------- */
const form = document.getElementById("form-kontak");

function tampilkanError(idInput, idError, pesan) {
  document.getElementById(idError).textContent = pesan;
  document.getElementById(idInput).classList.toggle("salah", pesan !== "");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();                             // cegah halaman reload

  const nama  = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const pesan = document.getElementById("pesan").value.trim();
  let valid = true;

  if (nama === "") {
    tampilkanError("nama", "err-nama", "Nama wajib diisi.");
    valid = false;
  } else {
    tampilkanError("nama", "err-nama", "");
  }

  if (!email.includes("@") || !email.includes(".")) {
    tampilkanError("email", "err-email", "Format email tidak valid.");
    valid = false;
  } else {
    tampilkanError("email", "err-email", "");
  }

  if (pesan.length < 10) {
    tampilkanError("pesan", "err-pesan", "Pesan minimal 10 karakter.");
    valid = false;
  } else {
    tampilkanError("pesan", "err-pesan", "");
  }

  const status = document.getElementById("status");
  if (valid) {
    status.textContent = "Terima kasih, " + nama + "! Pesanmu sudah terkirim (simulasi).";
    form.reset();
  } else {
    status.textContent = "";
  }
});

/* ---------- 6. Tahun footer otomatis ---------- */
document.getElementById("tahun-footer").textContent = new Date().getFullYear();

/* =========================================================
   TANTANGAN LANJUTAN (pilih minimal 1):
   a. Tambahkan tombol "Kembali ke atas" yang muncul setelah scroll 300px
   b. Tambahkan ucapan "Selamat pagi/siang/sore/malam" sesuai jam
   c. Buat tombol "Unduh CV" (link ke file PDF)
   d. Buat filter proyek berdasarkan kategori
   ========================================================= */