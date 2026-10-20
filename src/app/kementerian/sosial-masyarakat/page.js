import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Sosial Masyarakat";
const logo = "/images/kementerian/logo-sosmas.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Sosial Masyarakat (Sosmas) merupakan kementerian yang memiliki peran strategis dalam mengoordinasikan kegiatan sosial, kemanusiaan, dan pemberdayaan masyarakat sebagai wujud kepedulian mahasiswa Universitas Andalas terhadap kondisi sosial di sekitarnya. Kementerian ini berfungsi menjadi jembatan antara kampus dan masyarakat, menghadirkan aksi nyata mahasiswa dalam menjawab berbagai persoalan sosial dan kemasyarakatan.";

const visi =
  "Mewujudkan Kementerian Sosial Masyarakat sebagai ruang pengabdian yang kolaboratif, inovatif, dan inklusif dalam menghadirkan makna pengabdian sosial serta kontribusi nyata KM UNAND bagi masyarakat.";

const misi = [
  "1. Membangun gerakan sosial kolaboratif bersama KM UNAND, organisasi mahasiswa, FORNASSOSMAS, dan lembaga sosial.",
  "2. Menumbuhkan kepedulian mahasiswa terhadap isu sosial melalui pendekatan edukatif dan partisipatif.",
  "3. Menghadirkan program inovatif dan inklusif yang memberikan manfaat nyata serta memperkuat empati dan solidaritas.",
  "4. Menjadi mitra strategis Universitas Andalas dalam kegiatan sosial dan pengabdian kepada masyarakat.",
  "5. Memperluas jejaring dan kontribusi sosial KM UNAND melalui keterlibatan aktif dalam FORNASSOSMAS di tingkat nasional.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Muhammad Rizki", jabatan: "Menteri", foto: "/images/kementerian/sosmas/orang/rizki.jpg" };
const sekretaris = { nama: "Tsabita Hanifah", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/sosmas/orang/tsabita.jpg" };
const bendahara = { nama: "Utari Rudianto Putri", jabatan: "Bendahara Menteri", foto: "/images/kementerian/sosmas/orang/utari.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Alfa Rino Svedrilio", jabatan: "Dirjen Pengabdian Masyarakat", foto: "/images/kementerian/sosmas/orang/alfa.jpg" },
  { nama: "Akhbar Wahyu Andika", jabatan: "Dirjen Sosial Project", foto: "/images/kementerian/sosmas/orang/akhbar.jpg" },
  { nama: "Hazizah Az Zahra", jabatan: "Dirjen Networking", foto: "/images/kementerian/sosmas/orang/hazizah.jpg" },
  { nama: "Riddick Perwira", jabatan: "Dirjen Media Kreatif", foto: "" },
  { nama: "Anisa Verdalina", jabatan: "Sekjen Pengabdian Masyarakat", foto: "/images/kementerian/sosmas/orang/anisa.jpg" },
  { nama: "Assyifa", jabatan: "Sekjen Sosial Project", foto: "/images/kementerian/sosmas/orang/assyifa.jpg" },
  { nama: "Siti Salma", jabatan: "Sekjen Networking", foto: "/images/kementerian/sosmas/orang/siti.jpg" },
  { nama: "Olga Dwi Febrina", jabatan: "Sekjen Media Kreatif", foto: "/images/kementerian/sosmas/orang/olga.jpg" },
  { nama: "Zhafran Naufal", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/zhafran.jpg" },
  { nama: "Maharani Rosadi", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/maharani.jpg" },
  { nama: "Haqna Sielmun", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/haqna.jpg" },
  { nama: "Ravingga Chandra P", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/ravingga.jpg" },
  { nama: "Muhammad Farid", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/farid.jpg" },
  { nama: "Dea Putri R", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/dea.jpg" },
  { nama: "Aysah Safitri", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/aysah.jpg" },
  { nama: "Dzaki Hadi Putra", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/dzaki.jpg" },
  { nama: "M Imam Mustafa", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/imam.jpg" },
  { nama: "Alvia Zahra", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/alvia.jpg" },
  { nama: "Rayhan Nofriansah", jabatan: "Staff", foto: "/images/kementerian/sosmas/orang/rayhan.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Sosmas Peduli",
    deskripsi: "Penyaluran bantuan berupa uang, sembako, pakaian, dan kebutuhan lainnya serta kegiatan kerelawanan bagi masyarakat yang membutuhkan.",
    foto: [],
  },
  {
    nama: "Sosmas Tanggap",
    deskripsi: "Aksi cepat tanggap bencana melalui penggalangan dana, bantuan kemanusiaan, dan dukungan psikososial bagi korban.",
    foto: [],
  },
  {
    nama: "Ramadhan Bersama Sosmas",
    deskripsi: "Kegiatan sosial selama Ramadan, seperti berbagi takjil, buka bersama anak yatim, belanja bersama yatim dan dhuafa, serta Kampung Ramadan.",
    foto: [],
  },
  {
    nama: "Sekolah Ruang Isyarat",
    deskripsi: "Edukasi bahasa isyarat dan kegiatan interaksi bersama penyandang disabilitas untuk meningkatkan inklusivitas dan mengurangi stigma.",
    foto: [],
  },
  {
    nama: "Ekspedisi Andalas",
    deskripsi: "Pengabdian mahasiswa selama 10–12 hari di desa yang membutuhkan melalui kegiatan pendidikan, kesehatan, lingkungan, dan pengembangan potensi lokal.",
    foto: [],
  },
  {
    nama: "PPK Ormawa",
    deskripsi: "Pengenalan dan pendampingan program pemberdayaan desa untuk meningkatkan kapasitas organisasi mahasiswa dalam pengabdian masyarakat.",
    foto: [],
  },
  {
    nama: "Sosial Relation",
    deskripsi: "Kunjungan kerja dan studi banding dengan BEM kampus lain, instansi pemerintah, NGO, dan komunitas sosial untuk membangun kemitraan.",
    foto: [],
  },
  {
    nama: "Angkatan Muda Sosmas (Adamas)",
    deskripsi: "Program kaderisasi untuk membentuk calon penerus Sosmas yang peduli terhadap isu sosial dan memiliki jiwa pengabdian.",
    foto: [],
  },
  {
    nama: "Salingka UNAND",
    deskripsi: "Forum koordinasi dan kolaborasi antara organisasi mahasiswa yang bergerak di bidang sosial, masyarakat, dan lingkungan.",
    foto: [],
  },
  {
    nama: "Sosmas Update",
    deskripsi: "Publikasi digital mengenai isu sosial, advokasi, donasi, dan hari besar melalui media sosial untuk meningkatkan kesadaran dan partisipasi mahasiswa.",
    foto: [],
  },
  {
    nama: "Memori Sang Pengabdi",
    deskripsi: "Dokumentasi kegiatan Sosmas selama satu periode dalam bentuk e-book, after movie, refleksi, dan arsip digital.",
    foto: [],
  },
  {
    nama: "Sosial Voice",
    deskripsi: "Wadah penyampaian opini dan diskusi mahasiswa mengenai isu sosial melalui tulisan, video, atau podcast.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function SosmasPage() {
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