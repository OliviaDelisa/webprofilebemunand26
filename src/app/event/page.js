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
    title: item.title || item.nama || "Judul konten",
    description: item.description || item.deskripsi || item.content || "",
    cover_image: coverImage,
    images: images.length ? images : coverImage ? [coverImage] : [],
    content_type: (item.content_type || item.type || "announcement").toLowerCase(),
    is_published: item.is_published !== false,
    event_start: item.event_start || item.start_date || item.date || null,
    event_end: item.event_end || item.end_date || null,
  };
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

const formatTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Icon jam minimalis (outline), pengganti emoji 🕐
const ClockIcon = ({ size = 12, color = "currentColor" }) => (
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
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </svg>
);

// Icon kalender minimalis (outline), dipakai di samping tanggal
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

export default function EventPage() {
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
          if (!res.ok) throw new Error(`Request gagal (${res.status})`);

          const payload = await res.json();
          const rows = Array.isArray(payload)
            ? payload
            : Array.isArray(payload.data)
              ? payload.data
              : Array.isArray(payload.result)
                ? payload.result
                : [];

          if (!active) return;

          const normalized = rows
            .map(normalizeContent)
            .filter(Boolean)
            .filter(
              (item) =>
                item.is_published !== false &&
                item.content_type === "event"
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
        setError(lastError?.message || "Gagal memuat data dari server.");
        setLoading(false);
      }
    };

    fetchContent();

    return () => {
      active = false;
    };
  }, []);

  const sortedEventItems = [...content]
    .filter((item) => item.content_type === "event")
    .sort((a, b) => new Date(a.event_start || a.created_at || 0) - new Date(b.event_start || b.created_at || 0));

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const reference = sortedEventItems[0]?.event_start ? new Date(sortedEventItems[0].event_start) : new Date();
    return new Date(reference.getFullYear(), reference.getMonth(), 1);
  });

  const monthLabel = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(calendarMonth);

  const firstDayIndex = calendarMonth.getDay();
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const calendarCells = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstDayIndex + 1;
    const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
    const date = isCurrentMonth ? new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), dayNumber) : null;
    const matchingEvent = isCurrentMonth
      ? sortedEventItems.find((item) => {
          if (!item.event_start) return false;
          const itemDate = new Date(item.event_start);
          return itemDate.getFullYear() === date.getFullYear() && itemDate.getMonth() === date.getMonth() && itemDate.getDate() === date.getDate();
        })
      : null;

    return { dayNumber, isCurrentMonth, date, matchingEvent };
  });

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
        .event-shell {
          width: 100%;
          background: #fff;
        }

        .event-header {
          text-align: center;
          padding: 24px 24px 8px;
          background: #fff;
        }

        .calendar-wrap {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 3fr) minmax(240px, 1fr);
          gap: 24px;
          padding: 8px 24px 0;
          align-items: stretch;
        }

        .calendar-panel {
          width: 100%;
          background: linear-gradient(135deg, rgba(85, 25, 58, 0.04) 0%, rgba(216, 131, 59, 0.06) 100%);
          border: 1px solid rgba(85, 25, 58, 0.08);
          border-radius: 18px;
          padding: 20px 16px 24px;
        }

        .calendar-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .month-nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-button {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(85, 25, 58, 0.15);
          background: #fff;
          color: #55193A;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .calendar-month {
          text-align: center;
          color: #55193A;
          font-weight: 800;
          font-size: clamp(1.2rem, 2vw, 2rem);
          text-transform: capitalize;
          flex: 1;
        }

        .calendar-weekdays, .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 8px;
        }

        .calendar-weekdays {
          margin-bottom: 8px;
        }

        .weekday {
          text-align: center;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7a2a56;
          font-weight: 700;
          padding: 6px 0;
        }

        .day-cell {
          min-height: 90px;
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(85, 25, 58, 0.08);
          border-radius: 12px;
          padding: 8px 6px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          color: #55193A;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .day-cell.empty {
          background: transparent;
          border: 1px dashed rgba(85, 25, 58, 0.08);
          color: transparent;
        }

        .day-cell.has-event {
          background: #55193A;
          color: white;
          cursor: pointer;
        }

        .day-cell.has-event:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(85, 25, 58, 0.15);
        }

        .day-number {
          font-size: 0.9rem;
          margin-bottom: 6px;
        }

        .day-tag {
          font-size: 0.56rem;
          background: rgba(255,255,255,0.18);
          border-radius: 8px;
          padding: 3px 5px;
          letter-spacing: 0.01em;
          text-align: center;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.3;
        }

        .calendar-copy {
          background: #fff;
          border: 1px solid rgba(85, 25, 58, 0.08);
          border-radius: 18px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .calendar-copy-label {
          margin: 0 0 10px;
          color: #D8833B;
          letter-spacing: 0.12em;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .calendar-copy h3 {
          margin: 0 0 12px;
          color: #55193A;
          font-size: clamp(1.5rem, 2vw, 2.1rem);
          line-height: 1.2;
        }

        .calendar-copy p {
          margin: 0;
          color: #555;
          line-height: 1.8;
          font-size: 0.95rem;
        }

        .event-title-block {
          text-align: center;
          padding: 28px 24px 12px;
        }

        .event-bem-title {
          margin: 8px 0 0;
          color: #55193A;
          font-size: 1.4rem;
          font-weight: 800;
        }

        .event-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px 24px 40px;
        }

        .event-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(85, 25, 58, 0.08);
          box-shadow: 0 12px 32px rgba(85, 25, 58, 0.06);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .event-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(85, 25, 58, 0.12);
        }

        .card-header {
          position: relative;
          aspect-ratio: 4 / 3;
          background: linear-gradient(135deg, #55193A 0%, #D8833B 100%);
          overflow: hidden;
        }

        .card-header img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-badge {
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

        .card-body {
          padding: 16px;
        }

        /* --- Tampilan tanggal & jam: lebih minimalis/formal --- */
        .card-date {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(85, 25, 58, 0.08);
        }

        .card-date-box {
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

        .card-date-text {
          color: #666;
          font-size: 0.78rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .card-date-meta {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .card-date-meta svg {
          flex-shrink: 0;
          opacity: 0.7;
        }

        .card-title {
          margin: 0 0 8px;
          color: #55193A;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .card-description {
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

        .empty-state {
          text-align: center;
          padding: 60px 24px;
          color: #999;
        }

        .empty-state-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
          opacity: 0.5;
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
          white-space: pre-line; /* fix: sama, biar paragraf baru kebaca di modal */
        }

        .modal-title {
          margin: 0 0 8px;
          color: #55193A;
          font-size: 1.2rem;
          font-weight: 800;
        }

        @media (max-width: 980px) {
          .calendar-wrap {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .event-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .day-cell {
            min-height: 72px;
          }
        }

        @media (max-width: 560px) {
          .event-grid {
            grid-template-columns: 1fr;
            padding: 24px 16px 40px;
            gap: 14px;
          }

          .card-body {
            padding: 14px;
          }

          .card-title {
            font-size: 1rem;
          }

          .modal-body {
            padding: 14px 16px 16px;
          }
        }
      `}</style>

      <div className="event-shell">
        <div className="event-header"></div>

        <div className="calendar-wrap">
          <div className="calendar-panel">
            <div className="calendar-topbar">
              <div className="month-nav">
                <button
                  type="button"
                  className="nav-button"
                  onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
                  aria-label="Bulan sebelumnya"
                >
                  ‹
                </button>
              </div>
              <div className="calendar-month">{monthLabel}</div>
              <div className="month-nav">
                <button
                  type="button"
                  className="nav-button"
                  onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
                  aria-label="Bulan berikutnya"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="calendar-weekdays">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>

            <div className="calendar-grid">
              {calendarCells.map((cell, index) => {
                if (!cell.isCurrentMonth) {
                  return <div key={`empty-${index}`} className="day-cell empty" />;
                }

                const eventLabel = cell.matchingEvent
                  ? cell.matchingEvent.title.length > 12
                    ? `${cell.matchingEvent.title.slice(0, 12)}…`
                    : cell.matchingEvent.title
                  : "";

                return (
                  <button
                    key={cell.date.toISOString()}
                    type="button"
                    className={`day-cell ${cell.matchingEvent ? "has-event" : ""}`}
                    onClick={() => cell.matchingEvent && openModal(cell.matchingEvent)}
                    aria-label={cell.matchingEvent ? `Lihat event ${cell.matchingEvent.title}` : `Tanggal ${cell.dayNumber}`}
                  >
                    <span className="day-number">{cell.dayNumber}</span>
                    {cell.matchingEvent && <span className="day-tag">{eventLabel}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="calendar-copy">
            <p className="calendar-copy-label">Kalender Kegiatan</p>
            <h3>BEM KM UNAND</h3>
          </div>
        </div>

        <div className="event-title-block">
          <h2 className="event-bem-title">EVENT BEM KM UNAND</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 24px" }}>
            <div style={{ color: "#55193A", fontWeight: 600 }}>Memuat data...</div>
          </div>
        ) : error ? (
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                color: "#7a2a56",
                background: "#fff5f5",
                border: "1px solid #f4d3d3",
                padding: "18px",
                borderRadius: "10px",
                textAlign: "center",
                fontSize: "0.95rem",
                marginTop: "12px",
              }}
            >
              {error}
            </div>
          </div>
        ) : (
          <div className="event-grid">
            {sortedEventItems.length > 0 ? (
              sortedEventItems.map((item) => (
                <div key={item.id || item.title} className="event-card" onClick={() => openModal(item)}>
                  <div className="card-header">
                    <img
                      src={resolveImageUrl(item.cover_image || item.images?.[0])}
                      alt={item.title}
                    />
                    <div className="card-badge">event</div>
                  </div>

                  <div className="card-body">
                    {item.event_start && (
                      <div className="card-date">
                        <div className="card-date-box">
                          {new Date(item.event_start).getDate()}
                        </div>
                        <div>
                          <div className="card-date-text card-date-meta">
                            <CalendarIcon size={11} />
                            {formatDate(item.event_start)}
                          </div>
                          {formatTime(item.event_start) && (
                            <div className="card-date-text card-date-meta">
                              <ClockIcon size={11} />
                              {formatTime(item.event_start)}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
                <div className="empty-state-icon">📭</div>
                <div>Belum ada event yang dipublikasikan.</div>
              </div>
            )}
          </div>
        )}
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
                  <CalendarIcon size={11} color="#f5b467" />
                  {formatDate(selectedItem.event_start)}
                  {formatTime(selectedItem.event_start) && (
                    <>
                      <span style={{ opacity: 0.6 }}>•</span>
                      <ClockIcon size={11} color="#f5b467" />
                      {formatTime(selectedItem.event_start)}
                    </>
                  )}
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