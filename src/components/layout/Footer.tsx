'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setTime(istTime);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        // Subtle Parallax on the massive text
        gsap.to(textRef.current, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        // Slow cinematic fade-in for footer elements
        gsap.from('.footer-fade-up', {
            y: 40,
            opacity: 0,
            duration: 1.8,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });

        // Subtle divider scale reveal
        gsap.from('.footer-divider', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 2,
            ease: 'power4.inOut',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });

    }, { scope: containerRef });

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            ref={containerRef}
            className="relative w-full h-screen min-h-[600px] bg-[#030303] text-white overflow-hidden flex flex-col justify-between pt-16 pb-16 z-50 border-t border-white/[0.02]"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Soft glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-neutral-800/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* Top Area */}
            <div className="footer-fade-up w-full flex justify-between items-center px-page z-20 text-micro text-neutral-500">
                <div className="flex flex-col gap-1">
                    <span className="text-white opacity-80">12.9629° N, 77.5775° E</span>
                    {time && <span className="text-red-600 font-mono text-xs">{time}</span>}
                </div>
                <button onClick={handleBackToTop} className="hover:text-white transition-colors duration-500 flex items-center gap-sm group cursor-pointer">
                    BACK TO TOP
                    <span className="w-1.5 h-1.5 bg-neutral-600 group-hover:bg-white rounded-full transition-colors" />
                </button>
            </div>

            {/* Thin Divider Lines Top */}
            <div className="footer-divider absolute top-28 left-6 md:left-12 lg:left-16 right-6 md:right-12 lg:right-16 h-[1px] bg-white/[0.03] z-10" />

            {/* Oversized Background Typography */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 overflow-hidden">
                <h2
                    ref={textRef}
                    className={cn(
                        "text-[12vw] leading-[0.75] font-black uppercase tracking-tighter text-[#1f1f1f] whitespace-nowrap select-none",
                        syne.className
                    )}
                    style={{ fontWeight: 900 }}
                >
                    PARADOX
                </h2>
            </div>



            {/* Thin Divider Lines Bottom */}
            <div className="footer-divider absolute bottom-[140px] md:bottom-[120px] left-6 md:left-12 lg:left-16 right-6 md:right-12 lg:right-16 h-[1px] bg-white/[0.03] z-10" />

            {/* Bottom Area */}
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end px-page z-20 gap-lg md:gap-0 text-micro text-neutral-500 mt-auto">

                {/* Left: Copyright & Identity */}
                <div className="footer-fade-up flex flex-col gap-sm w-full md:w-auto">
                    <p className="text-white opacity-90">© {new Date().getFullYear()} PARADOX.</p>
                    <p className="text-red-600 max-w-[200px] leading-relaxed">Built with intention,<br />Designed for impact.</p>
                </div>

                {/* Right: Social & Contact */}
                <div className="flex flex-col md:flex-row gap-lg md:gap-xxl w-full md:w-auto justify-start md:justify-end">
                    <div className="footer-fade-up flex flex-col gap-sm">
                        <span className="text-neutral-700 font-bold text-[9px] tracking-widest">SOCIAL</span>
                        <div className="flex flex-col gap-xs items-start">
                            <a href="https://www.instagram.com/paradox.x0/" target="_blank" rel="noopener noreferrer" className="relative inline-block w-fit text-neutral-400 hover:text-white transition-colors duration-500 group">
                                Instagram
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                            </a>
                            <a href="https://x.com/somesh__x1" target="_blank" rel="noopener noreferrer" className="relative inline-block w-fit text-neutral-400 hover:text-white transition-colors duration-500 group">
                                X (Twitter)
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                            </a>
                        </div>
                    </div>

                    <div className="footer-fade-up flex flex-col gap-sm items-start">
                        <span className="text-neutral-700 font-bold text-[9px] tracking-widest">CONTACT</span>
                        <a href="mailto:someshwark22@gmail.com" className="relative inline-block w-fit text-neutral-400 hover:text-white transition-colors duration-500 group lowercase">
                            someshwark22@gmail.com
                            <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
