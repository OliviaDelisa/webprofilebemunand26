import AspirasiForm from "@/components/Aspirasiform";

export const metadata = {
  title: "Aspirasi Mahasiswa — BEM KM Universitas Andalas",
  description: "Sampaikan aspirasi dan masukan Anda untuk BEM KM Universitas Andalas Kabinet Rakit Makna melalui formulir aspirasi resmi.",
  keywords: ["aspirasi bem unand", "aspirasi mahasiswa", "BEM KM Unand", "Kabinet Rakit Makna"],
  openGraph: {
    title: "Aspirasi Mahasiswa — BEM KM Universitas Andalas",
    description: "Sampaikan aspirasi dan masukan Anda untuk BEM KM Universitas Andalas Kabinet Rakit Makna melalui formulir aspirasi resmi.",
    url: "https://bemkmunand.com/aspirasi",
    siteName: "BEM KM Unand",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://bemkmunand.com/logo-bem.png",
        width: 1200,
        height: 630,
        alt: "Aspirasi Mahasiswa — BEM KM Universitas Andalas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aspirasi Mahasiswa — BEM KM Universitas Andalas",
    description: "Sampaikan aspirasi dan masukan Anda untuk BEM KM Universitas Andalas Kabinet Rakit Makna.",
    images: ["https://bemkmunand.com/logo-bem.png"],
  },
};

export default function AspirasiPage() {
  return <AspirasiForm />;
}