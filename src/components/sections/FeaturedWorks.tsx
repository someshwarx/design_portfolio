'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import Link from 'next/link';
import { HyperText } from '@/components/ui/hyper-text';

gsap.registerPlugin(ScrollTrigger);

const WIDGETS = [
    {
        title: 'DESIGNS',
        subtitle: 'Posters, branding, typography, and visual experiments.',
        href: '/designs',

        accent: false,
        tags: ['POSTERS', 'BRANDING', 'TYPOGRAPHY', 'VISUAL'],
        status: 'ARCHIVE',
    },
    {
        title: 'CASE STUDIES',
        subtitle: 'Process breakdowns, strategic thinking, and the story behind the work.',
        href: '/works',

        accent: true,
        tags: ['PROCESS', 'STRATEGY', 'UX', 'SYSTEMS'],
        status: 'IN-DEPTH',
    },
];

export default function FeaturedWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Header reveal
        gsap.from(headerRef.current, {
            scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 85%',
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
        });

        // Widget cards stagger reveal
        gsap.set('.work-widget', { y: 80, autoAlpha: 0 });
        ScrollTrigger.batch('.work-widget', {
            start: 'top 88%',
            onEnter: (batch) =>
                gsap.to(batch, {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power3.out',
                    overwrite: true,
                }),
            once: true,
        });

        // Animated border reveal on each card
        gsap.utils.toArray<HTMLElement>('.widget-border-top').forEach((el) => {
            gsap.from(el, {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 1.2,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: el.closest('.work-widget'),
                    start: 'top 85%',
                },
            });
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full py-section-breath px-page bg-[#050505] relative">
            {/* Section Header */}
            <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-md">
                <div className="flex flex-col gap-sm">
                    <span className="text-accent-label font-mono text-xl md:text-2xl">// SELECTED WORK</span>
                    <h2 className={cn('text-h1 text-[#F0F0F0]', syne.className)}>
                        EXPLORE<br />
                        <span className="text-red-600">THE WORK.</span>
                    </h2>
                </div>
                <p className="text-body-small text-neutral-500 max-w-sm leading-relaxed">
                    Two worlds of creative output. Visual experiments and the thinking that drives them.
                </p>
            </div>

            {/* Widget Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {WIDGETS.map((widget) => (
                    <Link
                        key={widget.title}
                        href={widget.href}
                        className="work-widget group relative block"
                    >
                        {/* ---- Card Container ---- */}
                        <div className={cn(
                            'relative overflow-hidden transition-all duration-500',
                            'bg-[#0a0a0a] border border-white/[0.06]',
                            'group-hover:border-white/[0.12]',
                        )}>

                            {/* Animated top accent border */}
                            <div className={cn(
                                'widget-border-top absolute top-0 left-0 right-0 h-[2px] z-20',
                                widget.accent
                                    ? 'bg-red-600'
                                    : 'bg-white/30'
                            )} />

                            {/* Hover background shift */}
                            <div className="absolute inset-0 bg-white/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* ---- Card Inner ---- */}
                            <div className="relative z-10 flex flex-col min-h-[280px] sm:min-h-[320px] md:min-h-[400px]">

                                {/* Top Bar — metadata row */}
                                <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/[0.04]">
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            'text-micro font-mono',
                                            widget.accent ? 'text-red-600/70' : 'text-neutral-600'
                                        )}>
                                            {widget.status}
                                        </span>
                                    </div>

                                    {/* Arrow */}
                                    <div className="w-8 h-8 flex items-center justify-center border border-white/[0.06] group-hover:border-white/[0.15] group-hover:bg-white/[0.04] transition-all duration-500">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            className="text-neutral-600 group-hover:text-white transition-colors duration-500 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transform-gpu"
                                            style={{ transition: 'color 0.5s, transform 0.5s' }}
                                        >
                                            <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Middle — spacer with faint grid pattern */}
                                <div className="flex-1 relative">
                                    {/* Subtle dot grid pattern */}
                                    <div
                                        className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700"
                                        style={{
                                            backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)',
                                            backgroundSize: '24px 24px',
                                        }}
                                    />


                                </div>

                                {/* Bottom — title, description, tags */}
                                <div className="px-6 md:px-8 pb-6 md:pb-8 flex flex-col gap-4">
                                    {/* Title with scramble effect */}
                                    <HyperText
                                        className={cn(
                                            'text-h2 !py-0 !font-bold tracking-tight',
                                            widget.accent
                                                ? 'text-neutral-200 group-hover:text-red-500'
                                                : 'text-neutral-200 group-hover:text-white',
                                            syne.className
                                        )}
                                        animateOnHover={true}
                                        startOnView={true}
                                        duration={600}
                                    >
                                        {widget.title}
                                    </HyperText>

                                    {/* Description */}
                                    <p className="text-body-small text-neutral-600 group-hover:text-neutral-400 transition-colors duration-500 max-w-sm leading-relaxed">
                                        {widget.subtitle}
                                    </p>

                                    {/* Tags row */}
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {widget.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] font-mono tracking-[0.15em] uppercase text-neutral-700 group-hover:text-neutral-500 border border-white/[0.04] group-hover:border-white/[0.08] px-2.5 py-1 transition-all duration-500"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
