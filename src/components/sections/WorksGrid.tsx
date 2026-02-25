'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import { Project } from '@/types';
import Image from 'next/image';

import { urlFor } from '@/sanity/lib/image';

// Fallback data for initial state
const MOCK_PROJECTS: Partial<Project>[] = [
    { _id: '1', title: 'Porsche 911', category: 'Automotive', hexColor: '#dc2626', size: 'small', slug: { current: 'porsche-911' }, imageUrl: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1000&auto=format&fit=crop', dimensions: { width: 1500, height: 1000, aspectRatio: 1.5 } },
    { _id: '2', title: 'Destiny', category: 'Game Art', hexColor: '#262626', size: 'small', slug: { current: 'destiny' }, imageUrl: 'https://images.unsplash.com/photo-1614726365723-49cfae9cbca8?q=80&w=1000&auto=format&fit=crop', dimensions: { width: 800, height: 1200, aspectRatio: 0.67 } },
    { _id: '3', title: 'Grimy', category: 'Texture', hexColor: '#171717', size: 'small', slug: { current: 'grimy' }, imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop', dimensions: { width: 1000, height: 1000, aspectRatio: 1 } },
    { _id: '4', title: 'Brutalist', category: 'Architecture', hexColor: '#1e3a8a', size: 'medium', slug: { current: 'brutalist' }, imageUrl: 'https://images.unsplash.com/photo-1486718448742-164bdc9d1807?q=80&w=1000&auto=format&fit=crop', dimensions: { width: 1500, height: 1000, aspectRatio: 1.5 } },
    { _id: '5', title: 'Red Void', category: 'Abstract', hexColor: '#7f1d1d', size: 'small', slug: { current: 'red-void' }, imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop', dimensions: { width: 800, height: 1200, aspectRatio: 0.67 } },
    { _id: '6', title: 'Lamine', category: 'Sports', hexColor: '#262626', size: 'small', slug: { current: 'lamine' }, imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop', dimensions: { width: 1000, height: 1000, aspectRatio: 1 } },
];

gsap.registerPlugin(ScrollTrigger);

interface WorksGridProps {
    projects?: Project[];
}

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    try {
        const url = new URL(src);
        url.searchParams.set('w', width.toString());
        url.searchParams.set('q', (quality || 75).toString());
        return url.href;
    } catch {
        return src;
    }
};

export default function WorksGrid({ projects = [] }: WorksGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    const displayProjects = projects.length > 0 ? projects : MOCK_PROJECTS;

    useGSAP(() => {
        const projectCards = gsap.utils.toArray('.project-card');

        // Animate Title
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Staggered Grid Reveal using Batch for better reliability
        gsap.set('.project-card', { y: 100, autoAlpha: 0 });

        ScrollTrigger.batch('.project-card', {
            start: 'top 90%',
            onEnter: batch => gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: true
            }),
            once: true
        });

    }, { scope: containerRef, dependencies: [displayProjects] });

    return (
        <section ref={containerRef} className="w-full py-20 px-4 md:px-8 bg-background">
            {/* Section Header */}
            <div ref={titleRef} className="flex justify-center mb-16">
                <h2 className={cn("text-4xl md:text-6xl font-bold tracking-tighter text-neutral-500", syne.className)}>
                    {`// WORKS //`}
                </h2>
            </div>

            {/* Masonry-style Grid (CSS Columns) */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
                {displayProjects.map((project, index) => {
                    const imageUrl = project.imageUrl || (project.mainImage ? urlFor(project.mainImage).url() : null);
                    const aspectRatio = project.dimensions?.aspectRatio || 1;

                    return (
                        <div
                            key={project._id || index}
                            className="project-card group relative overflow-hidden border border-white/10 transition-colors duration-500 hover:border-red-600/50 break-inside-avoid inline-block w-full mb-4 will-change-transform backface-invisible transform-gpu"
                            style={{
                                backgroundColor: project.hexColor || '#171717',
                                aspectRatio: imageUrl ? 'auto' : aspectRatio
                            }}
                        >
                            {/* Bottom Right Title (Hover) */}
                            <div className="absolute bottom-4 right-4 z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                                <span className="text-xs font-mono bg-black/80 px-2 py-1 border border-white/20 text-white/60 uppercase">
                                    {project.title}
                                </span>
                            </div>

                            {/* Background Image (Real) or Placeholder Typography */}
                            {imageUrl ? (
                                <Image
                                    loader={imageLoader}
                                    src={imageUrl}
                                    alt={project.title || 'Project Image'}
                                    width={project.dimensions?.width || 1200}
                                    height={project.dimensions?.height || 800}
                                    className="w-full h-auto block opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none">
                                    <span className={cn("text-6xl md:text-8xl font-black uppercase text-white/10 rotate-[-15deg]", syne.className)}>
                                        {project.title?.substring(0, 3)}
                                    </span>
                                </div>
                            )}

                            {/* Label properties */}
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="text-xs font-mono bg-black/80 px-2 py-1 border border-white/20 text-white/60">
                                    0{index + 1}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
