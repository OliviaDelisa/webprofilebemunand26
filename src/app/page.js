"use client";

import { useEffect, useState } from "react";

const marqueeItems = [
  "BEM KM UNAND",
  "Rakit Makna",
  "Kebersamaan",
  "Inovasi",
  "Pengabdian",
  "Semangat Mahasiswa",
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll, .slide-left, .slide-right");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-on-scroll.delay-1 { transition-delay: 0.1s; }
        .animate-on-scroll.delay-2 { transition-delay: 0.25s; }
        .animate-on-scroll.delay-3 { transition-delay: 0.4s; }
        .animate-on-scroll.delay-4 { transition-delay: 0.55s; }

        .slide-left {
          opacity: 0;
          transform: translateX(-60px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .slide-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .slide-right {
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .slide-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 22s linear infinite;
        }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .bem-title {
            font-size: clamp(2.8rem, 14vw, 4.5rem) !important;
            text-align: center !important;
          }
          .diagonal-section {
            height: auto !important;
            min-height: 380px !important;
            padding-bottom: 60px !important;
          }
          .diagonal-inner {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 40px 24px 60px !important;
            gap: 28px !important;
          }
          .bem-wrapper {
            transform: rotate(0deg) !important;
            text-align: center !important;
          }
          .selamat-text {
            font-size: 0.72rem !important;
            letter-spacing: 2px !important;
            text-align: center !important;
          }
          .kabinet-label {
            text-align: center !important;
          }
          .kabinet-section {
            padding: 60px 20px !important;
          }
          .kabinet-section h2 {
            font-size: 1.8rem !important;
          }
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <section
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
          }}
        >
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

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.50)",
              zIndex: 2,
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: -2,
              left: 0,
              width: "100%",
              zIndex: 4,
              lineHeight: 0,
            }}
          >
            <svg
              viewBox="0 0 1440 140"
              preserveAspectRatio="none"
              style={{ display: "block", width: "100%", height: "140px" }}
            >
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b0f26" />
                  <stop offset="50%" stopColor="#55193A" />
                  <stop offset="100%" stopColor="#7a2550" />
                </linearGradient>
              </defs>
              <path
                d="M0,60 C200,20 400,100 720,60 C1040,20 1240,90 1440,50 L1440,140 L0,140 Z"
                fill="url(#waveGrad)"
                opacity="0.45"
              />
              <path
                d="M0,85 C180,50 400,115 720,80 C1040,45 1260,105 1440,75 L1440,140 L0,140 Z"
                fill="url(#waveGrad)"
              />
            </svg>
          </div>
        </section>

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
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              zIndex: 2,
            }}
          >
            <svg
              viewBox="0 0 1440 200"
              preserveAspectRatio="none"
              style={{ display: "block", width: "100%", height: "200px" }}
            >
              <polygon points="0,200 1440,200 1440,60 0,160" fill="#D8833B" opacity="0.12" />
              <line x1="0" y1="160" x2="1440" y2="60" stroke="#D8833B" strokeWidth="2.5" />
              <line x1="0" y1="172" x2="1440" y2="72" stroke="#D8833B" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </div>

          <div
            style={{
              position: "absolute",
              top: "-80px",
              left: "-80px",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              border: "1px solid rgba(216,131,59,0.18)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "-40px",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              border: "1px solid rgba(216,131,59,0.1)",
              zIndex: 1,
            }}
          />

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
              <p
                className="selamat-text"
                style={{
                  fontSize: "0.85rem",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  margin: "0 0 12px",
                }}
              >
                Selamat Datang di Laman Resmi,
              </p>
              <p
                className="kabinet-label"
                style={{
                  fontSize: "1rem",
                  color: "#D8833B",
                  letterSpacing: "2px",
                  margin: 0,
                  fontWeight: 700,
                }}
              >
                Kabinet Rakit Makna
              </p>
            </div>

            <div
              className="animate-on-scroll slide-right delay-2 bem-wrapper"
              style={{
                textAlign: "right",
                transform: "rotate(-5deg)",
                transformOrigin: "right bottom",
                marginBottom: "20px",
              }}
            >
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
                <span
                  style={{
                    color: "#D8833B",
                    textShadow: "0 4px 20px rgba(216,131,59,0.45)",
                  }}
                >
                  2026
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="kabinet-section"
          style={{
            background: "#ffffff",
            padding: "100px 24px",
            textAlign: "center",
          }}
        >
          <h2
            className="animate-on-scroll delay-1"
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              marginBottom: "20px",
              color: "#55193A",
            }}
          >
            Kabinet Rakit Makna
          </h2>

          <p
            className="animate-on-scroll delay-2"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "#555",
            }}
          >
            Bersama merakit makna dalam setiap langkah pengabdian, kolaborasi, dan inovasi demi
            menciptakan lingkungan kampus yang progresif, inklusif, dan berdampak bagi seluruh
            mahasiswa Universitas Andalas.
          </p>
        </section>

      </div>
    </>
  );
}
