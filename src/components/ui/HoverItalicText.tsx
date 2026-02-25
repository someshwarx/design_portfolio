"use client";

import { cn } from "@/lib/utils";

interface HoverItalicTextProps {
    text: string;
    className?: string;
}

export default function HoverItalicText({ text, className }: HoverItalicTextProps) {
    return (
        <span
            className={cn(
                "inline-block transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-skew-x-12 hover:tracking-wide cursor-default hover:text-outline-bold",
                className
            )}
        >
            {text}
        </span>
    );
}
