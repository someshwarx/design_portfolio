'use client';

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';
import { SiFigma, SiBlender, SiAffinity, SiFramer } from 'react-icons/si';
import { TbBrandAdobe } from 'react-icons/tb';

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function AboutContent() {
    return (
        <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 pt-32 md:pt-40 px-6 md:px-20 max-w-7xl mx-auto flex flex-col gap-12 md:gap-16 pb-20"
        >
            {/* Intro / Hero of About */}
            <motion.div variants={item} className="space-y-6">
                <h1 className={cn("text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-bold uppercase leading-[0.9] text-[#F0F0F0] break-words", syne.className)}>
                    Architect<br /> of Digital<br /> <span className="text-red-600">Chaos.</span>
                </h1>
                <div className="font-mono text-neutral-400 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed tracking-wide space-y-4">
                    <p>I’m SOMESHWAR aka PARADOX.</p>
                    <p>
                        The name comes from how I design: Balancing opposites. Structure and chaos. Logic and emotion.
                        I create digital experiences that push beyond conventional layouts while staying grounded to usability.
                        Nothing is random. If it feels bold or unfamiliar, there’s intent behind it.
                    </p>
                    <p>
                        I don’t lock myself into one style. I explore different design languages, adapt to the problem,
                        and evolve with every project. That flexibility is what defines my work.
                    </p>
                </div>
            </motion.div>

            {/* Philosophy Grid */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
                <div className="space-y-4">
                    <h3 className={cn("text-xl md:text-2xl font-bold uppercase", syne.className)}>The Philosophy</h3>
                    <div className="font-mono text-neutral-400 text-xs md:text-sm leading-relaxed space-y-4">
                        <p>Functionality is essential.</p>
                        <p>
                            My design approach sits where brutalism meets elegance. I focus on clarity, strong typography, purposeful motion, and spatial tension.
                            By stripping away unnecessary elements, I let the core idea speak louder and hit harder.
                        </p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className={cn("text-xl md:text-2xl font-bold uppercase", syne.className)}>The Approach</h3>
                    <div className="font-mono text-neutral-400 text-xs md:text-sm leading-relaxed space-y-4">
                        <p>Design that matters.</p>
                        <p>
                            I break ideas down to their essence and rebuild them into visual systems that communicate with intent.
                            Whether it’s a brand identity or a digital interface, my goal remains the same: create work that feels deliberate, adaptable, and hard to forget.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Skills / Tech Stack */}
            <motion.div variants={item} className="border-t border-white/10 pt-12">
                <h3 className={cn("text-2xl font-bold uppercase mb-8", syne.className)}>Design Arsenal</h3>
                <div className="font-mono text-neutral-400 text-sm md:text-base leading-relaxed">
                    <ul className="grid grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-8 text-center items-center">
                        <li className="flex flex-col items-center gap-3">
                            <SiFigma className="w-8 h-8 md:w-10 md:h-10 hover:text-white transition-colors" />
                            <span className="text-xs">Figma</span>
                        </li>
                        <li className="flex flex-col items-center gap-3">
                            <SiBlender className="w-8 h-8 md:w-10 md:h-10 hover:text-[#EA7600] transition-colors" />
                            <span className="text-xs">Blender</span>
                        </li>
                        <li className="flex flex-col items-center gap-3">
                            <TbBrandAdobe className="w-8 h-8 md:w-10 md:h-10 hover:text-[#FF0000] transition-colors" />
                            <span className="text-xs">Adobe </span>
                        </li>
                        <li className="flex flex-col items-center gap-3">
                            <SiAffinity className="w-8 h-8 md:w-10 md:h-10 hover:text-[#00C2FF] transition-colors" />
                            <span className="text-xs">Affinity</span>
                        </li>
                        <li className="flex flex-col items-center gap-3">
                            <SiFramer className="w-8 h-8 md:w-10 md:h-10 hover:text-[#0055FF] transition-colors" />
                            <span className="text-xs">Framer</span>
                        </li>
                        <li className="flex flex-col items-center gap-3 group">
                            {/* Spline logo placeholder uses an SVG matching its style, or a sleek box */}
                            <svg className="w-8 h-8 md:w-10 md:h-10 group-hover:text-[#ffffff] transition-colors fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.968 0C5.353 0 0 5.358 0 11.98C0 14.542 0.819 16.924 2.197 18.895L7.755 13.336C7.301 12.923 7.025 12.423 7.025 11.871C7.025 10.395 8.223 9.198 9.699 9.198C10.02 9.198 10.323 9.255 10.603 9.356L10.605 9.354C12.392 7.568 14.773 6.75 17.336 6.75C16.953 3.018 14.764 0 11.968 0ZM21.905 5.304C20.082 4.095 17.9 3.42 15.655 3.409C15.932 5.097 15.626 6.845 14.659 8.216L20.218 13.774C20.672 14.187 20.948 14.687 20.948 15.239C20.948 16.715 19.75 17.912 18.274 17.912C17.953 17.912 17.65 17.855 17.37 17.754L17.351 17.772C15.565 19.559 13.183 20.378 10.62 20.378C11.003 24.11 13.192 27.127 15.989 27.127C22.604 27.127 27.957 21.769 27.957 15.147C27.957 12.585 27.138 10.203 25.76 8.232L20.202 13.791C20.655 14.204 20.931 14.704 20.931 15.255C20.931 16.732 19.734 17.929 18.258 17.929C17.937 17.929 17.634 17.871 17.354 17.771L17.351 17.772C15.565 19.559 13.183 20.378 10.62 20.378C11.003 24.11 13.192 27.127 15.989 27.127C21.748 27.127 26.685 23.363 28 17.904C27.96 17.935 27.92 17.968 27.877 18L21.905 5.304Z" transform="translate(-1 -4) scale(0.9)"/>
                            </svg>
                            <span className="text-xs">Spline</span>
                        </li>
                    </ul>
                </div>
            </motion.div>

            {/* Footer Contact Call */}
            <motion.div variants={item} className="border-t border-white/10 pt-20 pb-10 text-center">
                <h2 className={cn("text-3xl sm:text-4xl md:text-6xl font-bold uppercase mb-6", syne.className)}>
                    Ready to <span className="text-red-600">Collaborate?</span>
                </h2>
                <a href="mailto:someshwark22@gmail.com" className="inline-block border border-white/20 px-6 py-3 md:px-8 md:py-4 font-mono text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Start a Project
                </a>
            </motion.div>
        </motion.section>
    );
}
