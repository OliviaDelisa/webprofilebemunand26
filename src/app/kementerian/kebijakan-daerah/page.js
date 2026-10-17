import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Kebijakan Daerah";
const logo = "/images/kementerian/logo-jakda.png";

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
const menteri = { nama: "NIbras Ananta Ferdinand", jabatan: "Menteri", foto: "" };
const sekretaris = { nama: "Cahyani Putri Yana", jabatan: "Sekretaris Menteri", foto: "" };
const bendahara = { nama: "Atikah Handayani", jabatan: "Bendahara Menteri", foto: "" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Amar Rotua Hasibuan", jabatan: "Kepala Bidang Aksi dan Propaganda", foto: "" },
  { nama: "Fitri Nurul Hikmah", jabatan: "Kepala Bidang Kajian Strategis", foto: "" },
  { nama: "Maria Karunia M", jabatan: "Staff", foto: "" },
  { nama: "Suci Ramadhani N", jabatan: "Staff", foto: "" },
  { nama: "Keisya Amara Putri", jabatan: "Staff", foto: "" },
  { nama: "Nur Afifah", jabatan: "Staff", foto: "" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Obrolan Santai Intelektual",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Jakda News",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Laskar Merah Garuda",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Api Pergerakan",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Eskalasi Sinergis",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Diskusi Isu Intelektual",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function JakdaPage() {
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