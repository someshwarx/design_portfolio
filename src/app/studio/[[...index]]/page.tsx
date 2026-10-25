'use client';

import { useEffect } from 'react';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
    useEffect(() => {
        document.body.setAttribute('data-route-studio', 'true');
        document.documentElement.setAttribute('data-route-studio', 'true');
        return () => {
            document.body.removeAttribute('data-route-studio');
            document.documentElement.removeAttribute('data-route-studio');
        };
    }, []);

    return (
        <div style={{ minHeight: '100vh', width: '100%' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                *, *::before, *::after {
                    cursor: auto !important;
                }
                button, a, [role="button"], [data-ui="Button"], svg, [tabindex] {
                    cursor: pointer !important;
                }
                input, textarea, [contenteditable="true"] {
                    cursor: text !important;
                }
            `}} />
            <NextStudio config={config} />
        </div>
    );
}
