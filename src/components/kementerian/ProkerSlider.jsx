"use client";

import { useEffect, useRef, useState } from "react";

const INTERVAL = 5000; // 5000 milidetik = 5 detik. Ubah di sini kalau mau lebih cepat/lambat

export default function ProkerSlider({ foto, nama }) {
  const [index, setIndex] = useState(0);      // foto ke berapa yang sedang tampil (mulai dari 0)
  const [dijeda, setDijeda] = useState(false); // true saat kursor di atas slider
  const sentuhAwal = useRef(null);

  const jumlah = foto.length;

  // Geser otomatis. Timer dimulai ulang setiap index berubah,
  // jadi setelah tombol ditekan, hitungan 5 detik mulai dari awal.
  useEffect(() => {
    if (jumlah < 2 || dijeda) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % jumlah), INTERVAL);
    return () => clearTimeout(timer);
  }, [index, dijeda, jumlah]);

  const sebelumnya = () => setIndex((i) => (i - 1 + jumlah) % jumlah);
  const berikutnya = () => setIndex((i) => (i + 1) % jumlah);

  // Swipe di HP
  const sentuhMulai = (e) => (sentuhAwal.current = e.touches[0].clientX);
  const sentuhSelesai = (e) => {
    if (sentuhAwal.current === null) return;
    const selisih = e.changedTouches[0].clientX - sentuhAwal.current;
    if (Math.abs(selisih) > 40) selisih < 0 ? berikutnya() : sebelumnya();
    sentuhAwal.current = null;
  };

  // ----- Kasus 1 foto: foto saja, tanpa tombol -----
  if (jumlah === 1) {
    return (
      <div className="km-slider">
        <div className="km-slide">
          <img src={foto[0]} alt={nama} />
        </div>
      </div>
    );
  }

  // ----- Kasus 2 foto atau lebih: slider -----
  return (
    <div
      className="km-slider"
      onMouseEnter={() => setDijeda(true)}
      onMouseLeave={() => setDijeda(false)}
      onTouchStart={sentuhMulai}
      onTouchEnd={sentuhSelesai}
    >
      <div className="km-slider-jalur" style={{ transform: `translateX(-${index * 100}%)` }}>
        {foto.map((src, i) => (
          <div className="km-slide" key={i}>
            <img src={src} alt={`${nama} - foto ${i + 1}`} />
          </div>
        ))}
      </div>

      <button className="km-tombol km-tombol--kiri" onClick={sebelumnya} aria-label="Foto sebelumnya">
        ‹
      </button>
      <button className="km-tombol km-tombol--kanan" onClick={berikutnya} aria-label="Foto berikutnya">
        ›
      </button>

      <div className="km-titik">
        {foto.map((_, i) => (
          <button
            key={i}
            className={i === index ? "aktif" : ""}
            onClick={() => setIndex(i)}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}