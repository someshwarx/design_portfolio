import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { Project } from "@/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { syne } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = await client.fetch<Project>(PROJECT_QUERY, { slug });

    if (!project) {
        notFound();
    }

    const imageUrl = project.mainImage ? urlFor(project.mainImage).url() : null;

    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
            {/* Back to Index */}
            <nav className="fixed top-0 left-0 w-full z-50 px-page py-6 md:py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
                <Link href="/" className="pointer-events-auto group flex items-center gap-xs text-sm uppercase tracking-widest hover:text-red-500 transition-colors">
                    <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    Index
                </Link>
                <span className="text-xs font-mono text-neutral-500">{project.category || 'Work'}</span>
            </nav>

            {/* Hero Section */}
            <header className="relative w-full h-[60vh] md:h-[80vh] flex items-end pb-16 md:pb-28 px-page">
                <div className="absolute inset-0 z-0">
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl w-full mx-auto">
                    <h1 className={cn("text-h1 text-white break-words", syne.className)}>
                        {project.title}
                    </h1>
                    <div className="mt-md flex flex-col md:flex-row gap-lg md:items-end justify-between border-t border-white/20 pt-md">
                        <div className="max-w-xl">
                            <p className="text-body-large text-neutral-300 leading-relaxed">
                                {project.description || "No description provided."}
                            </p>
                        </div>
                        <div className="flex gap-md sm:gap-lg font-mono text-micro text-neutral-500 uppercase mt-sm md:mt-0">
                            <div>
                                <span className="block text-white opacity-40 font-bold mb-1">Date</span>
                                {project.publishedAt ? new Date(project.publishedAt).getFullYear() : '2026'}
                            </div>
                            <div>
                                <span className="block text-white opacity-40 font-bold mb-1">Role</span>
                                Visual Design
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Spacer / Future Rich Text */}
            <section className="px-page py-section-breath max-w-7xl mx-auto">
                {/* Placeholder for now since we only have single image and description */}
                <div className="w-full aspect-video bg-neutral-900 border border-white/10 flex items-center justify-center">
                    <p className="font-mono text-neutral-600 uppercase tracking-widest text-micro">More content coming soon</p>
                </div>
            </section>

            {/* Footer mimic */}
            <footer className="w-full py-section-breath border-t border-white/10 flex flex-col items-center justify-center text-center overflow-hidden px-page">
                <h2 className={cn("text-display text-neutral-900 leading-none select-none pointer-events-none whitespace-nowrap text-center", syne.className)}>
                    PARADOX
                </h2>
                <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mt-lg gap-md md:gap-0 text-neutral-500 font-mono text-micro border-t border-white/[0.03] pt-md">
                    <p>SEOUL / NEW YORK</p>
                    <p>© 2026 PARADOX STUDIO. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
        </main>
    );
}
