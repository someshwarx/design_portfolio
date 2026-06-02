import React from 'react';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import BoxBusterGame from '@/components/lab/BoxBusterGame';

export const metadata = {
    title: "The Tap Lab // Paradox",
    description: "Box Buster. Click the boxes, beat your score. 30-second reflex sessions.",
};

export default function LabPage() {
    return (
        <main className="h-[100dvh] bg-black text-white selection:bg-red-600 selection:text-white relative overflow-hidden flex flex-col">
            <Header />

            {/* Grain */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-[200]" />

            <section className="relative z-10 flex-1 px-4 md:px-10 flex flex-col items-center pt-24 pb-6 overflow-hidden">

                {/* Page header */}
                <div className="w-full max-w-4xl mb-6 flex flex-col items-center text-center shrink-0">
                    <p className="text-accent-label font-sans mb-2 text-center text-sm md:text-base">
                        // EXPERIMENTAL PLAYGROUND //
                    </p>
                    <h1
                        className={cn(
                            'text-[clamp(2rem,5vw,4rem)] leading-none text-white text-center font-black tracking-tighter uppercase',
                            syne.className
                        )}
                    >
                        THE TAP LAB
                    </h1>
                    <p className="mt-2 text-sm md:text-base text-neutral-500 max-w-lg text-center font-sans uppercase tracking-wide">
                        A 30-second reflex challenge. Clear the targets, maintain your combo, and set a high score.
                    </p>
                </div>

                {/* Game */}
                <div className="flex-1 w-full flex flex-col min-h-0">
                    <BoxBusterGame />
                </div>

            </section>
        </main>
    );
}
