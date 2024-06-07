const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Fonts are being loaded on `src/pages/_document.tsx`, so if you want to
      // change the font, you need to change the url there and name here.
      fontFamily: {
        sans: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-roboto-mono)', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        header1: ['45px', '53.7px'],
        header2: ['17px', '22px'],
        button: ['14px', '16.71px'],
        body1: ['24px', '28.64px'],
        body2: ['14px', '16.71px'],
        body2B: ['17px', '22px'],
        bottomBar: ['10px', '12px'],
        calendarDays: ['12px', '22px'],
        calendarNumbers: ['16px', '22px'],
      },
      colors: {
        'telegram-white': 'var(--telegram-bg-color)',
        'telegram-black': 'var(--telegram-text-color)',
        'telegram-hint': 'var(--telegram-hint-color)',
        'telegram-link': 'var(--telegram-link-color)',
        'telegram-primary': 'var(--telegram-button-color)',
        'telegram-primary-text': 'var(--telegram-button-text-color)',
        'telegram-secondary-white': 'var(--telegram-secondary-bg-color)',
        'bright-blue': '#007AFF',
        'bright-orange': '#F77047',
        'orange-light': '#FFD3C6',
        'blue-light': '#D7F0FF',
        'violet-light': '#E494BF',
        'violet-dark': '#A64078',
        'deep-light': '#15C0E5',
        'deep-dark': '#03748D',
        'text-dark': '#0C2F55',
      },
    },
  },
  plugins: [],
};
