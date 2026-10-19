import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Pergerakan Perempuan";
const logo = "/images/kementerian/logo-pp.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Pergerakan Perempuan BEM KM Universitas Andalas berfokus pada pengawalan isu perempuan dan anak, pemberdayaan perempuan, serta peningkatan kesadaran terhadap kesetaraan gender dan pencegahan kekerasan. Kementerian ini menjadi wadah bagi mahasiswi untuk mengembangkan potensi, memperluas jaringan, menyampaikan aspirasi, serta berkontribusi dalam gerakan perempuan melalui kajian, advokasi, edukasi, diskusi, dan kegiatan pengembangan diri.";

const visi =
  "Sebagai wadah pergerakan mahasiswi yang ekspansif dan kontributif dalam upaya pencerdasan perempuan, pemberdayaan dan relasi jaringan dengan karakteristik intelektual dan moralitas.";

const misi = [
  "1. Mengawal dan berkontribusi aktif terhadap isu perempuan dan anak di tingkat regional maupun nasional.",
  "2. Memberdayakan mahasiswi UNAND melalui pencerdasan intelektual dan pembentukan karakter moral yang kuat.",
  "3. Membangun dan memperluas jaringan strategis untuk memperkuat gerakan perempuan.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Tiara Chairunnisa", jabatan: "Menteri", foto: "" };
const sekretaris = { nama: "Sausan Rasyifah", jabatan: "Sekretaris Menteri", foto: "" };
const bendahara = { nama: "Vanessa Regina Ali", jabatan: "Bendahara Menteri", foto: "" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Nuzliyati Khairiyah", jabatan: "Dirjen Pergerakan", foto: "" },
  { nama: "Hafiza Afdila", jabatan: "Dirjen Pemberdayaan", foto: "" },
  { nama: "Ghaniyyah Zahirah Jilan", jabatan: "Dirjen Media dan Humas", foto: "" },
  { nama: "Silvia Ramadani", jabatan: "Staff", foto: "" },
  { nama: "Faelasufah Maulida", jabatan: "Staff", foto: "" },
  { nama: "Putri Asa Abinda", jabatan: "Staff", foto: "" },
  { nama: "Qatrun Nada Wimala", jabatan: "Staff", foto: "" },
  { nama: "Syafia Althafunnisa", jabatan: "Staff", foto: "" },
  { nama: "Chrestella Cathlin", jabatan: "Staff", foto: "" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "KAPOSPER (Kajian dan Propaganda Seputar Perempuan)",
    deskripsi: "Mengkaji isu perempuan dan anak di lingkungan kampus, daerah, dan nasional sebagai dasar edukasi, audiensi, serta penyusunan pernyataan sikap.",
    foto: [],
  },
  {
    nama: "Women Care",
    deskripsi: "Menyediakan layanan pengaduan dan advokasi terkait kekerasan seksual, ujaran kebencian, dan perundungan bagi Keluarga Mahasiswa UNAND.",
    foto: [],
  },
  {
    nama: "Bunga Bicara",
    deskripsi: "Mengadakan diskusi interaktif atau podcast bersama narasumber untuk membahas isu perempuan dan anak di tingkat kampus, daerah, dan nasional.",
    foto: [],
  },
  {
    nama: "Api Pergerakan",
    deskripsi: "Memberikan pelatihan mengenai pergerakan mahasiswa, kajian isu strategis, penyusunan kajian, dan praktik orasi untuk membentuk kader pergerakan.",
    foto: [],
  },
  {
    nama: "Lingkar Puan",
    deskripsi: "Menjadi forum konsolidasi dan diskusi rutin bagi organisasi perempuan di lingkungan UNAND untuk memperkuat solidaritas, koordinasi, dan advokasi perempuan.",
    foto: [],
  },
  {
    nama: "Women Class",
    deskripsi: "Mengadakan kelas pengembangan keterampilan perempuan, seperti kerajinan, tata rias, dekorasi kue, dan kelas pranikah sesuai kebutuhan mahasiswa.",
    foto: [],
  },
  {
    nama: "Srikandi Muda",
    deskripsi: "Menyiapkan kader penerus Kementerian Pergerakan Perempuan melalui pelatihan kajian, diskusi isu perempuan, dan pengembangan keterampilan.",
    foto: [],
  },
  {
    nama: "Semarak Hari Kartini",
    deskripsi: "Memperingati perjuangan R.A. Kartini melalui kegiatan daring yang mendorong kreativitas, pemikiran kritis, dan kesadaran terhadap sejarah perjuangan perempuan.",
    foto: [],
  },
  {
    nama: "PP ON MEDIA",
    deskripsi: "Menyebarkan edukasi dan gagasan tentang isu perempuan dan anak melalui tulisan, media sosial, konten inspiratif, serta podcast Perempuan Bercerita.",
    foto: [],
  },
  {
    nama: "PP GO VISIT",
    deskripsi: "Melaksanakan kunjungan ke instansi terkait, forum perempuan di kampus lain, serta kegiatan edukasi ke sekolah untuk memperluas jaringan dan meningkatkan pemahaman tentang isu perempuan.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function PPPage() {
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
            <h2>Motto</h2>
            <p>Perempuan Berkarya, Punya Peran Penuh Makna</p>
          </div>

          <div className="km-box">
            <h2>Visi</h2>
            <p>{visi}</p>
          </div>

          <div className="km-box">
            <h2>Misi</h2>
            <ol className="km-misi" style={{ listStyleType: "none" }}>
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