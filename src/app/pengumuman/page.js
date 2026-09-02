"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://bemkmunand.site/api";

// Origin backend (tanpa "/api"), dipakai buat prefix path gambar seperti "/uploads/xxx.webp"
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
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
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
    title: item.title || item.nama || "Judul pengumuman",
    description: item.description || item.deskripsi || item.content || "",
    cover_image: coverImage,
    images: images.length ? images : coverImage ? [coverImage] : [],
    content_type: (item.content_type || item.type || "announcement").toLowerCase(),
    is_published: item.is_published !== false,
    event_start: item.event_start || item.start_date || item.date || null,
    event_end: item.event_end || item.end_date || null,
  };
};

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];

  const possibleKeys = ["data", "result", "items", "content", "rows", "records"];
  for (const key of possibleKeys) {
    const value = payload[key];
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") {
      const nested = extractRows(value);
      if (nested.length) return nested;
    }
  }

  return [];
};

const formatDate = (value) => {
  if (!value) return "Belum ditentukan";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

// Icon kalender minimalis (outline), pengganti angka polos di badge modal
const CalendarIcon = ({ size = 12, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function AnnouncementPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    let active = true;

    const endpointCandidates = [
      `${API_BASE}/content`,
      `${API_BASE}/contents`,
      `${API_BASE}/`,
    ];

    const fetchContent = async () => {
      setLoading(true);
      setError("");
      let lastError = null;

      for (const endpoint of endpointCandidates) {
        try {
          const res = await fetch(endpoint, { cache: "no-store" });
          if (!res.ok) continue;

          const rawText = await res.text();
          if (!rawText || rawText.trim().startsWith("<")) continue;

          const payload = JSON.parse(rawText);
          const rows = extractRows(payload);

          if (!active) return;

          const normalized = rows
            .map(normalizeContent)
            .filter(Boolean)
            .filter(
              (item) => item.is_published !== false && item.content_type === "announcement"
            );

          setContent(normalized);
          setLoading(false);
          return;
        } catch (err) {
          lastError = err;
        }
      }

      if (active) {
        setContent([]);
        setError(lastError?.message || "Belum ada pengumuman yang tersedia.");
        setLoading(false);
      }
    };

    fetchContent();
    return () => {
      active = false;
    };
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalIndex(0);
  };

  const modalImages = selectedItem
    ? selectedItem.images && selectedItem.images.length
      ? selectedItem.images
      : [selectedItem.cover_image].filter(Boolean)
    : [];

  const goPrev = (e) => {
    e.stopPropagation();
    setModalIndex((i) => (i - 1 + modalImages.length) % modalImages.length);
  };

  const goNext = (e) => {
    e.stopPropagation();
    setModalIndex((i) => (i + 1) % modalImages.length);
  };

  return (
    <div style={{ background: "#fff", paddingTop: "88px" }}>
      <style>{`
        .announce-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px 40px;
        }

        .announce-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(85, 25, 58, 0.08);
          box-shadow: 0 12px 32px rgba(85, 25, 58, 0.06);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .announce-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(85, 25, 58, 0.12);
        }

        .announce-header {
          position: relative;
          aspect-ratio: 4 / 3;
          background: linear-gradient(135deg, #55193A 0%, #D8833B 100%);
          overflow: hidden;
        }

        .announce-header img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .announce-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 12px;
          background: rgba(255, 255, 255, 0.95);
          color: #55193A;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .announce-body {
          padding: 16px;
        }

        /* --- Tampilan tanggal: lebih minimalis/formal --- */
        .announce-date {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(85, 25, 58, 0.08);
        }

        .announce-date-box {
          background: #55193A;
          color: #fff;
          padding: 6px 10px;
          border-radius: 6px;
          text-align: center;
          font-weight: 700;
          font-size: 0.85rem;
          min-width: 40px;
          line-height: 1.1;
        }

        .announce-date-text {
          color: #666;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .announce-date-meta {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .announce-date-meta svg {
          flex-shrink: 0;
          opacity: 0.7;
        }

        .announce-title {
          margin: 0 0 8px;
          color: #55193A;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .announce-description {
          margin: 0;
          color: #666;
          font-size: 0.85rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          white-space: pre-line; /* fix: enter/paragraf baru tetap kebaca, tidak nyambung */
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          z-index: 2000;
          padding: 40px 24px;
          overflow-y: auto;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          position: relative;
          max-width: 800px;
          width: 100%;
          max-height: calc(100vh - 80px);
          background: #fff;
          border-radius: 12px;
          overflow-y: auto;
          overflow-x: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-image-wrap {
          position: relative;
          background: #000;
        }

        .modal-image {
          width: 100%;
          max-height: 60vh;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }

        .modal-body {
          padding: 18px 24px 24px;
          background: #fff;
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: #fff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.3rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 2001;
        }

        .modal-close:hover {
          background: rgba(0, 0, 0, 0.9);
        }

        .modal-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.55);
          border: none;
          color: #fff;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          transition: background 0.2s ease;
        }

        .modal-nav-btn:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        .modal-nav-btn.prev {
          left: 12px;
        }

        .modal-nav-btn.next {
          right: 12px;
        }

        .modal-counter {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(85, 25, 58, 0.85);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 5px 11px;
          border-radius: 999px;
          z-index: 5;
        }

        .modal-date-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(85, 25, 58, 0.08);
          color: #55193A;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 10px;
        }

        .modal-description {
          margin: 0;
          color: #444;
          line-height: 1.7;
          font-size: 0.92rem;
          white-space: pre-line; /* fix: enter/paragraf baru kebaca di modal */
        }

        .modal-title {
          margin: 0 0 8px;
          color: #55193A;
          font-size: 1.2rem;
          font-weight: 800;
        }

        @media (max-width: 900px) {
          .announce-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .announce-grid {
            grid-template-columns: 1fr;
            padding: 24px 16px;
            gap: 14px;
          }

          .modal-body {
            padding: 14px 16px 16px;
          }
        }
      `}</style>

      <div
        style={{
          padding: "24px 24px 20px",
          textAlign: "center",
          background: "#fff",
        }}
      >
        <p
          style={{
            margin: 0,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#D8833B",
            fontWeight: 700,
            fontSize: "0.65rem",
          }}
        >
        </p>
        <h1
          style={{
            margin: "0",
            color: "#55193A",
            fontSize: "1.4rem",
            fontWeight: 800,
          }}
        >
          Pengumuman
        </h1>
      </div>

      <div style={{ background: "#fff", padding: "24px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 24px" }}>
              <div style={{ color: "#55193A", fontWeight: 600 }}>Memuat pengumuman...</div>
            </div>
          ) : error ? (
            <div
              style={{
                color: "#7a2a56",
                background: "#fff5f5",
                border: "1px solid #f4d3d3",
                padding: "18px",
                borderRadius: "10px",
                textAlign: "center",
                fontSize: "0.95rem",
              }}
            >
              {error}
            </div>
          ) : (
            <div className="announce-grid">
              {content.length > 0 ? (
                content.map((item) => (
                  <div
                    key={item.id || item.title}
                    className="announce-card"
                    onClick={() => openModal(item)}
                  >
                    <div className="announce-header">
                      <img
                        src={resolveImageUrl(item.cover_image || item.images?.[0])}
                        alt={item.title}
                      />
                      <div className="announce-badge">announcement</div>
                    </div>

                    <div className="announce-body">
                      {item.event_start && (
                        <div className="announce-date">
                          <div className="announce-date-box">
                            {new Date(item.event_start).getDate()}
                          </div>
                          <div>
                            <div className="announce-date-text announce-date-meta">
                              <CalendarIcon size={11} />
                              {formatDate(item.event_start)}
                            </div>
                          </div>
                        </div>
                      )}

                      <h3 className="announce-title">{item.title}</h3>
                      <p className="announce-description">{item.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 24px", color: "#999" }}>
                  Belum ada pengumuman yang dipublikasikan.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal Detail */}
      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-image-wrap">
              {modalImages.length > 1 && (
                <div className="modal-counter">
                  {modalIndex + 1}/{modalImages.length}
                </div>
              )}

              <img
                className="modal-image"
                src={resolveImageUrl(modalImages[modalIndex])}
                alt={selectedItem.title}
              />

              {modalImages.length > 1 && (
                <>
                  <button className="modal-nav-btn prev" onClick={goPrev} aria-label="Foto sebelumnya">
                    ‹
                  </button>
                  <button className="modal-nav-btn next" onClick={goNext} aria-label="Foto berikutnya">
                    ›
                  </button>
                </>
              )}
            </div>

            <div className="modal-body">
              {selectedItem.event_start && (
                <div className="modal-date-badge">
                  <CalendarIcon size={11} />
                  {formatDate(selectedItem.event_start)}
                </div>
              )}
              <h2 className="modal-title">
                {selectedItem.title}
              </h2>
              <p className="modal-description">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}