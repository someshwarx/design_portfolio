'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

interface SpotifyData {
    isPlaying: boolean;
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
}

export default function SpotifyWidget() {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (mounted && data) {
            gsap.from(containerRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out',
                delay: 1
            });
        }
    }, [mounted, data]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const fetchData = async () => {
            try {
                const res = await fetch('/api/now-playing');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error('Error fetching Spotify data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // Update every 10s

        return () => clearInterval(interval);
    }, [mounted]);

    if (!mounted || !data) return null;

    const { isPlaying, title, artist, albumImageUrl, songUrl } = data;

    return (
        <div
            ref={containerRef}
            className="fixed bottom-6 left-6 z-[100]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <a
                href={isPlaying ? songUrl : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 p-1.5 pr-4 rounded-full overflow-hidden hover:border-red-600/50 transition-all duration-500"
            >
                {/* Visualizer / Avatar */}
                <div className="relative h-10 w-10 flex-shrink-0">
                    {isPlaying && albumImageUrl ? (
                        <div className="relative h-full w-full rounded-full overflow-hidden border border-white/10">
                            <Image
                                src={albumImageUrl}
                                alt={title}
                                fill
                                className="object-cover animate-[spin_10s_linear_infinite]"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    ) : (
                        <div className="h-full w-full rounded-full bg-neutral-900 flex items-center justify-center border border-white/10">
                            <Music size={18} className="text-neutral-500" />
                        </div>
                    )}

                    {/* Animated Pulsing Ring */}
                    {isPlaying && (
                        <span className="absolute -inset-1 rounded-full border border-red-600/30 animate-ping opacity-75" />
                    )}
                </div>

                {/* Text Content */}
                <div className="flex flex-col min-w-[100px] max-w-[160px]">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono text-red-600 uppercase tracking-widest font-bold">
                            {isPlaying ? 'Now Playing' : 'Offline'}
                        </span>
                        {isPlaying && (
                            <div className="flex gap-[1.5px] h-1.5 items-end">
                                <motion.div animate={{ height: [1.5, 6, 3, 6, 1.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-[1.5px] bg-red-600" />
                                <motion.div animate={{ height: [3, 1.5, 6, 1.5, 3] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[1.5px] bg-red-600" />
                                <motion.div animate={{ height: [6, 3, 1.5, 3, 6] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-[1.5px] bg-red-600" />
                            </div>
                        )}
                    </div>
                    <h3 className="text-[11px] font-bold text-white truncate font-mono uppercase tracking-tight leading-tight">
                        {isPlaying ? title : 'Silence'}
                    </h3>
                    <p className="text-[9px] text-neutral-500 truncate font-mono uppercase leading-tight">
                        {isPlaying ? artist : 'Spotify'}
                    </p>
                </div>

                {/* Hover Indicator */}
                <AnimatePresence>
                    {isHovered && isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="ml-auto"
                        >
                            <ExternalLink size={12} className="text-red-500" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Glassy Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
        </div>
    );
}

