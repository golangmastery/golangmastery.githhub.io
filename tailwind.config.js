/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f6f8fa',
          100: '#eaeef2',
          200: '#d0d7de',
          300: '#afb8c1',
          400: '#8c959f',
          500: '#6e7781',
          600: '#57606a',
          700: '#424a53',
          800: '#32383f',
          900: '#24292f',
          950: '#0d1117',
        },
        blue: {
          50: '#f1f8ff',
          100: '#dbedff',
          200: '#c0ddff', 
          300: '#96cbff',
          400: '#6cb6ff',
          500: '#0969da',
          600: '#0550ae',
          700: '#033d8a',
          800: '#0a3069',
          900: '#002155',
        },
        green: {
          50: '#f0fff4',
          100: '#dcffe4',
          200: '#bef5cb',
          300: '#85e89d',
          400: '#34d058',
          500: '#28a745',
          600: '#22863a',
          700: '#176f2c',
          800: '#165c26',
          900: '#144620',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'scale': 'scale 0.3s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: '#0969da',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            code: {
              color: '#24292f',
              backgroundColor: '#f6f8fa',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    // Make typography plugin optional to avoid build errors
    ...process.env.NODE_ENV === 'production' 
      ? [] 
      : [require('@tailwindcss/typography')].filter(plugin => {
          try {
            return !!plugin;
          } catch (e) {
            console.warn('Optional plugin not available:', e.message);
            return false;
          }
        })
  ],
};
