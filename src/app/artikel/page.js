
"use client";

import { useEffect, useMemo, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

function getImageUrl(image) {
  if (!image) return null;

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
}

function formatDate(date) {
  if (!date) return "Artikel BEM";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Artikel BEM";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags;

  if (!tags) return [];

  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed)
      ? parsed
      : String(tags).split(",").map((tag) => tag.trim()).filter(Boolean);
  } catch {
    return String(tags)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
}

function getExcerpt(article, length = 180) {
  const text = article.excerpt || article.content || "";

  if (text.length <= length) return text;

  return `${text.slice(0, length).trim()}...`;
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ArticleImage({ article, featured = false }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getImageUrl(article.thumbnail);

  return (
    <div
      className={`relative w-full overflow-hidden ${
        featured
          ? "aspect-[16/10] md:aspect-auto md:min-h-[420px]"
          : "aspect-[16/10]"
      }`}
    >
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={article.title || "Artikel BEM KM UNAND"}
          loading={featured ? "eager" : "lazy"}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full min-h-52 items-center justify-center bg-gradient-to-br from-[#E8DDF7] via-[#F8F3FD] to-[#FFF0B8]">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/70 bg-white/60 text-2xl font-black text-[#7650A8] shadow-sm">
              BEM
            </div>
            <p className="mt-3 text-xs font-semibold tracking-[0.18em] text-[#7650A8]/70">
              KM UNIVERSITAS ANDALAS
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleTags({ tags = [], limit = 3 }) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, limit).map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="rounded-full border border-[#E9DDF7] bg-[#F7F2FC] px-3 py-1.5 text-xs font-semibold text-[#7650A8]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ArticleMeta({ date }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#8A8195]">
      <span>{formatDate(date)}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#C7B7D9]" />
      <span>BEM KM UNAND</span>
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#EEE8F4] bg-white">
      <div className="aspect-[16/10] animate-pulse bg-[#F0ECF5]" />
      <div className="space-y-4 p-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-[#EEE8F4]" />
        <div className="h-5 w-5/6 animate-pulse rounded bg-[#EEE8F4]" />
        <div className="h-4 w-full animate-pulse rounded bg-[#F4F1F7]" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#F4F1F7]" />
        <div className="h-8 w-1/3 animate-pulse rounded-full bg-[#F4F1F7]" />
      </div>
    </div>
  );
}

export default function ArtikelPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("Semua");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchArticles() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE}/articles?public=true`);

        if (!response.ok) {
          throw new Error("Artikel belum dapat dimuat. Silakan coba lagi.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Format data artikel dari server tidak sesuai.");
        }

        if (!cancelled) {
          setArticles(
            data
              .filter((article) => article.status === "published")
              .map((article) => ({
                ...article,
                tags: normalizeTags(article.tags),
              }))
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message ||
              "Tidak dapat terhubung ke server. Periksa koneksi backend."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchArticles();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedArticle) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedArticle(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedArticle]);

  const tags = useMemo(() => {
    const allTags = articles.flatMap((article) => article.tags);

    return ["Semua", ...new Set(allTags)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return articles.filter((article) => {
      const matchesTag =
        activeTag === "Semua" || article.tags.includes(activeTag);

      const searchableText = [
        article.title,
        article.excerpt,
        article.content,
        ...article.tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesTag && searchableText.includes(keyword);
    });
  }, [articles, search, activeTag]);

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#292432]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-[#EEE7F5] bg-[#FBF9FE]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#E8D9FA]/70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-[360px] w-[360px] rounded-full bg-[#FFF0B8]/70 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-12 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#E7D9F5] bg-white/90 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7650A8] shadow-sm sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#EBCB50]" />
              Ruang Gagasan BEM KM UNAND
            </div>

            <h1 className="max-w-3xl text-[2.65rem] font-black leading-[1.1] tracking-[-0.045em] sm:text-6xl lg:text-[4.4rem]">
              Cerita, Gagasan,
              <br />
              dan{" "}
              <span className="relative inline-block text-[#7650A8]">
                Aksi
                <span className="absolute -bottom-1 left-0 -z-10 h-3 w-full -rotate-2 rounded-sm bg-[#FFE58B] sm:h-4" />
                <span className="text-[#7650A8]">.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#706979] sm:text-base sm:leading-8 lg:text-lg">
              Menyimak pemikiran, mengikuti gerakan, dan mengenal cerita
              di balik langkah BEM KM Universitas Andalas untuk mahasiswa
              dan masa depan bersama.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#daftar-artikel"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#7650A8] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7650A8]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#61408D] focus:outline-none focus:ring-4 focus:ring-[#7650A8]/20"
              >
                Jelajahi Artikel
                <ArrowIcon />
              </a>

              <span className="text-xs font-medium text-[#8A8195] sm:text-sm">
                Informasi, perspektif, dan gerakan mahasiswa
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#E9E1F1] pt-6 text-xs font-medium text-[#82798D] sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#7650A8]" />
                Suara Mahasiswa
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#EBCB50]" />
                Gagasan untuk Perubahan
              </span>
            </div>
          </div>

          {/* DEKORASI HERO */}
          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div className="absolute -right-4 -top-5 h-24 w-24 rounded-3xl border border-[#E8DDF5] bg-white/60" />
            <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full border border-[#F0D982] bg-[#FFF0B8]/40" />

            <div className="relative rounded-[2rem] border border-white bg-white/80 p-4 shadow-2xl shadow-[#604184]/10 backdrop-blur-sm">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-[#7650A8] via-[#8965B7] to-[#B49BD5] p-8 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]">
                    BEM KM UNAND
                  </span>
                  <span className="text-2xl text-[#FFE58B]">✳</span>
                </div>

                <div className="mt-16">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    Ruang untuk Bertumbuh
                  </p>
                  <p className="mt-4 text-4xl font-black leading-tight tracking-tight">
                    Setiap gagasan punya cerita.
                  </p>
                  <div className="mt-6 h-1.5 w-16 rounded-full bg-[#FFE58B]" />
                  <p className="mt-5 max-w-xs text-sm leading-7 text-white/80">
                    Merangkai perspektif, merawat aspirasi, dan bergerak
                    bersama untuk perubahan.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 px-4 py-5">
                <div>
                  <p className="text-xs font-bold text-[#342C40]">
                    Artikel & Cerita
                  </p>
                  <p className="mt-1 text-xs text-[#8A8195]">
                    Dari mahasiswa, untuk mahasiswa
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF4C9] text-xl text-[#7650A8]">
                  ✦
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAFTAR ARTIKEL */}
      <section
        id="daftar-artikel"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        {/* JUDUL DAN PENCARIAN */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#7650A8]">
              <span className="h-px w-7 bg-[#7650A8]" />
              Dari Kami untuk Mahasiswa
            </div>

            <h2 className="text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-[2.7rem]">
              Artikel & Cerita
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#777080] sm:text-base sm:leading-8">
              Temukan informasi, pemikiran, dan dokumentasi gagasan yang
              tumbuh di lingkungan mahasiswa Universitas Andalas.
            </p>
          </div>

          <div className="w-full lg:max-w-sm">
            <label
              htmlFor="article-search"
              className="mb-2.5 block text-xs font-bold text-[#4F465B]"
            >
              Temukan artikel
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-[#E9E4EF] bg-[#FBFAFC] px-4 py-3.5 transition focus-within:border-[#7650A8] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#7650A8]/10">
              <span className="shrink-0 text-[#8D8598]">
                <SearchIcon />
              </span>

              <input
                id="article-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari judul atau kata kunci..."
                className="w-full bg-transparent text-sm text-[#292432] outline-none placeholder:text-[#A39BAE]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Hapus pencarian"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#8D8598] transition hover:bg-[#F0EAF7] hover:text-[#7650A8]"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FILTER TAG */}
        {tags.length > 1 && (
          <div className="mt-8 border-b border-[#EEE8F4] pb-5">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#8A8195]">
              Jelajahi berdasarkan topik
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={activeTag === tag}
                  className={`rounded-full px-4 py-2.5 text-xs font-bold transition duration-200 sm:text-sm ${
                    activeTag === tag
                      ? "bg-[#7650A8] text-white shadow-md shadow-[#7650A8]/15"
                      : "border border-[#E9E4EF] bg-white text-[#777080] hover:border-[#CBB5E5] hover:bg-[#FBF8FE] hover:text-[#7650A8]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="grid gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <ArticleSkeleton key={item} />
            ))}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="mt-10 rounded-3xl border border-red-100 bg-red-50/80 px-6 py-12 text-center sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-red-500 shadow-sm">
              !
            </div>

            <h3 className="mt-5 text-lg font-black text-red-800">
              Artikel belum bisa ditampilkan
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#7650A8] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#61408D]"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* KONTEN ARTIKEL */}
        {!loading && !error && filteredArticles.length > 0 && (
          <div className="mt-9">
            {/* ARTIKEL UNGGULAN */}
            {featuredArticle && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#EBCB50]" />
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7650A8]">
                    Sorotan
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(featuredArticle)}
                  aria-label={`Baca artikel ${featuredArticle.title}`}
                  className="group grid w-full overflow-hidden rounded-[1.75rem] border border-[#ECE6F3] bg-white text-left transition duration-300 hover:border-[#D5C1ED] hover:shadow-xl hover:shadow-[#7650A8]/10 focus:outline-none focus:ring-4 focus:ring-[#7650A8]/15 md:grid-cols-2"
                >
                  <ArticleImage article={featuredArticle} featured />

                  <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF5CF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6C5520] sm:text-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A927]" />
                        Pilihan Redaksi
                      </span>
                    </div>

                    <div className="mt-5">
                      <ArticleMeta date={featuredArticle.published_at} />
                    </div>

                    <h3 className="mt-4 text-2xl font-black leading-snug tracking-[-0.035em] transition group-hover:text-[#7650A8] sm:text-3xl lg:text-[2.1rem]">
                      {featuredArticle.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#777080] sm:text-base sm:leading-8">
                      {getExcerpt(featuredArticle, 220)}
                    </p>

                    <div className="mt-5">
                      <ArticleTags tags={featuredArticle.tags} limit={3} />
                    </div>

                    <div className="mt-7 flex items-center justify-between border-t border-[#EEE8F4] pt-5">
                      <span className="text-sm font-bold text-[#7650A8]">
                        Baca selengkapnya
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3ECFA] text-[#7650A8] transition duration-200 group-hover:translate-x-1 group-hover:bg-[#7650A8] group-hover:text-white">
                        <ArrowIcon />
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* GRID ARTIKEL LAINNYA */}
            {remainingArticles.length > 0 && (
              <div className="mt-14 sm:mt-16">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7650A8]">
                      Baca Selengkapnya
                    </p>
                    <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                      Artikel Terbaru
                    </h3>
                  </div>

                  <span className="text-sm text-[#8A8195]">
                    Menampilkan{" "}
                    <span className="font-bold text-[#4F465B]">
                      {filteredArticles.length}
                    </span>{" "}
                    artikel
                  </span>
                </div>

                <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {remainingArticles.map((article) => (
                    <button
                      key={article.id}
                      type="button"
                      onClick={() => setSelectedArticle(article)}
                      aria-label={`Baca artikel ${article.title}`}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#ECE6F3] bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-[#D5C1ED] hover:shadow-xl hover:shadow-[#7650A8]/10 focus:outline-none focus:ring-4 focus:ring-[#7650A8]/15"
                    >
                      <ArticleImage article={article} />

                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <ArticleMeta date={article.published_at} />

                        <h4 className="mt-3 line-clamp-2 text-lg font-extrabold leading-snug tracking-tight transition group-hover:text-[#7650A8] sm:text-xl">
                          {article.title}
                        </h4>

                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#777080]">
                          {getExcerpt(article, 160)}
                        </p>

                        <div className="mt-4">
                          <ArticleTags tags={article.tags} limit={2} />
                        </div>

                        <div className="mt-auto flex items-center justify-between border-t border-[#F0EBF5] pt-5 mt-6">
                          <span className="text-sm font-bold text-[#7650A8]">
                            Baca artikel
                          </span>
                          <span className="text-[#7650A8] transition duration-200 group-hover:translate-x-1">
                            <ArrowIcon />
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredArticles.length === 0 && (
          <div className="mt-10 rounded-[1.75rem] border border-dashed border-[#DCCFEA] bg-[#FBF9FE] px-6 py-16 text-center sm:px-10 sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E9DDF7] bg-white text-2xl text-[#7650A8] shadow-sm">
              ✳
            </div>

            <h3 className="mt-5 text-xl font-black tracking-tight sm:text-2xl">
              {articles.length === 0
                ? "Cerita baru segera hadir"
                : "Artikel tidak ditemukan"}
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#777080]">
              {articles.length === 0
                ? "Saat ini belum ada artikel yang dipublikasikan. Nantikan gagasan dan cerita terbaru dari BEM KM Universitas Andalas."
                : "Coba gunakan kata kunci lain atau pilih filter Semua untuk melihat artikel yang tersedia."}
            </p>

            {articles.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveTag("Semua");
                }}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#7650A8] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#61408D]"
              >
                Reset Pencarian
              </button>
            )}
          </div>
        )}
      </section>

      {/* DETAIL ARTIKEL */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#21172D]/70 p-0 backdrop-blur-sm sm:p-5 lg:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedArticle(null);
            }
          }}
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-detail-title"
            className="relative flex max-h-[100dvh] w-full max-w-4xl flex-col overflow-hidden bg-white shadow-2xl sm:max-h-[92vh] sm:rounded-[1.75rem]"
          >
            {/* HEADER DETAIL */}
            <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-[#EEE8F4] bg-white/95 px-5 py-3 backdrop-blur sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F1E9FA] text-xs font-black text-[#7650A8]">
                  BEM
                </div>
                <div>
                  <p className="text-xs font-bold text-[#342C40]">
                    BEM KM UNAND
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#8A8195]">
                    Artikel & Cerita
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Tutup artikel"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEE8F4] bg-white text-[#655B70] transition hover:border-[#DCCBEF] hover:bg-[#F6F0FB] hover:text-[#7650A8] focus:outline-none focus:ring-4 focus:ring-[#7650A8]/15"
              >
                <CloseIcon />
              </button>
            </div>

            {/* ISI DETAIL */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {selectedArticle.thumbnail && (
                <div className="relative max-h-[420px] overflow-hidden bg-[#F0EAF7]">
                  <img
                    src={getImageUrl(selectedArticle.thumbnail)}
                    alt={selectedArticle.title || "Gambar artikel"}
                    className="max-h-[420px] w-full object-cover"
                  />
                </div>
              )}

              <div className="mx-auto max-w-3xl px-5 py-7 sm:px-10 sm:py-10 lg:px-12">
                <ArticleMeta date={selectedArticle.published_at} />

                <h2
                  id="article-detail-title"
                  className="mt-4 text-2xl font-black leading-tight tracking-[-0.035em] sm:text-3xl lg:text-4xl"
                >
                  {selectedArticle.title}
                </h2>

                {selectedArticle.tags?.length > 0 && (
                  <div className="mt-5">
                    <ArticleTags tags={selectedArticle.tags} limit={10} />
                  </div>
                )}

                {selectedArticle.excerpt && (
                  <p className="mt-7 rounded-r-xl border-l-4 border-[#EBCB50] bg-[#FFFCF1] py-4 pl-5 pr-4 text-sm font-medium leading-7 text-[#655B70] sm:text-base sm:leading-8">
                    {selectedArticle.excerpt}
                  </p>
                )}

                <div className="mt-7 whitespace-pre-wrap break-words text-[15px] leading-8 text-[#494351] sm:text-base sm:leading-[2.05]">
                  {selectedArticle.content}
                </div>

                <div className="mt-10 rounded-2xl border border-[#EEE8F4] bg-[#FBF9FE] p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7650A8] text-xs font-black text-white">
                      BEM
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#342C40]">
                        BEM KM Universitas Andalas
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#777080]">
                        Bergerak bersama, membawa perubahan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex justify-end border-t border-[#EEE8F4] pt-5">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E4D8F0] px-5 py-2.5 text-sm font-bold text-[#7650A8] transition hover:bg-[#F5EFFB]"
                  >
                    Tutup Artikel
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
