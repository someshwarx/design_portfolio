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
      <section className="w-full py-20 flex justify-center items-center text-center px-4 border-t-[0.5px] border-white/10">
        <h2 className={cn("text-3xl md:text-5xl lg:text-[5vw] font-bold uppercase leading-none tracking-tighter text-[#F0F0F0] whitespace-nowrap", syne.className)}>
          <HoverItalicText text="DESIGN THAT" /> <HoverItalicText text="MOVES" className="text-red-600" /> <HoverItalicText text="THE WORLD" />
        </h2>
      </section>

      {/* Footer mimic */}
      <footer className="w-full py-20 border-t-[0.5px] border-white/10 flex flex-col items-center justify-center text-center overflow-hidden">
        <h2 className={cn("text-6xl md:text-8xl lg:text-[12vw] font-bold uppercase leading-[0.9] text-[#252525]", syne.className)}
          style={{ fontWeight: 800 }}>
          PARADOX
        </h2>
        <div className="flex justify-between w-full max-w-6xl px-8 mt-8 text-neutral-500 font-mono text-xs md:text-sm">
          <SpotifyFooter />
          <p>© 2026 PARADOX. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-2">
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
