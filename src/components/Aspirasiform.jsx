"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://bemkmunand.site/api";

const PURPLE = "#55193A";
const PURPLE_SOFT = "#7A2A56";
const GOLD = "#D8833B";
const MAX_FOTO = 5;

// Ubah jika path halaman cek status di web profile berbeda
const CEK_STATUS_PATH = "/aspirasi/cek";

const FAKULTAS_LIST = [
  "Fakultas Kedokteran",
  "Fakultas Kedokteran Gigi",
  "Fakultas Hukum",
  "Fakultas Ekonomi dan Bisnis", 
  "Fakultas Pertanian",
  "Fakultas Peternakan",
  "Fakultas Ilmu Budaya",
  "Fakultas Matematika dan Ilmu Pengetahuan Alam",
  "Fakultas Ilmu Sosial dan Ilmu Politik",
  "Fakultas Teknik",
  "Fakultas Teknologi Pertanian",
  "Fakultas Kesehatan Masyarakat",
  "Fakultas Teknologi Informasi",
  "Fakultas Keperawatan",
  "Fakultas Farmasi",
  "Pascasarjana",
];

const initialForm = { nama: "", anonim: false, no_hp: "", fakultas: "", nama_kategori: "", isi: "" };

const fieldClass =
  "w-full text-sm text-gray-700 bg-white/80 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none transition-all duration-200 focus:border-[#55193A] focus:ring-4 focus:ring-[#55193A]/[0.08] placeholder:text-gray-300 shadow-sm";

// Hanya angka, dan "+" hanya boleh di awal
const sanitizeHp = (v) => v.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "").slice(0, 16);

// Validasi sama dengan backend: 08xx / 62xx / +62xx
const isValidHp = (raw) => {
  const v = raw.trim();
  if (!v) return true; // opsional
  return /^(\+?62|0)[0-9]{8,13}$/.test(v.replace(/[\s\-()]/g, ""));
};

// Simpan kode laporan sebagai gambar PNG (tanpa library tambahan)
function downloadKodeImage(kode) {
  const w = 900, h = 520;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  const grad = ctx.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, PURPLE);
  grad.addColorStop(1, PURPLE_SOFT);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, 130);

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = "bold 40px sans-serif";
  ctx.fillText("Kode Laporan Aspirasi", w / 2, 72);
  ctx.font = "22px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText("BEM KM UNAND", w / 2, 108);

  ctx.fillStyle = "#faf5f8";
  ctx.strokeStyle = "#e9d5e1";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(70, 190, w - 140, 120, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = PURPLE;
  ctx.font = "bold 56px monospace";
  ctx.fillText(kode, w / 2, 265);

  ctx.fillStyle = "#6b7280";
  ctx.font = "22px sans-serif";
  ctx.fillText("Simpan kode ini untuk mengecek status tindak lanjut aspirasimu.", w / 2, 380);
  ctx.fillText("Cek di halaman \"Cek Status Aspirasi\" pada web BEM KM UNAND.", w / 2, 415);

  ctx.fillStyle = GOLD;
  ctx.fillRect(70, 460, w - 140, 4);

  c.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Kode-Laporan-${kode}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

export default function AspirasiForm({ embedded = false }) {
  const [form, setForm] = useState(initialForm);
  const [fotos, setFotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [fotoErr, setFotoErr] = useState("");
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [kodeLaporan, setKodeLaporan] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 4200);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    fetch(`${API_BASE}/aspirasi/kategori`)
      .then((res) => res.json())
      .then((data) => setKategoriList(Array.isArray(data) ? data : []))
      .catch(() => setKategoriList([]));
  }, []);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleFoto = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setFotoErr("");
    const combined = [...fotos, ...files];

    if (combined.length > MAX_FOTO) {
      setFotoErr(`Maksimal ${MAX_FOTO} foto. ${combined.length - MAX_FOTO} foto terakhir tidak ditambahkan.`);
    }

    const finalFiles = combined.slice(0, MAX_FOTO);
    setFotos(finalFiles);
    setPreviews(finalFiles.map((f) => URL.createObjectURL(f)));
    e.target.value = "";
  };

  const removeFoto = (index) => {
    setFotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (prev[index]) URL.revokeObjectURL(prev[index]);
      return next;
    });
    setFotoErr("");
  };

  const hpValid = isValidHp(form.no_hp);

  const isValid =
    form.fakultas &&
    form.nama_kategori &&
    form.isi.trim().length >= 10 &&
    hpValid &&
    (!form.anonim ? form.nama.trim().length > 0 : true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    setStatus(null);
    setErrMsg("");

    try {
      const fd = new FormData();
      fd.append("nama", form.anonim ? "" : form.nama);
      fd.append("no_hp", form.no_hp.trim());
      fd.append("fakultas", form.fakultas);
      fd.append("nama_kategori", form.nama_kategori);
      fd.append("isi", form.isi);
      fotos.forEach((file) => fd.append("foto", file));

      const res = await fetch(`${API_BASE}/aspirasi`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengirim aspirasi. Coba lagi ya.");
      }

      setKodeLaporan(data.kode_laporan || null);
      setCopied(false);
      setForm(initialForm);
      previews.forEach((p) => URL.revokeObjectURL(p));
      setFotos([]);
      setPreviews([]);
      setFotoErr("");
    } catch (err) {
      setStatus("error");
      setErrMsg(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const copyKode = () => {
    if (!kodeLaporan) return;
    navigator.clipboard?.writeText(kodeLaporan);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
      <main className={`relative ${embedded ? "" : "min-h-screen"} overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(85,25,58,0.10),_transparent_30%),linear-gradient(135deg,#fff_0%,#fffafc_100%)] px-4 pb-20 pt-28 sm:px-6 lg:px-8`}>
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#55193A]/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#D8833B]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid items-stretch gap-8 lg:grid-cols-[0.7fr_1.4fr]"
        >
          {/* Heading: lepas dari card, langsung di background halaman */}
          <div className="flex flex-col justify-center py-6 lg:py-0 lg:pr-4">
            <h1
              className="text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-[4rem]"
              style={{ color: PURPLE }}
            >
              Ayo <span style={{ color: GOLD }}>salurkan</span>
              <br />
              aspirasimu
            </h1>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500 sm:text-base">
              Sampaikan pendapat, kritik, atau saran untuk kemajuan kampus.
            </p>
          </div>

          {/* Form: satu-satunya card, memanjang mengisi sisa ruang ke kanan */}
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-5 rounded-[28px] border border-gray-100 bg-white p-5 shadow-[0_30px_80px_-25px_rgba(85,25,58,0.25)] sm:p-7"
          >
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Nama</label>
                <label className="flex cursor-pointer select-none items-center gap-2 text-[11px] font-medium text-gray-500">
                  <input
                    type="checkbox"
                    checked={form.anonim}
                    onChange={(e) => update("anonim", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                    style={{ accentColor: PURPLE }}
                  />
                  Kirim anonim
                </label>
              </div>
              <input
                type="text"
                value={form.nama}
                disabled={form.anonim}
                onChange={(e) => update("nama", e.target.value)}
                placeholder={form.anonim ? "Tidak ditampilkan" : "Nama lengkap"}
                className={`${fieldClass} disabled:bg-gray-50 disabled:text-gray-300`}
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                Nomor HP
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-gray-400">
                  Opsional
                </span>
              </label>
              <input
                type="tel"
                inputMode="tel"
                value={form.no_hp}
                onChange={(e) => update("no_hp", sanitizeHp(e.target.value))}
                maxLength={16}
                placeholder="08xxxxxxxxxx"
                className={`${fieldClass} ${!hpValid ? "!border-red-300 focus:!ring-red-100" : ""}`}
              />
              {!hpValid ? (
                <p className="mt-2 text-[11px] text-red-500">
                  Format nomor HP tidak valid. Contoh: 081234567890
                </p>
              ) : (
                <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-gray-400">
                  <span className="mt-0.5 flex-shrink-0" style={{ color: PURPLE }}><LockIcon /></span>
                  Diisi jika kamu ingin kami menghubungi untuk tindak lanjut. Datamu akan dirahasiakan dan tidak ditampilkan ke publik.
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Fakultas</label>
                <select
                  value={form.fakultas}
                  onChange={(e) => update("fakultas", e.target.value)}
                  className={`${fieldClass} cursor-pointer`}
                >
                  <option value="">Pilih fakultas</option>
                  {FAKULTAS_LIST.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Kategori</label>
                <select
                  value={form.nama_kategori}
                  onChange={(e) => update("nama_kategori", e.target.value)}
                  className={`${fieldClass} cursor-pointer`}
                >
                  <option value="">Pilih kategori</option>
                  {kategoriList.length > 0 ? (
                    kategoriList.map((k) => (
                      <option key={k.id} value={k.nama_kategori}>{k.nama_kategori}</option>
                    ))
                  ) : (
                    [
                      "Akademik",
                      "Fasilitas",
                      "Kemahasiswaan",
                      "Kesejahteraan",
                      "Lainnya",
                    ].map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Isi aspirasi</label>
              <textarea
                value={form.isi}
                onChange={(e) => update("isi", e.target.value)}
                rows={6}
                placeholder="Tuliskan aspirasi, keluhan, atau masukanmu..."
                className={`${fieldClass} resize-none`}
              />
              <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                <span>Minimal 10 karakter</span>
                <span>{form.isi.length} karakter</span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Foto pendukung</label>
              {previews.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {previews.map((src, i) => (
                    <div key={src} className="relative h-20 w-20">
                      <img src={src} alt={`Preview ${i + 1}`} className="h-full w-full rounded-2xl border border-gray-200 object-cover shadow-sm" />
                      <button
                        type="button"
                        onClick={() => removeFoto(i)}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-sm text-gray-500 shadow-sm transition hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}

              {fotos.length < MAX_FOTO && (
                <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-xs font-medium text-gray-500 transition hover:border-[#55193A]/40 hover:bg-[#55193A]/5">
                  <input type="file" accept="image/*" multiple onChange={handleFoto} className="hidden" />
                  <PlusIcon /> Unggah gambar
                </label>
              )}

              {fotos.length > 0 && (
                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                  <span>{fotos.length}/{MAX_FOTO} foto</span>
                </div>
              )}

              {fotoErr && <p className="mt-2 text-[11px] text-red-500">{fotoErr}</p>}
            </div>

            <div className="space-y-3 pt-1">
              <button
                type="submit"
                disabled={!isValid || loading}
                className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 hover:brightness-110 active:translate-y-[1px]"
                style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_SOFT})` }}
              >
                {loading ? "Mengirim..." : "Kirim Aspirasi"}
              </button>

              <Link
                href={CEK_STATUS_PATH}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#55193A]/20 bg-white px-5 py-3.5 text-sm font-semibold transition-all duration-200 hover:border-[#55193A]/40 hover:bg-[#55193A]/5 active:translate-y-[1px]"
                style={{ color: PURPLE }}
              >
                <SearchIcon /> Cek Status Aspirasi
              </Link>
            </div>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {/* Modal kode laporan setelah aspirasi terkirim */}
        {kodeLaporan && (
          <motion.div
            key="kode-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              className="w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-25px_rgba(85,25,58,0.5)]"
            >
              <div
                className="px-6 py-6 text-center text-white"
                style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_SOFT})` }}
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <CheckCircleIcon />
                </div>
                <p className="text-base font-semibold">Aspirasi terkirim</p>
                <p className="mt-1 text-xs text-white/75">Terima kasih, saranmu sudah kami terima.</p>
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Kode laporanmu
                  </p>
                  <button
                    type="button"
                    onClick={copyKode}
                    title="Klik untuk menyalin"
                    className="w-full rounded-2xl border border-[#55193A]/15 bg-[#55193A]/[0.04] px-4 py-4 text-center font-mono text-xl font-bold tracking-wider transition hover:bg-[#55193A]/[0.08] sm:text-2xl"
                    style={{ color: PURPLE }}
                  >
                    {kodeLaporan}
                  </button>
                  <p className="mt-1.5 text-center text-[11px] text-gray-400">
                    {copied ? "✓ Kode tersalin" : "Klik kode untuk menyalin"}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
                  <strong>Simpan kode ini baik-baik.</strong> Kamu membutuhkannya untuk mengetahui status tindak lanjut aspirasimu. Kode tidak bisa dilihat lagi setelah jendela ini ditutup.
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => downloadKodeImage(kodeLaporan)}
                    className="rounded-2xl border border-gray-200 px-4 py-3 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                  >
                    Simpan sebagai gambar
                  </button>
                  <Link
                    href={CEK_STATUS_PATH}
                    className="flex items-center justify-center rounded-2xl px-4 py-3 text-xs font-semibold text-white transition hover:brightness-110"
                    style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_SOFT})` }}
                  >
                    Cek status
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setKodeLaporan(null)}
                  className="w-full py-1 text-xs font-medium text-gray-400 transition hover:text-gray-600"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error-toast"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            className="fixed inset-x-4 top-6 z-50 mx-auto w-full max-w-md"
          >
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 shadow-[0_20px_40px_-20px_rgba(185,28,28,0.25)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                  <AlertIcon />
                </div>
                <div>
                  <p className="text-sm font-semibold">Gagal terkirim</p>
                  <p className="text-xs text-red-600">{errMsg}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.2 2.2 4.8-5.4" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5" />
      <circle cx="12" cy="15.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}