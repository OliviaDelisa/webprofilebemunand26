"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://bemkmunand.site/api";
const UPLOADS = API_BASE.replace("/api", "") + "/uploads/";

const PURPLE = "#55193A";
const PURPLE_SOFT = "#7A2A56";
const GOLD = "#D8833B";

// Ubah jika path halaman form aspirasi di web profile berbeda
const FORM_PATH = "/aspirasi";

const STATUS_LIST = ["baru", "dibaca", "diproses", "selesai"];
const STATUS_BADGE = {
  baru: "bg-blue-50 text-blue-600 border-blue-200",
  dibaca: "bg-amber-50 text-amber-600 border-amber-200",
  diproses: "bg-violet-50 text-violet-600 border-violet-200",
  selesai: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

const fmtDateTime = (iso) => {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) +
    ", " +
    d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
  );
};

const fieldClass =
  "w-full text-sm text-gray-700 bg-white/80 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none transition-all duration-200 focus:border-[#55193A] focus:ring-4 focus:ring-[#55193A]/[0.08] placeholder:text-gray-300 shadow-sm";

// Format otomatis: ASP-YYYYMMDD-XXXXXX
// Strip disisipkan otomatis begitu 3 huruf / 8 angka terisi. Strip yang diketik manual diabaikan.
// Saat menghapus (backspace), strip di ujung tidak dipaksa muncul lagi.
const formatKode = (v, deleting = false) => {
  const raw = v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 17);
  let out = [raw.slice(0, 3), raw.slice(3, 11), raw.slice(11, 17)].filter(Boolean).join("-");
  if ((raw.length === 3 || raw.length === 11) && (!deleting || v.endsWith("-"))) out += "-";
  return out;
};

const labelClass = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400";

export default function CekStatusAspirasi({ embedded = false }) {
  const [kode, setKode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { images, index }

  const handleCek = async (e) => {
    e.preventDefault();
    const k = kode.trim().toUpperCase();
    if (!k || loading) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`${API_BASE}/aspirasi/cek/${encodeURIComponent(k)}`);
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.message || "Gagal mengambil data laporan. Coba lagi ya.");
      }
      setData(json);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError("");
    setKode("");
  };

  const statusIdx = data ? STATUS_LIST.indexOf(data.status) : -1;
  const fotos = data?.foto || [];

  return (
    <main
      className={`relative ${embedded ? "" : "min-h-screen"} overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(85,25,58,0.10),_transparent_30%),linear-gradient(135deg,#fff_0%,#fffafc_100%)] px-4 pb-20 pt-28 sm:px-6 lg:px-8`}
    >
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#55193A]/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#D8833B]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-8 text-center">
            <h1
              className="text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl"
              style={{ color: PURPLE }}
            >
              Cek <span style={{ color: GOLD }}>status</span> aspirasi
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
              Masukkan kode laporan yang kamu terima setelah mengirim aspirasi.
            </p>
          </div>

          {/* Form kode */}
          <form
            onSubmit={handleCek}
            className="space-y-4 rounded-[28px] border border-gray-100 bg-white p-5 shadow-[0_30px_80px_-25px_rgba(85,25,58,0.25)] sm:p-7"
          >
            <div>
              <label className={labelClass}>Kode laporan</label>
              <input
                type="text"
                value={kode}
                onChange={(e) => {
                  const v = e.target.value;
                  setKode((prev) => formatKode(v, v.length < prev.length));
                }}
                maxLength={19}
                placeholder="ASP-20261022-XXXXXX"
                autoComplete="off"
                spellCheck={false}
                className={`${fieldClass} font-mono tracking-wider`}
              />
            </div>

            <button
              type="submit"
              disabled={!kode.trim() || loading}
              className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 hover:brightness-110 active:translate-y-[1px]"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_SOFT})` }}
            >
              {loading ? "Memeriksa..." : "Cek Status"}
            </button>

            <Link
              href={FORM_PATH}
              className="block text-center text-xs font-medium text-gray-400 transition hover:text-gray-600"
            >
              ← Kembali ke form aspirasi
            </Link>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* Hasil */}
          <AnimatePresence>
            {data && (
              <motion.div
                key={data.kode_laporan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_30px_80px_-25px_rgba(85,25,58,0.25)]"
              >
                {/* Header */}
                <div
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 text-white sm:px-7"
                  style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_SOFT})` }}
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">Kode laporan</p>
                    <p className="mt-1 font-mono text-lg font-bold tracking-wider">{data.kode_laporan}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {data.prioritas === "urgent" && (
                      <span className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600">
                        Urgent
                      </span>
                    )}
                    <span
                      className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${STATUS_BADGE[data.status] || ""}`}
                    >
                      {cap(data.status)}
                    </span>
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-7">
                  {/* Progress status */}
                  <div>
                    <label className={labelClass}>Progres penanganan</label>
                    <div className="flex items-center">
                      {STATUS_LIST.map((s, i) => {
                        const done = i <= statusIdx;
                        return (
                          <div key={s} className="flex flex-1 items-center last:flex-none">
                            <div className="flex flex-col items-center gap-1.5">
                              <span
                                className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-colors"
                                style={{
                                  background: done ? PURPLE : "#f3f4f6",
                                  color: done ? "#fff" : "#9ca3af",
                                }}
                              >
                                {done ? "✓" : i + 1}
                              </span>
                              <span className={`text-[10px] font-medium ${done ? "text-gray-700" : "text-gray-300"}`}>
                                {cap(s)}
                              </span>
                            </div>
                            {i < STATUS_LIST.length - 1 && (
                              <span
                                className="mx-1 mb-4 h-0.5 flex-1 rounded-full"
                                style={{ background: i < statusIdx ? PURPLE : "#f3f4f6" }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Info ringkas */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Pengirim</label>
                      <p className="rounded-xl bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">{data.nama || "Anonim"}</p>
                    </div>
                    <div>
                      <label className={labelClass}>Fakultas</label>
                      <p className="rounded-xl bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">{data.fakultas}</p>
                    </div>
                    <div>
                      <label className={labelClass}>Kategori</label>
                      <p className="rounded-xl bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">{data.kategori}</p>
                    </div>
                    <div>
                      <label className={labelClass}>Dikirim pada</label>
                      <p className="rounded-xl bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">{fmtDateTime(data.created_at)}</p>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Isi aspirasi</label>
                    <p className="whitespace-pre-line rounded-2xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
                      {data.isi}
                    </p>
                  </div>

                  {fotos.length > 0 && (
                    <div>
                      <label className={labelClass}>Foto lampiran ({fotos.length})</label>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {fotos.map((f, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setLightbox({ images: fotos, index: i })}
                            className="aspect-square overflow-hidden rounded-2xl border border-gray-100 transition-colors hover:border-[#55193A]/30"
                          >
                            <img
                              src={UPLOADS + f}
                              alt={`Lampiran ${i + 1}`}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.closest("button").style.display = "none";
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keterangan tindak lanjut */}
                  <div>
                    <label className={labelClass}>Keterangan tindak lanjut</label>
                    {data.keterangan_tindak_lanjut ? (
                      <p className="whitespace-pre-line rounded-2xl border border-[#55193A]/10 bg-[#55193A]/[0.04] p-4 text-sm leading-relaxed text-gray-700">
                        {data.keterangan_tindak_lanjut}
                      </p>
                    ) : (
                      <p className="rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-300">-</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-[11px] text-gray-400">
                    <span>Terakhir diperbarui: {fmtDateTime(data.updated_at)}</span>
                    <button type="button" onClick={reset} className="font-medium transition hover:text-gray-600">
                      Cek kode lain
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setLightbox(null)}
        >
          <img
            src={UPLOADS + lightbox.images[lightbox.index]}
            alt="Foto lampiran"
            className="max-h-full max-w-full rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((l) => ({ ...l, index: (l.index - 1 + l.images.length) % l.images.length }));
                }}
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-lg text-white transition hover:bg-black/70 sm:left-5"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((l) => ({ ...l, index: (l.index + 1) % l.images.length }));
                }}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-lg text-white transition hover:bg-black/70 sm:right-5"
              >
                ›
              </button>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
                {lightbox.index + 1} / {lightbox.images.length}
              </span>
            </>
          )}
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70 sm:right-5 sm:top-5"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}