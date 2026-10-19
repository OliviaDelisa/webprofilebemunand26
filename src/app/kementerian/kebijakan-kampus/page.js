import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Kebijakan Kampus";
const logo = "/images/kementerian/logo-jakpus.png";

// ===== 2. DESKRIPSI, VISI, MISI, MOTTO =====
const deskripsi =
  "Kementerian Kebijakan Kampus BEM KM UNAND berfokus pada pengkajian, pengawasan, dan advokasi isu serta kebijakan di lingkungan Universitas Andalas. Kementerian ini berperan menampung aspirasi mahasiswa, mengkritisi kebijakan kampus, dan memberikan rekomendasi berbasis data agar kebijakan yang diambil lebih sesuai dengan kebutuhan mahasiswa.";

const visi =
  "Menjadi kementerian yang inklusif, kolaboratif, dan solutif dalam mengawal serta menyikapi isu dan kebijakan kampus secara strategis, partisipatif, dan berbasis data guna mewujudkan kebijakan yang berpihak kepada KM UNAND melalui sinergi, gerakan advokatif, dan kebermanfaatan yang berkelanjutan";

const misi = [
  "Mengawal dan mengadvokasi isu kampus secara strategis dan berbasis data.",
  "Mendorong partisipasi serta daya kritis mahasiswa terhadap kebijakan kampus.",
  "Membangun sinergi dengan elemen kampus untuk menghadirkan kebijakan yang responsif dan berdampak.",
];

// Kosongkan ("") jika tidak ingin menampilkan motto
const motto = "Bersuara dengan Data, Bergerak dengan Makna";

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Muhammad Fajar Erlangga", jabatan: "Menteri", foto: "" };
const sekretaris = { nama: "Zaidatun Nisa", jabatan: "Sekretaris Menteri", foto: "" };
const bendahara = { nama: "Vania Amanda", jabatan: "Bendahara Menteri", foto: "" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Aslam Ali Mubarok Hasibuan", jabatan: "Dirjen Advokasi dan Relasi", foto: "" },
  { nama: "Muhammad Derry", jabatan: "Dirjen Riset dan Analisis", foto: "" },
  { nama: "Wulan Aulia Putri", jabatan: "Staff", foto: "" },
  { nama: "Rika Desma Sari", jabatan: "Staff", foto: "" },
  { nama: "Nafisah Naila Husna", jabatan: "Staff", foto: "" },
  { nama: "Bintang Chaesaria", jabatan: "Staff", foto: "" },
  { nama: "Naufal Nanda Desriyan", jabatan: "Staff", foto: "" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "UNAND MENYAPA",
    deskripsi:
      "Pertemuan langsung dengan pimpinan kampus untuk membahas isu dan memperjuangkan keputusan yang berpihak kepada KM UNAND, bekerja sama dengan Kementerian Adkesma.",
    foto: [],
  },
  {
    nama: "RINGKUSIAN",
    deskripsi:
      "Pembimbingan IGM Jakpus melalui keterlibatan dalam program kerja kementerian serta pembekalan terkait isu kampus dan pergerakan mahasiswa.",
    foto: [],
  },
  {
    nama: "KAJIAN STRATEGIS",
    deskripsi:
      "Penyusunan kajian atau policy brief berdasarkan sumber valid dan survei sebagai bahan pertimbangan bagi pimpinan kampus dalam menyelesaikan permasalahan.",
    foto: [],
  },
  {
    nama: "JAKPUS MENJERAT",
    deskripsi:
      "Pertemuan dengan BEM fakultas untuk menghimpun aspirasi dan permasalahan mahasiswa sebagai bahan kajian, propaganda, dan policy brief.",
    foto: [],
  },
  {
    nama: "BINCANG KAMPUS",
    deskripsi:
      "Forum diskusi berupa seminar, talkshow, podcast, atau webinar bersama narasumber yang kompeten untuk membahas isu kampus.",
    foto: [],
  },
  {
    nama: "API PERGERAKAN",
    deskripsi:
      "Pelatihan dan pembekalan mahasiswa mengenai pergerakan mahasiswa serta isu kampus, daerah, nasional, dan perempuan.",
    foto: [],
  },
  {
    nama: "JAKPUS NEWS",
    deskripsi:
      "Publikasi konten edukasi, propaganda isu kampus, dan press release audiensi melalui media sosial BEM KM UNAND.",
    foto: [],
  },
  {
    nama: "AKSI KAMPUS",
    deskripsi:
      "Aksi untuk menyampaikan aspirasi, kritik, dan tuntutan mahasiswa secara langsung kepada pimpinan Universitas Andalas.",
    foto: [],
  },
  {
    nama: "SURVEY JAKPUS",
    deskripsi:
      "Pengumpulan data dan informasi terkait isu kampus melalui survei daring maupun luring, bekerja sama dengan Kementerian Riset dan Keilmuan.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function JakpusPage() {
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

          {motto && (
            <div className="km-box">
              <h2>Motto</h2>
              <p>{motto}</p>
            </div>
          )}
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