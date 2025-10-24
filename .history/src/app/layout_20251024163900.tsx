import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Styles
// @ts-ignore
import "../app/style/main.css";

import Footer from "@/app/common/Footer";
import Header from "@/app/common/Header";
import ProviderLenis from "./Provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_NAME = "JW";
const SITE_DESCRIPTION =
  "Sigue las noticias más relevantes de República Dominicana y el mundo con análisis, reportajes y coberturas en tiempo real.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lanaciondigital.com.do"),
  title: {
    default: `${SITE_NAME} | Últimas noticias y análisis`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "noticias",
    "república dominicana",
    "actualidad",
    "politica",
    "mundo",
    "economía",
    "deportes",
    "cultura",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Últimas noticias y análisis`,
    description: SITE_DESCRIPTION,
    locale: "es_DO",
    url: "https://lanaciondigital.com.do/",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} portada`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Últimas noticias y análisis`,
    description: SITE_DESCRIPTION,
    images: ["/og-default.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <ProviderLenis>
          <Header />
          <main className='wrapper'>{children}</main>
          <Footer />
        </ProviderLenis>
      </body>
    </html>
  );
}
