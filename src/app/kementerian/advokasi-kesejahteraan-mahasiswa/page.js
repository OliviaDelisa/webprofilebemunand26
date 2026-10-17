import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Dalam Negeri";
const logo = "/images/kementerian/logo-adkesma.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Deskripsi deskripsi deskripsi Deskripsi deskripsi deskripsi Deskripsi deskripsi deskripsi Deskripsi deskripsi deskripsi.";

const visi = "Visi visi visi visi Visi visi visi visi Visi visi visi visi.";

const misi = [
  "Misi misi misi misi",
  "Misi misi misi misi",
  "Misi misi misi misi",
  "Misi misi misi misi",
  "Misi misi misi misi",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Rayhan Masykuri", jabatan: "Menteri", foto: "" };
const sekretaris = { nama: "Oktavia Angraini", jabatan: "Sekretaris Menteri", foto: "" };
const bendahara = { nama: "Salsadina Nazila", jabatan: "Bendahara Menteri", foto: "" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Hendra Kurniawan", jabatan: "Kepala Bidang Advokasi", foto: "" },
  { nama: "Dita Pramudia Erina S", jabatan: "Kepala Bidang Kesma", foto: "" },
  { nama: "Nadhira Sarvigia", jabatan: "Kepala Bidang Media", foto: "" },
  { nama: "Amanda Syafitri", jabatan: "Sekretaris Bidang Advokasi", foto: "" },
  { nama: "Joya Aidha Anna P", jabatan: "Sekretaris Bidang Kesma", foto: "" },
  { nama: "Nadya Avita Sari", jabatan: "Sekretaris Bidang Media", foto: "" },
  { nama: "Pratama Putra Z", jabatan: "Staff", foto: "" },
  { nama: "Daffah Alhabib Pane", jabatan: "Staff", foto: "" },
  { nama: "Miftahul Jannah", jabatan: "Staff", foto: "" },
  { nama: "Muhammad Aditya", jabatan: "Staff", foto: "" },
  { nama: "Ervan Radiansyah", jabatan: "Staff", foto: "" },
  { nama: "Ibrahim Nikmatul A", jabatan: "Staff", foto: "" },
  { nama: "Muhammad Rivandra M", jabatan: "Staff", foto: "" },
  { nama: "Mutia Zahratul H", jabatan: "Staff", foto: "" },
  { nama: "Zaki Ardiansyah", jabatan: "Staff", foto: "" },
  { nama: "Salsabila Arsya A", jabatan: "Staff", foto: "" },
  { nama: "Olivvia", jabatan: "Staff", foto: "" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Aksi Adkesma",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "FORKES dan Roadshow",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "MENSIKMA",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Beasiswa Fair",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Beasiswa Kabinet",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "COMBA",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "A-YG",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Sapa KM",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Adkesmation",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Informasi Beasiswa dan Magang",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function AdkesmaPage() {
  return (
    <div className="km-page">
      <div className="km-wrap">
        <Link href="/" className="km-back">
          ← Kembali ke Home
        </Link>

        <header className="km-hero">
          <img className="km-hero-logo" src={logo} alt="" />
          <h1 className="km-hero-nama">{nama}</h1>
        </header>

        <section className="km-about">
          <p className="km-about-deskripsi">{deskripsi}</p>

          <div className="km-box">
            <h2>Visi</h2>
            <p>{visi}</p>
          </div>

          <div className="km-box">
            <h2>Misi</h2>
            <ol className="km-misi">
              {misi.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="km-pimpinan">
          <div className="km-pimpinan-sek">
            <KartuOrang {...sekretaris} />
          </div>
          <div className="km-pimpinan-menteri">
            <KartuOrang {...menteri} utama />
          </div>
          <div className="km-pimpinan-bend">
            <KartuOrang {...bendahara} />
          </div>
        </section>

        <section className="km-staff">
          {staff.map((orang, i) => (
            <KartuOrang key={i} {...orang} />
          ))}
        </section>

        <section className="km-judul">
          <h2>Program Kerja</h2>
        </section>

        <section className="km-proker-daftar">
          {proker.map((p, i) => (
            <article
              key={i}
              className={`km-proker ${p.foto.length === 0 ? "km-proker--teks" : ""}`}
            >
              <div className="km-proker-isi">
                <h3>{p.nama}</h3>
                <p>{p.deskripsi}</p>
              </div>

              {p.foto.length > 0 && <ProkerSlider foto={p.foto} nama={p.nama} />}
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}