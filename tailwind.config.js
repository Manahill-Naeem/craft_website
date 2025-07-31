// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFF8F8', // Lightest pink/off-white
        text: '#4B2B4F',     // Dark purple
        primary: {
          50: '#FDF2F8',      // Very light pink for gradients
          100: '#FAE6F0',     // Lighter pink
          200: '#F5CCDD',     // Light pink
          300: '#F0B3CB',     // Medium light pink
          400: '#EB99B8',     // Medium pink
          500: '#E680A6',     // Default pink
          600: '#D16A91',     // Darker pink
          700: '#BC547C',     // Even darker pink
          800: '#A73E67',     // Darkest pink
          900: '#922852',     // Deepest pink
        },
        secondary: {
          50: '#F8F8FD',      // Very light blue/purple
          100: '#F0F0FA',     // Lighter blue/purple
          200: '#D9D9F5',     // Light blue/purple
          300: '#C2C2F0',     // Medium light blue/purple
          400: '#ACACEB',     // Medium blue/purple
          500: '#9595E6',     // Default blue/purple
          600: '#7E7ED1',     // Darker blue/purple
          700: '#6767BC',     // Even darker blue/purple
          800: '#5050A7',     // Darkest blue/purple
          900: '#393992',     // Deepest blue/purple
        },
        gold: '#FFD700',      // Gold for accents
        blush: '#FFC0CB',     // Light pink/blush
        accent: {
          100: '#FFF0F5',      // Lightest accent (e.g., for crystal highlights)
          200: '#FFE4E1',      // Slightly darker accent (e.g., for pearl highlights)
        },
        // NEW: Green colors for Azadi Sale theme
        green: { // Aap yahan default Tailwind green shades use kar sakte hain ya custom values
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A', // <-- bg-green-600 ke liye
          700: '#15803D',
          800: '#166534', // <-- text-green-800 ke liye
          900: '#14532D',
        },
        // NEW: White color (agar pehle se define nahi kiya)
        white: '#FFFFFF', // Yaqeen karein ke white bhi define ho agar use ho raha hai
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.9 },
        },
        'fade-in-down': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
