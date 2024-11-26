import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|modal|ripple|spinner).js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F9FAFB',
        'on-primary': '#00adef',
        'secondary': '#FFFEFA',
        'on-secondary': '#FE914C',
        'surface': '#f5f6fa',
        'on-surface': '#494949',
        'highlight': '#EBF5FF',
        'outline': '#C5C6C9',
        'outline-focus': '#295782',
        'error': '#D32F2F',
        'success': '#388E3C',
        'warning': '#F57C00',
        'button-si': '#00FF84',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    nextui()
  ],
};
export default config;
