import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "eShaman — Oracle & Rituals",
  description: "Spiritual AI for rituals, readings, and resonance."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 text-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
