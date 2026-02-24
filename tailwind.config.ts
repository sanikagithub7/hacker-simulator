/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                terminal: {
                    green: '#00FF41',
                    cyan: '#00FFFF',
                    red: '#FF003C',
                    dim: '#003B00',
                    bg: '#000000',
                    card: '#0A0A0A',
                    border: '#1A1A1A',
                },
            },
            fontFamily: {
                mono: ['Share Tech Mono', 'Courier New', 'monospace'],
                display: ['Orbitron', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
