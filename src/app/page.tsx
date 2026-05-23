import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';

import { syne } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import HoverItalicText from '@/components/ui/HoverItalicText';


export const dynamic = "force-dynamic";

export default function Home() {

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pb-20">
      <Header />

      <Hero
        subtitle="// A CURATED INDEX OF VISUAL EXPERIMENT AND CASE STUDIES //"
      />





      {/* Design Mantra Section */}
      <section className="w-full py-20 flex justify-center items-center text-center px-6 border-t-[0.5px] border-white/10 overflow-hidden">
        <h2 className={cn("text-4xl md:text-5xl lg:text-[7vw] font-bold uppercase leading-[0.9] tracking-tighter text-[#F0F0F0] flex flex-wrap justify-center gap-x-4", syne.className)}>
          <HoverItalicText text="DESIGN THAT" /> <HoverItalicText text="MOVES" className="text-red-600" /> <HoverItalicText text="THE WORLD" />
        </h2>
      </section>

      {/* The new Footer is globally wrapped in layout.tsx */}
    </main>
  );
}
