'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import { motion } from 'framer-motion';

export default function NotFound() {
    const glitchRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const el = glitchRef.current;
        if (!el) return;

        let interval: NodeJS.Timeout;

        const glitch = () => {
            const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
            const original = '404';
            let iterations = 0;

            interval = setInterval(() => {
                el.textContent = original
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) return original[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iterations >= original.length) {
                    clearInterval(interval);
                }

                iterations += 1 / 3;
            }, 50);
        };

        // Initial glitch
        const timeout = setTimeout(glitch, 500);

        // Repeat every 4s
        const repeatInterval = setInterval(glitch, 4000);

        return () => {
            clearTimeout(timeout);
            clearInterval(repeatInterval);
            clearInterval(interval);
        };
    }, []);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
            {/* Noise overlay */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-[200]" />

            {/* Glitch lines */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-[1px] bg-red-600/30"
                        style={{ top: `${20 + i * 15}%` }}
                        animate={{
                            x: ['-100%', '100%'],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 0.7,
                        }}
                    />
                ))}
            </motion.div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.p
                    className="font-mono text-red-600 text-xs tracking-[0.3em] uppercase mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    // SYSTEM ERROR //
                </motion.p>

                <motion.h1
                    ref={glitchRef}
                    className={cn(
                        'text-[30vw] md:text-[20vw] font-bold leading-none tracking-tighter text-[#F0F0F0]',
                        syne.className
                    )}
                    style={{ fontWeight: 900 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                >
                    404
                </motion.h1>

                <motion.p
                    className={cn(
                        'text-xl md:text-3xl font-bold uppercase tracking-tight text-neutral-400 mt-2',
                        syne.className
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    THE VOID STARES BACK.
                </motion.p>

                <motion.p
                    className="font-mono text-neutral-600 text-xs md:text-sm max-w-md mt-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    This page doesn&apos;t exist — or maybe it was consumed by the chaos.
                    Either way, there&apos;s nothing here for you.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="mt-10"
                >
                    <Link
                        href="/"
                        className="inline-block border border-white/20 px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                        <span className="group-hover:-translate-x-1 inline-block transition-transform duration-300 mr-2">
                            ←
                        </span>
                        ESCAPE THE VOID
                    </Link>
                </motion.div>
            </div>

            {/* Giant background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <h2
                    className={cn(
                        'text-[50vw] font-bold text-[#0a0a0a] leading-none tracking-tighter',
                        syne.className
                    )}
                    style={{ fontWeight: 900 }}
                >
                    ERR
                </h2>
            </div>

            {/* Scan line effect */}
            <motion.div
                className="absolute inset-0 z-[5] pointer-events-none"
                style={{
                    background:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
        </main>
    );
}
