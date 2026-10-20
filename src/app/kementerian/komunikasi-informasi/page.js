import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Komunikasi dan Informasi";
const logo = "/images/kementerian/logo-kominfo.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Komunikasi dan Informasi (Kominfo) merupakan kementerian yang bertanggung jawab dalam pengelolaan arus informasi dan publikasi BEM KM UNAND, baik secara internal maupun eksternal, melalui penghimpunan, pengelolaan, dan penyebarluasan informasi dari seluruh bidang dan kementerian melalui kanal komunikasi resmi, termasuk media sosial dan media publik lainnya.";

const visi =
  "Menjadikan BEM KM Unand sebagai lembaga yang proaktif dan selektif dalam penyebarluasan informasi terkini terkait isu pergerakan dan kegiatan BEM KM Unand yang diangkatkan secara kreatif dan inovatif.";

const misi = [
  "Membangun internal kementerian yang loyal dan profesional.",
  "Aktif menginformasikan kegiatan dan advokasi BEM KM UNAND.",
  "Menjadi media edukatif dan inspiratif bagi KM UNAND.",
  "Membangun citra positif BEM KM UNAND melalui publikasi informasi dan isu pergerakan.",
  "Menjadi media informasi yang cepat tanggap dalam pelayanan dan penyebaran informasi.",
];


// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "M Nabil Fadhli", jabatan: "Menteri", foto: "/images/kementerian/kominfo/orang/nabil.jpg" };
const sekretaris = { nama: "Rindatul Aisyah", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/kominfo/orang/rindatul.jpg" };
const bendahara = { nama: "Farhanatul Hilmi", jabatan: "Bendahara Menteri", foto: "/images/kementerian/kominfo/orang/farhanatul.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Nabilah Beta Putri", jabatan: "Dirjen Graphic Design", foto: "/images/kementerian/kominfo/orang/nabilah.jpg" },
  { nama: "Faisal Fahmi MZ", jabatan: "Dirjen Content Creator", foto: "/images/kementerian/kominfo/orang/faisal.jpg" },
  { nama: "King Haikal Faiz", jabatan: "Dirjen Public Relation", foto: "/images/kementerian/kominfo/orang/king.jpg" },
  { nama: "M Farhan Abdillah", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/farhan.jpg" },
  { nama: "Syonia Juliana", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/syonia.jpg" },
  { nama: "Alya Salsa Nabila", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/alya.jpg" },
  { nama: "M Ansyari Lutfi", jabatan: "Staff", foto: "" },
  { nama: "Cantika Adella Naura", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/cantika.jpg" },
  { nama: "M Tsaqif Taqi Badri", jabatan: "Staff", foto: "" },
  { nama: "Nabylla Putri Delvyant", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/nabylla.jpg" },
  { nama: "Nadiah Susanti", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/nadiah.jpg" },
  { nama: "M Ananda Akbar", jabatan: "Staff", foto: "" },
  { nama: "Annisa Dita Ramadhani", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/annisa.jpg" },
  { nama: "Umul Hafizah Asyira", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/umul.jpg" },
  { nama: "Milani Farah Septina", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/milani.jpg" },
  { nama: "Nabil Pratama", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/pratama.jpg" },
  { nama: "Suci Amellya Alandari", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/suci.jpg" },
  { nama: "Najwaa Arwaa Fauziyah", jabatan: "Staff", foto: "/images/kementerian/kominfo/orang/najwaa.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Launching Kabinet Rakit Makna",
    deskripsi:
      "Publikasi struktur kementerian, logo, maskot, dan akun media sosial resmi BEM KM UNAND sebagai pengenalan kabinet kepada mahasiswa dan masyarakat.",
    foto: [],
  },
  {
    nama: "Rakit Media",
    deskripsi:
      "Penyebarluasan informasi akademik, nonakademik, kegiatan BEM KM UNAND, dan isu terkini melalui konten grafis maupun video di media sosial.",
    foto: [],
  },
  {
    nama: "Sinergi Media UNAND (SIGMA)",
    deskripsi:
      "Forum koordinasi dan kolaborasi bidang media bersama Kominfo BEM fakultas dan UKM tingkat universitas melalui diskusi, pelatihan, dan webinar multimedia.",
    foto: [],
  },
  {
    nama: "Workshop Multimedia (WM)",
    deskripsi:
      "Pelatihan dan seminar untuk meningkatkan keterampilan desain grafis, fotografi, videografi, broadcasting, dan bidang multimedia lainnya.",
    foto: [],
  },
  {
    nama: "Rakit Media Spotlight",
    deskripsi:
      "Layanan promosi kegiatan organisasi dan lembaga melalui media sosial BEM KM UNAND sekaligus membangun kerja sama media partner yang saling menguntungkan.",
    foto: [],
  },
  {
    nama: "Temuin",
    deskripsi:
      "Publikasi informasi kehilangan dan penemuan barang melalui akun Instagram khusus untuk membantu mahasiswa UNAND menemukan barangnya.",
    foto: [],
  },
  {
    nama: "Visit Media",
    deskripsi:
      "Kunjungan ke lembaga atau perusahaan media lokal dan nasional untuk memperluas relasi, menambah wawasan, serta membuka peluang kerja sama publikasi.",
    foto: [],
  },
  {
    nama: "Mobile Agent",
    deskripsi:
      "Pelatihan bagi peserta Institut Generasi Muda Kementerian Kominfo untuk membekali mereka dengan keterampilan multimedia dan komunikasi sesuai kebutuhan kementerian.",
    foto: [],
  },
  {
    nama: "MaknaCast",
    deskripsi:
      "Podcast berbentuk video yang membahas isu kampus, daerah, dan nasional serta menghadirkan diskusi edukatif dan inspiratif bagi mahasiswa dan masyarakat.",
    foto: [],
  },
  {
    nama: "Rewind",
    deskripsi:
      "Publikasi rangkuman kegiatan dan perkembangan BEM KM UNAND dalam bentuk grafis, foto, dan video after movie sebagai dokumentasi, evaluasi, dan referensi kepengurusan berikutnya.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function KominfoPage() {
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