import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond/wght.css";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Квартира 64 м² в Южно-Сахалинске",
  description:
    "Финальное планировочное решение и визуализации интерьера квартиры площадью 64 м².",
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
  openGraph: {
    title: "Квартира 64 м² в Южно-Сахалинске",
    description:
      "Финальное планировочное решение и визуализации интерьера, Южно-Сахалинск.",
    type: "website",
    url: `${siteUrl}${basePath}/`,
    images: [
      {
        url: `${siteUrl}${basePath}/og.png`,
        width: 1734,
        height: 907,
        alt: "Интерьер квартиры 64 м² в Южно-Сахалинске",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${siteUrl}${basePath}/og.png`],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
