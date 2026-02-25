'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SpotifyData {
    isPlaying: boolean;
    title: string;
    artist: string;
    songUrl: string;
}

export default function SpotifyFooter() {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const fetchData = async () => {
            try {
                const res = await fetch('/api/now-playing');
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error('Error fetching Spotify data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 15000);

        return () => clearInterval(interval);
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="flex items-center gap-3 text-neutral-500 font-mono text-xs md:text-sm transition-opacity duration-500">
            <span className="relative flex h-2 w-2 flex-shrink-0">
                {data?.isPlaying ? (
                    <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </>
                ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-600"></span>
                )}
            </span>

            {data?.isPlaying ? (
                <div className="flex gap-1 items-center">
                    <span className="hidden sm:inline">Now playing —</span>
                    <Link
                        href={data.songUrl}
                        target="_blank"
                        className="hover:text-white transition-colors border-b border-transparent hover:border-green-500/50 truncate max-w-[150px] md:max-w-xs"
                    >
                        {data.title}
                    </Link>
                </div>
            ) : (
                <span>Silence, for now.</span>
            )}
        </div>
    );
}
