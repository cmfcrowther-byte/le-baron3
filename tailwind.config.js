/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                // Legacy semantic aliases
                primary: '#D4AF37',
                paper: '#f1f0ea',
                charcoal: '#1A1A1A',
                stone: '#877b64',
                'stone-light': '#d1cfc7',

                // New luxury palette
                'brand-midnight': '#00091d',
                'brand-paper': '#f1f0ea',
                'brand-text': '#1a1a1a',
                'brand-muted': '#999999',
                'brand-detail': '#d1cfc7',
                'brand-accent': '#ff4500',
            },
            fontFamily: {
                display: ['Inter', 'sans-serif'],
                serif: ['Cormorant Garamond', 'serif'],
            },
            borderRadius: {
                DEFAULT: '2px',
                sm: '2px',
                md: '4px',
            },
        },
    },
    plugins: [],
};

