import { ThemeProvider } from "@/lib/theme/ThemeContext";
import type { Metadata } from "next";
import { Sidebar } from "./component/layout/Sidebar";
//  import { Inter } from "next/font/google";

//  const inter = Inter({ subsets: ["latin"] });

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden transition-colors duration-200">
        <Sidebar className="hidden md:block w-64" />
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* <Header /> */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}