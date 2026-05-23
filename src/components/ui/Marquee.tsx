'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MarqueeProps {
    items?: string[];
    speed?: number;
    separator?: string;
    className?: string;
}

const DEFAULT_ITEMS = [
    'BRANDING',
    'MOTION',
    'UI / UX',
    'IDENTITY',
    'TYPOGRAPHY',
    '3D',
    'ART DIRECTION',
    'VISUAL DESIGN',
    'DIGITAL PRODUCTS',
    'CREATIVE CODING',
];

export default function Marquee({
    items = DEFAULT_ITEMS,
    speed = 50,
    separator = '—',
    className,
}: MarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const track1Ref = useRef<HTMLDivElement>(null);
    const track2Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!track1Ref.current || !track2Ref.current) return;

        const trackWidth = track1Ref.current.scrollWidth;

        // Set initial positions
        gsap.set(track2Ref.current, { x: trackWidth });

        // Create infinite scroll animation
        const tl = gsap.timeline({ repeat: -1 });

        tl.to([track1Ref.current, track2Ref.current], {
            x: `-=${trackWidth}`,
            duration: trackWidth / speed,
            ease: 'none',
            modifiers: {
                x: gsap.utils.unitize((x: number) => {
                    return parseFloat(String(x)) % (trackWidth * 2) + trackWidth;
                }),
            },
        });

        // Speed up on hover
        const container = containerRef.current;
        if (container) {
            container.addEventListener('mouseenter', () => {
                gsap.to(tl, { timeScale: 3, duration: 0.8, ease: 'power2.out' });
            });
            container.addEventListener('mouseleave', () => {
                gsap.to(tl, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
            });
        }
    }, { scope: containerRef });

    const renderItems = () =>
        items.map((item, i) => (
            <React.Fragment key={i}>
                <span className="whitespace-nowrap">{item}</span>
                <span className="text-red-600 mx-4 md:mx-6">{separator}</span>
            </React.Fragment>
        ));

    return (
        <div
            ref={containerRef}
            className={cn(
                'w-full overflow-hidden border-y-[0.5px] border-white/10 py-5 md:py-6 cursor-default select-none',
                className
            )}
        >
            <div className="relative flex">
                <div
                    ref={track1Ref}
                    className={cn(
                        'flex items-center text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-neutral-600 shrink-0',
                        syne.className
                    )}
                >
                    {renderItems()}
                </div>
                <div
                    ref={track2Ref}
                    className={cn(
                        'flex items-center text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-neutral-600 shrink-0 absolute left-0',
                        syne.className
                    )}
                >
                    {renderItems()}
                </div>
            </div>
        </div>
    );
}
