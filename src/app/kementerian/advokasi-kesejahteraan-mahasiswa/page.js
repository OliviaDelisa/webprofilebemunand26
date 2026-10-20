import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Advokasi dan Kesejahteraan Mahasiswa";
const logo = "/images/kementerian/logo-adkesma.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Advokasi dan Kesejahteraan Mahasiswa (Adkesma) merupakan kementerian yang memiliki fungsi utama dalam mengawal, menampung, dan memperjuangkan aspirasi serta permasalahan mahasiswa Universitas Andalas. Kementerian ini berkomitmen untuk memastikan setiap mahasiswa Universitas Andalas memperoleh hak akademik dan kesejahteraan yang layak, sejalan dengan prinsip keadilan dan inklusivitas kampus.";
const visi =
  "Mewujudkan lingkungan kampus yang adil dan sejahtera melalui advokasi yang responsif, berkelanjutan, serta berlandaskan pelayanan terhadap kebutuhan mahasiswa.";

const misi = [
  "Menjalankan advokasi yang responsif dan solutif.",
  "Mendorong kebijakan kampus yang pro-mahasiswa.",
  "Memfasilitasi layanan kesejahteraan mahasiswa.",
  "Membangun sistem advokasi yang inklusif dan berkelanjutan.",
  "Memperkuat sinergi dengan pihak internal dan eksternal kampus.",
];


// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Rayhan Masykuri", jabatan: "Menteri", foto: "/images/kementerian/adkesma/orang/rayhan.jpg" };
const sekretaris = { nama: "Oktavia Angraini", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/adkesma/orang/oktavia.jpg" };
const bendahara = { nama: "Salsadina Nazila", jabatan: "Bendahara Menteri", foto: "/images/kementerian/adkesma/orang/salsadina.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Hendra Kurniawan", jabatan: "Kepala Bidang Advokasi", foto: "/images/kementerian/adkesma/orang/hendra.jpg" },
  { nama: "Dita Pramudia Erina S", jabatan: "Kepala Bidang Kesma", foto: "/images/kementerian/adkesma/orang/dita.jpg" },
  { nama: "Nadhira Sarvigia", jabatan: "Kepala Bidang Media", foto: "/images/kementerian/adkesma/orang/nadhira.jpg" },
  { nama: "Amanda Syafitri", jabatan: "Sekretaris Bidang Advokasi", foto: "/images/kementerian/adkesma/orang/amanda.jpg" },
  { nama: "Joya Aidha Anna P", jabatan: "Sekretaris Bidang Kesma", foto: "/images/kementerian/adkesma/orang/joya.jpg" },
  { nama: "Nadya Avita Sari", jabatan: "Sekretaris Bidang Media", foto: "/images/kementerian/adkesma/orang/nadya.jpg" },
  { nama: "Pratama Putra Z", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/pratama.jpg" },
  { nama: "Daffah Alhabib Pane", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/daffa.jpg" },
  { nama: "Miftahul Jannah", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/miftahul.jpg" },
  { nama: "Muhammad Aditya", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/aditya.jpg" },
  { nama: "Ervan Radiansyah", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/ervan.jpg" },
  { nama: "Ibrahim Nikmatul A", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/ibrahim.jpg" },
  { nama: "Muhammad Rivandra M", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/rivan.jpg" },
  { nama: "Mutia Zahratul H", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/mutia.jpg" },
  { nama: "Zaki Ardiansyah", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/zaki.jpg" },
  { nama: "Salsabila Arsya A", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/salsabila.jpg" },
  { nama: "Olivvia", jabatan: "Staff", foto: "/images/kementerian/adkesma/orang/oliv.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Aksi Adkesma",
    deskripsi:
      "Audiensi dengan pimpinan Universitas Andalas untuk membahas permasalahan mahasiswa dan menyampaikan hasilnya kepada KM UNAND.",
    foto: [],
  },
  {
    nama: "FORKES dan Roadshow",
    deskripsi:
      "Forum koordinasi dan kunjungan bersama ADKESMA BEM Fakultas untuk bertukar informasi, menghimpun permasalahan, dan merumuskan solusi kesejahteraan mahasiswa.",
    foto: [],
  },
  {
    nama: "MENSIKMA (Menjemput Aspirasi Keluarga Mahasiswa)",
    deskripsi:
      "Forum diskusi bersama komting seluruh jurusan untuk menghimpun dan menindaklanjuti aspirasi serta permasalahan mahasiswa.",
    foto: [],
  },
  {
    nama: "Beasiswa Fair",
    deskripsi:
      "Pameran dan sosialisasi beasiswa yang menyediakan informasi, konsultasi, dan pembekalan teknis bagi mahasiswa yang ingin memperoleh beasiswa.",
    foto: [],
  },
  {
    nama: "Beasiswa Kabinet",
    deskripsi:
      "Bantuan finansial bagi mahasiswa aktivis kampus yang membutuhkan dukungan ekonomi untuk membantu keberlanjutan pendidikan.",
    foto: [],
  },
  {
    nama: "COMBA (Communication for MABA)",
    deskripsi:
      "Wadah komunikasi dan pendampingan mahasiswa baru melalui penyebaran informasi mengenai lingkungan kampus, akademik, dan kehidupan kemahasiswaan.",
    foto: [],
  },
  {
    nama: "A-YG (ADKESMA Young Generation)",
    deskripsi:
      "Pelatihan dan pembimbingan bagi generasi muda untuk memahami program kerja serta mempersiapkan calon penerus Kementerian ADKESMA.",
    foto: [],
  },
  {
    nama: "Sapa KM",
    deskripsi:
      "Wadah untuk menghimpun aspirasi, keresahan, dan permasalahan mahasiswa secara langsung agar dapat ditindaklanjuti oleh pihak terkait.",
    foto: [],
  },
  {
    nama: "Adkesmation",
    deskripsi:
      "Penyebaran informasi akademik dan kemahasiswaan melalui konten kreatif dan informatif di media sosial.",
    foto: [],
  },
  {
    nama: "Informasi Beasiswa dan Magang",
    deskripsi:
      "Penyebaran informasi mengenai peluang beasiswa dan magang melalui media sosial agar mahasiswa memperoleh akses informasi yang akurat dan terbaru.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function AdkesmaPage() {
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