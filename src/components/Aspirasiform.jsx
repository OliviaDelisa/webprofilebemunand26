"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Ganti sesuai domain backend Express yang sudah dihosting ──
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api-admin-bem.example.com/api";

const PURPLE      = "#55193A";
const PURPLE_SOFT = "#7A2A56";
const GOLD        = "#D8833B";

// Sesuaikan dengan data yang sebenarnya dipakai backend
const KATEGORI_LIST = ["Akademik", "Fasilitas", "Kemahasiswaan", "Kesejahteraan", "Lainnya"];
const FAKULTAS_LIST = [
  "Fakultas Kedokteran", "Fakultas Hukum", "Fakultas Ekonomi dan Bisnis",
  "Fakultas Pertanian", "Fakultas Peternakan", "Fakultas Ilmu Budaya",
  "Fakultas Matematika dan Ilmu Pengetahuan Alam", "Fakultas Ilmu Sosial dan Ilmu Politik",
  "Fakultas Teknik", "Fakultas Teknologi Pertanian", "Fakultas Kesehatan Masyarakat",
  "Fakultas Teknologi Informasi", "Fakultas Keperawatan", "Fakultas Farmasi",
];

const initialForm = { nama: "", anonim: false, fakultas: "", nama_kategori: "", isi: "" };

const fieldClass =
  "w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none transition focus:border-[#55193A] focus:ring-4 focus:ring-[#55193A]/[0.06] placeholder:text-gray-300";

export default function AspirasiForm() {
  const [form, setForm]       = useState(initialForm);
  const [foto, setFoto]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState(null); // "success" | "error" | null
  const [errMsg, setErrMsg]   = useState("");

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleFoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };
  const removeFoto = () => { setFoto(null); setPreview(null); };

  const isValid = form.fakultas && form.nama_kategori && form.isi.trim().length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || loading) return;
    setLoading(true); setStatus(null); setErrMsg("");

    try {
      const fd = new FormData();
      fd.append("nama", form.anonim ? "" : form.nama);
      fd.append("fakultas", form.fakultas);
      fd.append("nama_kategori", form.nama_kategori);
      fd.append("isi", form.isi);
      if (foto) fd.append("foto", foto);

      const res = await fetch(`${API_BASE}/aspirasi`, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Gagal mengirim aspirasi. Coba lagi ya.");

      setStatus("success");
      setForm(initialForm);
      removeFoto();
    } catch (err) {
      setStatus("error");
      setErrMsg(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-white overflow-hidden pt-32 pb-20 px-4">
      {/* ── Ambient blob — sentuhan warna, sangat halus ── */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: `radial-gradient(circle, ${PURPLE}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute top-32 -left-32 w-80 h-80 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }}
      />

      <div className="relative max-w-xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: GOLD }}>
              Suara Mahasiswa
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: PURPLE }}>
            Sampaikan Aspirasimu
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-sm mx-auto leading-relaxed">
            Masukan kamu akan diteruskan langsung ke Kabinet Rakit Makna.
          </p>
        </motion.div>

        {/* ── Card ── */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="relative bg-white rounded-3xl border border-gray-100 shadow-[0_2px_40px_-8px_rgba(85,25,58,0.08)] p-6 sm:p-8 space-y-6"
        >
          {/* aksen garis atas — signature tipis ungu → emas */}
          <div
            className="absolute top-0 left-8 right-8 h-[3px] rounded-full -translate-y-1/2"
            style={{ background: `linear-gradient(90deg, ${PURPLE}, ${GOLD})` }}
          />

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl text-sm px-4 py-3 overflow-hidden"
                style={{ background: "#55193A0D", color: PURPLE }}
              >
                Terkirim. Terima kasih sudah bersuara ✦
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3 overflow-hidden"
              >
                {errMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nama */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nama</label>
              <label className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.anonim}
                  onChange={(e) => update("anonim", e.target.checked)}
                  className="rounded border-gray-300 w-3.5 h-3.5"
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

          {/* Fakultas + Kategori */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Fakultas</label>
              <select value={form.fakultas} onChange={(e) => update("fakultas", e.target.value)} className={`${fieldClass} cursor-pointer`}>
                <option value="">Pilih fakultas</option>
                {FAKULTAS_LIST.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Kategori</label>
              <select value={form.nama_kategori} onChange={(e) => update("nama_kategori", e.target.value)} className={`${fieldClass} cursor-pointer`}>
                <option value="">Pilih kategori</option>
                {KATEGORI_LIST.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>

          {/* Isi */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Isi Aspirasi</label>
            <textarea
              value={form.isi}
              onChange={(e) => update("isi", e.target.value)}
              rows={5}
              placeholder="Tuliskan aspirasi, keluhan, atau masukanmu..."
              className={`${fieldClass} resize-none`}
            />
            <p className="text-[11px] text-gray-300 mt-1.5 text-right">{form.isi.length} karakter</p>
          </div>

          {/* Foto */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Foto (opsional)</label>
            {preview ? (
              <div className="relative w-20 h-20">
                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl border border-gray-100" />
                <button
                  type="button"
                  onClick={removeFoto}
                  className="absolute -top-2 -right-2 bg-white shadow border border-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-[11px] text-gray-400 hover:text-red-500 transition"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 border border-dashed border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-[#55193A]/30 transition text-xs text-gray-400 w-fit">
                <input type="file" accept="image/*" onChange={handleFoto} className="hidden" />
                <PlusIcon /> Unggah gambar
              </label>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full text-sm font-semibold text-white rounded-xl py-3.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.99]"
            style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_SOFT})` }}
          >
            {loading ? "Mengirim..." : "Kirim Aspirasi"}
          </button>
        </motion.form>

        <p className="text-center text-[11px] text-gray-300 mt-6">
          Kabinet Rakit Makna · BEM KM Universitas Andalas
        </p>
      </div>
    </main>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}