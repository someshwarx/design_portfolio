'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AvailabilityBadgeProps {
    available?: boolean;
    message?: string;
}

export default function AvailabilityBadge({
    available = true,
    message,
}: AvailabilityBadgeProps) {
    const defaultMessage = available
        ? '// AVAILABLE FOR PROJECTS //'
        : '// CURRENTLY BOOKED //';

    return (
        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            <motion.span
                className={`w-2 h-2 rounded-full ${
                    available ? 'bg-green-500' : 'bg-red-600'
                }`}
                animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 0.85, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <span className="hover:text-white transition-colors">
                {message || defaultMessage}
            </span>
        </div>
    );
}
