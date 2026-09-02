"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AspirasiForm from "@/components/Aspirasiform";
import KontakPage from "@/app/kontak/page"; 

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://bemkmunand.site/api";
const BACKEND_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

const resolveImageUrl = (path) => {
  if (!path) return "/images/placeholder.jpg";
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/images/")) return path;
  return `${BACKEND_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
};

const safeArray = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [value];
    } catch {
      return value.split(",").map((v) => v.trim()).filter(Boolean);
    }
  }
  return [];
};

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  const keys = ["data", "result", "items", "content", "rows", "records"];
  for (const key of keys) {
    const value = payload[key];
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") {
      const nested = extractRows(value);
      if (nested.length) return nested;
    }
  }
  return [];
};

const normalizeContent = (item) => {
  if (!item) return null;
  const images = safeArray(item.images || item.image || item.gambar || item.media);
  const coverImage = item.cover_image || item.coverImage || item.thumbnail || images[0] || "";
  return {
    ...item,
    title: item.title || item.nama || "Judul event",
    description: item.description || item.deskripsi || item.content || "",
    cover_image: coverImage,
    content_type: (item.content_type || item.type || "announcement").toLowerCase(),
    is_published: item.is_published !== false,
    event_start: item.event_start || item.start_date || item.date || null,
  };
};

const formatDateShort = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(date);
};

/* ------------------------------------------------------------------ */
/* PLACEHOLDER CONTENT — ganti semua data di bawah ini dengan data asli */
/* ------------------------------------------------------------------ */

const visiText =
  "Mewujudkan BEM KM Universitas Andalas sebagai wadah pergerakan mahasiswa yang progresif, inklusif, dan berdampak nyata bagi kampus, masyarakat, dan bangsa.";

const misiList = [
  "Membangun sinergi antar lembaga kemahasiswaan melalui komunikasi yang terbuka dan setara.",
  "Menghadirkan program kerja yang berpihak pada kebutuhan mahasiswa dan masyarakat sekitar kampus.",
  "Mendorong budaya kritis, kolaboratif, dan berintegritas dalam setiap gerak organisasi.",
  "Memperkuat advokasi mahasiswa terhadap kebijakan kampus maupun isu-isu sosial di luar kampus.",
];

const programUnggulan = [
  {
    title: "Rakit Aspirasi",
    desc: "Kanal penyaluran aspirasi mahasiswa yang ditindaklanjuti secara berkala dan transparan.",
  },
  {
    title: "Kelas Inovasi Mahasiswa",
    desc: "Pelatihan rutin untuk menumbuhkan gagasan dan karya mahasiswa lintas jurusan.",
  },
  {
    title: "Pengabdian Rakit Makna",
    desc: "Rangkaian kegiatan sosial dan pengabdian masyarakat di sekitar lingkungan kampus.",
  },
  {
    title: "Advokasi Kebijakan Kampus",
    desc: "Pendampingan dan pengawalan isu-isu kebijakan yang berdampak langsung ke mahasiswa.",
  },
];

const presma = {
  name: "Nama Presma", // TODO: ganti dengan nama Presiden Mahasiswa
  photo: "/images/presma.jpg", // TODO: ganti dengan foto asli
  message:
    "Selamat datang di rumah bersama Kabinet Rakit Makna. Mari kita rakit makna dari setiap langkah kecil menjadi gerakan besar yang membawa manfaat bagi seluruh mahasiswa Universitas Andalas.",
};

const wapresma = {
  name: "Nama Wapresma", // TODO: ganti dengan nama Wakil Presiden Mahasiswa
  photo: "/images/wapresma.jpg", // TODO: ganti dengan foto asli
  message:
    "Kabinet ini hadir untuk mendengar, merangkul, dan bergerak bersama. Setiap program yang kami rancang berangkat dari kebutuhan nyata mahasiswa di lapangan.",
};

// Kepresidenan ditampilkan sebagai kartu unggulan (paling atas & besar)
const kepresidenan = {
  name: "Kepresidenan",
  abbr: "KEPRES",
  slug: "kepresidenan",
  photo: "/images/kementerian/kepresidenan.jpg", // TODO: ganti foto
  desc: "Pusat koordinasi seluruh kementerian dan penggerak arah kebijakan kabinet.",
};

// 16 kementerian lain — TODO: sesuaikan foto & slug bila perlu
const kementerianList = [
  { name: "Sekretaris Kabinet", abbr: "SESKAB", slug: "sekretaris-kabinet", photo: "/images/kementerian/seskab.jpg" },
  { name: "Dalam Negeri", abbr: "DAGRI", slug: "dalam-negeri", photo: "/images/kementerian/dagri.jpg" },
  { name: "Luar Negeri", abbr: "LUNEG", slug: "luar-negeri", photo: "/images/kementerian/luneg.jpg" },
  { name: "Keuangan", abbr: "KEUANGAN", slug: "keuangan", photo: "/images/kementerian/keuangan.jpg" },
  { name: "Komunikasi dan Informasi", abbr: "KOMINFO", slug: "komunikasi-informasi", photo: "/images/kementerian/kominfo.jpg" },
  { name: "Pengembangan Sumber Daya Mahasiswa", abbr: "PSDM", slug: "psdm", photo: "/images/kementerian/psdm.jpg" },
  { name: "Kebijakan Daerah", abbr: "JAKDA", slug: "kebijakan-daerah", photo: "/images/kementerian/jakda.jpg" },
  { name: "Kebijakan Nasional", abbr: "JAKNAS", slug: "kebijakan-nasional", photo: "/images/kementerian/jaknas.jpg" },
  { name: "Kebijakan Kampus", abbr: "JAKKAM", slug: "kebijakan-kampus", photo: "/images/kementerian/jakkam.jpg" },
  { name: "Riset dan Keilmuan", abbr: "RISKEN", slug: "riset-keilmuan", photo: "/images/kementerian/risken.jpg" },
  { name: "Lingkungan Hidup", abbr: "LINGHUP", slug: "lingkungan-hidup", photo: "/images/kementerian/linghup.jpg" },
  { name: "Sosial dan Masyarakat", abbr: "SOSMAS", slug: "sosial-masyarakat", photo: "/images/kementerian/sosmas.jpg" },
  { name: "Advokasi Kesejahteraan Mahasiswa", abbr: "ADKESMA", slug: "advokasi-kesejahteraan-mahasiswa", photo: "/images/kementerian/adkesma.jpg" },
  { name: "Pergerakan Perempuan", abbr: "PP", slug: "pergerakan-perempuan", photo: "/images/kementerian/pp.jpg" },
  { name: "Mitra Event dan Bisnis", abbr: "MEB", slug: "mitra-event-bisnis", photo: "/images/kementerian/meb.jpg" },
  { name: "Audit Internal", abbr: "AI", slug: "audit-internal", photo: "/images/kementerian/ai.jpg" },
];

const IconLocation = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* ------------------------------------------------------------------ */

export default function Home() {
  const [events, setEvents] = useState([]);
  const [calendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".animate-on-scroll, .slide-left, .slide-right");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  useEffect(() => {
    let active = true;
    const endpointCandidates = [`${API_BASE}/content`, `${API_BASE}/contents`, `${API_BASE}/`];

    const fetchEvents = async () => {
      for (const endpoint of endpointCandidates) {
        try {
          const res = await fetch(endpoint, { cache: "no-store" });
          if (!res.ok) continue;
          const rawText = await res.text();
          if (!rawText || rawText.trim().startsWith("<")) continue;
          const payload = JSON.parse(rawText);
          const rows = extractRows(payload);
          if (!active) return;

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const normalized = rows
            .map(normalizeContent)
            .filter(Boolean)
            .filter((item) => item.is_published !== false && item.content_type === "event" && item.event_start)
            .filter((item) => new Date(item.event_start) >= today)
            .sort((a, b) => new Date(a.event_start) - new Date(b.event_start))
            .slice(0, 5);

          setEvents(normalized);
          return;
        } catch {
          // coba endpoint berikutnya
        }
      }
    };

    fetchEvents();
    return () => {
      active = false;
    };
  }, []);

  const monthLabel = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(calendarMonth);
  const firstDayIndex = calendarMonth.getDay();
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const calendarCells = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstDayIndex + 1;
    const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
    const date = isCurrentMonth ? new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), dayNumber) : null;
    const hasEvent = isCurrentMonth
      ? events.some((item) => {
          const d = new Date(item.event_start);
          return d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate();
        })
      : false;
    return { dayNumber, isCurrentMonth, hasEvent };
  });

  const marqueeLogos = [...kementerianList, kepresidenan, ...kementerianList];

  return (
    <>
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .animate-on-scroll.visible { opacity: 1; transform: translateY(0); }
        .animate-on-scroll.delay-1 { transition-delay: 0.1s; }
        .animate-on-scroll.delay-2 { transition-delay: 0.25s; }
        .animate-on-scroll.delay-3 { transition-delay: 0.4s; }
        .animate-on-scroll.delay-4 { transition-delay: 0.55s; }

        .slide-left {
          opacity: 0;
          transform: translateX(-60px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .slide-left.visible { opacity: 1; transform: translateX(0); }

        .slide-right {
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .slide-right.visible { opacity: 1; transform: translateX(0); }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 30s linear infinite;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .bem-title { font-size: clamp(2.8rem, 14vw, 4.5rem) !important; text-align: center !important; }
          .diagonal-section { height: auto !important; min-height: 380px !important; padding-bottom: 60px !important; }
          .diagonal-inner {
            flex-direction: column !important; align-items: center !important; justify-content: center !important;
            text-align: center !important; padding: 40px 24px 60px !important; gap: 28px !important;
          }
          .bem-wrapper { transform: rotate(0deg) !important; text-align: center !important; }
          .selamat-text { font-size: 0.72rem !important; letter-spacing: 2px !important; text-align: center !important; }
          .kabinet-label { text-align: center !important; }
          .kabinet-section { padding: 60px 20px !important; }
          .kabinet-section h2 { font-size: 1.8rem !important; }
        }

        /* --- Visi Misi --- */
        .visi-misi-section {
          background: linear-gradient(180deg, #fff 0%, rgba(85,25,58,0.03) 100%);
          padding: 90px 24px;
        }
        .visi-misi-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .visi-misi-eyebrow {
          color: #D8833B;
          font-weight: 700;
          font-size: 0.8rem;
          margin: 0 0 10px;
        }
        .visi-misi-grid h3 {
          color: #55193A;
          font-size: 1.6rem;
          font-weight: 800;
          margin: 0 0 16px;
        }
        .visi-text {
          color: #444;
          font-size: 1.05rem;
          line-height: 1.8;
          max-width: 55ch;
        }
        .misi-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .misi-list li {
          display: flex;
          gap: 14px;
          color: #444;
          font-size: 0.98rem;
          line-height: 1.6;
          max-width: 55ch;
        }
        .misi-dot {
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D8833B;
          margin-top: 8px;
        }

        @media (max-width: 800px) {
          .visi-misi-grid { grid-template-columns: 1fr; gap: 32px; }
        }

        /* --- Program Unggulan --- */
        .program-section {
          background: #fff;
          padding: 20px 24px 100px;
        }
        .program-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .program-card {
          border: 1px solid rgba(85,25,58,0.1);
          border-radius: 14px;
          padding: 28px 22px;
          background: #fff;
        }
        .program-card h4 {
          color: #55193A;
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0 0 10px;
        }
        .program-card p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }
        @media (max-width: 900px) {
          .program-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .program-grid { grid-template-columns: 1fr; }
        }

        /* --- Presma / Wapresma --- */
        .leader-section {
          padding: 90px 24px;
          background: #fff;
        }
        .leader-section.alt {
          background: rgba(85,25,58,0.03);
        }
        .leader-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 56px;
        }
        .leader-inner.reverse {
          flex-direction: row-reverse;
        }
        .leader-photo {
          flex: 0 0 320px;
          aspect-ratio: 3 / 4;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(135deg, #55193A 0%, #D8833B 100%);
        }
        .leader-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .leader-role {
          color: #D8833B;
          font-weight: 700;
          font-size: 0.8rem;
          margin: 0 0 8px;
        }
        .leader-name {
          color: #55193A;
          font-size: 1.6rem;
          font-weight: 800;
          margin: 0 0 16px;
        }
        .leader-message {
          color: #444;
          font-size: 1.02rem;
          line-height: 1.8;
          max-width: 52ch;
        }
        @media (max-width: 800px) {
          .leader-inner, .leader-inner.reverse { flex-direction: column; text-align: center; gap: 28px; }
          .leader-photo { flex: 0 0 auto; width: 220px; }
          .leader-message { max-width: 100%; }
        }

        /* --- Kementerian marquee --- */
        .kementerian-marquee-section {
          background: #55193A;
          padding: 28px 0 22px;
          overflow: hidden;
        }
        .marquee-logo-item {
          flex-shrink: 0;
          width: 84px;
          margin: 0 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .marquee-logo-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
        }
        .marquee-logo-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .marquee-logo-label {
          color: rgba(255,255,255,0.85);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-align: center;
          white-space: nowrap;
        }

        /* --- Kementerian grid --- */
        .kementerian-section {
          background: #fff;
          padding: 90px 24px;
        }
        .kementerian-featured {
          max-width: 1200px;
          margin: 0 auto 20px;
        }
        .kementerian-featured a {
          display: block;
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 21 / 9;
          text-decoration: none;
        }
        .kementerian-featured img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .kementerian-featured-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(59,15,38,0.85) 0%, rgba(59,15,38,0.1) 55%);
          display: flex;
          align-items: flex-end;
          padding: 28px 32px;
        }
        .kementerian-featured-overlay h3 {
          color: #fff;
          font-size: 1.8rem;
          font-weight: 800;
          margin: 0 0 6px;
        }
        .kementerian-featured-overlay p {
          color: rgba(255,255,255,0.8);
          margin: 0;
          font-size: 0.95rem;
          max-width: 50ch;
        }

        .kementerian-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .kementerian-card {
          display: block;
          text-decoration: none;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(85,25,58,0.08);
          box-shadow: 0 10px 26px rgba(85,25,58,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .kementerian-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(85,25,58,0.12);
        }
        .kementerian-card-photo {
  position: relative;
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, #55193A 0%, #D8833B 100%);
  overflow: hidden;
}
.kementerian-card-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}
.kementerian-card:hover .kementerian-card-photo img {
  transform: scale(1.08);
}
.kementerian-card-abbr {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255,255,255,0.92);
  color: #55193A;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 4px 9px;
  border-radius: 999px;
  text-transform: uppercase;
}
        
        .kementerian-card-name {
          padding: 12px 14px;
          color: #55193A;
          font-size: 0.85rem;
          font-weight: 700;
          line-height: 1.35;
        }
        @media (max-width: 900px) {
          .kementerian-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .kementerian-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .kementerian-featured-overlay h3 { font-size: 1.3rem; }
        }

        /* --- Event teaser --- */
        .event-teaser-section {
          background: #fff;
          padding: 90px 24px 100px;
        }
        .event-teaser-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 1fr);
          gap: 32px;
          align-items: start;
        }
        .mini-calendar {
          background: rgba(85,25,58,0.04);
          border: 1px solid rgba(85,25,58,0.08);
          border-radius: 16px;
          padding: 20px 18px 24px;
        }
        .mini-calendar-month {
          text-align: center;
          color: #55193A;
          font-weight: 800;
          font-size: 1.1rem;
          text-transform: capitalize;
          margin-bottom: 14px;
        }
        .mini-calendar-weekdays, .mini-calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0,1fr));
          gap: 6px;
        }
        .mini-calendar-weekdays { margin-bottom: 6px; }
        .mini-calendar-weekdays div {
          text-align: center;
          font-size: 0.62rem;
          font-weight: 700;
          color: #7a2a56;
          text-transform: uppercase;
        }
        .mini-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #55193A;
          background: rgba(255,255,255,0.7);
        }
        .mini-day.empty { background: transparent; color: transparent; }
        .mini-day.has-event { background: #55193A; color: #fff; }

        .event-list-title {
          color: #55193A;
          font-size: 1.3rem;
          font-weight: 800;
          margin: 0 0 16px;
        }
        .event-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .event-list-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border: 1px solid rgba(85,25,58,0.08);
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .event-list-item:hover {
          background: rgba(85,25,58,0.04);
        }
        .event-list-date {
          flex-shrink: 0;
          background: #55193A;
          color: #fff;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 6px 10px;
          border-radius: 6px;
          text-align: center;
          min-width: 44px;
        }
        .event-list-title-text {
          color: #55193A;
          font-weight: 700;
          font-size: 0.92rem;
          margin: 0 0 2px;
        }
        .event-list-date-text {
          color: #777;
          font-size: 0.78rem;
          margin: 0;
        }
        .event-list-empty {
          color: #999;
          font-size: 0.9rem;
        }
        .event-teaser-more {
          display: inline-block;
          margin-top: 16px;
          color: #55193A;
          font-weight: 700;
          font-size: 0.85rem;
          text-decoration: none;
        }
        @media (max-width: 900px) {
          .event-teaser-inner { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* HERO VIDEO */}
        <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          >
            <source src="/logo-video.mp4" type="video/mp4" />
          </video>

          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.50)", zIndex: 2 }} />

          <div style={{ position: "absolute", bottom: -2, left: 0, width: "100%", zIndex: 4, lineHeight: 0 }}>
            <svg viewBox="0 0 1440 140" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "140px" }}>
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b0f26" />
                  <stop offset="50%" stopColor="#55193A" />
                  <stop offset="100%" stopColor="#7a2550" />
                </linearGradient>
              </defs>
              <path d="M0,60 C200,20 400,100 720,60 C1040,20 1240,90 1440,50 L1440,140 L0,140 Z" fill="url(#waveGrad)" opacity="0.45" />
              <path d="M0,85 C180,50 400,115 720,80 C1040,45 1260,105 1440,75 L1440,140 L0,140 Z" fill="url(#waveGrad)" />
            </svg>
          </div>
        </section>

        {/* DIAGONAL WELCOME */}
        <section
          className="diagonal-section"
          style={{
            position: "relative",
            width: "100%",
            height: "520px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #3b0f26 0%, #55193A 45%, #7a2550 100%)",
          }}
        >
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 2 }}>
            <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "200px" }}>
              <polygon points="0,200 1440,200 1440,60 0,160" fill="#D8833B" opacity="0.12" />
              <line x1="0" y1="160" x2="1440" y2="60" stroke="#D8833B" strokeWidth="2.5" />
              <line x1="0" y1="172" x2="1440" y2="72" stroke="#D8833B" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </div>

          <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(216,131,59,0.18)", zIndex: 1 }} />
          <div style={{ position: "absolute", top: "-40px", left: "-40px", width: "220px", height: "220px", borderRadius: "50%", border: "1px solid rgba(216,131,59,0.1)", zIndex: 1 }} />

          <div
            className="diagonal-inner"
            style={{
              position: "relative",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
              padding: "0 5% 60px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div className="animate-on-scroll slide-left delay-1" style={{ color: "rgba(255,255,255,0.80)" }}>
              <p className="selamat-text" style={{ fontSize: "0.85rem", letterSpacing: "4px", textTransform: "uppercase", margin: "0 0 12px" }}>
                Selamat Datang di Laman Resmi,
              </p>
              <p className="kabinet-label" style={{ fontSize: "1rem", color: "#D8833B", letterSpacing: "2px", margin: 0, fontWeight: 700 }}>
                Kabinet Rakit Makna
              </p>
            </div>

            <div className="animate-on-scroll slide-right delay-2 bem-wrapper" style={{ textAlign: "right", transform: "rotate(-5deg)", transformOrigin: "right bottom", marginBottom: "20px" }}>
              <div
                className="bem-title"
                style={{
                  fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
                  fontWeight: 900,
                  lineHeight: 0.88,
                  color: "#ffffff",
                  letterSpacing: "-1px",
                  fontFamily: "'Arial Black', 'Arial Bold', Arial, sans-serif",
                  textTransform: "uppercase",
                  textShadow: "0 6px 30px rgba(0,0,0,0.5)",
                }}
              >
                BEM KM
                <br />
                UNAND
                <br />
                <span style={{ color: "#D8833B", textShadow: "0 4px 20px rgba(216,131,59,0.45)" }}>2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* KABINET INTRO */}
        <section className="kabinet-section" style={{ background: "#ffffff", padding: "100px 24px", textAlign: "center" }}>
          <h2 className="animate-on-scroll delay-1" style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "20px", color: "#55193A" }}>
            Kabinet Rakit Makna
          </h2>
          <p className="animate-on-scroll delay-2" style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.8, color: "#555" }}>
            Bersama merakit makna dalam setiap langkah pengabdian, kolaborasi, dan inovasi demi
            menciptakan lingkungan kampus yang progresif, inklusif, dan berdampak bagi seluruh
            mahasiswa Universitas Andalas.
          </p>
        </section>

        {/* VISI MISI */}
        <section className="visi-misi-section">
          <div className="visi-misi-grid">
            <div className="animate-on-scroll delay-1">
              <p className="visi-misi-eyebrow">Visi</p>
              <h3>Arah gerak kabinet</h3>
              <p className="visi-text">{visiText}</p>
            </div>
            <div className="animate-on-scroll delay-2">
              <p className="visi-misi-eyebrow">Misi</p>
              <h3>Langkah untuk mewujudkannya</h3>
              <ul className="misi-list">
                {misiList.map((misi, i) => (
                  <li key={i}>
                    <span className="misi-dot" />
                    <span>{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PROGRAM UNGGULAN */}
        <section className="program-section">
          <div style={{ maxWidth: "1200px", margin: "0 auto 36px", textAlign: "center" }}>
            <h3 className="animate-on-scroll" style={{ color: "#55193A", fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>
              Program Unggulan
            </h3>
          </div>
          <div className="program-grid">
            {programUnggulan.map((program, i) => (
              <div key={program.title} className={`program-card animate-on-scroll delay-${(i % 4) + 1}`}>
                <h4>{program.title}</h4>
                <p>{program.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRESMA */}
        <section className="leader-section">
          <div className="leader-inner">
            <div className="leader-photo slide-left">
              <img src={resolveImageUrl(presma.photo)} alt={presma.name} />
            </div>
            <div className="animate-on-scroll delay-2">
              <p className="leader-role">Presiden Mahasiswa</p>
              <h3 className="leader-name">{presma.name}</h3>
              <p className="leader-message">{presma.message}</p>
            </div>
          </div>
        </section>

        {/* WAPRESMA */}
        <section className="leader-section alt">
          <div className="leader-inner reverse">
            <div className="leader-photo slide-right">
              <img src={resolveImageUrl(wapresma.photo)} alt={wapresma.name} />
            </div>
            <div className="animate-on-scroll delay-2">
              <p className="leader-role">Wakil Presiden Mahasiswa</p>
              <h3 className="leader-name">{wapresma.name}</h3>
              <p className="leader-message">{wapresma.message}</p>
            </div>
          </div>
        </section>

        {/* KEMENTERIAN MARQUEE */}
        <div style={{ maxWidth: "1200px", margin: "90px auto 24px", padding: "0 24px", textAlign: "center" }}>
          <h3 className="animate-on-scroll" style={{ color: "#55193A", fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>
            Kementerian Kabinet Rakit Makna
          </h3>
        </div>

        <section className="kementerian-marquee-section">
          <div className="marquee-track">
            {marqueeLogos.map((k, i) => (
              <div className="marquee-logo-item" key={`${k.slug}-${i}`}>
                <div className="marquee-logo-circle">
                  <img src={resolveImageUrl(k.photo)} alt={k.name} />
                </div>
                <span className="marquee-logo-label">{k.abbr}</span>
              </div>
            ))}
          </div>
        </section>

        {/* KEMENTERIAN GRID */}
        <section className="kementerian-section" style={{ paddingTop: "48px" }}>
          <div className="kementerian-featured animate-on-scroll">
            <Link href={`/kementerian/${kepresidenan.slug}`}>
              <img src={resolveImageUrl(kepresidenan.photo)} alt={kepresidenan.name} />
              <div className="kementerian-featured-overlay">
                <div>
                  <h3>{kepresidenan.name}</h3>
                  <p>{kepresidenan.desc}</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="kementerian-grid">
            {kementerianList.map((k, i) => (
  <Link
    href={`/kementerian/${k.slug}`}
    className="kementerian-card animate-on-scroll"
    key={k.slug}
    style={{ transitionDelay: `${(i % 8) * 0.07}s` }}
  >
    <div className="kementerian-card-photo">
      <img src={resolveImageUrl(k.photo)} alt={k.name} />
      <span className="kementerian-card-abbr">{k.abbr}</span>
    </div>
    <div className="kementerian-card-name">{k.name}</div>
  </Link>
))}
            
          </div>
        </section>

        {/* ASPIRASI — komponen asli, bukan tulis ulang */}
        <section id="aspirasi">
          <AspirasiForm embedded />
        </section>

        {/* EVENT TEASER */}
        <section className="event-teaser-section">
          <div style={{ maxWidth: "1200px", margin: "0 auto 32px", textAlign: "center" }}>
            <h3 className="animate-on-scroll" style={{ color: "#55193A", fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>
              Kalender & Event Terdekat
            </h3>
          </div>

          <div className="event-teaser-inner">
            <div className="mini-calendar animate-on-scroll delay-1">
              <div className="mini-calendar-month">{monthLabel}</div>
              <div className="mini-calendar-weekdays">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>
              <div className="mini-calendar-grid">
                {calendarCells.map((cell, i) =>
                  cell.isCurrentMonth ? (
                    <div key={i} className={`mini-day ${cell.hasEvent ? "has-event" : ""}`}>
                      {cell.dayNumber}
                    </div>
                  ) : (
                    <div key={i} className="mini-day empty" />
                  )
                )}
              </div>
            </div>

            <div className="animate-on-scroll delay-2">
              <h4 className="event-list-title">Event terdekat</h4>
              {events.length > 0 ? (
                <ul className="event-list">
                  {events.map((item) => (
                    <li key={item.id || item.title}>
                      <Link href="/event" className="event-list-item">
                        <div className="event-list-date">{new Date(item.event_start).getDate()}</div>
                        <div>
                          <p className="event-list-title-text">{item.title}</p>
                          <p className="event-list-date-text">{formatDateShort(item.event_start)}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="event-list-empty">Belum ada event terdekat yang dijadwalkan.</p>
              )}
              <Link href="/event" className="event-teaser-more">
                Lihat semua event →
              </Link>
            </div>
          </div>
        </section>

        {/* KONTAK — komponen asli, bukan tulis ulang */}
        <section id="kontak">
          <KontakPage embedded />
        </section>
      </div>
    </>
  );
}