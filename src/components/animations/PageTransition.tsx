'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    // Force scroll to top on every route mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* The primary page content reveal */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="w-full h-full min-h-screen"
            >
                {children}
            </motion.div>

            {/* Red curtain wiping upwards */}
            <motion.div
                className="fixed inset-0 z-[100] bg-red-600 pointer-events-none"
                style={{ transformOrigin: "top" }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Black curtain trailing behind red */}
            <motion.div
                className="fixed inset-0 z-[99] bg-[#0a0a0a] pointer-events-none"
                style={{ transformOrigin: "top" }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
        </>
    );
}
