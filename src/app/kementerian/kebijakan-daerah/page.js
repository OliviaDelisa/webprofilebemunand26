import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Kebijakan Daerah";
const logo = "/images/kementerian/logo-jakda.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Kebijakan Daerah (Kemenjakda) BEM KM UNAND merupakan kementerian yang berperan dalam mengkaji, mengawal, dan merespons isu serta kebijakan pemerintah daerah, khususnya di Sumatera Barat. Kementerian ini memiliki dua bidang utama, yaitu Kajian Strategis (Kastrat) yang berfokus pada kajian isu dan kebijakan daerah, serta Aksi dan Propaganda (Akprop) yang berfokus pada penyampaian sikap dan penggerakan mahasiswa. Melalui diskusi, publikasi, pendidikan politik, dan aksi kolektif, Kemenjakda mendorong mahasiswa agar kritis, aktif, dan terlibat dalam mengawal kebijakan daerah.";

const visi =
  "BEM KM UNAND sebagai sentral dan ruang pergerakan mahasiswa secara kritis, adaptif, aktif dan solutif dalam menyikapi berbagai isu sosial politik di tingkat daerah Sumatera Barat.";

const misi = [
  "Menjadi garda terdepan pergerakan mahasiswa dalam mengawal kebijakan pemerintah daerah Sumatera Barat.",
  "Meningkatkan pemahaman mahasiswa terhadap isu sosial dan politik melalui pendidikan politik.",
  "Mengembangkan kajian strategis berbasis data dan riset lapangan sebagai dasar advokasi kebijakan.",
  "Menghadirkan ruang dialog yang inklusif antara mahasiswa, masyarakat, dan pemerintah daerah.",
  "Mengawal kebijakan daerah secara proaktif, berkelanjutan, dan terukur, mulai dari perumusan hingga implementasi.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Nibras Ananta Ferdinand", jabatan: "Menteri", foto: "" };
const sekretaris = { nama: "Cahyani Putri Yana", jabatan: "Sekretaris Menteri", foto: "" };
const bendahara = { nama: "Atikah Handayani", jabatan: "Bendahara Menteri", foto: "" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Amar Rotua Hasibuan", jabatan: "Kepala Bidang Aksi dan Propaganda", foto: "" },
  { nama: "Fitri Nurul Hikmah", jabatan: "Kepala Bidang Kajian Strategis", foto: "" },
  { nama: "Maria Karunia M", jabatan: "Staff", foto: "" },
  { nama: "Suci Ramadhani N", jabatan: "Staff", foto: "" },
  { nama: "Keisya Amara Putri", jabatan: "Staff", foto: "" },
  { nama: "Nur Afifah", jabatan: "Staff", foto: "" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "ORASI (Obrolan Santai Intelektual)",
    deskripsi:
      "Mengadakan diskusi mengenai isu sosial dan politik daerah untuk meningkatkan pemahaman mahasiswa serta menyelaraskan arah gerakan BEM KM UNAND dan BEM Fakultas.",
    foto: [],
  },
  {
    nama: "Jakda News",
    deskripsi:
      "Menyebarkan informasi mengenai isu sosial-politik dan perkembangan kebijakan daerah melalui infografis, konten, dan propaganda di media sosial.",
    foto: [],
  },
  {
    nama: "Laskar Merah Garuda",
    deskripsi:
      "Membina generasi muda BEM KM UNAND agar memahami isu politik daerah serta memiliki kemampuan dalam kajian dan propaganda.",
    foto: [],
  },
  {
    nama: "Api Pergerakan",
    deskripsi:
      "Memberikan pelatihan dan edukasi mengenai pergerakan mahasiswa serta isu kampus, daerah, nasional, dan perempuan.",
    foto: [],
  },
  {
    nama: "EKSIS (Eskalasi Sinergis)",
    deskripsi:
      "Menyelenggarakan diskusi dan koordinasi bersama berbagai elemen mahasiswa serta pihak terkait untuk menyusun strategi dan menyelaraskan tuntutan sebelum aksi atau audiensi.",
    foto: [],
  },
  {
    nama: "DIKSI (Diskusi Isu Intelektual)",
    deskripsi:
      "Mengadakan diskusi dalam format podcast untuk membahas isu sosial, politik, budaya, dan akademik sekaligus menampung aspirasi dari mahasiswa dan masyarakat.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function JakdaPage() {
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