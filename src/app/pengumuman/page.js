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

export default function AnnouncementPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div style={{ background: "#fff", paddingTop: "88px" }}>
      <style>{`
        .announce-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          max-width: 1200px;
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
        }

        .announce-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(85, 25, 58, 0.12);
        }

        .announce-header {
          position: relative;
          height: 180px;
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
          padding: 18px;
        }

        .announce-date {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(85, 25, 58, 0.08);
        }

        .announce-date-box {
          background: linear-gradient(135deg, #D8833B 0%, #f5a846 100%);
          color: #fff;
          padding: 6px 10px;
          border-radius: 8px;
          text-align: center;
          font-weight: 800;
          font-size: 0.85rem;
          min-width: 50px;
        }

        .announce-date-text {
          color: #666;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .announce-title {
          margin: 0 0 8px;
          color: #55193A;
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .announce-description {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .announce-grid {
            grid-template-columns: 1fr;
            padding: 24px 16px;
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
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
                  <div key={item.id || item.title} className="announce-card">
                    <div className="announce-header">
                      <img
                        src={item.cover_image || item.images?.[0] || "/images/placeholder.jpg"}
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
                            <div className="announce-date-text">{formatDate(item.event_start)}</div>
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
    </div>
  );
}
