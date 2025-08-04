import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../lib/auth/AuthContext";
import { ProtectedRoute } from "../lib/auth/ProtectedRoute";
import { ThemeProvider } from "../lib/theme/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title:
    "JB Girls PG College Fee Management System | Student Fee Portal",
  description:
    "Streamlined fee management system for JB Girls PG College. Track payments, generate receipts, and manage student fees efficiently. Access your fee details, payment history, and download receipts instantly.",
  keywords: [
    "college fee management",
    "student fee portal",
    "JB Girls PG College",
    "fee payment system",
    "online fee payment",
    "student receipts",
    "education fees",
    "college management system",
    "fee tracking",
    "academic payments"
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "JB Girls PG College Fee Management System | Student Fee Portal",
    description:
      "Streamlined fee management system for JB Girls PG College. Track payments, generate receipts, and manage student fees efficiently.",
    url: process.env.NEXT_PUBLIC_URL,
    type: "website",
    images: "/og-image.jpeg",
    siteName: "JB Girls Fee Management",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jbgirlscollege",
    creator: "@jbgirlscollege",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ProtectedRoute>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
