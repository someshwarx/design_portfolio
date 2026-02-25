import React from 'react';
import Header from '@/components/layout/Header';
import SilkBackground from '@/components/animations/SilkBackground';
import AboutContent from '@/components/sections/AboutContent';

export const metadata = {
    title: "Paradox - About",
    description: "Learn more about the vision and philosophy behind Paradox.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pb-20 relative overflow-hidden">
            <Header />

            {/* Background Animation */}
            <SilkBackground />
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>

            <AboutContent />
        </main>
    );
}
