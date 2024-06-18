const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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

        'font-blue-primary': 'var(--font-blue-primary)',
        'font-blue-secondary': 'var(--font-blue-secondary)',
        'font-pink-primary': 'var(--font-pink-primary)',
        'font-pink-secondary': 'var(--font-pink-secondary)',
        'font-purple-primary': 'var(--font-purple-primary)',
        'font-purple-secondary': 'var(--font-purple-secondary)',
        'font-orange-primary': 'var(--font-orange-primary)',
        'font-orange-secondary': 'var(--font-orange-secondary)',
        'font-dark-primary': 'var(--font-dark-primary)',
        'font-dark-secondary': 'var(--font-dark-secondary)',

        'bright-blue': '#007AFF',
        'bright-orange': '#F77047',
        'orange-light': '#FFD3C6',
        'blue-light': '#D7F0FF',
        'sunny-dark': '#F67619',
        'violet-light': '#E494BF',
        'violet-dark': '#A64078',
        'deep-light': '#15C0E5',
        'deep-dark': '#03748D',
        'text-dark': '#0C2F55',
        green1: '#24A763',
        green2: '#51C88A',
        'text-green': '#44BF7F',
      },

      // todo: inspect if it's needed
      backgroundImage: {
        'gradient-blue': 'var(--gradient-blue)',
        'gradient-pink': 'var(--gradient-pink)',
        'gradient-purple': 'var(--gradient-purple)',
        'gradient-orange': 'var(--gradient-orange)',
        'card-gradient-blue': 'var(--card-gradient-blue)',
        'card-gradient-pink': 'var(--card-gradient-pink)',
        'card-gradient-purple': 'var(--card-gradient-purple)',
        'card-gradient-orange': 'var(--card-gradient-orange)',
        'card-gradient-green': 'var(--card-gradient-green)',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-card-gradient-blue',
    'bg-card-gradient-pink',
    'bg-card-gradient-purple',
    'bg-card-gradient-orange',
    'bg-card-gradient-green',
  ],
};
