"use client";

import { useRef, useState } from "react";

export default function KartuOrang({ nama, jabatan, foto, utama = false }) {
  const kartu = useRef(null);
  const [gagal, setGagal] = useState(false);

  // Dipanggil setiap kursor bergerak di atas kartu
  function gerak(e) {
    if (e.pointerType !== "mouse") return; // hanya untuk mouse, bukan sentuhan
    const el = kartu.current;
    const kotak = el.getBoundingClientRect();
    const x = (e.clientX - kotak.left) / kotak.width;  // posisi kursor 0 (kiri) sampai 1 (kanan)
    const y = (e.clientY - kotak.top) / kotak.height;  // 0 (atas) sampai 1 (bawah)

    el.style.setProperty("--rx", `${(0.5 - y) * 14}deg`); // miring atas-bawah
    el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`); // miring kiri-kanan
    el.style.setProperty("--mx", `${x * 100}%`);          // posisi kilau
    el.style.setProperty("--my", `${y * 100}%`);
  }

  // Dipanggil saat kursor keluar dari kartu: kembalikan ke posisi lurus
  function keluar() {
    const el = kartu.current;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  const adaFoto = foto && !gagal;

  return (
    <figure
      ref={kartu}
      className={`km-orang ${utama ? "km-orang--utama" : ""}`}
      onPointerMove={gerak}
      onPointerLeave={keluar}
    >
      <div className="km-orang-foto">
        {adaFoto ? (
          <img src={foto} alt={nama} onError={() => setGagal(true)} />
        ) : (
          <div className="km-orang-siluet" aria-hidden="true">
            <svg viewBox="0 0 100 120" fill="currentColor">
              <circle cx="50" cy="38" r="20" />
              <path d="M10 120c0-26 18-44 40-44s40 18 40 44z" />
            </svg>
          </div>
        )}

        <span className="km-orang-kilau" />

        <figcaption className="km-orang-label">
          <strong>{nama}</strong>
          <span>{jabatan}</span>
        </figcaption>
      </div>
    </figure>
  );
}