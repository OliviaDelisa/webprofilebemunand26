"use client";

import Link from "next/link";

const PURPLE = "#55193A";
const GOLD   = "#D8833B";

const footerNav = [
  { href: "/",                                label: "Home"       },
  { href: "/tentang/visi-misi",               label: "Visi & Misi"},
  { href: "/tentang/program-unggulan",        label: "Program Unggulan" },
  { href: "/tentang/kementerian",             label: "Kementerian"},
  { href: "/aspirasi",                        label: "Aspirasi"   },
  { href: "/artikel",                         label: "Artikel"    },
  { href: "/event",                           label: "Event"      },
  { href: "/kontak",                          label: "Kontak"     },
];

const socialLinks = [
  {
    label: "Instagram",
    handle: "@bemkmunand",
    href: "https://instagram.com/bemkmunand",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    handle: "@bemkmunand",
    href: "https://twitter.com/bemkmunand",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    handle: "BEM KM UNAND",
    href: "https://youtube.com/@bemkmunand",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    handle: "BEM KM UNAND",
    href: "https://tiktok.com/@bemkmunand",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: PURPLE }} className="text-white">

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand col */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `<span style="color:white;font-weight:700;font-size:13px">BEM</span>`;
                  }}
                />
              </div>
              <div>
                <p className="font-black text-sm leading-snug uppercase tracking-wide" style={{ color: "white" }}>KABINET RAKIT MAKNA</p>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: GOLD }}>
                  BEM KM UNIVERSITAS ANDALAS
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Badan Eksekutif Mahasiswa Keluarga Mahasiswa Universitas Andalas — mewujudkan aspirasi mahasiswa bersama.
            </p>
          </div>

          {/* Nav links — 2 kolom */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: GOLD }}>
              Navigasi
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[
                { href: "/",                            label: "Home"                },
                { href: "/tentang/visi-misi",           label: "Visi & Misi"         },
                { href: "/tentang/tujuan",              label: "Tujuan"              },
                { href: "/tentang/kata-sambutan",       label: "Kata Sambutan"       },
                { href: "/tentang/kabinet-rakit-makna", label: "Kabinet Rakit Makna" },
                { href: "/tentang/program-unggulan",    label: "Program Unggulan"    },
                { href: "/tentang/kementerian",         label: "Kementerian"         },
                { href: "/aspirasi",                    label: "Aspirasi"            },
                { href: "/artikel",                     label: "Artikel"             },
                { href: "/event",                       label: "Event"               },
                { href: "/statistik",                   label: "Statistik"           },
                { href: "/galery",                      label: "Galery"              },
                { href: "/kontak",                      label: "Kontak"              },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors truncate"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: GOLD }}>
              Kontak
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>bem.km@unand.ac.id</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Gedung PKM Lt. 1, Universitas Andalas, Padang</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: GOLD }}>
              Media Sosial
            </p>
            <ul className="space-y-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 group-hover:bg-white/20 text-white/70 group-hover:text-white transition-all flex-shrink-0">
                      {s.icon}
                    </span>
                    <div>
                      <p className="text-xs text-white/40 leading-none mb-0.5">{s.label}</p>
                      <p className="text-sm text-white/70 group-hover:text-white transition-colors font-medium">{s.handle}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">
            © {year} BEM KM Universitas Andalas. All rights reserved.
          </p>
          <p className="text-xs text-white/30">Kabinet Rakit Makna</p>
        </div>
      </div>
    </footer>
  );
}