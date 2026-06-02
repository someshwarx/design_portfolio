'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_LINES = [
    { text: 'DESIGN', accent: false },
    { text: 'THAT BREAKS', accent: false },
    { text: 'THE GRID.', accent: true },
];

export default function Manifesto() {
    const sectionRef = useRef<HTMLElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Each line animates in on scroll
        const lines = gsap.utils.toArray<HTMLElement>('.manifesto-line');

        lines.forEach((line, i) => {
            gsap.from(line, {
                scrollTrigger: {
                    trigger: line,
                    start: 'top 85%',
                    end: 'top 40%',
                    scrub: 1,
                },
                y: 80,
                opacity: 0,
                skewY: 3,
                duration: 1,
                delay: i * 0.1,
            });
        });

        // Subtle counter text fade
        gsap.from('.manifesto-sub', {
            scrollTrigger: {
                trigger: '.manifesto-sub',
                start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
        });

        // Decorative line scale
        gsap.from('.manifesto-deco-line', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 2,
            ease: 'power4.inOut',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
            },
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center items-center px-page py-section-breath bg-[#030303] overflow-hidden"
        >
            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-red-900/[0.04] rounded-full blur-[200px] pointer-events-none" />

            {/* Main Typography */}
            <div ref={textContainerRef} className="relative z-10 flex flex-col items-center text-center">
                {MANIFESTO_LINES.map((line, i) => (
                    <div key={i} className="manifesto-line overflow-hidden">
                        <h2
                            className={cn(
                                'font-black uppercase tracking-tighter leading-[0.88]',
                                'text-[11vw] md:text-[10vw] lg:text-[9vw]',
                                line.accent ? 'text-red-600' : 'text-[#F0F0F0]',
                                syne.className
                            )}
                        >
                            {line.text}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Decorative Line */}
            <div className="manifesto-deco-line w-24 h-[1px] bg-white/10 mt-12 md:mt-16" />

            {/* Sub-statement */}
            <p className="manifesto-sub text-micro text-neutral-600 mt-6 tracking-[0.3em] text-center max-w-md">
                CRAFTING DIGITAL CHAOS INTO ORDER. ONE PIXEL AT A TIME.
            </p>
        </section>
    );
}
