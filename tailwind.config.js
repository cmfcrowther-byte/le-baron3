/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#D4AF37',
                paper: '#F2F0E9',
                charcoal: '#1A1A1A',
                stone: '#877b64',
                'stone-light': '#d1cfc7',
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

