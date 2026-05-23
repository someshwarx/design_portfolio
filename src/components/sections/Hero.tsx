'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import SilkBackground from '@/components/animations/SilkBackground';

interface HeroProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

export default function Hero({
    title = "VISUAL DESIGNER",
    subtitle = "// CRAFTING DIGITAL CHAOS INTO ORDER //",
    className
}: HeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.from('.hero-line', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.1,
            skewY: 5
        })
            .from('.hero-desc', {
                x: -50,
                opacity: 0,
                duration: 1
            }, '-=1');

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className={cn(
                "relative flex min-h-screen flex-col justify-center items-center pt-32 pb-20 px-4 md:px-8 overflow-hidden",
                className
            )}
        >
            <div ref={textRef} className="max-w-5xl space-y-6 z-10 flex flex-col items-center text-center">
                <div className="overflow-visible w-full flex flex-col items-center justify-center">
                    <h1 className={cn("hero-line text-4xl sm:text-6xl md:text-8xl lg:text-[12vw] font-bold uppercase leading-[0.9] text-[#F0F0F0] whitespace-nowrap text-center", syne.className)}
                        style={{ fontWeight: 800 }}>
                        PARADOX
                    </h1>
                    <h1 className={cn("hero-line text-4xl sm:text-6xl md:text-8xl lg:text-[12vw] font-bold uppercase leading-[0.8] whitespace-nowrap text-center", syne.className)}
                        style={{ 
                            fontWeight: 800,
                            color: 'transparent',
                            WebkitTextStroke: '1px #F0F0F0'
                        }}>
                        PARADOX
                    </h1>
                </div>

                <p className="hero-desc text-red-600 font-mono text-xs sm:text-sm md:text-base tracking-widest mt-4 font-bold max-w-[90vw] mx-auto leading-relaxed">
                    {subtitle}
                </p>

            </div>

            {/* Silk Animation Background */}
            <SilkBackground />

            {/* Background Noise/Texture */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
        </section>
    );
}
