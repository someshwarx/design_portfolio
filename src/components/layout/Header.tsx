'use client';

import React from 'react';
import Link from 'next/link';
import StaggeredMenu from '@/components/ui/StaggeredMenu';

export default function Header() {
    const menuItems = [
        { label: 'Index', ariaLabel: 'Index', link: '/' },
        { label: 'About', ariaLabel: 'About', link: '/about' },
        { label: 'Case Studies', ariaLabel: 'Case Studies', link: '/works' },
        { label: 'Designs', ariaLabel: 'Designs', link: '/designs' },
        { label: 'The Tap Lab', ariaLabel: 'The Tap Lab', link: '/lab' },
        { label: 'Contact', ariaLabel: 'Contact', link: 'mailto:hello@paradox.d' },
    ];

    const socialItems = [
        { label: 'Instagram', link: 'https://www.instagram.com/paradox.x0/' },
        { label: 'X', link: 'https://x.com/somesh__x1' },
    ];

    const logoNode = (
        <Link href="/" className="z-50 pointer-events-auto">
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-tighter hover:text-red-600 transition-colors font-mono text-white">
                PDOX
            </h1>
        </Link>
    );

    return (
        <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#fff"
            openMenuButtonColor="#fff"
            changeMenuColorOnOpen={true}
            colors={['#1a1a1a', '#0a0a0a', '#050505']}
            logoNode={logoNode}
            accentColor="#dc2626"
            isFixed={true}
            closeOnClickAway={true}
        />
    );
}
