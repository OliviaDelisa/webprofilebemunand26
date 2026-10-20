import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";
import ProkerSlider from "@/components/kementerian/ProkerSlider";

// ===== 1. IDENTITAS =====
const nama = "Mitra Event dan Bisnis";
const logo = "/images/kementerian/logo-meb.png";

// ===== 2. DESKRIPSI, VISI, MISI =====
const deskripsi =
  "Kementerian Mitra, Event, dan Bisnis (MEB) merupakan kementerian yang memiliki tanggung jawab dalam membangun jejaring strategis, mengelola kegiatan berskala besar, serta mengoptimalkan potensi ekonomi kreatif di lingkungan BEM KM UNAND. Selain itu, kementerian ini berfungsi menginisiasi, mengelola, dan mengawasi pelaksanaan kegiatan berskala universitas seperti seminar maupun expo yang berorientasi pada peningkatan kapasitas dan ekonomi mahasiswa.";
const visi =
  "Menjadikan KMEB sebagai penggerak kemitraan strategis, pengelolaan event, serta pengembangan bisnis digital dan non-digital yang berkelanjutan sebagai upaya memperkuat kemandirian pendanaan melalui tata kelola yang profesional, kreatif, dan berdampak bagi KM Universitas Andalas.";

const misi = [
  "Mengelola kemitraan strategis internal dan eksternal secara profesional untuk mendukung kemandirian pendanaan BEM KM UNAND.",
  "Mengoptimalkan pengelolaan event dan kegiatan usaha sebagai sumber pendanaan berkelanjutan.",
  "Mengembangkan bisnis digital dan non-digital yang inovatif sesuai kebutuhan KM Universitas Andalas.",
  "Menumbuhkan jiwa kewirausahaan yang kreatif dan berdampak melalui fasilitasi kemitraan.",
];

// ===== 3. PIMPINAN (foto: "" = tampil siluet) =====
const menteri = { nama: "M Faiz Saqif", jabatan: "Menteri", foto: "/images/kementerian/meb/orang/faiz.jpg" };
const sekretaris = { nama: "Zainini Arraysa", jabatan: "Sekretaris Menteri", foto: "/images/kementerian/meb/orang/zainini.jpg" };
const bendahara = { nama: "Najwa Safira M", jabatan: "Bendahara Menteri", foto: "/images/kementerian/meb/orang/najwa.jpg" };

// ===== 4. STAFF (1 baris = 1 orang) =====
const staff = [
  { nama: "Habib Abdul Hakim", jabatan: "PIC Bisnis", foto: "/images/kementerian/meb/orang/habib.jpg" },
  { nama: "M Sultan Virzi Nasution", jabatan: "PIC Marketing", foto: "/images/kementerian/meb/orang/sultan.jpg" },
  { nama: "Salsabila Afradiana", jabatan: "PIC Event", foto: "/images/kementerian/meb/orang/salsabila.jpg" },
  { nama: "Zaqira Azzahra M", jabatan: "PIC Partnership", foto: "" },
  { nama: "Satria Rahma Sinta", jabatan: "Sekretaris Bisnis", foto: "/images/kementerian/meb/orang/satria.jpg" },
  { nama: "Alya Zahwa", jabatan: "Sekretaris Marketing", foto: "/images/kementerian/meb/orang/alya.jpg" },
  { nama: "Nadya Salsabila A", jabatan: "Sekretaris Event", foto: "/images/kementerian/meb/orang/nadya.jpg" },
  { nama: "Fahmi Kurniawan", jabatan: "Sekretaris Partnership", foto: "/images/kementerian/meb/orang/fahmi.jpg" },
  { nama: "Nurhayati Adilla", jabatan: "Staff", foto: "/images/kementerian/meb/orang/nurhayati.jpg" },
  { nama: "Marsha Nabila", jabatan: "Staff", foto: "/images/kementerian/meb/orang/marsha.jpg" },
  { nama: "Ziqri Faiz Y", jabatan: "Staff", foto: "/images/kementerian/meb/orang/ziqri.jpg" },
  { nama: "Narnezza Salsavia", jabatan: "Staff", foto: "/images/kementerian/meb/orang/narnezza.jpg" },
  { nama: "Raisya Raiendra Poetri P", jabatan: "Staff", foto: "/images/kementerian/meb/orang/raisya.jpg" },
  { nama: "Irfan Deri S", jabatan: "Staff", foto: "/images/kementerian/meb/orang/irfan.jpg" },
  { nama: "Muqadis Khairy Y", jabatan: "Staff", foto: "/images/kementerian/meb/orang/muqadis.jpg" },
  { nama: "Putri Meyriza H", jabatan: "Staff", foto: "/images/kementerian/meb/orang/putri.jpg" },
  { nama: "Nofira Ronal A", jabatan: "Staff", foto: "/images/kementerian/meb/orang/nofira.jpg" },
  { nama: "Nafahatir Ridwan", jabatan: "Staff", foto: "/images/kementerian/meb/orang/nafahatir.jpg" },
];

// ===== 5. PROGRAM KERJA =====
// foto: []                -> tanpa foto
// foto: ["/a.jpg"]        -> 1 foto
// foto: ["/a.jpg", "/b.jpg"] -> slider otomatis 5 detik
const proker = [
  {
    nama: "Entrepreneurship Development KM UNAND",
    deskripsi:
      "Mengadakan sosialisasi Program Pembinaan Mahasiswa Wirausaha (P2MW) serta workshop kemitraan, sponsorship, dan pendanaan event untuk meningkatkan keterampilan kewirausahaan mahasiswa.",
    foto: [],
  },
  {
    nama: "MEB Shop",
    deskripsi:
      "Menjalankan usaha penjualan produk secara langsung (offline), seperti makanan, minuman, dan produk kreatif, untuk menambah pemasukan BEM KM UNAND.",
    foto: [],
  },
  {
    nama: "Mitra Loyalty Program",
    deskripsi:
      "Membangun dan menjaga kerja sama dengan mitra internal maupun eksternal, seperti perusahaan, UMKM, instansi, dan organisasi, melalui pengelolaan kemitraan yang terstruktur.",
    foto: [],
  },
  {
    nama: "MEB Marketplace",
    deskripsi:
      "Mengembangkan penjualan dan pemasaran produk secara digital, termasuk produk kreatif, jasa konveksi, dan percetakan, untuk meningkatkan pendapatan organisasi.",
    foto: [],
  },
  {
    nama: "PANDA (Pekan Andalas)",
    deskripsi:
      "Menyelenggarakan kegiatan edukatif, rekreatif, dan kolaboratif untuk mempererat kebersamaan mahasiswa serta mengembangkan potensi kreatif dan akademis KM UNAND.",
    foto: [],
  },
  {
    nama: "Andalas Young Preneur",
    deskripsi:
      "Menyiapkan kader penerus KMEB melalui pengenalan tugas dan fungsi kementerian, pemahaman program kerja, serta pembekalan untuk regenerasi kepengurusan.",
    foto: [],
  },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function MEBPage() {
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