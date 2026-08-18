import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OfficeNextDoor",
  description: "Hyper-local job and company discovery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <Toaster position="bottom-right" />
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        
        {/* Signature Sunset Stripe Band */}
        <div className="w-full h-3 sunset-stripe"></div>
        
        <footer className="bg-cream px-8 py-16 text-ink border-t border-beige-deep">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.jpg" alt="OfficeNextDoor Logo" className="w-8 h-8 rounded-md shadow-sm" />
                <h2 className="font-editorial text-2xl font-bold">OfficeNextDoor</h2>
              </div>
              <p className="text-sm text-slate">Local jobs, modern tech.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-sm tracking-wide uppercase text-ink">Explore</h4>
                <ul className="space-y-2 text-sm text-slate">
                  <li><a href="/cities" className="hover:text-primary transition-colors">Cities</a></li>
                  <li><a href="/add-company" className="hover:text-primary transition-colors">Add a Company</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
