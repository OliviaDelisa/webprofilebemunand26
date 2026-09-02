import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BEM KM Universitas Andalas — Kabinet Rakit Makna",
  description: "Website resmi BEM KM Universitas Andalas Kabinet Rakit Makna",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-white text-gray-900">
        <Header />
        {/* 
          TIDAK ada pt-16 di sini karena halaman Home punya
          intro overlay position:fixed yang menutupi seluruh layar.
          Halaman lain tambahkan pt-16 sendiri di dalam page masing-masing.
        */}
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}