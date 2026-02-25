import { useState, useEffect, useRef } from 'react';

export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 0) {
                setScrollDirection('up');
                lastScrollY.current = 0;
                return;
            }

            if (currentScrollY > lastScrollY.current) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollDirection;
}
