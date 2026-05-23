'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/Footer';

export default function FooterWrapper() {
    const pathname = usePathname();

    // Add any routes here where the footer should be hidden
    const hiddenRoutes = ['/about', '/lab'];
    if (hiddenRoutes.includes(pathname)) {
        return null;
    }

    return <Footer />;
}
