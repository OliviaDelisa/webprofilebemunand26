"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const PURPLE = "#55193A";
const GOLD = "#D8833B";

export default function AspirasiFloatingButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);

  // Muncul lebih cepat, tidak perlu nunggu lama
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(showTimer);
  }, []);

  // Setelah beberapa detik muncul, teks otomatis menciut jadi icon saja
  useEffect(() => {
    if (!visible) return;
    const collapseTimer = setTimeout(() => setExpanded(false), 4500);
    return () => clearTimeout(collapseTimer);
  }, [visible]);

  // Jangan tampilkan kalau lagi di halaman Aspirasi itu sendiri
  if (pathname === "/aspirasi") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(216,131,59,0.5)",
                "0 0 0 14px rgba(216,131,59,0)",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            className="relative rounded-full"
          >
            <Link
              href="/aspirasi"
              onMouseEnter={() => setExpanded(true)}
              className="relative flex items-center gap-2 pl-4 pr-4 py-3.5 rounded-full text-white font-semibold text-sm shadow-xl"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${GOLD})` }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    Sampaikan Aspirasi
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}