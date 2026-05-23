import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import WorksGrid from '@/components/sections/WorksGrid';
import { client } from '@/sanity/lib/client';
import { PROJECTS_QUERY } from '@/sanity/lib/queries';
import { Project } from '@/types';
import { syne } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import SpotifyFooter from '@/components/ui/SpotifyFooter';
import HoverItalicText from '@/components/ui/HoverItalicText';

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pb-20">
      <Header />

      <Hero
        subtitle="// A CURATED INDEX OF VISUAL EXPERIMENT AND CASE STUDIES //"
      />

      <WorksGrid projects={projects} />

      {/* Design Mantra Section */}
      <section className="w-full py-20 flex justify-center items-center text-center px-6 border-t-[0.5px] border-white/10 overflow-hidden">
        <h2 className={cn("text-4xl md:text-5xl lg:text-[7vw] font-bold uppercase leading-[0.9] tracking-tighter text-[#F0F0F0] flex flex-wrap justify-center gap-x-4", syne.className)}>
          <HoverItalicText text="DESIGN THAT" /> <HoverItalicText text="MOVES" className="text-red-600" /> <HoverItalicText text="THE WORLD" />
        </h2>
      </section>

      {/* Footer mimic */}
      <footer className="w-full py-20 border-t-[0.5px] border-white/10 flex flex-col items-center justify-center text-center overflow-hidden">
        <h2 className={cn("text-5xl sm:text-7xl md:text-8xl lg:text-[12vw] font-bold uppercase leading-[0.9] text-[#252525] whitespace-nowrap text-center", syne.className)}
          style={{ fontWeight: 800 }}>
          PARADOX
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl px-8 mt-12 gap-8 md:gap-0 text-neutral-500 font-mono text-xs md:text-sm">
          <div className="order-2 md:order-1">
            <SpotifyFooter />
          </div>
          <p className="order-3 md:order-2">© 2026 PARADOX. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 order-1 md:order-3">
            <a href="https://www.instagram.com/paradox.x0/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">INSTAGRAM</a>
            <span>/</span>
            <a href="https://x.com/somesh__x1" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">X</a>
            <span>/</span>
            <a href="mailto:someshwark22@gmail.com" className="hover:text-red-500 transition-colors">EMAIL</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
