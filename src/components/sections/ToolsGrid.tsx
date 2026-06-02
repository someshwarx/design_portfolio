'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';

gsap.registerPlugin(ScrollTrigger);

const TOOLS = [
    { name: 'Figma', category: 'Interface Design' },
    { name: 'Blender', category: '3D & Motion' },
    { name: 'Adobe Suite', category: 'Creative Production' },
    { name: 'Affinity', category: 'Vector & Raster' },
    { name: 'Framer', category: 'Prototyping' },
    { name: 'Spline', category: '3D Web Design' },
];

export default function ToolsGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Header reveal
        gsap.from('.tools-header', {
            scrollTrigger: {
                trigger: '.tools-header',
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        // Grid cards batch reveal
        gsap.set('.tool-card', { y: 60, autoAlpha: 0 });
        ScrollTrigger.batch('.tool-card', {
            start: 'top 90%',
            onEnter: (batch) =>
                gsap.to(batch, {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.7,
                    ease: 'power3.out',
                    overwrite: true,
                }),
            once: true,
        });

        // Divider reveal
        gsap.from('.tools-divider', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.5,
            ease: 'power4.inOut',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full py-section-breath px-page bg-[#050505] relative">
            {/* Top Divider */}
            <div className="tools-divider w-full h-[1px] bg-white/[0.06] mb-16 md:mb-24" />

            {/* Section Header */}
            <div className="tools-header flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-md">
                <div className="flex flex-col gap-sm">
                    <span className="text-accent-label font-mono text-xl md:text-2xl">// WHAT I USE</span>
                    <h2 className={cn('text-h2 text-[#F0F0F0]', syne.className)}>
                        DESIGN <span className="text-red-600">ARSENAL</span>
                    </h2>
                </div>
                <p className="text-body-small text-neutral-500 max-w-xs leading-relaxed">
                    The tools and systems behind every pixel, frame, and interaction.
                </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.04]">
                {TOOLS.map((tool, index) => (
                    <div
                        key={tool.name}
                        className="tool-card group bg-[#050505] p-6 md:p-8 flex flex-col gap-sm transition-all duration-700 hover:bg-white/[0.02] relative overflow-hidden"
                    >
                        {/* Hover Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
                        </div>

                        {/* Index */}
                        <span className="text-micro text-neutral-700 font-mono">
                            0{index + 1}
                        </span>

                        {/* Tool Name */}
                        <h3 className={cn(
                            'text-h4 text-neutral-300 group-hover:text-white transition-colors duration-500',
                            syne.className
                        )}>
                            {tool.name}
                        </h3>

                        {/* Category */}
                        <span className="text-micro text-neutral-600 group-hover:text-neutral-400 transition-colors duration-500 mt-auto">
                            {tool.category}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
