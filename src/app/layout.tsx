import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/sidebar";
import { BrandProvider } from "@/lib/brand-context";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "POP Platform",
  description: "Email Marketing Intelligence Platform by Profit Over Promos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <TooltipProvider>
          <BrandProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </BrandProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
