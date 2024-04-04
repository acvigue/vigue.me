import type { Config } from 'tailwindcss'

export default {
  content: [
    'pages/**.vue',
    'components/**.vue',
    'layouts/**.vue',
    'plugins/**.ts',
    './formkit.theme.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['larken', 'ui-serif'],
        serif2: ['condor', 'ui-serif'],
        luxury: ['amandine', 'ui-serif'],
      },
      colors: {
        champagne: '#F1E0C5',
        khaki: '#C9B79C',
        carribean: '#16697A',
        licorice: '#1F1300',
        persian: '#BB4430',
      },
    },
  },
  plugins: [],
} satisfies Config
