'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

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
            className="relative w-full h-screen min-h-[600px] bg-[#030303] text-white overflow-hidden flex flex-col justify-between pt-12 pb-12 z-50 border-t border-white/[0.02]"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Soft glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-neutral-800/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* Top Area */}
            <div className="footer-fade-up w-full flex justify-between items-center px-6 md:px-12 z-20 font-mono uppercase text-[10px] tracking-[0.2em] text-neutral-500">
                <span className="text-white opacity-80">PRDX // STUDIO</span>
                <button onClick={handleBackToTop} className="hover:text-white transition-colors duration-500 flex items-center gap-3 group cursor-pointer">
                    BACK TO TOP
                    <span className="w-1 h-1 bg-neutral-600 group-hover:bg-white rounded-full transition-colors" />
                </button>
            </div>

            {/* Thin Divider Lines Top */}
            <div className="footer-divider absolute top-28 left-6 right-6 h-[1px] bg-white/[0.03] z-10" />

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

            {/* Center Area (Available for projects) */}
            <div className="footer-fade-up absolute top-36 md:top-40 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
                <div className="flex items-center gap-4 font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-neutral-400 bg-[#0A0A0A]/50 px-6 py-3 rounded-full border border-white/[0.04] backdrop-blur-md hover:bg-white/[0.03] hover:text-white transition-all duration-700 cursor-default">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    AVAILABLE FOR PROJECTS
                </div>
            </div>

            {/* Thin Divider Lines Bottom */}
            <div className="footer-divider absolute bottom-[140px] md:bottom-[120px] left-6 right-6 h-[1px] bg-white/[0.03] z-10" />

            {/* Bottom Area */}
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end px-6 md:px-12 z-20 gap-12 md:gap-0 font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase mt-auto">
                
                {/* Left: Copyright & Identity */}
                <div className="footer-fade-up flex flex-col gap-4 w-full md:w-auto">
                    <p className="text-white opacity-90">© {new Date().getFullYear()} PARADOX.</p>
                    <p className="text-neutral-600 max-w-[200px] leading-relaxed">Visual direction &<br />interaction design</p>
                </div>
                
                {/* Right: Social & Contact */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full md:w-auto justify-start md:justify-end">
                    <div className="footer-fade-up flex flex-col gap-5">
                        <span className="text-neutral-700 font-bold">SOCIAL</span>
                        <div className="flex flex-col gap-4">
                            <a href="https://www.instagram.com/paradox.x0/" target="_blank" rel="noopener noreferrer" className="relative w-fit text-neutral-400 hover:text-white transition-colors duration-500 group">
                                Instagram
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                            </a>
                            <a href="https://x.com/somesh__x1" target="_blank" rel="noopener noreferrer" className="relative w-fit text-neutral-400 hover:text-white transition-colors duration-500 group">
                                X (Twitter)
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                            </a>
                        </div>
                    </div>

                    <div className="footer-fade-up flex flex-col gap-5">
                        <span className="text-neutral-700 font-bold">CONTACT</span>
                        <a href="mailto:someshwark22@gmail.com" className="relative w-fit text-neutral-400 hover:text-white transition-colors duration-500 group lowercase">
                            someshwark22@gmail.com
                            <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
