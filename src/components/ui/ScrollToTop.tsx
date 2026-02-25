'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={scrollToTop}
                    className={cn(
                        "fixed bottom-8 right-8 z-40 p-3 bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-white hover:text-black transition-colors duration-300 pointer-events-auto mix-blend-difference"
                    )}
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} strokeWidth={1.5} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
