'use client';

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';

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
            className="relative z-10 pt-36 md:pt-48 px-page max-w-7xl mx-auto flex flex-col gap-xl md:gap-xxl pb-xxl"
        >
            {/* Intro / Hero of About */}
            <motion.div variants={item} className="flex flex-col gap-md">
                <h1 className={cn("text-h1 text-[#F0F0F0] break-words", syne.className)}>
                    Architect<br /> of Digital<br /> <span className="text-red-600">Chaos.</span>
                </h1>
                <div className="text-body-base text-neutral-400 max-w-2xl flex flex-col gap-sm">
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
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-lg border-t border-white/10 pt-lg">
                <div className="flex flex-col gap-sm">
                    <h3 className={cn("text-h3 text-white", syne.className)}>The Philosophy</h3>
                    <div className="text-body-small text-neutral-400 flex flex-col gap-sm">
                        <p>Functionality is essential.</p>
                        <p>
                            My design approach sits where brutalism meets elegance. I focus on clarity, strong typography, purposeful motion, and spatial tension.
                            By stripping away unnecessary elements, I let the core idea speak louder and hit harder.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-sm">
                    <h3 className={cn("text-h3 text-white", syne.className)}>The Approach</h3>
                    <div className="text-body-small text-neutral-400 flex flex-col gap-sm">
                        <p>Design that matters.</p>
                        <p>
                            I break ideas down to their essence and rebuild them into visual systems that communicate with intent.
                            Whether it’s a brand identity or a digital interface, my goal remains the same: create work that feels deliberate, adaptable, and hard to forget.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Skills / Tech Stack */}
            <motion.div variants={item} className="border-t border-white/10 pt-lg">
                <h3 className={cn("text-h3 text-white mb-md", syne.className)}>Design Arsenal</h3>
                <div className="text-body-base text-neutral-400">
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-sm gap-x-md">
                        <li>Figma</li>
                        <li>Blender</li>
                        <li>Adobe Suite</li>
                        <li>Affinity</li>
                        <li>Framer</li>
                        <li>Spline</li>
                    </ul>
                </div>
            </motion.div>

            {/* Footer Contact Call */}
            <motion.div variants={item} className="border-t border-white/10 pt-xxl pb-xl text-center">
                <h2 className={cn("text-h2 text-white mb-md", syne.className)}>
                    Ready to <span className="text-red-600">Collaborate?</span>
                </h2>
                <a href="mailto:someshwark22@gmail.com" className="inline-block border border-white/20 px-md py-sm md:px-lg md:py-md text-micro hover:bg-white hover:text-black transition-all">
                    Start a Project
                </a>
            </motion.div>
        </motion.section>
    );
}
