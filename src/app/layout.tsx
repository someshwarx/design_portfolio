import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { syne, spaceGrotesk, outfit } from "@/styles/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Preloader from "@/components/ui/Preloader";
import FooterWrapper from "@/components/layout/FooterWrapper";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ConsoleMessage from "@/components/ui/ConsoleMessage";



export const metadata: Metadata = {
  title: "Paradox Portfolio",
  description: "A creative portfolio showcasing brutalist design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (sessionStorage.getItem('portfolio_visited')) {
                document.documentElement.classList.add('has-visited');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${syne.variable} ${outfit.variable} ${geistSans.variable} ${geistMono.variable} antialiased selection:bg-red-600 selection:text-white bg-black`}
      >
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <ScrollToTop />
        <SmoothScroll>
          <ConsoleMessage />
          
          {/* Main content wrapper to mask the footer */}
          <div className="relative z-10 bg-black w-full shadow-[0_20px_50px_rgba(0,0,0,1)]">
            {children}
          </div>
          
          {/* Globally sticky parallax footer (conditionally rendered) */}
          <FooterWrapper />
        </SmoothScroll>
      </body>
    </html>
  );
}
