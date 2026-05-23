'use client';

import { useEffect } from 'react';

export default function ConsoleMessage() {
    useEffect(() => {
        const styles = [
            'color: #dc2626',
            'font-size: 14px',
            'font-weight: bold',
            'font-family: monospace',
            'padding: 8px 0',
        ].join(';');

        const subtleStyles = [
            'color: #737373',
            'font-size: 11px',
            'font-family: monospace',
            'padding: 4px 0',
        ].join(';');

        const linkStyles = [
            'color: #f0f0f0',
            'font-size: 12px',
            'font-family: monospace',
            'padding: 4px 0',
            'text-decoration: underline',
        ].join(';');

        console.log(
            `%c
██████╗  ██████╗  ██████╗ ██╗  ██╗
██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝
██████╔╝██║  ██║██║   ██║ ╚███╔╝ 
██╔═══╝ ██║  ██║██║   ██║ ██╔██╗ 
██║     ██████╔╝╚██████╔╝██╔╝ ██╗
╚═╝     ╚═════╝  ╚═════╝ ╚═╝  ╚═╝`,
            'color: #dc2626; font-family: monospace; font-size: 10px;'
        );

        console.log(
            '%c// PARADOX DESIGN STUDIO //',
            styles
        );

        console.log(
            "%cHey, you're inspecting? I like that.\nCuriosity is a sign of good taste.",
            subtleStyles
        );

        console.log(
            '%cLet\'s build something → someshwark22@gmail.com',
            linkStyles
        );

        console.log(
            '%c─────────────────────────────────────────',
            'color: #262626; font-family: monospace;'
        );
    }, []);

    return null;
}
