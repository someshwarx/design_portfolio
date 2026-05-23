import React from 'react';
import Header from '@/components/layout/Header';
import WorksGrid from '@/components/sections/WorksGrid';
import { client } from '@/sanity/lib/client';
import { PROJECTS_QUERY } from '@/sanity/lib/queries';
import { Project } from '@/types';

export const metadata = {
    title: "Designs // Paradox",
};

export const dynamic = "force-dynamic";

export default async function DesignsPage() {
    const projects = await client.fetch<Project[]>(PROJECTS_QUERY);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pb-20 relative overflow-hidden flex flex-col">
            <Header />
            <div className="pt-24 md:pt-32">
                <WorksGrid projects={projects} />
            </div>
        </main>
    );
}
