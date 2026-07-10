'use client';

import { useEffect, useRef } from 'react';

export default function SilkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Store state outside the render loop but inside the component instance
    // currentOpacity: 0 = white, 1 = fully red
    const baseLinesCount = 25;
    const lineOpacities = useRef<number[]>(new Array(baseLinesCount).fill(0));
    const targetOpacities = useRef<number[]>(new Array(baseLinesCount).fill(0));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Mobile performance: fewer lines + coarser point spacing
        const isMobile = width < 768;
        const linesCount = isMobile ? 15 : baseLinesCount;
        const pointSpacing = isMobile ? 50 : 35;

        // Resize opacity arrays if needed
        if (lineOpacities.current.length !== linesCount) {
            lineOpacities.current = new Array(linesCount).fill(0);
            targetOpacities.current = new Array(linesCount).fill(0);
        }

        let t = 0;
        let animationFrameId: number;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Update active red lines every 4 seconds
        const randomizeRedLines = () => {
            // Reset all targets to 0 (white)
            for (let i = 0; i < linesCount; i++) {
                targetOpacities.current[i] = 0;
            }

            // Pick 2-3 new random lines to become red
            const count = Math.floor(Math.random() * 2) + 2;
            const indices = new Set<number>();
            while (indices.size < count) {
                indices.add(Math.floor(Math.random() * linesCount));
            }

            // Set their target to 1 (red)
            indices.forEach(index => {
                targetOpacities.current[index] = 1;
            });
        };

        randomizeRedLines(); // Initial randomization
        const intervalId = setInterval(randomizeRedLines, 4000);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            t += 0.005;
            ctx.lineWidth = 2.5;

            for (let i = 0; i < linesCount; i++) {
                // Smoothly interpolate current opacity towards target
                // specific lerp factor for smooth fade (0.02 is slow and smooth)
                const current = lineOpacities.current[i];
                const target = targetOpacities.current[i];

                // Lerp: current += (target - current) * factor
                lineOpacities.current[i] += (target - current) * 0.02;

                ctx.beginPath();

                // Interpolate Color
                // White base: 255, 255, 255, 0.1
                // Red target: 220, 38, 38, 0.6

                const factor = lineOpacities.current[i];

                const r = 255 + (220 - 255) * factor;
                const g = 255 + (38 - 255) * factor;
                const b = 255 + (38 - 255) * factor;
                const a = 0.1 + (0.6 - 0.1) * factor;

                ctx.strokeStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(3)})`;

                // Wave Logic
                // Base Y position
                // Spread lines a bit more to fill screen nicely
                const y = height / 2 + (i - linesCount / 2) * 15;

                // Draw points across width
                for (let x = 0; x <= width + pointSpacing; x += pointSpacing) {
                    // Sine wave combinations
                    // 1. Slow large wave
                    const y1 = Math.sin(x * 0.002 + t + i * 0.05) * 100;
                    // 2. Faster detail wave
                    const y2 = Math.sin(x * 0.01 - t * 2) * 20;

                    if (x === 0) ctx.moveTo(x, y + y1 + y2);
                    else ctx.lineTo(x, y + y1 + y2);
                }

                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60"
        />
    );
}
