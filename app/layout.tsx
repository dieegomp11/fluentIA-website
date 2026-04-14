import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "fluentIA — Tecnología inteligente al alcance de todas las empresas",
  description:
    "fluentIA crea soluciones de automatización, simplificadas y a la medida de cada empresa. Facturación automática, agenda inteligente, IA empresarial y más.",
  keywords: ["inteligencia artificial", "automatización", "facturación", "IA empresarial", "chatbot"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-[100dvh] flex flex-col bg-white text-[#0f172a]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
