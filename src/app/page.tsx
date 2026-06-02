import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import FeaturedWorks from '@/components/sections/FeaturedWorks';
import AboutStrip from '@/components/sections/AboutStrip';
import Manifesto from '@/components/sections/Manifesto';
import ToolsGrid from '@/components/sections/ToolsGrid';
import ContactCTA from '@/components/sections/ContactCTA';

export const revalidate = 60;

export default function Home() {

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pb-xl">
      <Header />

      <Hero
        subtitle={
          <>
            A CURATED ARCHIVE<br />
            OF VISUAL EXPERIMENTS,<br />
            IDENTITIES<br />
            AND DIGITAL WORLDS.
          </>
        }
      />

      <FeaturedWorks />

      <AboutStrip />

      <Manifesto />

      <ToolsGrid />

      <ContactCTA />

      {/* The new Footer is globally wrapped in layout.tsx */}
    </main>
  );
}
