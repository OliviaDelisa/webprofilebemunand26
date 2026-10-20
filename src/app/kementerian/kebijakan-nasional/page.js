import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Kebijakan Nasional";
const logo = "/images/kementerian/logo-jaknas.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Kebijakan Nasional (Jaknas) merupakan kementerian yang berperan dalam mengkaji, menganalisis, dan merespons isu-isu kebijakan publik di tingkat nasional. Kementerian ini bertugas memperkuat posisi BEM KM UNAND dalam jaringan pergerakan mahasiswa nasional melalui kegiatan advokasi, kajian strategis, dan publikasi kebijakan publik. Jaknas bertujuan mendorong mahasiswa Universitas Andalas untuk berpikir kritis, berorientasi data, dan berkontribusi terhadap perbaikan kebijakan nasional secara konstruktif.";
const visi =
  "Terwujudnya Kementerian Kebijakan Nasional BEM KM UNAND sebagai kementerian yang edukatif, responsif, dan solutif dalam mengkaji serta mengawal isu-isu nasional melalui gerakan yang inklusif, kolaboratif, dan berdampak bagi mahasiswa dan masyarakat.";

const misi = [
  "Membangun internal kementerian yang solid, adaptif, dan berkelanjutan.",
  "Meningkatkan kualitas kajian strategis terkait isu nasional melalui kolaborasi dengan BEM Fakultas dan elemen KM UNAND.",
  "Mengawal isu nasional melalui advokasi, kajian kebijakan, dan gerakan intelektual mahasiswa.",
  "Meningkatkan kesadaran mahasiswa terhadap permasalahan nasional melalui edukasi, diskusi, dan publikasi.",
  "Mendorong budaya literasi dan minat menulis mahasiswa dalam merespons isu nasional.",
  "Memperkuat koordinasi gerakan KM UNAND agar respons terhadap isu nasional lebih terarah dan berkelanjutan.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Donal Syafriadi", jabatan: "Menteri", foto: "/images/kementerian/jaknas/orang/donal.jpg" };
const sekretaris = { nama: "Mutyia Rahmadina", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/jaknas/orang/mutyia.jpg" };
const bendahara = { nama: "Wiria Yulfika", jabatan: "Bendahara Menteri", foto: "/images/kementerian/jaknas/orang/wiria.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "M Aidil Ar Rasyid", jabatan: "Kepala Bidang Aksi dan Propaganda", foto: "/images/kementerian/jaknas/orang/aidil.jpg" },
  { nama: "Sahara Nasyarah B", jabatan: "Kepala Bidang Kajian Strategis", foto: "/images/kementerian/jaknas/orang/sahara.jpg" },
  { nama: "Mahardika Dwi C", jabatan: "Staff", foto: "/images/kementerian/jaknas/orang/mahardika.jpg" },
  { nama: "Nabilatul Afiah Agus", jabatan: "Staff", foto: "/images/kementerian/jaknas/orang/nabilatul.jpg" },
  { nama: "Destiani", jabatan: "Staff", foto: "/images/kementerian/jaknas/orang/destiani.jpg" },
  { nama: "Asarani", jabatan: "Staff", foto: "/images/kementerian/jaknas/orang/asarani.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Kajian Strategis",
    deskripsi:
      "Mengkaji isu dan kebijakan nasional melalui kajian tertulis, infografis, dan judicial review sebagai dasar pergerakan mahasiswa.",
    foto: [],
  },
  {
    nama: "OPMATIK (Opini Mahasiswa Autentik)",
    deskripsi:
      "Mewadahi mahasiswa untuk menghasilkan tulisan opini atau karya visual terkait isu nasional, daerah, dan kampus yang dipublikasikan melalui media.",
    foto: [],
  },
  {
    nama: "Menakar Indonesia",
    deskripsi:
      "Mengadakan diskusi, seminar, talkshow, bedah buku, bedah film, atau podcast untuk meningkatkan pemahaman dan kepedulian mahasiswa terhadap isu nasional.",
    foto: [],
  },
  {
    nama: "Munir Muda",
    deskripsi:
      "Membina generasi muda BEM KM UNAND agar memahami isu nasional, mengenal pergerakan mahasiswa, dan siap menjadi penerus Kementerian Kebijakan Nasional.",
    foto: [],
  },
  {
    nama: "Api Pergerakan",
    deskripsi:
      "Memberikan pelatihan dan pembekalan mengenai pergerakan mahasiswa serta isu kampus, daerah, nasional, dan perempuan.",
    foto: [],
  },
  {
    nama: "ARES (Area Sospol)",
    deskripsi:
      "Menjalin komunikasi dan diskusi dengan BEM Fakultas untuk bertukar pandangan, menampung aspirasi, serta menyusun respons terhadap isu strategis.",
    foto: [],
  },
  {
    nama: "Aksi Massa",
    deskripsi:
      "Melaksanakan aksi kolektif sebagai bentuk sikap mahasiswa dalam merespons dan mengawal kebijakan serta isu nasional.",
    foto: [],
  },
  {
    nama: "Discussion Collaborative",
    deskripsi:
      "Membangun kolaborasi dan diskusi dengan BEM se-Indonesia untuk bertukar gagasan dan merumuskan solusi terhadap isu nasional.",
    foto: [],
  },
  {
    nama: "Jaknas on Media",
    deskripsi:
      "Menghasilkan konten edukasi dan propaganda mengenai isu nasional dalam bentuk gambar, video, animasi, dokumenter, podcast, dan media kreatif lainnya.",
    foto: [],
  },
  {
    nama: "Jaknas Goes to School",
    deskripsi:
      "Mengadakan sosialisasi dan edukasi bagi pelajar SMA di Sumatera Barat untuk meningkatkan pemahaman kritis, kepedulian sosial, dan partisipasi terhadap isu nasional.",
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