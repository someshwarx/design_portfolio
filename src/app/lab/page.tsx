import React from 'react';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import BoxBusterGame from '@/components/lab/BoxBusterGame';

export const metadata = {
    title: "The Tap Lab // Paradox",
    description: "Box Buster — click the boxes, beat your score. 30-second reflex sessions.",
};

export default function LabPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pb-20 relative overflow-hidden">
            <Header />

            {/* Grain */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-[200]" />

            <section className="relative z-10 pt-36 px-4 md:px-10 flex flex-col items-center">

                {/* Page header */}
                <div className="w-full max-w-4xl mb-10 flex flex-col items-center text-center">
                    <p className="font-mono text-red-600 text-xs tracking-widest uppercase mb-4 text-center">
                        // EXPERIMENTAL PLAYGROUND //
                    </p>
                    <h1
                        className={cn(
                            'text-5xl md:text-7xl font-bold uppercase leading-none tracking-tighter text-white text-center',
                            syne.className
                        )}
                        style={{ fontWeight: 800 }}
                    >
                        THE TAP LAB
                    </h1>
                    <p className="mt-4 font-mono text-neutral-500 text-sm max-w-lg leading-relaxed text-center">
                        30 seconds. Boxes appear. You click them. Simple concept — brutal execution.
                    </p>
                </div>

                {/* Game */}
                <BoxBusterGame />

            </section>
        </main>
    );
}
