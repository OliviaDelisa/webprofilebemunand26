import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Keuangan";
const logo = "/images/kementerian/logo-keuangan.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Keuangan (Kemenkeu) merupakan kementerian yang bertanggung jawab atas pengelolaan seluruh aktivitas keuangan BEM KM UNAND secara transparan dan akuntabel. Kemenkeu memiliki tugas dalam menyusun rencana anggaran tahunan, melakukan pencatatan keuangan, mengatur realisasi pendapatan dan pengeluaran, serta menyusun laporan pertanggungjawaban keuangan lembaga. Selain itu, kementerian ini berperan dalam mengembangkan sistem manajemen keuangan yang efisien dan terstandar, termasuk digitalisasi administrasi keuangan.";

const visi =
  "Mewujudkan pengelolaan keuangan BEM KM UNAND yang prudent, efisien, dan efektif dengan menjunjung tinggi prinsip transparansi dan akuntabilitas untuk tercapainya finansial organisasi yang produktif dan inklusif";

const misi = [
  "Menyusun anggaran setiap kementerian dan inspektorat secara efektif dan berkeadilan.",
  "Memastikan pelaksanaan anggaran berjalan tepat waktu dan tepat sasaran.",
  "Mewujudkan pelaporan keuangan yang transparan, akuntabel, dan tepat waktu.",
  "Mengawasi penyusunan laporan keuangan setiap kementerian dan inspektorat.",
  "Menerapkan sistem informasi perbendaharaan yang modern dan mudah dipahami.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Adilatunnisa", jabatan: "Menteri", foto: "/images/kementerian/keu/orang/adila.jpg" };
const sekretaris = { nama: "Tasya Frisyilian", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/keu/orang/tasya.jpg" };
const bendahara = { nama: "Annisa zikra MZ", jabatan: "Bendahara Menteri", foto: "/images/kementerian/keu/orang/annisa.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Nadia Putri Ardyni", jabatan: "Kepala Bidang Administrasi", foto: "/images/kementerian/keu/orang/nadia.jpg" },
  { nama: "Hanifa Salsabila Rista", jabatan: "Kepala Bidang Prokum", foto: "/images/kementerian/keu/orang/hanifa.jpg" },
  { nama: "Zenviro Dwi Jonsan", jabatan: "Staff", foto: "/images/kementerian/keu/orang/zenviro.jpg" },
  { nama: "Afiyah Rafif Rabbani", jabatan: "Staff", foto: "/images/kementerian/keu/orang/afi.jpg" },
  { nama: "Fariz Hasan Ghani", jabatan: "Staff", foto: "/images/kementerian/keu/orang/fariz.jpg" },
  { nama: "Kesya Kirfa Saputri", jabatan: "Staff", foto: "/images/kementerian/keu/orang/kesya.jpg" },
  { nama: "Zaki Yaa Rahman", jabatan: "Staff", foto: "/images/kementerian/keu/orang/zaki.jpg" },
  { nama: "Usy Fadillah", jabatan: "Staff", foto: "/images/kementerian/keu/orang/usy.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "RAPB BEM",
    deskripsi:
      "Menyusun rancangan anggaran pendapatan dan belanja untuk setiap kementerian dan inspektorat sebagai acuan pendanaan program kerja.",
    foto: [],
  },
  {
    nama: "Iuran Tetap BEM",
    deskripsi:
      "Mengumpulkan iuran dari setiap kementerian dan inspektorat sebagai salah satu sumber dana operasional BEM KM UNAND.",
    foto: [],
  },
  {
    nama: "Lingkar Kebendaharaan",
    deskripsi:
      "Membangun koordinasi dan melakukan pengawasan terhadap pencatatan serta pelaporan keuangan bersama bendahara kementerian dan inspektorat.",
    foto: [],
  },
  {
    nama: "Financial Reporting",
    deskripsi:
      "Menyusun dan memublikasikan laporan keuangan BEM KM UNAND secara berkala sesuai Standar Akuntansi Keuangan Entitas (SAK-E) yang berlaku di organisasi.",
    foto: [],
  },
  {
    nama: "Financial Insights",
    deskripsi:
      "Meningkatkan koordinasi, pemahaman, dan keteraturan pengelolaan keuangan bersama bendahara UKM UNAND.",
    foto: [],
  },
  {
    nama: "Workshop Kebendaharaan",
    deskripsi:
      "Memberikan pelatihan mengenai pencatatan, pelaporan, dan manajemen keuangan bagi pengurus organisasi mahasiswa.",
    foto: [],
  },
  {
    nama: "Fintalk (Financial Talk)",
    deskripsi:
      "Menyebarkan edukasi dan informasi mengenai keuangan serta perekonomian melalui konten media sosial.",
    foto: [],
  },
  {
    nama: "Institution Visit",
    deskripsi:
      "Mengunjungi institusi keuangan untuk memperoleh wawasan langsung, membangun relasi, dan membuka peluang kolaborasi.",
    foto: [],
  },
  {
    nama: "Young Financial Manager",
    deskripsi:
      "Mengenalkan Kementerian Keuangan kepada generasi muda BEM KM UNAND sekaligus membekali mereka dengan pengetahuan pengelolaan keuangan.",
    foto: [],
  },
  {
    nama: "Seminar Keuangan",
    deskripsi:
      "Memberikan edukasi mengenai pencatatan, pelaporan, dan manajemen keuangan kepada organisasi mahasiswa di tingkat Universitas Andalas dan universitas se-Sumatera Barat.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function KeuanganPage() {
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