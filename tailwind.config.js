/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // LJ brand palette (from laijingchu.com style guide)
        paper: '#FAF6EC',
        ink: '#15131F',
        indigo: '#28289C',
        gold: '#86632C',
        label: '#56566E',
        navy: '#0B0A1F',
        // shadcn token aliases
        border: '#15131F',
        background: '#FAF6EC',
        foreground: '#15131F',
        primary: { DEFAULT: '#28289C', foreground: '#FAF6EC' },
        secondary: { DEFAULT: '#86632C', foreground: '#FAF6EC' },
        muted: { DEFAULT: '#EFE9DC', foreground: '#56566E' },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        grotesk: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        hanken: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
};
