import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Luar Negeri";
const logo = "/images/kementerian/logo-luneg.png";

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
const menteri = { nama: "M Isra Septiadi", jabatan: "Menteri", foto: "" };
const sekretaris = { nama: "Magfira Shabrina", jabatan: "Sekretaris Menteri", foto: "" };
const bendahara = { nama: "Nanda Sakinan Azzahra", jabatan: "Bendahara Menteri", foto: "" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Fito Torano", jabatan: "Dirjen Internal", foto: "" },
  { nama: "Muhammad Afif", jabatan: "Dirjen Eksternal", foto: "" },
  { nama: "Muhammad Afif", jabatan: "Dirjen Media Kreatif", foto: "" },
  { nama: "Delia Yusnita", jabatan: "Sekjen Internal", foto: "" },
  { nama: "Zakiya Aura Silmi", jabatan: "Sekjen Eksternal", foto: "" },
  { nama: "Afri Olivia Putri", jabatan: "Sekjen Media Kreatif", foto: "" },
  { nama: "Mutia Ersa Christine Dawolo", jabatan: "Staff", foto: "" },
  { nama: "Fadel Sardi", jabatan: "Staff", foto: "" },
  { nama: "Shankara Premaswara Micheleanglo", jabatan: "Staff", foto: "" },
  { nama: "Muhammad Zhafran Fharraz F", jabatan: "Staff", foto: "" },
  { nama: "Zakaria Nanda Putra", jabatan: "Staff", foto: "" },
  { nama: "Zaskia Mutmainnah", jabatan: "Staff", foto: "" },
  { nama: "Putri Assyifa", jabatan: "Staff", foto: "" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Konsolidasi Aliansi BEM",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Delegasi",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Misi Diplomatik",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "BEM KM Around The World",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Temu Inisiatif",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Proxenus",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Api Pergerakan",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Dialog Internasional",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Luneg on Media",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "BUku Tahunan Luneg",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function LunegPage() {
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