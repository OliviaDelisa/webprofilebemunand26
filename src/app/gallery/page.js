"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://bemkmunand.site/api";

// Origin backend (tanpa "/api"), dipakai buat prefix path gambar seperti "/uploads/xxx.webp"
const BACKEND_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

// Gabungin path gambar relatif dari database dengan origin backend.
// Kalau sudah full URL (http...) atau file lokal Next.js (/images/...), biarkan apa adanya.
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
    title: item.title || item.nama || "Judul konten",
    description: item.description || item.deskripsi || item.content || "",
    cover_image: coverImage,
    images: images.length ? images : coverImage ? [coverImage] : [],
    content_type: (item.content_type || item.type || "announcement").toLowerCase(),
    is_published: item.is_published !== false,
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

// ── Kartu galeri: full-bleed image + auto-slideshow kalau lebih dari 1 foto ──
function GalleryCard({ item, onClick }) {
  const images = item.images && item.images.length ? item.images : [item.cover_image].filter(Boolean);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3200);
    return () => clearInterval(id);
  }, [images.length]);

  const displayImages = images.length > 0 ? images : ["/images/placeholder.jpg"];

  return (
    <div className="gallery-item" onClick={() => onClick(item)}>
      {displayImages.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={resolveImageUrl(src)}
          alt={item.title}
          className={`gallery-item-image ${i === index ? "active" : ""}`}
        />
      ))}

      {displayImages.length > 1 && (
        <div className="gallery-item-counter">
          {String(index + 1).padStart(2, "0")}/{String(displayImages.length).padStart(2, "0")}
        </div>
      )}

      <div className="gallery-item-overlay">
        <h4 className="gallery-item-title">{item.title}</h4>
        <p className="gallery-item-desc">{item.description}</p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    let active = true;

    const endpointCandidates = [
      `${API_BASE}/content?type=gallery`,
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
          if (!rawText || rawText.trim().startsWith("<")) {
            continue;
          }

          const payload = JSON.parse(rawText);
          const rows = extractRows(payload);

          if (!active) return;

          const normalized = rows
            .map(normalizeContent)
            .filter(Boolean)
            .filter((item) => item.is_published !== false && item.content_type === "gallery");

          if (normalized.length > 0) {
            setContent(normalized);
            setLoading(false);
            return;
          }

          setContent([]);
          setLoading(false);
          return;
        } catch (err) {
          lastError = err;
        }
      }

      if (active) {
        setContent([]);
        setError(lastError?.message || "Belum ada galeri yang tersedia.");
        setLoading(false);
      }
    };

    fetchContent();

    return () => {
      active = false;
    };
  }, []);

  const openModal = (item) => {
    setSelectedImage(item);
    setModalIndex(0);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIndex(0);
  };

  const modalImages = selectedImage
    ? selectedImage.images && selectedImage.images.length
      ? selectedImage.images
      : [selectedImage.cover_image].filter(Boolean)
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
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          padding: 24px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: #1a1a1a;
          box-shadow: 0 12px 32px rgba(85, 25, 58, 0.12);
          border: 1px solid rgba(85, 25, 58, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 44px rgba(85, 25, 58, 0.2);
        }

        .gallery-item-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease;
        }

        .gallery-item-image.active {
          opacity: 1;
        }

        .gallery-item-counter {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(85, 25, 58, 0.85);
          color: #fff;
          font-size: 0.62rem;
          font-weight: 700;
          padding: 4px 9px;
          border-radius: 999px;
          letter-spacing: 0.03em;
          z-index: 2;
        }

        .gallery-item-overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 30px 14px 14px;
          background: linear-gradient(180deg, transparent 0%, rgba(30, 8, 20, 0.35) 40%, rgba(30, 8, 20, 0.92) 100%);
          color: #fff;
          z-index: 1;
        }

        .gallery-item-title {
          margin: 0 0 4px;
          font-size: 0.92rem;
          font-weight: 700;
          line-height: 1.25;
        }

        .gallery-item-desc {
          margin: 0;
          font-size: 0.76rem;
          opacity: 0.88;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 24px;
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
          background: #000;
          border-radius: 12px;
          overflow: hidden;
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
          padding: 14px 20px 18px;
          background: rgba(20, 6, 14, 0.9);
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

        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            padding: 24px 16px;
            gap: 14px;
          }

          .modal-body {
            padding: 16px;
          }
        }
      `}</style>

      {/* Header Minimalis */}
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
            margin: "6px 0 0",
            color: "#55193A",
            fontSize: "1.4rem",
            fontWeight: 800,
          }}
        >
          Gallery Kegiatan BEM KM UNAND
        </h1>
      </div>

      {/* Gallery Grid */}
      <div style={{ background: "#fff", padding: "24px 0" }}>
        {loading ? (
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 24px", textAlign: "center" }}>
            <div style={{ color: "#55193A", fontWeight: 600 }}>Memuat galeri...</div>
          </div>
        ) : error ? (
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 24px" }}>
            <div
              style={{
                color: "#7a2a56",
                background: "#fff5f5",
                border: "1px solid #f4d3d3",
                padding: "16px",
                borderRadius: "10px",
                textAlign: "center",
                fontSize: "0.95rem",
              }}
            >
              {error}
            </div>
          </div>
        ) : content.length > 0 ? (
          <div className="gallery-grid">
            {content.map((item) => (
              <GalleryCard key={item.id || item.title} item={item} onClick={openModal} />
            ))}
          </div>
        ) : (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <div style={{ color: "#666" }}>Belum ada galeri yang dipublikasikan.</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
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
                alt={selectedImage.title}
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
              <h2 style={{ margin: "0 0 6px", color: "#fff", fontSize: "1.1rem", fontWeight: 700 }}>{selectedImage.title}</h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, fontSize: "0.88rem" }}>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}