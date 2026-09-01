"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://bemkmunand.site/api";

const PURPLE = "#55193A";
const PURPLE_SOFT = "#7A2A56";
const GOLD = "#D8833B";
const MAX_FOTO = 5;

const FAKULTAS_LIST = [
  "Fakultas Kedokteran",
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

const initialForm = { nama: "", anonim: false, fakultas: "", nama_kategori: "", isi: "" };

const fieldClass =
  "w-full text-sm text-gray-700 bg-white/80 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none transition-all duration-200 focus:border-[#55193A] focus:ring-4 focus:ring-[#55193A]/[0.08] placeholder:text-gray-300 shadow-sm";

export default function AspirasiForm() {
  const [form, setForm] = useState(initialForm);
  const [fotos, setFotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [fotoErr, setFotoErr] = useState("");
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

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

  const isValid =
    form.fakultas &&
    form.nama_kategori &&
    form.isi.trim().length >= 10 &&
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
      fd.append("fakultas", form.fakultas);
      fd.append("nama_kategori", form.nama_kategori);
      fd.append("isi", form.isi);
      fotos.forEach((file) => fd.append("foto", file));

      const res = await fetch(`${API_BASE}/aspirasi`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Gagal mengirim aspirasi. Coba lagi ya.");
      }

      setStatus("success");
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(85,25,58,0.10),_transparent_30%),linear-gradient(135deg,#fff_0%,#fffafc_100%)] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
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

            <button
              type="submit"
              disabled={!isValid || loading}
              className="mt-2 w-full rounded-2xl px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 hover:brightness-110 active:translate-y-[1px]"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_SOFT})` }}
            >
              {loading ? "Mengirim..." : "Kirim Aspirasi"}
            </button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            className="fixed inset-x-4 top-6 z-50 mx-auto w-full max-w-md"
          >
            <div className="rounded-2xl border border-[#55193A]/10 bg-[#55193A] px-4 py-3 text-white shadow-[0_20px_40px_-20px_rgba(85,25,58,0.8)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <CheckCircleIcon />
                </div>
                <div>
                  <p className="text-sm font-semibold">Aspirasi terkirim</p>
                  <p className="text-xs text-white/75">Terima kasih, saranmu sudah kami terima.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
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

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.2 4.2L19 2.8" />
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