/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                game: {
                    dark: '#121212',
                    card: '#1e1e1e',
                    accent: '#00ffeb', // Neon Cyan
                    secondary: '#ff00ff', // Neon Magenta
                    text: '#e0e0e0'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
        },
    },
    plugins: [],
}
