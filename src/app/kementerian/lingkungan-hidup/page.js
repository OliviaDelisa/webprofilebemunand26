import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Lingkungan Hidup";
const logo = "/images/kementerian/logo-linghup.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Lingkungan Hidup (Linghup) merupakan kementerian yang bertanggung jawab dalam merancang dan melaksanakan program-program yang berorientasi pada pelestarian lingkungan dan pembangunan berkelanjutan di lingkungan Universitas Andalas maupun masyarakat sekitar. Kementerian Lingkungan Hidup berkomitmen menjadikan BEM KM UNAND sebagai pelopor gerakan hijau yang solutif, ilmiah, dan berkelanjutan, serta berperan aktif dalam mendukung pencapaian SDGs, khususnya pada pilar lingkungan.";

const visi =
  "Mengintegrasikan gerakan mahasiswa dan pengabdian masyarakat untuk menciptakan solusi lingkungan yang nyata, berdampak, dan berkelanjutan.";

const misi = [
  "Menjalankan program pengabdian lingkungan yang berkelanjutan dan terukur.",
  "Mengawal isu lingkungan kampus dan daerah secara responsif serta berbasis data.",
  "Meningkatkan kesadaran lingkungan melalui edukasi dan kampanye perubahan perilaku.",
  "Membangun kemitraan strategis untuk mendukung pelaksanaan program lingkungan.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Firmansyah", jabatan: "Menteri", foto: "/images/kementerian/linghup/orang/firman.jpg" };
const sekretaris = { nama: "Ratu Tegar Aqidah", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/linghup/orang/ratu.jpg" };
const bendahara = { nama: "Afifah Az Zahro", jabatan: "Bendahara Menteri", foto: "/images/kementerian/linghup/orang/afifah.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Muhammad Adittya", jabatan: "Dirjen Networking", foto: "/images/kementerian/linghup/orang/adit.jpg" },
  { nama: "Nayla Adinda", jabatan: "Dirjen Aksi dan Pengabdian", foto: "/images/kementerian/linghup/orang/nayla.jpg" },
  { nama: "Muhammad Fadlika Akbar", jabatan: "Dirjen Kajian dan Advokasi", foto: "/images/kementerian/linghup/orang/dika.jpg" },
  { nama: "Leo Saputra", jabatan: "Dirjen Media Kreatif", foto: "/images/kementerian/linghup/orang/leo.jpg" },
  { nama: "Bunga Athirah Salsabila", jabatan: "Sekjen Networking", foto: "/images/kementerian/linghup/orang/bunga.jpg" },
  { nama: "Wardah Raudhatul Jannah", jabatan: "Sekjen Aksi dan Pengabdian", foto: "/images/kementerian/linghup/orang/wardah.jpg" },
  { nama: "Ika Fasya Sisilia", jabatan: "Sekjen Kajian dan Advokasi", foto: "/images/kementerian/linghup/orang/ika.jpg" },
  { nama: "Aliyati Zahira", jabatan: "Sekjen Media Kreatif", foto: "/images/kementerian/linghup/orang/aliya.jpg" },
  { nama: "Khairunnisa Ramadhani", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/khai.jpg" },
  { nama: "Nazlla Kayla Navita", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/nazlla.jpg" },
  { nama: "Raghib Attarigh Almagribi", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/raghib.jpg" },
  { nama: "Irvan Fernando", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/irvan.jpg" },
  { nama: "Hana Karimah", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/hana.jpg" },
  { nama: "Fauziah Zahra", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/fau.jpg" },
  { nama: "Manik Anindhya Maulaya", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/manik.jpg" },
  { nama: "Winda Pratiwi", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/winda.jpg" },
  { nama: "Cindy Clarissa Putri", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/cindy.jpg" },
  { nama: "M Akbar Putra Asaki", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/asaki.jpg" },
  { nama: "Mutiara Chundra Tita", jabatan: "Staff", foto: "/images/kementerian/linghup/orang/mutiara.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Enviro Movement",
    deskripsi:
      "Wadah edukasi, diskusi, kajian, observasi lapangan, dan riset untuk meningkatkan pemahaman serta kepedulian terhadap isu lingkungan.",
    foto: [],
  },
  {
    nama: "Green Rangers Event",
    deskripsi:
      "Kegiatan lingkungan berskala nasional yang mencakup perlombaan, aksi lingkungan, expo, dan roadshow sekolah untuk meningkatkan partisipasi serta keterampilan masyarakat dalam menjaga lingkungan.",
    foto: [],
  },
  {
    nama: "Enviro Xplore",
    deskripsi:
      "Aksi lingkungan yang diawali dengan edukasi dan dilaksanakan di wilayah yang membutuhkan penanganan khusus untuk meningkatkan kesadaran serta keterlibatan masyarakat.",
    foto: [],
  },
  {
    nama: "LinkHup",
    deskripsi:
      "Program pengembangan jejaring dan kolaborasi dengan organisasi mahasiswa, komunitas, NGO, serta instansi yang bergerak di bidang lingkungan hidup.",
    foto: [],
  },
  {
    nama: "Enviro Creative",
    deskripsi:
      "Publikasi konten edukasi, kajian, propaganda, dan dokumentasi kegiatan lingkungan melalui media sosial untuk meningkatkan kesadaran masyarakat.",
    foto: [],
  },
  {
    nama: "Evergreen Generation",
    deskripsi:
      "Program pembekalan dan praktik bagi staf magang atau generasi muda untuk mengenalkan program kerja, nilai, serta peran Kementerian Lingkungan Hidup sebagai persiapan regenerasi.",
    foto: [],
  },
  {
    nama: "Andalas Climate Watch",
    deskripsi:
      "Unit respons cepat yang menyusun policy brief dan siaran pers terkait isu lingkungan prioritas, seperti sampah kampus, fasilitas isi ulang air, dan kawasan bebas rokok.",
    foto: [],
  },
  {
    nama: "Enviro Force",
    deskripsi:
      "Program pengabdian lingkungan terpadu di nagari mitra yang berfokus pada penerapan solusi nyata dan edukasi masyarakat secara berkelanjutan.",
    foto: [],
  },
  {
    nama: "Podcast “Suara Rimba”",
    deskripsi:
      "Wadah diskusi lingkungan yang dikemas secara santai tetapi berbobot melalui cerita pengalaman alam, kisah masyarakat terdampak bencana, dan pembahasan kebijakan lingkungan.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function LinghupPage() {
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