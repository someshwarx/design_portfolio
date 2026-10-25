'use client';

import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
    const pathname = usePathname();
    const { scrollYProgress } = useScroll();

    if (pathname?.startsWith('/studio')) return null;
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[1px] bg-red-600 origin-left z-[1000]"
            style={{ scaleX }}
        />
    );
}
