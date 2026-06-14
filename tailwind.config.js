/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Jumia-inspired colors
        primary: '#F68B1E', // Jumia orange
        primaryDark: '#E07A0E', // Darker orange for hover
        secondary: '#F5F5F5', // Light background
        dark: '#1A1A1A', // Almost black for text
        darkGray: '#4A4A4A', // Secondary text
        lightGray: '#E0E0E0', // Borders
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
