'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import SilkBackground from '@/components/animations/SilkBackground';

interface HeroProps {
    title?: string;
    subtitle?: React.ReactNode;
    className?: string;
}

export default function Hero({
    title = "PARADOX",
    subtitle = "// CRAFTING DIGITAL CHAOS INTO ORDER //",
    className
}: HeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.from('.hero-title-wrapper', {
            y: 50,
            opacity: 0,
            duration: 1.5,
            skewY: 2
        })
            .from('.hero-desc', {
                y: 20,
                opacity: 0,
                duration: 1,
                stagger: 0.2
            }, '-=1');

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className={cn(
                "relative flex h-[100dvh] w-full flex-col justify-end items-center overflow-x-clip pb-8 md:pb-12",
                className
            )}
        >
            <div ref={textRef} className="w-full h-full flex flex-col items-center justify-end relative z-10">

                {/* Scattered/Asymmetrical Subtitle elements to "mess up" the layout */}
                <div className="hero-desc absolute top-1/4 left-4 md:left-8 max-w-[200px] text-left">
                    <p className="text-accent-label font-mono text-xs uppercase leading-tight">
                        {subtitle}
                    </p>
                </div>

                <div className="hero-desc absolute top-1/3 right-4 md:right-8 max-w-[200px] text-right">
                    <p className="text-white/50 font-sans text-sm">
                        DESIGN THAT MOVES THE WORLD.
                    </p>
                </div>

                {/* Massive Typography at the bottom */}
                <div className="hero-title-wrapper w-full mt-auto flex justify-center items-end px-4 md:px-8">
                    <svg viewBox="0 0 1000 180" className="w-full max-h-[30vh] overflow-visible">
                        <text
                            x="50%"
                            y="130%"
                            dominantBaseline="ideographic"
                            textAnchor="middle"
                            className={cn("fill-[#F0F0F0] font-black tracking-tighter uppercase", syne.className)}
                            style={{ fontSize: '154px' }}
                        >
                            {title}
                        </text>
                    </svg>
                </div>
            </div>

            <div className="absolute inset-0 overflow-hidden z-0">
                {/* Silk Animation Background */}
                <SilkBackground />

                {/* Background Noise/Texture */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
            </div>
        </section>
    );
}
