import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
import { ContactBar } from "@/components/layout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Premium Laptops, iPhones & Expert Repairs`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full dark mx-auto flex flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <ContactBar />
        <Footer />
      </body>
    </html>
  );
}
