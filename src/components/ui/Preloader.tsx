'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isFirstVisit, setIsFirstVisit] = useState(true);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('portfolio_visited');
        if (hasVisited) {
            setIsFirstVisit(false);
            setIsLoading(false);
            return;
        }

        sessionStorage.setItem('portfolio_visited', 'true');

        // Disable scroll during loading
        document.body.style.overflow = 'hidden';

        const interval = setInterval(() => {
            setProgress((prev) => {
                const randomIncrement = Math.floor(Math.random() * 15) + 5;
                const nextValue = prev + randomIncrement;

                if (nextValue >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return nextValue;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100 && isFirstVisit) {
            // Delay exit to show 100% briefly
            const timer = setTimeout(() => {
                setIsLoading(false);
                document.body.style.overflow = '';
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [progress, isFirstVisit]);

    if (!isFirstVisit) return null;

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    id="preloader"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
                    exit={{
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    <div className="flex flex-col items-center gap-4">
                        {/* Number Display */}
                        <motion.div
                            className="text-2xl md:text-4xl font-mono font-bold"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            {progress}%
                        </motion.div>

                        {/* Line Progress Bar */}
                        <div className="w-64 md:w-96 h-[2px] bg-neutral-900 overflow-hidden relative">
                            <motion.div
                                className="h-full bg-red-600 absolute left-0 top-0"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>

                        <div className="text-xs font-mono text-neutral-500 mt-2">
                            LOADING PORTFOLIO //
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
