'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import { Project } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';

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

const getImageUrl = (project: Partial<Project>, width: number = 1200) => {
    if (project.imageUrl) {
        try {
            const url = new URL(project.imageUrl);
            url.searchParams.set('w', width.toString());
            url.searchParams.set('q', '85');
            return url.href;
        } catch {
            return project.imageUrl;
        }
    }
    if (project.mainImage) {
        return urlFor(project.mainImage).width(width).quality(85).url();
    }
    return '';
};

const smoothTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
};

export default function WorksGrid({ projects = [] }: WorksGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const [activeProject, setActiveProject] = useState<Partial<Project> | null>(null);

    const displayProjects = projects.length > 0 ? projects : MOCK_PROJECTS;

    const lenis = useLenis();

    useEffect(() => {
        if (activeProject) {
            document.body.style.overflow = 'hidden';
            lenis?.stop();
        } else {
            document.body.style.overflow = 'auto';
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = 'auto';
            lenis?.start();
        };
    }, [activeProject, lenis]);

    useGSAP(() => {
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

        // Use a distinct wrapper class for GSAP so it doesn't conflict with Framer Motion layout elements
        gsap.set('.project-wrapper', { y: 100, autoAlpha: 0 });

        ScrollTrigger.batch('.project-wrapper', {
            start: 'top 90%',
            onEnter: batch => gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power3.out',
                overwrite: true
            }),
            once: true
        });

    }, { scope: containerRef, dependencies: [displayProjects] });

    return (
        <section ref={containerRef} className="w-full py-section-breath px-page bg-background relative">
            {/* Section Header */}
            <div ref={titleRef} className="flex flex-col items-center justify-center mb-16 md:mb-20 gap-sm">
                <div className="overflow-visible w-full flex justify-center">
                    <h2 className={cn("text-[clamp(5rem,10vw,25rem)] font-black leading-[0.85] tracking-tighter text-[#F0F0F0] whitespace-nowrap text-center", syne.className)}>
                        WORKS
                    </h2>
                </div>
                <p className="text-neutral-400 font-mono text-body-small tracking-[0.15em] uppercase text-center max-w-2xl leading-relaxed mt-xs">
                    A collection of visual explorations across branding, posters, album covers, typography, and digital design.
                </p>
            </div>

            {/* Masonry-style Grid (CSS Columns) */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-sm md:gap-md relative z-10">
                {displayProjects.map((project, index) => {
                    const imageUrl = getImageUrl(project, 1200);
                    const isActive = activeProject?._id === project._id;
                    const layoutId = `card-${project._id || index}`;
                    const imageLayoutId = `image-${project._id || index}`;

                    return (
                        <div key={project._id || index} className="project-wrapper break-inside-avoid inline-block w-full mb-sm md:mb-md">
                            <motion.div
                                layoutId={layoutId}
                                onClick={() => setActiveProject(project)}
                                className={cn(
                                    "group relative overflow-hidden border border-white/10 transition-colors duration-500 hover:border-red-600/50 cursor-pointer will-change-transform backface-invisible flex flex-col",
                                    isActive && "opacity-0 pointer-events-none" // Hide the original when active
                                )}
                                style={{
                                    backgroundColor: project.hexColor || '#171717',
                                    borderRadius: 0,
                                }}
                                transition={smoothTransition}
                            >
                                {/* Bottom Right Title (Hover/Mobile Visible) */}
                                <motion.div className="absolute bottom-xxs right-xxs md:bottom-sm md:right-sm z-20 md:translate-y-8 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-y-0 opacity-100">
                                    <span className="text-micro font-mono bg-black/85 px-2.5 py-1 border border-white/10 text-white/80 uppercase tracking-widest">
                                        {project.title}
                                    </span>
                                </motion.div>

                                {/* Background Image */}
                                {imageUrl ? (
                                    <motion.img
                                        layoutId={imageLayoutId}
                                        src={imageUrl}
                                        alt={project.title || 'Project Image'}
                                        className="w-full h-auto block object-cover"
                                        loading={index < 4 ? "eager" : "lazy"}
                                        decoding="async"
                                        transition={smoothTransition}
                                    />
                                ) : (
                                    <div className="flex-1 min-h-[300px] flex items-center justify-center opacity-30 pointer-events-none">
                                        <span className={cn("text-h1 rotate-[-12deg] tracking-tight opacity-10 select-none", syne.className)}>
                                            {project.title?.substring(0, 3)}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {/* Modal Overlay and Expanded View */}
            <AnimatePresence>
                {activeProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setActiveProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        
                        <div className="relative z-10 flex items-center justify-center p-4 md:p-8 pointer-events-none w-full h-full">
                            {(() => {
                                const aspect = (activeProject.dimensions?.width && activeProject.dimensions?.height) 
                                    ? activeProject.dimensions.width / activeProject.dimensions.height 
                                    : 1;

                                const cachedImageUrl = getImageUrl(activeProject, 1200);
                                const cardLayoutId = `card-${activeProject._id || displayProjects.findIndex(p => p._id === activeProject._id)}`;
                                const imageLayoutId = `image-${activeProject._id || displayProjects.findIndex(p => p._id === activeProject._id)}`;

                                return (
                                    <motion.div
                                        layoutId={cardLayoutId}
                                        className="relative overflow-hidden border border-white/10 bg-[#171717] pointer-events-auto flex flex-col shadow-2xl"
                                        style={{
                                            backgroundColor: activeProject.hexColor || '#171717',
                                            width: `min(90vw, 90vh * ${aspect})`,
                                            height: `min(90vh, 90vw / ${aspect})`,
                                            borderRadius: 12,
                                        }}
                                        transition={smoothTransition}
                                    >
                                        <div className="w-full h-full relative cursor-pointer" onClick={() => setActiveProject(null)}>
                                            {cachedImageUrl ? (
                                                <motion.img
                                                    layoutId={imageLayoutId}
                                                    src={cachedImageUrl}
                                                    alt={activeProject.title || 'Project Image'}
                                                    className="w-full h-full object-cover"
                                                    loading="eager"
                                                    decoding="async"
                                                    transition={smoothTransition}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center p-20">
                                                    <span className={cn("text-h1 rotate-[-12deg] tracking-tight opacity-10 select-none", syne.className)}>
                                                        {activeProject.title?.substring(0, 3)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}

