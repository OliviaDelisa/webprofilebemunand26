"use client";

import { useEffect, useState } from "react";

export default function KontakPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ background: "#fff", paddingTop: "88px" }}>
      <style>{`
        .kontak-shell {
          width: 100%;
          background: #fff;
        }

        .kontak-header {
          padding: 24px 24px 8px;
          background: #fff;
          text-align: center;
        }

        .kontak-meta {
          text-align: left;
          margin-bottom: 20px;
        }

        .kontak-meta-label {
          margin: 0 0 4px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #999;
          font-weight: 600;
          font-size: 0.7rem;
        }

        .kontak-meta-label:last-child {
          margin-bottom: 0;
        }

        .kontak-container {
          max-width: 1360px;
          margin: 0 auto;
          padding: 24px;
        }

        .kontak-main-grid {
          display: grid;
          grid-template-columns: minmax(340px, 640px) 1fr;
          gap: 40px;
          align-items: stretch;
        }

        .kontak-map-box {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 360px;
          border-radius: 16px;
          overflow: hidden;
          background: #E5E5E5;
        }

        .kontak-map-box iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        .kontak-map-btn {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #fff;
          color: #1a1a1a;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 10px 16px;
          border-radius: 10px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          z-index: 2;
        }

        .kontak-info-list {
          display: flex;
          flex-direction: column;
        }

        .kontak-info-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid #EEE;
        }

        .kontak-info-row:first-child {
          padding-top: 0;
        }

        .kontak-info-icon {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          border-radius: 10px;
          border: 1px solid #E2E2E2;
          background: #FAFAFA;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
        }

        .kontak-info-icon svg {
          width: 18px;
          height: 18px;
        }

        .kontak-map-btn svg {
          width: 16px;
          height: 16px;
        }

        .kontak-info-label {
          margin: 0 0 4px;
          color: #999;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .kontak-info-value {
          margin: 0;
          color: #1a1a1a;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
        }

        .kontak-info-value a {
          color: #55193A;
          text-decoration: none;
        }

        .kontak-info-value a:hover {
          text-decoration: underline;
        }

        .kontak-footnote {
          margin-top: 20px;
          color: #777;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .kontak-container {
            padding: 16px;
          }

          .kontak-main-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .kontak-map-box {
            height: 320px;
            min-height: 0;
          }
        }
      `}</style>

      <div className="kontak-shell">
        <div className="kontak-header">
          <h1
            style={{
              margin: "0",
              color: "#55193A",
              fontSize: "1.4rem",
              fontWeight: 800,
            }}
          >
            Kontak BEM KM UNAND
          </h1>
        </div>

        <div className="kontak-container">
          <div className="kontak-meta">
            <p className="kontak-meta-label">Lokasi Kami</p>
            <p className="kontak-meta-label">
              Jam Operasional: Senin - Jumat 08.00 - 17.00 WIB
            </p>
          </div>

          <div className="kontak-main-grid">
            {/* Peta */}
            <div className="kontak-map-box">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Gedung+PKM+Universitas+Andalas+Limau+Manis+Padang"
                target="_blank"
                rel="noopener noreferrer"
                className="kontak-map-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Buka di Maps
              </a>
              <iframe
                title="Lokasi BEM KM UNAND"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps?q=Gedung+PKM+Universitas+Andalas+Limau+Manis+Padang&output=embed"
              />
            </div>

            {/* Info Kontak */}
            <div className="kontak-info-list">
              <div className="kontak-info-row">
                <div className="kontak-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="kontak-info-label">Lokasi</p>
                  <p className="kontak-info-value">
                    Gedung PKM (Pusat Kegiatan Mahasiswa) Lantai II<br />
                    Universitas Andalas, Limau Manis, Padang, Sumatera Barat
                  </p>
                </div>
              </div>

              <div className="kontak-info-row">
                <div className="kontak-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="kontak-info-label">Telepon</p>
                  <p className="kontak-info-value">+62 812-1521-3393</p>
                </div>
              </div>

              <div className="kontak-info-row">
                <div className="kontak-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <p className="kontak-info-label">Email</p>
                  <p className="kontak-info-value">
                    <a href="mailto:bemkmunand@gmail.com">bemkmunand@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="kontak-info-row">
                <div className="kontak-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div>
                  <p className="kontak-info-label">Instagram</p>
                  <p className="kontak-info-value">
                    <a
                      href="https://instagram.com/bemkmunand"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @bemkmunand
                    </a>
                  </p>
                </div>
              </div>

              <p className="kontak-footnote">
                Silakan menghubungi kami untuk berdiskusi, berkolaborasi, atau sekadar memberikan saran dan masukan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}