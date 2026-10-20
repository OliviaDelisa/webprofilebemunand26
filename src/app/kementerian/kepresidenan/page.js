import Link from "next/link";
import "../kementerian.css";
import KartuOrang from "@/components/kementerian/KartuOrang";

// ===== 1. IDENTITAS =====
const nama = "Kepresidenan";
const logo = "/images/kementerian/logo-kepresidenan.png";

// ===== 2. DESKRIPSI =====
const deskripsi =
  "Pusat koordinasi seluruh kementerian dan penggerak arah kebijakan kabinet.";

// ===== 3. ANGGOTA (7 orang). utama: true = bingkai emas =====
const anggota = [
  { nama: "Shabbarin Syakur", jabatan: "Presiden Mahasiswa", foto: "/images/kementerian/kepresidenan/orang/presma.jpg", utama: true },
  { nama: "Muhammad Firdan", jabatan: "Wakil Presiden Mahasiswa", foto: "/images/kementerian/kepresidenan/orang/wapres.jpg", utama: true },
  { nama: "M Ghufran Abrar", jabatan: "Sekretaris Negara", foto: "/images/kementerian/kepresidenan/orang/sesneg.jpg" },
  { nama: "Rangga Andany", jabatan: "Menteri Koordinator Administrasi Pemerintahan", foto: "/images/kementerian/kepresidenan/orang/ap.jpg" },
  { nama: "Ardian Okta Sya'bani", jabatan: "Menteri Koordinator Pergerakan", foto: "/images/kementerian/kepresidenan/orang/gerak.jpg" },
  { nama: "Abdurahman", jabatan: "Menteri Koordinator Pelayanan", foto: "/images/kementerian/kepresidenan/orang/layan.jpg" },
  { nama: "Arga Zaifullah", jabatan: "Menteri Koordinator Pengabdian", foto: "/images/kementerian/kepresidenan/orang/abdi.jpg" },
];

// ================= TAMPILAN (tidak perlu diubah) =================
export default function KepresidenanPage() {
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
        </section>

        <section className="km-staff">
          {anggota.map((orang, i) => (
            <KartuOrang key={i} {...orang} />
          ))}
        </section>
      </div>
    </div>
  );
}