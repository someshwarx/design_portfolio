'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const cursorSize = isHovering ? 64 : 20;
    
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    // Smooth spring physics for that premium heavy feel
    const smoothOptions = { damping: 25, stiffness: 300, mass: 0.2 };
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    };

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            // Center the cursor
            mouse.x.set(clientX - cursorSize / 2);
            mouse.y.set(clientY - cursorSize / 2);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if we should completely hide the cursor (e.g. for games)
            if (target.closest('[data-hide-cursor="true"]')) {
                setIsHidden(true);
                setIsHovering(false);
                return;
            } else {
                setIsHidden(false);
            }

            // Check if we should prevent the cursor expansion effect
            if (target.closest('[data-cursor="none"]')) {
                setIsHovering(false);
                return;
            }

            // Check if hovering over a link, button, or project card
            if (
                target.closest('a') || 
                target.closest('button') || 
                target.closest('.project-card') ||
                target.closest('input')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", manageMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        
        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouse.x, mouse.y, cursorSize]);

    return (
        <motion.div
            style={{
                x: smoothMouse.x,
                y: smoothMouse.y,
                opacity: isHidden ? 0 : 1,
            }}
            animate={{
                width: cursorSize,
                height: cursorSize,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={cn("fixed top-0 left-0 bg-white rounded-full z-[9999] mix-blend-difference flex items-center justify-center will-change-transform hidden md:flex", isHidden ? "pointer-events-none" : "pointer-events-none")}
        >
            <motion.span 
                animate={{ 
                    opacity: isHovering && !isHidden ? 0 : 1,
                    scale: isHovering && !isHidden ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
                className="text-black text-[10px] font-bold mb-[1px]"
            >
                +
            </motion.span>
        </motion.div>
    );
}
