import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Pengembangan Sumber Daya Mahasiswa";
const logo = "/images/kementerian/logo-psdm.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Pengembangan Sumber Daya Mahasiswa (PSDM) BEM KM Universitas Andalas berfokus pada kaderisasi dan pengembangan potensi mahasiswa. PSDM berperan dalam meningkatkan kemampuan, karakter, kepemimpinan, dan soft skill mahasiswa melalui pelatihan, pendampingan, serta program pengembangan diri.";

const visi =
  "Menjadikan BEM KM UNAND sebagai ujung tombak kaderisasi untuk menghasilkan generasi emas penerus bangsa yang berkarakter, intelektual, kreatif, berdaya saing, berintegritas dalam pola pikir, serta mampu mengembangkan potensi dan minat mahasiswa Universitas Andalas.";

const misi = [
  "1. Membangun solidaritas untuk mengoptimalkan PSDM se-UNAND.",
  "2. Memfasilitasi peningkatan soft skill dan potensi mahasiswa aktif serta pascasarjana UNAND.",
  "3. Menciptakan mahasiswa yang intelektual, produktif, berkarakter, dan kreatif.",
  "4. Memberikan wadah dan apresiasi bagi mahasiswa berprestasi di bidang akademik maupun nonakademik.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Wahyu Septio Afrima", jabatan: "Menteri", foto: "" };
const sekretaris = { nama: "Apwanil Husni", jabatan: "Sekretaris Menteri", foto: "" };
const bendahara = { nama: "Audira Anandan Palwati", jabatan: "Bendahara Menteri", foto: "" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Khairul Ikhsan", jabatan: "Kepala Bidang Peminatan dan Pengembangan", foto: "" },
  { nama: "Nursyabani", jabatan: "Kepala Bidang Kaderisasi", foto: "" },
  { nama: "Handika Imam Prasetya", jabatan: "Kepala Bidang Media", foto: "" },
  { nama: "Angel Mawardi Putri", jabatan: "Sekretaris Bidang Peminatan dan Pengembangan", foto: "" },
  { nama: "Chelsea Zalianda", jabatan: "Sekretaris Bidang Kaderisasi", foto: "" },
  { nama: "Khairani Al Fawwaz", jabatan: "Staff", foto: "" },
  { nama: "Shangrila Wijaya Gunawan", jabatan: "Staff", foto: "" },
  { nama: "Salsabila Zahra", jabatan: "Staff", foto: "" },
  { nama: "Muhammad Reyhan", jabatan: "Staff", foto: "" },
  { nama: "Habli Ef Irsanda", jabatan: "Staff", foto: "" },
  { nama: "Marsya Fitri Anindya", jabatan: "Staff", foto: "" },
  { nama: "Aulia Rahma Azzuhra", jabatan: "Staff", foto: "" },
  { nama: "Laudya Maharani Gusman", jabatan: "Staff", foto: "" },
  { nama: "Fathur Rozy", jabatan: "Staff", foto: "" },
  { nama: "Aliva Aliyatul Zahra", jabatan: "Staff", foto: "" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Sarasehan PSDM se-UNAND",
    deskripsi: "Forum koordinasi PSDM tingkat universitas dan fakultas untuk menyelaraskan serta mengevaluasi kaderisasi.",
    foto: [],
  },
  {
    nama: "LKMM-TM Nasional",
    deskripsi: "Pelatihan kepemimpinan tingkat lanjut untuk meningkatkan wawasan, kemampuan manajemen organisasi, dan jiwa kepemimpinan mahasiswa.",
    foto: [],
  },
  {
    nama: "Institut Generasi Muda (IGM)",
    deskripsi: "Sekolah kepemimpinan bagi mahasiswa UNAND melalui materi, simulasi, diskusi kelompok, dan pengenalan BEM KM.",
    foto: [],
  },
  {
    nama: "Samara Muda Berkarya (Samudra)",
    deskripsi: "Program magang di Kementerian PSDM bagi peserta IGM melalui materi inspiratif, diskusi, proyek sosial, dan keterlibatan dalam kegiatan kementerian.",
    foto: [],
  },
  {
    nama: "Bintang Aktivis Kampus (BAK)",
    deskripsi: "Pemberian penghargaan kepada mahasiswa yang aktif berorganisasi dan/atau berprestasi.",
    foto: [],
  },
  {
    nama: "Eduskill",
    deskripsi: "Pelatihan keterampilan, persiapan kompetisi, pengembangan potensi, serta persiapan pendidikan dan karier pascakampus.",
    foto: [],
  },
  {
    nama: "Andalas X Plorer",
    deskripsi: "Kegiatan pengenalan Universitas Andalas kepada siswa SMA se-Sumatera Barat melalui open house, pameran fakultas, dan talkshow inspiratif.",
    foto: [],
  },
  {
    nama: "NARASI (Narasi Kaderisasi & Peminatan, Pengembangan Diri)",
    deskripsi: "Publikasi informasi dan konten edukatif mengenai organisasi, kaderisasi, dan pengembangan diri mahasiswa melalui media sosial.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function PSDMPage() {
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