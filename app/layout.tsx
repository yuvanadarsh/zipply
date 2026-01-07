import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Spotlight from "@/components/spotlight";
import { AuthProvider } from "@/components/auth-provider";
import Navbar from "@/components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zipply - Stop drowning in noise.",
  description: "Zipply condenses your chaotic inbox into a beautiful daily brief.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <Spotlight />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
