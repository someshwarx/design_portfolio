'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStrip() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Divider line scale reveal
        gsap.from('.about-strip-divider', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.5,
            ease: 'power4.inOut',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            },
        });

        // Staggered content fade-in
        gsap.from('.about-strip-fade', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full py-section-breath px-page bg-[#050505] relative">
            {/* Top Divider */}
            <div className="about-strip-divider w-full h-[1px] bg-white/[0.06] mb-16 md:mb-24" />

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-lg md:gap-xl">
                {/* Left — Identity */}
                <div className="about-strip-fade md:col-span-5 flex flex-col gap-md">
                    <span className="text-accent-label font-mono text-xl md:text-2xl">// WHO AM I</span>
                    <h2 className={cn('text-h2 text-[#F0F0F0] leading-[1.1]', syne.className)}>
                        I&apos;M SOMESHWAR<br />
                        AKA <span className="text-red-600">PARADOX.</span>
                    </h2>
                </div>

                {/* Right — Philosophy excerpt */}
                <div className="about-strip-fade md:col-span-6 md:col-start-7 flex flex-col gap-md justify-end">
                    <div className="text-body-base text-neutral-400 flex flex-col gap-sm leading-relaxed">
                        <p>
                            The name comes from how I design: Balancing opposites. Structure and chaos.
                            Logic and emotion.
                        </p>
                        <p>
                            I create digital experiences that push beyond conventional layouts while
                            staying grounded in usability. Nothing is random. If it feels bold or
                            unfamiliar, there&apos;s intent behind it.
                        </p>
                    </div>

                    <Link
                        href="/about"
                        className="group inline-flex items-center gap-2 text-micro text-neutral-500 hover:text-white transition-colors duration-500 w-fit"
                    >
                        LEARN MORE
                        <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                    </Link>
                </div>
            </div>

            {/* Bottom Divider */}
            <div className="about-strip-divider w-full h-[1px] bg-white/[0.06] mt-16 md:mt-24" />
        </section>
    );
}
