/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#11385E', // Dark Blue (Primary)
        'medium': '#2B5E8C', // Medium Blue (Middle Shade)
        'accent': '#5491C3', // Light Blue (Accent)
        'peach': '#2B5E8C', // Medium Blue (Middle Shade) - legacy name
        'sky-blue': '#5491C3', // Light Blue (Accent) - legacy name
        'mint': '#5491C3', // Light Blue (Accent) - legacy name
        'slate': '#11385E', // Dark Blue (Primary) - legacy name
        'text-primary': '#11385E', // Dark Blue (Primary)
        'text-secondary': '#64748B',
        'background': '#FFFFFF',
        'surface': '#F8F9FA',
        // Blue scale mapped to new palette
        'blue': {
          50: '#E8F0F7', // Very light tint of accent
          100: '#D1E1EF', // Light tint of accent
          200: '#A3C3DF', // Lighter version of accent
          300: '#75A5CF', // Light accent
          400: '#5491C3', // Accent color
          500: '#2B5E8C', // Medium Blue
          600: '#2B5E8C', // Medium Blue
          700: '#1a4a73', // Darker medium
          800: '#11385E', // Primary
          900: '#0d2a4a', // Darker primary
        },
      },
    },
  },
  plugins: [],
}
