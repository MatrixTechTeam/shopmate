/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // add this line
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F68B1E',
        primaryDark: '#E07A0E',
        secondary: '#F5F5F5',
        dark: '#1A1A1A',
        darkGray: '#4A4A4A',
        lightGray: '#E0E0E0',
        cardBg: '#FFFFFF',
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FFC107',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 4px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
        hover: '0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
