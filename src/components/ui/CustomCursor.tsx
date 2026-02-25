'use client';
import { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const cursorSize = 20;
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouse.x.set(clientX - cursorSize / 2);
            mouse.y.set(clientY - cursorSize / 2);
        };

        window.addEventListener("mousemove", manageMouseMove);
        return () => window.removeEventListener("mousemove", manageMouseMove);
    }, [mouse.x, mouse.y]);

    return (
        <motion.div
            style={{
                translateX: mouse.x,
                translateY: mouse.y,
                width: cursorSize,
                height: cursorSize
            }}
            className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center will-change-transform"
        >
            <span className="text-black text-[10px] font-bold mb-[1px]">+</span>
        </motion.div>
    );
}
