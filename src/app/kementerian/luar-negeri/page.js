import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Luar Negeri";
const logo = "/images/kementerian/logo-luneg.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Luar Negeri merupakan kementerian yang memiliki wewenang dan tanggung jawab dalam mengatur serta mengelola hubungan antara BEM KM UNAND dengan organisasi mahasiswa serta lembaga atau instansi di eksternal kampus Universitas Andalas. Kementerian ini berperan penting sebagai gerbang awal BEM KM UNAND dalam menghimpun perjuangan di kancah daerah, nasional, maupun internasional.";
const visi =
  "Menjadi Simpul Diplomasi Mahasiswa yang Inklusif, Kolaboratif, dan Solutif dalam Membangun Jejaring Strategis untuk Mewujudkan UNAND dan Indonesia yang Harmonis";

const misi = [
  "Membangun relasi produktif dengan universitas dan lembaga eksternal melalui diplomasi yang hangat dan sinergis.",
  "Mengawal isu nasional maupun internasional secara solutif dan berbasis data.",
  "Mengoptimalkan kontribusi mahasiswa UNAND dalam agenda strategis regional maupun nasional.",
  "Membangun citra positif BEM KM UNAND melalui karya dan kontribusi nyata bagi UNAND dan Indonesia.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "M Isra Septiadi", jabatan: "Menteri", foto: "/images/kementerian/luneg/orang/isra.jpg" };
const sekretaris = { nama: "Magfira Shabrina", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/luneg/orang/fira.jpg" };
const bendahara = { nama: "Nanda Sakinan Azzahra", jabatan: "Bendahara Menteri", foto: "/images/kementerian/luneg/orang/nanda.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Fito Torano", jabatan: "Dirjen Internal", foto: "/images/kementerian/luneg/orang/fito.jpg" },
  { nama: "Muhammad Afif", jabatan: "Dirjen Eksternal", foto: "/images/kementerian/luneg/orang/afif.jpg" },
  { nama: "Muhammad Hafiz", jabatan: "Dirjen Media Kreatif", foto: "/images/kementerian/luneg/orang/hafiz.jpg" },
  { nama: "Delia Yusnita", jabatan: "Sekjen Internal", foto: "/images/kementerian/luneg/orang/delia.jpg" },
  { nama: "Zakiya Aura Silmi", jabatan: "Sekjen Eksternal", foto: "/images/kementerian/luneg/orang/zakiya.jpg" },
  { nama: "Afri Olivia Putri", jabatan: "Sekjen Media Kreatif", foto: "/images/kementerian/luneg/orang/afri.jpg" },
  { nama: "Mutia Ersa Christine Dawolo", jabatan: "Staff", foto: "/images/kementerian/luneg/orang/mutia.jpg" },
  { nama: "Fadel Sardi", jabatan: "Staff", foto: "/images/kementerian/luneg/orang/fadel.jpg" },
  { nama: "Shankara Premaswara Micheleanglo", jabatan: "Staff", foto: "/images/kementerian/luneg/orang/shankara.jpg" },
  { nama: "Muhammad Zhafran Fharraz F", jabatan: "Staff", foto: "/images/kementerian/luneg/orang/fharraz.jpg" },
  { nama: "Zakaria Nanda Putra", jabatan: "Staff", foto: "/images/kementerian/luneg/orang/zakaria.jpg" },
  { nama: "Zaskia Mutmainnah", jabatan: "Staff", foto: "/images/kementerian/luneg/orang/zaskia.jpg" },
  { nama: "Putri Assyifa", jabatan: "Staff", foto: "/images/kementerian/luneg/orang/putri.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Konsolidasi Aliansi BEM",
    deskripsi:
      "Pertemuan dan diskusi bersama BEM/DEMA se-Sumatera Barat dan Indonesia untuk memperkuat koordinasi, menyatukan arah gerakan, serta menyalurkan aspirasi mahasiswa.",
    foto: [],
  },
  {
    nama: "Delegasi",
    deskripsi:
      "Mengelola pengiriman perwakilan BEM KM UNAND untuk mengikuti kegiatan eksternal sekaligus memperluas relasi dan membawa nama baik universitas.",
    foto: [],
  },
  {
    nama: "Misi Diplomatik",
    deskripsi:
      "Melakukan kunjungan dan memfasilitasi kementerian BEM KM UNAND untuk berdiskusi serta menjalin kerja sama dengan kampus, lembaga, dan instansi eksternal.",
    foto: [],
  },
  {
    nama: "BEM KM Around The World",
    deskripsi:
      "Kegiatan studi banding, kunjungan, dan seminar bersama mahasiswa Indonesia di luar negeri untuk memperluas wawasan internasional serta memperoleh informasi beasiswa.",
    foto: [],
  },
  {
    nama: "Temu Inisiatif",
    deskripsi:
      "Pertemuan dengan alumni BEM KM UNAND dan IKA UNAND untuk mempererat silaturahmi, mendata alumni, serta membangun jejaring dukungan bagi organisasi.",
    foto: [],
  },
  {
    nama: "Proxenus",
    deskripsi:
      "Program pembekalan dan kaderisasi untuk meningkatkan kemampuan organisasi, kepemimpinan, komunikasi, public speaking, serta pemahaman hubungan eksternal.",
    foto: [],
  },
  {
    nama: "Api Pergerakan",
    deskripsi:
      "Pelatihan dan diskusi mengenai gerakan mahasiswa serta isu kampus, daerah, nasional, dan perempuan untuk meningkatkan pemahaman dan kepedulian mahasiswa.",
    foto: [],
  },
  {
    nama: "Dialog Internasional",
    deskripsi:
      "Kegiatan kajian, seminar, propaganda, atau podcast yang membahas isu global dan kaitannya dengan Indonesia untuk meningkatkan wawasan serta kepedulian mahasiswa.",
    foto: [],
  },
  {
    nama: "Luneg on Media",
    deskripsi:
      "Publikasi digital melalui Instagram yang menyajikan edukasi isu internasional, informasi kegiatan, dokumentasi, dan penguatan citra Kementerian Luar Negeri.",
    foto: [],
  },
  {
    nama: "Buku Tahunan Luneg",
    deskripsi:
      "Dokumentasi perjalanan, capaian, dinamika, dan pengalaman Kementerian Luar Negeri selama satu periode sebagai arsip, bahan refleksi, dan pembelajaran bagi kepengurusan berikutnya.",
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