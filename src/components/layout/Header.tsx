'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Index', href: '/works' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: 'mailto:hello@paradox.d' },
    ];

    return (
        <header
            className={cn(
                "absolute top-0 left-0 w-full z-50 px-6 py-[18px] flex justify-between items-center border-b-[0.5px] border-transparent"
            )}
        >
            {/* Logo */}
            <Link href="/" className="z-50">
                <h1
                    className={cn(
                        "text-xl md:text-2xl font-bold uppercase tracking-tighter hover:opacity-70 transition-opacity font-mono",
                        isOpen ? "text-white" : "text-white"
                    )}
                >
                    PDOX
                </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-mono">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="hover:text-red-500 transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden z-50 pointer-events-auto text-sm font-mono uppercase tracking-widest hover:text-red-500 transition-colors"
            >
                {isOpen ? 'Close' : 'Menu'}
            </button>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * (index + 1) }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl font-bold uppercase tracking-tighter hover:text-red-500 transition-colors font-mono"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Mobile Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 flex gap-6 text-xs font-mono uppercase tracking-widest text-neutral-500"
                        >
                            <a href="#" className="hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="hover:text-white transition-colors">X</a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
