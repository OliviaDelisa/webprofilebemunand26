import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Mitra Event dan Bisnis";
const logo = "/images/kementerian/logo-meb.png";

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
const menteri = { nama: "M Faiz Saqif", jabatan: "Menteri", foto: "" };
const sekretaris = { nama: "Zainini Arraysa", jabatan: "Sekretaris Menteri", foto: "" };
const bendahara = { nama: "Najwa Safira M", jabatan: "Bendahara Menteri", foto: "" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Habib Abdul Hakim", jabatan: "PIC Bisnis", foto: "" },
  { nama: "M Sultan Virzi Nasution", jabatan: "PIC Marketing", foto: "" },
  { nama: "Salsabila Afradiana", jabatan: "PIC Event", foto: "" },
  { nama: "Zaqira Azzahra M", jabatan: "PIC Partnership", foto: "" },
  { nama: "Satria Rahma Sinta", jabatan: "Sekretaris Bisnis", foto: "" },
  { nama: "Alya Zahwa", jabatan: "Sekretaris Marketing", foto: "" },
  { nama: "Nadya Salsabila A", jabatan: "Sekretaris Event", foto: "" },
  { nama: "Fahhmi Kurniawan", jabatan: "Sekretaris Partnership", foto: "" },
  { nama: "Nurhayati Adilla", jabatan: "Staff", foto: "" },
  { nama: "Marsha Nabila", jabatan: "Staff", foto: "" },
  { nama: "Ziqri Faiz Y", jabatan: "Staff", foto: "" },
  { nama: "Narnezza Salsavia", jabatan: "Staff", foto: "" },
  { nama: "Raisya Raiendra Poetri P", jabatan: "Staff", foto: "" },
  { nama: "Irfan Deri S", jabatan: "Staff", foto: "" },
  { nama: "Muqadis Khairy Y", jabatan: "Staff", foto: "" },
  { nama: "Putri Meyriza H", jabatan: "Staff", foto: "" },
  { nama: "Nofira Ronal A", jabatan: "Staff", foto: "" },
  { nama: "Nafahatir Ridwan", jabatan: "Staff", foto: "" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Entrepreneurship Development KM UNAND",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "MEB Shop",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Mitra Loyalty Program",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "MEB Marketplace",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Pekan Andalas",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
  {
    nama: "Andalas Young Preneur",
    deskripsi: "Deskripsi Program Kerja Deskripsi Program Kerja Deskripsi Program Kerja.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function MEBPage() {
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