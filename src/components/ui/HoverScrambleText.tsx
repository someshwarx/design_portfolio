"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HoverScrambleTextProps {
    text: string;
    className?: string;
    duration?: number;
    speed?: number;
}

export default function HoverScrambleText({
    text,
    className,
    duration = 0.6,
    speed = 40,
}: HoverScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isScrambling) {
            let frame = 0;
            const totalFrames = duration * 1000 / speed;

            interval = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;

                if (progress >= 1) {
                    setDisplayText(text);
                    setIsScrambling(false);
                    clearInterval(interval);
                    return;
                }

                const scrambled = text.split("").map((char, index) => {
                    if (char === " ") return " ";
                    // Reveal characters progressively from left to right
                    if (index / text.length < progress) {
                        return char;
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("");

                setDisplayText(scrambled);
            }, speed);
        } else {
            setDisplayText(text);
        }

        return () => clearInterval(interval);
    }, [isScrambling, text, duration, speed]);

    return (
        <span
            className={cn("inline-block cursor-default hover:opacity-80 transition-opacity", className)}
            onMouseEnter={() => setIsScrambling(true)}
        >
            {displayText}
        </span>
    );
}
