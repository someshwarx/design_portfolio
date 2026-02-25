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
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
                <Link href="/" className="pointer-events-auto group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-500 transition-colors">
                    <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    Index
                </Link>
                <span className="text-xs font-mono text-neutral-500">{project.category || 'Work'}</span>
            </nav>

            {/* Hero Section */}
            <header className="relative w-full h-[60vh] md:h-[80vh] flex items-end pb-12 md:pb-24 px-6 md:px-12">
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

                <div className="relative z-10 max-w-7xl w-full">
                    <h1 className={cn("text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-none tracking-tighter text-white", syne.className)}>
                        {project.title}
                    </h1>
                    <div className="mt-6 flex flex-col md:flex-row gap-8 md:items-end justify-between border-t border-white/20 pt-6">
                        <div className="max-w-xl">
                            <p className="text-lg md:text-xl text-neutral-300 font-light font-mono leading-relaxed">
                                {project.description || "No description provided."}
                            </p>
                        </div>
                        <div className="flex gap-12 font-mono text-xs md:text-sm text-neutral-500 uppercase tracking-widest">
                            <div>
                                <span className="block text-white mb-1">Date</span>
                                {project.publishedAt ? new Date(project.publishedAt).getFullYear() : '2026'}
                            </div>
                            <div>
                                <span className="block text-white mb-1">Role</span>
                                Visual Design
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Spacer / Future Rich Text */}
            <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
                {/* Placeholder for now since we only have single image and description */}
                <div className="w-full aspect-video bg-neutral-900 border border-white/10 flex items-center justify-center">
                    <p className="font-mono text-neutral-600 uppercase tracking-widest">More content coming soon</p>
                </div>
            </section>

            {/* Footer mimic */}
            <footer className="w-full py-20 border-t border-white/10 flex flex-col items-center justify-center text-center overflow-hidden">
                <h2 className="text-[15vw] font-bold text-neutral-900 leading-none select-none pointer-events-none tracking-tighter" style={{ fontFamily: 'var(--font-syne)' }}>
                    PARADOX
                </h2>
                <div className="flex justify-between w-full max-w-6xl px-8 mt-8 text-neutral-500 font-mono text-xs md:text-sm">
                    <p>SEOUL / NEW YORK</p>
                    <p>© 2026 PARADOX STUDIO. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
        </main>
    );
}
