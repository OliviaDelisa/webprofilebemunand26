import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Dalam Negeri";
const logo = "/images/kementerian/logo-dagri.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Dalam Negeri (Dagri) merupakan kementerian yang berperan dalam mengoordinasikan hubungan kelembagaan internal dan menjaga stabilitas hubungan antarorganisasi mahasiswa di lingkungan Universitas Andalas. Kementerian ini berfungsi membangun sinergi dan komunikasi antara BEM KM UNAND dengan lembaga kemahasiswaan di tingkat fakultas, Unit Kegiatan Mahasiswa (UKM), serta Himpunan Mahasiswa Daerah (HIMADA). Melalui pendekatan koordinatif dan partisipatif, Kemendagri memastikan terciptanya iklim kemahasiswaan yang solid, inklusif, dan berorientasi pada kolaborasi.";

const visi =
  "Berkontribusi secara aktif dan masif untuk memberikan pelayanan yang menyeluruh kepada KM Universitas Andalas guna menuju KM Universitas Andalas yang harmoni dan saling bersinergi";

const misi = [
  "Menjadi poros pelayanan yang terpercaya bagi seluruh Keluarga Mahasiswa Universitas Andalas.",
  "Membina hubungan baik dengan UKM, BEM Fakultas, dan HIMADA.",
  "Menjadi wadah kolaborasi bagi seluruh elemen kemahasiswaan Universitas Andalas.",
  "Memberikan pelayanan nyata dan menampung aspirasi seluruh KM UNAND.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "Muhammad Adriyan", jabatan: "Menteri", foto: "/images/kementerian/dagri/orang/adriyan.jpg" };
const sekretaris = { nama: "Yolanda Putri Tanjung", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/dagri/orang/yolanda.jpg" };
const bendahara = { nama: "Magfira Izzani", jabatan: "Bendahara Menteri", foto: "/images/kementerian/dagri/orang/magfira.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Fathan Athallah", jabatan: "Kepala Sektor BEM F", foto: "/images/kementerian/dagri/orang/fathan.jpg" },
  { nama: "Fauzan Nur Hakim", jabatan: "Kepala Sektor HIMADA", foto: "" },
  { nama: "Sulthan Naufal Perdana", jabatan: "Kepala Sektor UKM", foto: "/images/kementerian/dagri/orang/sulthan.jpg" },
  { nama: "Muhammad Aldo Mulyawan", jabatan: "Kepala Sektor PROGMED", foto: "/images/kementerian/dagri/orang/aldo.jpg" },
  { nama: "Maisarah Luthfiya", jabatan: "Sekretaris Sektor BEM F", foto: "/images/kementerian/dagri/orang/maisarah.jpg" },
  { nama: "Bunga Jacinda", jabatan: "Sekretaris Sektor HIMADA", foto: "/images/kementerian/dagri/orang/bunga.jpg" },
  { nama: "Parisa Silvani", jabatan: "Sekretaris Sektor UKM", foto: "/images/kementerian/dagri/orang/parisa.jpg" },
  { nama: "Sri Anzhila Maharani", jabatan: "Sekretaris Sektor PROGMED", foto: "/images/kementerian/dagri/orang/sri.jpg" },
  { nama: "Annisa Verlyana", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/annisa.jpg" },
  { nama: "Muhammad Fadhli Abdurrahman", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/fadhli.jpg" },
  { nama: "Muhammad Zaky Alqifari", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/zaky.jpg" },
  { nama: "Rendi Renaldi", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/rendi.jpg" },
  { nama: "Ferdi Oktavianus", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/ferdi.jpg" },
  { nama: "Fitri Latifah Adani", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/fitri.jpg" },
  { nama: "Rezi Maharani", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/rezi.jpg" },
  { nama: "Imam Nurzaki Islami", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/imam.jpg" },
  { nama: "Aulia Putri Ramadhani", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/aulia.jpg" },
  { nama: "Agil Putra", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/agil.jpg" },
  { nama: "Iqbal Ilham", jabatan: "Staff", foto: "/images/kementerian/dagri/orang/iqbal.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Konsolidasi",
    deskripsi:
      "Forum diskusi dan koordinasi bersama BEM Fakultas, UKM, dan elemen KM UNAND untuk membahas isu terkini serta menyamakan arah pergerakan mahasiswa.",
    foto: [],
  },
  {
    nama: "TRAPI (Tracking Aspirasi)",
    deskripsi:
      "Kunjungan ke BEM Fakultas, UKM, dan HIMADA untuk mempererat silaturahmi, menghimpun aspirasi, serta mengidentifikasi permasalahan yang perlu ditindaklanjuti BEM KM UNAND.",
    foto: [],
  },
  {
    nama: "BAKTI",
    deskripsi:
      "Kegiatan pengenalan kampus bagi mahasiswa baru untuk memperkenalkan lingkungan, aktivitas akademik, dan kegiatan nonakademik di Universitas Andalas.",
    foto: [],
  },
  {
    nama: "SAUDAGRI (Saudara Dalam Negeri)",
    deskripsi:
      "Program pengembangan generasi muda melalui Institut Generasi Muda (IGM) untuk menanamkan nilai-nilai Kemendagri dan mempersiapkan calon penerus kementerian.",
    foto: [],
  },
  {
    nama: "Memory Makers",
    deskripsi:
      "Kegiatan kebersamaan, seperti open house dan buka bersama ormawa, untuk mempererat keakraban, solidaritas, dan hubungan antarlembaga mahasiswa.",
    foto: [],
  },
  {
    nama: "PODKASTRA (Podcast Kampus Serta Ormawa)",
    deskripsi:
      "Podcast yang menghadirkan perwakilan BEM Fakultas, UKM, dan HIMADA untuk berbagi informasi, memperkenalkan lembaga, serta memperluas relasi mahasiswa.",
    foto: [],
  },
  {
    nama: "AGA (Andalas Global Awards)",
    deskripsi:
      "Ajang penghargaan bagi mahasiswa dan lembaga kemahasiswaan berprestasi sebagai bentuk apresiasi terhadap kontribusi, kreativitas, dan pencapaian di Universitas Andalas.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function DagriPage() {
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