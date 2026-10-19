import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Audit Internal";
const logo = "/images/kementerian/logo-ai.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Inspektorat Audit Internal (IAI) merupakan unit pengawasan internal BEM KM UNAND Kabinet Rakit Makna yang bertugas memastikan akuntabilitas, transparansi, dan integritas organisasi. IAI melakukan pemantauan dan evaluasi kinerja seluruh kementerian secara independen serta memberikan rekomendasi untuk mendukung perbaikan kinerja dan keberlanjutan organisasi.";

const visi =
  "Terwujudnya sistem pengawasan dan pembinaan internal BEM KM UNAND Kabinet Rakit Makna yang independen, akuntabel, dan berorientasi pada perbaikan yang bermakna bagi seluruh pengurus dan kelembagaan.";

const misi = [
  "Mendukung Presiden dan Wakil Presiden Mahasiswa dalam mengambil keputusan berdasarkan data dan informasi yang akurat.",
  "Melaksanakan evaluasi kinerja seluruh kementerian secara berkala dan berbasis data.",
  "Membangun sistem pengawasan internal yang sederhana dan transparan.",
  "Menjadi mitra kementerian dalam memberikan masukan dan pembinaan.",
  "Memberikan rekomendasi konkret berdasarkan hasil evaluasi dan temuan lapangan.",
];


// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Akram Makruf Aidil", jabatan: "Inspektur", foto: "" };
const sekretaris = { nama: "Jamiatul Fitri", jabatan: "Sekretaris Inspektur", foto: "" };
const bendahara = { nama: "Deana Putri Ganaya", jabatan: "Bendahara Inspektur", foto: "" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Fahri Burrahman", jabatan: "Dirjen Harmonisasi Proker", foto: "" },
  { nama: "Aulia Rahman", jabatan: "Dirjen Evaluasi dan Pemantauan", foto: "" },
  { nama: "M Abdul Malik Al Khairi", jabatan: "Dirjen Media", foto: "" },
  { nama: "Stevhani Febria N", jabatan: "Sekjen Harmonisasi Proker", foto: "" },
  { nama: "Linda Oktavia", jabatan: "Sekjen Evaluasi dan Pemantauan", foto: "" },
  { nama: "Dayyana Silvia R", jabatan: "Staff", foto: "" },
  { nama: "Assyfa Nur Azizah", jabatan: "Staff", foto: "" },
  { nama: "Dimas Fajar Pratama", jabatan: "Staff", foto: "" },
  { nama: "Salsabilla Fitri", jabatan: "Staff", foto: "" },
  { nama: "Marsya Dinda Laura", jabatan: "Staff", foto: "" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Evaluasi dan Pemantauan",
    deskripsi:
      "Mengevaluasi kinerja pengurus dan keberjalanan program kerja setiap kementerian untuk mengidentifikasi pencapaian, kendala, serta perbaikan yang diperlukan.",
    foto: [],
  },
  {
    nama: "Upgrading Kabinet",
    deskripsi:
      "Pelatihan untuk meningkatkan pengetahuan organisasi, kemampuan pengurus, serta mempererat hubungan dan solidaritas antarpengurus.",
    foto: [],
  },
  {
    nama: "Ruang Makna",
    deskripsi:
      "Kegiatan kebersamaan seperti makan bersama, olahraga, dan diskusi untuk meningkatkan keakraban serta kekompakan pengurus.",
    foto: [],
  },
  {
    nama: "Leadership Development Program (LDP)",
    deskripsi:
      "Program pengembangan kepemimpinan melalui pelatihan dan pendampingan kelompok untuk meningkatkan kemampuan komunikasi, pengambilan keputusan, dan tanggung jawab pengurus.",
    foto: [],
  },
  {
    nama: "Rakit Makna Spotlight",
    deskripsi:
      "Bentuk apresiasi terhadap kinerja pengurus, presidium, dan kementerian untuk meningkatkan motivasi serta semangat berorganisasi.",
    foto: [],
  },
  {
    nama: "Rakit Makna Fair",
    deskripsi:
      "Perlombaan antarkementerian untuk memperkuat kerja sama tim, persaudaraan, dan kekompakan pengurus.",
    foto: [],
  },
  {
    nama: "Rakit Makna Final Chapter",
    deskripsi:
      "Kegiatan penutup kepengurusan yang menjadi ruang refleksi, apresiasi, dan perayaan kontribusi serta pencapaian Kabinet Rakit Makna selama satu periode.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function KementerianPage() {
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
            <ol className="km-misi" style={{ listStyle: "none", paddingLeft: 0 }}>
              {misi.map((m, i) => (
                <li key={i} style={{ display: "flex", gap: "0.5rem" }}>
                  <span>{i + 1}.</span>
                  <span>{m}</span>
                </li>
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