import React from 'react';
import Header from '@/components/layout/Header';

export const metadata = {
    title: "Case Studies // Paradox",
};

export default function WorksPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pb-20 relative overflow-hidden flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center min-h-screen">
                <p className="font-mono text-sm tracking-widest text-neutral-500 uppercase animate-pulse">
                    // In Progress //
                </p>
            </div>
        </main>
    );
}
