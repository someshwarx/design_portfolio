'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PLAYLIST } from '@/data/playlist';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

export default function CustomAudioPlayer() {
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack = PLAYLIST[currentTrackIndex];

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch((e) => {
                    console.log("Audio play failed due to browser policies:", e);
                });
            }
        }
    };

    const skipForward = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    };

    const skipBackward = () => {
        setCurrentTrackIndex((prev) => (prev === 0 ? PLAYLIST.length - 1 : prev - 1));
    };

    const handleEnded = () => {
        skipForward();
    };

    // When track index changes (from handleEnded or skips), play it automatically if was already playing
    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.log(e));
        }
    }, [currentTrackIndex, isPlaying]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="fixed bottom-4 left-4 right-4 md:right-auto md:left-6 md:bottom-6 z-[90] flex items-center gap-3 md:gap-4 bg-[#050505]/95 backdrop-blur-md border-[0.5px] border-white/20 p-2 pr-4 md:pr-6 shadow-2xl group transition-all md:min-w-[200px] md:max-w-[320px]"
            >
                {/* Hidden Audio Element */}
                <audio 
                    ref={audioRef} 
                    src={currentTrack.audioUrl} 
                    onEnded={handleEnded} 
                    preload="metadata"
                />

                {/* Square Album Art */}
                <div className="relative w-12 h-12 overflow-hidden border border-white/10 flex-shrink-0 bg-neutral-900 group-hover:border-red-600/50 transition-colors">
                    <Image 
                        src={currentTrack.albumImageUrl} 
                        alt={currentTrack.title}
                        fill
                        className={cn(
                            "object-cover transition-all duration-700",
                            isPlaying ? "scale-100 opacity-100" : "scale-105 opacity-60 grayscale-[50%]"
                        )}
                        sizes="48px"
                    />
                </div>

                {/* Right Side: Info + Controls + Equalizer */}
                <div className="flex flex-col justify-center overflow-hidden w-full flex-1 gap-1">
                    
                    {/* Top Row: Track info & Equalizer */}
                    <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col truncate pr-2">
                            <p className="text-[10px] font-mono font-bold text-[#F0F0F0] uppercase truncate transition-colors">
                                {currentTrack.title}
                            </p>
                            <p className="text-[9px] font-mono text-neutral-500 uppercase truncate">
                                {currentTrack.artist}
                            </p>
                        </div>

                        {/* Equalizer Animation */}
                        <div className="flex items-end gap-[3px] h-3 mt-1 overflow-hidden shrink-0">
                            {[1, 2, 3].map((bar) => (
                                <motion.div
                                    key={bar}
                                    className={cn(
                                        "w-[3px] origin-bottom transition-colors duration-300",
                                        isPlaying ? "bg-red-600" : "bg-neutral-800"
                                    )}
                                    animate={isPlaying ? { 
                                        height: ["30%", "100%", "40%", "90%", "20%", "100%", "30%"] 
                                    } : { height: "2px" }}
                                    transition={{ 
                                        repeat: isPlaying ? Infinity : 0, 
                                        duration: 1.2, 
                                        ease: "linear",
                                        delay: bar * 0.25 
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bottom Row: Controls */}
                    <div className="flex items-center gap-3 mt-1">
                        <button 
                            onClick={skipBackward} 
                            className="text-neutral-500 hover:text-white transition-colors p-1 -ml-1 flex items-center justify-center"
                            aria-label="Previous Track"
                        >
                            <SkipBack size={12} className="fill-current" />
                        </button>
                        <button 
                            onClick={togglePlay} 
                            className="text-white hover:text-red-600 transition-colors p-1 flex items-center justify-center"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current ml-[2px]" />}
                        </button>
                        <button 
                            onClick={skipForward} 
                            className="text-neutral-500 hover:text-white transition-colors p-1 flex items-center justify-center"
                            aria-label="Next Track"
                        >
                            <SkipForward size={12} className="fill-current" />
                        </button>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
}
