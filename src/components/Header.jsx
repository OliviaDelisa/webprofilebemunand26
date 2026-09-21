"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const tentangItems = [
  { href: "/tentang/visi-misi", label: "Visi & Misi" },
  { href: "/tentang/tujuan", label: "Tujuan" },
  { href: "/tentang/kata-sambutan", label: "Kata Sambutan" },
  { href: "/tentang/kabinet-rakit-makna", label: "Kabinet Rakit Makna" },
  { href: "/tentang/program-unggulan", label: "Program Unggulan" },
  { href: "/tentang/kementerian", label: "Kementerian & Program Kerja" },
];

// Digabung: Artikel, Event, Informasi, Survey -> satu dropdown "Informasi"
const informasiItems = [
  { href: "/artikel", label: "Artikel" },
  { href: "/event", label: "Event" },
  { href: "/informasi", label: "Informasi" },
  { href: "/survey", label: "Survey" },
];

const navLinks = [
  { href: "/", label: "Home", dropdown: null },
  { href: "/tentang", label: "Tentang", dropdown: tentangItems },
  { href: "/aspirasi", label: "Aspirasi", dropdown: null },
  { href: "/informasi-menu", label: "Informasi", dropdown: informasiItems, matchPrefixes: ["/artikel", "/event", "/informasi", "/survey"] },
  { href: "/gallery", label: "Galeri", dropdown: null },
  { href: "/kontak", label: "Kontak", dropdown: null },
];

const PURPLE = "#55193A";
const GOLD = "#D8833B";
const ABSENSI_URL = "https://www.bemkmunand.site/";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dropdown desktop: simpan href dari link yang sedang terbuka (atau null)
  const [openDropdown, setOpenDropdown] = useState(null);
  // Dropdown mobile (accordion): simpan href dari link yang sedang terbuka (atau null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);

  // Simpan semua ref dropdown desktop untuk deteksi klik di luar
  const dropRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const openRef = openDropdown ? dropRefs.current[openDropdown] : null;
      if (openRef && !openRef.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpenDropdown(null);
    setOpenDropdown(null);
  }, [pathname]);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  const navTextClass = isTransparent
    ? "text-white/90 hover:text-white hover:bg-white/10"
    : "text-gray-600 hover:text-[#55193A] hover:bg-[#55193A]/5";

  const navActiveClass = isTransparent ? "text-white" : "text-[#55193A]";

  const isLinkActive = (link) => {
    if (link.dropdown) {
      if (link.matchPrefixes) {
        return link.matchPrefixes.some((p) => pathname.startsWith(p));
      }
      return pathname.startsWith(link.href);
    }
    return pathname === link.href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent ? "bg-transparent" : "bg-white/97 backdrop-blur-md shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center overflow-hidden bg-white/20 flex-shrink-0">
            <img
              src="/images/Logo.png"
              alt="Logo BEM KM Universitas Andalas"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Teks tetap tampil di HP, cuma ukurannya diperkecil */}
          <div className="leading-tight min-w-0">
            <p
              className={`text-[11px] sm:text-sm font-black tracking-wide uppercase transition-colors duration-500 truncate ${
                isTransparent ? "!text-white" : ""
              }`}
              style={!isTransparent ? { color: PURPLE } : {}}
            >
              KABINET RAKIT MAKNA
            </p>
            <p
              className={`text-[8px] sm:text-[10px] font-semibold uppercase tracking-widest transition-colors duration-500 truncate ${
                isTransparent ? "!text-white/80" : ""
              }`}
              style={!isTransparent ? { color: GOLD } : {}}
            >
              BEM KM Universitas Andalas
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          <nav className="flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isLinkActive(link);

              if (link.dropdown) {
                const isOpen = openDropdown === link.href;
                return (
                  <div
                    key={link.href}
                    className="relative"
                    ref={(el) => (dropRefs.current[link.href] = el)}
                  >
                    <button
                      onClick={() =>
                        setOpenDropdown((cur) => (cur === link.href ? null : link.href))
                      }
                      className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        active || isOpen ? navActiveClass : navTextClass
                      }`}
                    >
                      {link.label}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      {active && !isOpen && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                          style={{ background: scrolled ? PURPLE : "white" }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                        >
                          {link.dropdown.map((item, i) => (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                            >
                              <Link
                                href={item.href}
                                onClick={() => setOpenDropdown(null)}
                                className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                                  pathname === item.href
                                    ? "text-[#55193A] bg-[#55193A]/5 font-medium"
                                    : "text-gray-600 hover:text-[#55193A] hover:bg-[#55193A]/5"
                                }`}
                              >
                                {item.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    active ? navActiveClass : navTextClass
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ background: scrolled ? PURPLE : "white" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <a
            href={ABSENSI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
              isTransparent
                ? "bg-white text-[#55193A] hover:bg-white/90"
                : "bg-[#55193A] text-white hover:bg-[#55193A]/90"
            }`}
          >
            Login
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              isTransparent ? "bg-white" : "bg-gray-700"
            } ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 my-1 transition-all duration-300 ${
              isTransparent ? "bg-white" : "bg-gray-700"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              isTransparent ? "bg-white" : "bg-gray-700"
            } ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <nav className="px-4 py-3 flex flex-col gap-0.5 max-h-[75vh] overflow-y-auto">
              {navLinks.map((link, i) => {
                const active = isLinkActive(link);

                if (link.dropdown) {
                  const isMOpen = mobileOpenDropdown === link.href;
                  return (
                    <div key={link.href}>
                      <button
                        onClick={() =>
                          setMobileOpenDropdown((cur) => (cur === link.href ? null : link.href))
                        }
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          active ? "bg-[#55193A]/5 text-[#55193A]" : "text-gray-600"
                        }`}
                      >
                        {link.label}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className={`transition-transform duration-200 ${
                            isMOpen ? "rotate-180" : ""
                          }`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {isMOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden ml-3 border-l-2 border-[#55193A]/20 pl-3"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-2 py-2 text-sm rounded-lg transition-colors ${
                                  pathname === item.href
                                    ? "text-[#55193A] font-medium"
                                    : "text-gray-500 hover:text-[#55193A]"
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.035 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "bg-[#55193A]/5 text-[#55193A]"
                          : "text-gray-600 hover:bg-[#55193A]/5 hover:text-[#55193A]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <a
                href={ABSENSI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center px-3 py-2.5 rounded-lg text-sm font-semibold bg-[#55193A] text-white hover:bg-[#55193A]/90 transition-colors"
              >
                Login
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}