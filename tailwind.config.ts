/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/(root)/**/*.{js,ts,jsx,tsx,mdx}',
    './app/(root)/components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      keyframes: {
        fadeInOutFloat: {
          '0%, 100%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0.4', transform: 'translateY(10px)' },
        },
        justFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        easeInOnly: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(3px)' },
        },
      },
      animation: {
        fadeInOutFloat: 'fadeInOutFloat 3s ease-in-out infinite',
        justFloat: 'justFloat 3s ease-in-out infinite',
        easeInOnly: 'easeInOnly 0.8s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'menu-shadow': '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
        'search-shadow': '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
        'chat-form-shadow': '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
        'login-modal-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.6)',
        'signup-modal-shadow': '2px 4px 8px 0px rgba(0, 0, 0, 0.25)',
        'option-modal-shadow': '2px 2px 4px 0px rgba(0, 0, 0, 0.25)',
        'option-slice-shadow': '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      fontSize: {
        '10xl': [
          '10rem',
          {
            lineHeight: '1',
          },
        ],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
      },
    },
    colors: {
      // Original
      white: '#FFFFFF',
      black: '#000000',

      // Theme
      themeDark: '#121212',

      // Text
      textBlack: '#141217',
      textDarkPurple: '#756982',
      textLightYellow: '#F9F3E7',
      textKakao: '#191919',
      textGoogle: '#1F1F1F',

      // Social bg
      kakaoYellow: '#FEE500',
      naverGreen: '#03C75A',
      googleGray: '#F2F2F5',

      // Gray 1
      lightGray: '#F2F2F5',
      inputLightGray: '#F2F2F5',
      menuLightGray: '#F2F2F5',
      buttonLightGray: '#F2F2F5',

      // Gray 2
      hashTagGray: '#F2F0F5',

      // Gray 3
      darkGray: '#E0DEE3',
      buttonDarkGray: '#E0DEE3',
      navBotSolidGray: '#E0DEE3',

      // Gray 4
      navMenuBotSolidGray: '#E5E8EB',

      // Gray 5
      addFolderGray: '#D9D9D9',

      // Gray 6
      postInputGray: '#E0DBE5',

      // Gray 7 
      darkModeGray: `#7D7D7D`,

      // Purple 1
      purple: '#B98CE0',
      mainPurple: '#B98CE0',
      commentPurple: '#EBE4F2',

      // Purple 2
      darkPurple: '#756982',

      // Red
      red: '#FF007A',

      // Orange
      orange: '#FFAC30',
      searchOrange: '#FFAC30',

      // Yellow
      lightYellow: '#F9F3E7',

      // Transparent
      transparent: 'rgba(0, 0, 0, 0)',

      // Modal Background Color
      modalBackgroundColor: 'rgba(117, 105, 130, 0.4)',
      profileImageChangeModalBackgroundColor: 'rgba(255, 255, 255, 0.9)',
      loginSuggestModal: 'rgba(185, 140, 224, 0.9)',
      chatChooseButton: 'rgba(185, 140, 224, 0.2)',
      loginModal: 'rgba(255, 255, 255, 0.25)',
      noArchiveColor: 'rgba(117, 105, 130, 0.6)',
      moreArchiveColor: 'rgba(0, 0, 0, 0.4)',
      archiveCountInfo: 'rgba(117, 105, 130, 1)',
    },
    screens: {
      xs: { max: '640px' },
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '2650px',
    },
    fontFamily: {
      PattuaOne: ['Pattua One'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

export default config;
