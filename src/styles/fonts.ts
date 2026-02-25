import { Outfit, Syne, Space_Grotesk } from 'next/font/google';

export const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
});

export const syne = Syne({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-syne',
    weight: ['400', '700', '800'],
});

export const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-space',
});
