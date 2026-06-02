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
        <div className="inline-flex items-center gap-3 text-micro text-neutral-400 bg-[#0A0A0A]/50 px-6 py-3 rounded-full border border-white/[0.04] backdrop-blur-md hover:bg-white/[0.03] hover:text-white transition-all duration-700 cursor-default">
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
