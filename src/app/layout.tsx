import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ConsentBanner from "@/components/ConsentBanner";
import GoogleTagManager from "@/components/GoogleTagManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stranger Mingle - Weekend Events & Meetups for Making Friends",
    template: "%s | Stranger Mingle"
  },
  description: "Join India's most active community for making friends. Weekly offline events including treks, board game nights, chai circles, and heritage walks. No apps, just real connection.",
  keywords: ["stranger meetup", "local events", "making friends", "offline events", "community events", "pune events", "mumbai events", "delhi events", "bangalore events", "social events", "weekend meetups"],
  authors: [{ name: "Stranger Mingle" }],
  creator: "Stranger Mingle",
  publisher: "Stranger Mingle",
  metadataBase: new URL('https://www.strangermingle.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Stranger Mingle',
    title: 'Stranger Mingle - Weekend Stranger Meetups & Local Events for Making new Friends',
    description: "Join India's most active community for weekend stranger meetups and local events. Make new friends instantly.",
    images: [
      {
        url: "/images/og-images/og-image-default.webp",
        width: 1200,
        height: 630,
        alt: "Stranger Mingle - Weekend Social Meetups & Events",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stranger Mingle - Weekend Stranger Meetups & Local Events for Making new Friends',
    description: "Join India's most active community for weekend Stranger Meetups to make new friends instantly.",
    images: ["/images/og-images/og-image-default.webp"],
    creator: '@strangermingle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <GoogleTagManager />
        <Navbar />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Stranger Mingle",
              "url": "https://www.strangermingle.com",
              "logo": "https://www.strangermingle.com/logo.png",
              "sameAs": [
                "https://www.instagram.com/strangermingle/",
                "https://www.youtube.com/@strangermingle",
                "https://x.com/strangermingle",
                "https://www.linkedin.com/company/strangermingle",
                "https://www.facebook.com/strangermingle"
              ]
            }),
          }}
        />
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
