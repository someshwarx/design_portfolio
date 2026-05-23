'use client';

import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

// Only register GSAP on the client
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        // Sync GSAP ScrollTrigger with Lenis
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }
        gsap.ticker.add(update);
        // Important for GSAP/Lenis sync
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.08, wheelMultiplier: 1.2, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
