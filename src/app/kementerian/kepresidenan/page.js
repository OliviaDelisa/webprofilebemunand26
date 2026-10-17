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
  { nama: "Shabbarin Syakur", jabatan: "Presiden Mahasiswa", foto: "/images/presma.png", utama: true },
  { nama: "Muhammad Firdan", jabatan: "Wakil Presiden Mahasiswa", foto: "/images/wapresma.png", utama: true },
  { nama: "M Ghufran Abrar", jabatan: "Sekretaris Negara", foto: "" },
  { nama: "Rangga Andany", jabatan: "Menteri Koordinator Administrasi Pemerintahan", foto: "" },
  { nama: "Ardian Okta Sya'bani", jabatan: "Menteri Koordinator Pergerakan", foto: "" },
  { nama: "Abdurahman", jabatan: "Menteri Koordinator Pelayanan", foto: "" },
  { nama: "Arga Zaifullah", jabatan: "Menteri Koordinator Pengabdian", foto: "" },
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