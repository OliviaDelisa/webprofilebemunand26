import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Sekretaris Kabinet";
const logo = "/images/kementerian/logo-sekkab.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Sekretaris Kabinet (Sekkab) merupakan kementerian penyelenggara teknis administrasi yang menjadi penyangga seluruh kegiatan kelembagaan BEM KM UNAND. Sekkab berperan dalam pelayanan administrasi, pengarsipan dokumen, penataan ruang sekretariat, serta pengelolaan inventaris barang milik organisasi. Selain itu, Sekkab memiliki kewenangan dalam menyusun Standar Operasional Prosedur (SOP) kelembagaan, mengawal sistem tata naskah, serta menjadi mitra koordinatif dalam penyampaian regulasi antarlembaga.";

const visi =
  "Total dalam kesekretariatan, rapi dalam pengarsipan, dan loyal dalam kepengurusan.";

const misi = [
  "1. Menjalankan fungsi kesekretariatan dengan penuh tanggung jawab dan loyalitas.",
  "2. Mengoptimalkan fungsi sekretariat sebagai pusat kegiatan BEM KM Unand.",
  "3. Menjadi pusat data administrasi serta menyediakan kebutuhan kesekretariatan.",
  "4. Meningkatkan kinerja dan semangat kerja pengurus melalui lingkungan sekretariat yang nyaman.",
  "5. Membangun komitmen seluruh pengurus dalam menjaga kebersihan, kerapian, dan kenyamanan sekretariat.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Arifa Arsuna Hadi", jabatan: "Menteri", foto: "/images/kementerian/sekkab/orang/arifa.jpg" };
const sekretaris = { nama: "Atika Nabila Zahra", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/sekkab/orang/atika.jpg" };
const bendahara = { nama: "Sonia Maharani", jabatan: "Bendahara Menteri", foto: "/images/kementerian/sekkab/orang/sonia.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Ummu Syuhada El Azizah", jabatan: "Kepala Bidang Administrasi dan Penyuratan", foto: "/images/kementerian/sekkab/orang/ummu.jpg" },
  { nama: "Dewi Wulan Sari", jabatan: "Kepala Bidang Rumah Tangga dan Inventaris", foto: "/images/kementerian/sekkab/orang/dewi.jpg" },
  { nama: "Revalina Zianti", jabatan: "Staff", foto: "/images/kementerian/sekkab/orang/reva.jpg" },
  { nama: "Repalina Zulita", jabatan: "Staff", foto: "/images/kementerian/sekkab/orang/repa.jpg" },
  { nama: "Amanda Afilla", jabatan: "Staff", foto: "/images/kementerian/sekkab/orang/amanda.jpg" },
  { nama: "Nazwa Syahbani Hafifa", jabatan: "Staff", foto: "/images/kementerian/sekkab/orang/nazwa.jpg" },
  { nama: "Hanifa Rizki Ramadhan", jabatan: "Staff", foto: "/images/kementerian/sekkab/orang/hanifa.jpg" },
  { nama: "Aura Islami Arkan", jabatan: "Staff", foto: "/images/kementerian/sekkab/orang/aura.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Makna Well Duty",
    deskripsi: "Mengatur jadwal piket sekretariat untuk menjaga kebersihan, kerapian, keamanan, dan kenyamanan sekretariat.",
    foto: [],
  },
  {
    nama: "Makna Well Corner",
    deskripsi: "Menyediakan pojok self-love yang berisi kebutuhan pribadi, perlengkapan perawatan diri, P3K, serta kata-kata positif untuk mendukung kenyamanan pengurus.",
    foto: [],
  },
  {
    nama: "Makna Well United",
    deskripsi: "Melaksanakan kegiatan gotong royong untuk membersihkan dan menata ulang sekretariat agar lebih rapi, bersih, dan nyaman.",
    foto: [],
  },
  {
    nama: "Rakit Asset Management",
    deskripsi: "Melakukan pendataan, pengadaan, pemeliharaan, dan pengelolaan peminjaman inventaris BEM KM Unand.",
    foto: [],
  },
  {
    nama: "Rakit Talks: Book Edition",
    deskripsi: "Mengadakan diskusi dan bedah buku bertema kepemimpinan, sosial-politik, pergerakan mahasiswa, dan pengembangan diri untuk meningkatkan budaya literasi pengurus.",
    foto: [],
  },
  {
    nama: "Rakit Makna Archives",
    deskripsi: "Mengelola arsip digital dan fisik, seperti surat, proposal, laporan pertanggungjawaban, berita acara, sertifikat, dan dokumen penting organisasi.",
    foto: [],
  },
  {
    nama: "WORTEX (Word & Excel Tips)",
    deskripsi: "Membagikan konten edukatif melalui Instagram mengenai tips penggunaan Microsoft Word, Excel, serta keterampilan administrasi dan kesekretariatan.",
    foto: [],
  },
  {
    nama: "Secretariat Skill",
    deskripsi: "Mengadakan pelatihan administrasi dan kesekretariatan bagi pengurus BEM, sekretaris menteri, serta sekretaris dan kesekretariatan kepanitiaan.",
    foto: [],
  },
  {
    nama: "A Young Sekkab",
    deskripsi: "Program kaderisasi bagi mahasiswa untuk mempelajari administrasi, SOP kesekretariatan, dan pengelolaan rumah tangga kabinet sebagai calon penerus Kementerian Sekretaris Kabinet.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function SekkabPage() {
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