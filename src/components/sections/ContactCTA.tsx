'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import AvailabilityBadge from '@/components/ui/AvailabilityBadge';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            },
        });

        tl.from('.cta-badge', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
        })
            .from('.cta-heading', {
                y: 80,
                opacity: 0,
                skewY: 2,
                duration: 1.2,
                ease: 'power3.out',
            }, '-=0.3')
            .from('.cta-sub', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.7')
            .fromTo('.cta-button',
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                }, '-=0.4')
            .from('.cta-divider', {
                scaleX: 0,
                transformOrigin: 'center center',
                duration: 1.5,
                ease: 'power4.inOut',
            }, '-=0.8');
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-section-breath px-page bg-[#050505] overflow-hidden"
        >
            {/* Subtle Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-red-900/[0.03] rounded-full blur-[180px] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                {/* Availability Badge */}
                <div className="cta-badge mb-8 md:mb-12">
                    <AvailabilityBadge available={true} />
                </div>

                {/* Main Heading */}
                <div className="cta-heading overflow-hidden">
                    <h2 className={cn('text-[#F0F0F0] font-black leading-[0.9] tracking-tighter uppercase text-[clamp(1.75rem,6vw,5rem)]', syne.className)}>
                        GOT A <span className="text-red-600">PROJECT?</span>
                    </h2>
                </div>

                {/* Subtext */}
                <p className="cta-sub text-body-large text-neutral-500 mt-4 md:mt-6 max-w-lg leading-relaxed">
                    Let&apos;s build something that moves — visually, emotionally, and beyond the grid.
                </p>

                {/* CTA Button */}
                <a
                    href="mailto:someshwark22@gmail.com"
                    className="cta-button group relative inline-flex items-center gap-3 border border-white/[0.1] px-8 py-4 md:px-10 md:py-5 mt-10 md:mt-14 text-micro text-neutral-300 hover:text-white transition-all duration-500 overflow-hidden rounded-full bg-[#0A0A0A]/80 backdrop-blur-md"
                >
                    {/* Hover fill background */}
                    <span className="absolute inset-0 bg-red-600 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full" />
                    <span className="relative z-10 flex items-center gap-3">
                        START A PROJECT
                        <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </span>
                </a>

                {/* Decorative Divider */}
                <div className="cta-divider w-32 h-[1px] bg-white/[0.06] mt-16 md:mt-24" />
            </div>
        </section>
    );
}
