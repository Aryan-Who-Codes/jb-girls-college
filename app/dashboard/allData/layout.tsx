import { ThemeProvider } from "@/lib/theme/ThemeContext";
import type { Metadata } from "next";
// import { Sidebar } from "../dashboard/component/layout/Sidebar";
// import { Header } from "../dashboard/component/layout/Header";
//  import { Inter } from "next/font/google";

//  const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Shadcn",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden transition-colors duration-200">
        {/* <Sidebar className="hidden md:block w-64" /> */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* <Header /> */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}