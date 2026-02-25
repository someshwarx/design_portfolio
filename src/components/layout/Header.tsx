import Link from 'next/link';

import { cn } from '@/lib/utils';

export default function Header() {
    return (
        <header
            className={cn(
                "absolute top-0 left-0 w-full z-50 px-6 py-[18px] flex justify-between items-center border-b-[0.5px] border-transparent"
            )}
        >
            {/* Logo */}
            <Link href="/" className="">
                <h1
                    className={cn(
                        "text-xl md:text-2xl font-bold uppercase tracking-tighter hover:opacity-70 transition-opacity font-mono",
                    )}
                >
                    PDOX
                </h1>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-mono">
                <Link href="/works" className="hover:text-red-500 transition-colors">Index</Link>
                <Link href="/about" className="hover:text-red-500 transition-colors">About</Link>
                <Link href="mailto:hello@paradox.d" className="hover:text-red-500 transition-colors">Contact</Link>
            </nav>

            {/* Mobile Menu Icon (Placeholder for now) */}
            <button className="md:hidden pointer-events-auto text-sm font-mono uppercase tracking-widest hover:text-red-500">
                Menu
            </button>
        </header>
    );
}
