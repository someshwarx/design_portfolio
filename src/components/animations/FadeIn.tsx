'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface FadeInProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    className?: string
}

export default function FadeIn({ children, delay = 0, duration = 1, className = '', id }: FadeInProps & { id?: string }) {
    const comp = useRef(null)

    useGSAP(() => {
        // Only animate on mount for simplicity
        gsap.from(comp.current, {
            y: 50,
            opacity: 0,
            duration: duration,
            delay: delay,
            ease: 'power3.out',
        })
    }, { scope: comp })

    return (
        <div ref={comp} className={className} id={id}>
            {children}
        </div>
    )
}
