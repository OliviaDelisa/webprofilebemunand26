import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Kebijakan Nasional";
const logo = "/images/kementerian/logo-jaknas.png";

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
const menteri = { nama: "Donal Syafriadi", jabatan: "Menteri", foto: "" };
const sekretaris = { nama: "Mutyia Rahmadina", jabatan: "Sekretaris Menteri", foto: "" };
const bendahara = { nama: "Wiria Yulfika", jabatan: "Bendahara Menteri", foto: "" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "M Aidil Ar Rasyid", jabatan: "Kepala Bidang Aksi dan Propaganda", foto: "" },
  { nama: "Sahara Nasyarah B", jabatan: "Kepala Bidang Kajian Strategis", foto: "" },
  { nama: "Mahardika Dwi C", jabatan: "Staff", foto: "" },
  { nama: "Nabilatul Afiah Agus", jabatan: "Staff", foto: "" },
  { nama: "Destiani", jabatan: "Staff", foto: "" },
  { nama: "Asarani", jabatan: "Staff", foto: "" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Kajian Strategis",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Opini Mahasiswa Autentik",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Menakar Indonesia",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Munir Muda",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Api Pergerakan",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Area Sospol",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Aksi Massa",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Discussion Collaborative",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Jaknas On Media",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Jaknas Goes To School",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function JaknasPage() {
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