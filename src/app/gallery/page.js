"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://bemkmunand.site/api";

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

export default function GalleryPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div style={{ background: "#fff", paddingTop: "88px" }}>
      <style>{`
        .gallery-grid {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 24px 24px;
          max-width: 1400px;
          margin: 0 auto;
          scroll-behavior: smooth;
        }

        .gallery-grid::-webkit-scrollbar {
          height: 6px;
        }

        .gallery-grid::-webkit-scrollbar-track {
          background: rgba(85, 25, 58, 0.08);
          border-radius: 10px;
        }

        .gallery-grid::-webkit-scrollbar-thumb {
          background: #D8833B;
          border-radius: 10px;
        }

        .gallery-item {
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(85, 25, 58, 0.08);
          border: 1px solid rgba(85, 25, 58, 0.08);
          background: #fff;
          transition: all 0.3s ease;
          flex: 0 0 240px;
          min-width: 240px;
        }

        .gallery-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(85, 25, 58, 0.15);
        }

        .gallery-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .gallery-item-content {
          padding: 14px;
        }

        .gallery-item h4 {
          margin: 0 0 6px;
          color: #55193A;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .gallery-item p {
          margin: 0;
          color: #666;
          font-size: 0.85rem;
          line-height: 1.4;
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
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-image {
          width: 100%;
          max-height: 60vh;
          object-fit: cover;
          display: block;
        }

        .modal-body {
          padding: 24px;
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

        @media (max-width: 768px) {
          .gallery-grid {
            padding: 24px 16px;
          }

          .gallery-item {
            flex: 0 0 180px;
            min-width: 180px;
          }

          .gallery-item img {
            height: 160px;
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

      {/* Gallery Scroll */}
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
              <div
                key={item.id || item.title}
                className="gallery-item"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.cover_image || item.images?.[0] || "/images/placeholder.jpg"}
                  alt={item.title}
                />
                <div className="gallery-item-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
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
        <div
          className="modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              className="modal-image"
              src={selectedImage.cover_image || selectedImage.images?.[0] || "/images/placeholder.jpg"}
              alt={selectedImage.title}
            />
            <div className="modal-body">
              <h2 style={{ margin: "0 0 10px", color: "#55193A", fontSize: "1.3rem" }}>{selectedImage.title}</h2>
              <p style={{ margin: 0, color: "#666", lineHeight: 1.6, fontSize: "0.95rem" }}>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
