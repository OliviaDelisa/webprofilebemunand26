import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Riset dan Keilmuan";
const logo = "/images/kementerian/logo-risken.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Badan Eksekutif Mahasiswa Keluarga Mahasiswa Universitas Andalas (BEM KM UNAND) merupakan lembaga representatif mahasiswa yang didukung oleh kementerian-kementerian untuk meningkatkan kinerja program kerja. Kementerian Riset dan Keilmuan berperan dalam pemecahan masalah melalui pencarian, penemuan, pengembangan, dan pengujian pengetahuan. Kementerian ini mengembangkan website BEM KM UNAND untuk meningkatkan transparansi dan menyediakan open data di lingkungan universitas, serta mengolah data menjadi informasi yang relevan dan mudah dipahami mahasiswa, civitas akademika, maupun masyarakat umum. Melalui penyediaan, analisis, pengkajian, dan pengarsipan data, serta edukasi keilmuan, Kementerian Riset dan Keilmuan turut mendukung pencerdasan dan pengembangan minat serta bakat KM UNAND.";

const visi = "Menjadikan Risken sebagai Pusat Inkubasi Keilmuan yang Didukung oleh Infrastruktur Digital Terpadu untuk Mewujudkan Pergerakan Mahasiswa yang Berbasis Data dan Prestatif";

const misi = [
  "1. Menyediakan basis data dan referensi yang up to date untuk mendukung pergerakan BEM KM UNAND",
  "2. Melakukan riset terhadap fenomena atau isu-isu yang sedang berkembang di lingkup Universitas Andalas",
  "3. Melakukan pencerdasan pada KM UNAND melalui data",
  "4. Mengolah data yang didapatkan menjadi info melalui Media sosial BEM KM UNAND",
  "5. Mengembangkan fasilitas teknologi informasi di BEM KM UNAND",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Ebit Basri Panca Coswara", jabatan: "Menteri", foto: "/images/kementerian/riset-keilmuan/orang/ebit.jpg" };
const sekretaris = { nama: "Zakiya Khairizani", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/riset-keilmuan/orang/kiya.jpg" };
const bendahara = { nama: "Trici Ayunda", jabatan: "Bendahara Menteri", foto: "/images/kementerian/riset-keilmuan/orang/trici.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Fathiya Alzhafira", jabatan: "Direktur Media dan Networking", foto: "/images/kementerian/riset-keilmuan/orang/fathiya.jpg" },
  { nama: "Olivia Delisa", jabatan: "Direktur Digital Development", foto: "/images/kementerian/riset-keilmuan/orang/olivia.jpg" },
  { nama: "Muhammad Fajri Ramadhani", jabatan: "Direktur Research dan Achievement", foto: "/images/kementerian/riset-keilmuan/orang/fajri.jpg" },
  { nama: "Aisyah Zhakia", jabatan: "Sekretaris Direktur Media dan Networking", foto: "/images/kementerian/riset-keilmuan/orang/aisyah.jpg" },
  { nama: "Ammar Qussoyyi Akmal", jabatan: "Sekretaris Direktur Digital Development", foto: "/images/kementerian/riset-keilmuan/orang/ammar.jpg" },
  { nama: "Rahma Mutiara Tanjung", jabatan: "Sekretaris Direktur Research dan Achievement", foto: "/images/kementerian/riset-keilmuan/orang/mutiara.jpg" },
  { nama: "Gerta Prayoga", jabatan: "Staff", foto: "/images/kementerian/riset-keilmuan/orang/gerta.jpg" },
  { nama: "Nurul Mutia Rahmi", jabatan: "Staff", foto: "/images/kementerian/riset-keilmuan/orang/mutia.jpg" },
  { nama: "Muhammad Firman", jabatan: "Staff", foto: "/images/kementerian/riset-keilmuan/orang/firman.jpg" },
  { nama: "Muhammad Dzakwan Resmana", jabatan: "Staff", foto: "/images/kementerian/riset-keilmuan/orang/dzakwan.jpg" },
  { nama: "Alvin Maulana", jabatan: "Staff", foto: "/images/kementerian/riset-keilmuan/orang/alvin.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Database UNAND",
    deskripsi: "Mengumpulkan serta mempublikasi data yang bisa dimanfaatkan oleh KM UNAND yang bersumber dari mahasiswa maupun civitas akademik.",
    foto: [],
  },
  {
    nama: "Unand Insight",
    deskripsi: "Merupakan rangkaian kegiatan riset data primer yang kegiatannya terdiri dari menghimpun pandangan mahasiswa UNAND melalui survei, pembuatan infografis serta publikasi hasil. Kuisioner disebar melalui media sosial.",
    foto: [],
  },
  {
    nama: "Gen Risken",
    deskripsi: "Menyusun kurikulum dan jadwal kegiatan Generasi Muda Kementerian Riset dan Keilmuan.",
    foto: [],
  },
  {
    nama: "Rakit Akademia",
    deskripsi: "Program workshop/pelatihan untuk membuat suatu karya ilmiah yang nantinya akan dipandu langsung oleh Mapres Fakultas/Mapres UNAND/Mahasiswa yang lolos PIMNAS/lomba bergengsi lainnya.",
    foto: [],
  },
  {
    nama: "Radar Prestasi",
    deskripsi: "Program yang menyediakan informasi lomba bagi keluarga mahasiswa UNAND, sekaligus menjadi wadah apresiasi bagi mahasiswa berprestasi.",
    foto: [],
  },
  {
    nama: "Sekolah Prestasi",
    deskripsi: "Program pembinaan yang dirancang untuk mencetak mahasiswa berprestasi di Universitas Andalas melalui pelatihan, mentoring, dan pendampingan terstruktur dalam pengembangan akademik maupun non-akademik.",
    foto: [
      "/images/kementerian/riset-keilmuan/proker/sekolahmapres1.JPG",
    ],
  },
  {
    nama: "Media Information",
    deskripsi: "Menyediakan desain bagi seluruh program kerja Risken yang membutuhkan desain visual.",
    foto: [],
  },
  {
    nama: "Risken Tour",
    deskripsi: "Melakukan kunjungan ke BEM Fakultas yang ada di Universitas Andalas maupun luar UNAND guna mempererat tali silaturrahmi dan upaya bertukar pengetahuan terkait riset, keilmuan, serta teknologi.",
    foto: [
      "/images/kementerian/riset-keilmuan/proker/bemuaxbemfp.jpeg",
      "/images/kementerian/riset-keilmuan/proker/bemuaxbemfpet.jpg",
    ],
  },
  {
    nama: "Suara UNAND",
    deskripsi: "Program berbasis website yang menjadi wadah penampungan aspirasi mahasiswa Universitas Andalas untuk menyampaikan kritik, saran, dan isu kampus secara terstruktur dan terdokumentasi. Platform ini membantu organisasi mahasiswa dalam mengidentifikasi permasalahan serta melakukan evaluasi dan perbaikan kinerja.",
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
            <ol className="km-misi">
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