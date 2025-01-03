import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|modal|ripple|spinner).js",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'b-primary': '#F9FAFB',
        'on-primary': '#00adef',
        'b-secondary': '#FFFEFA',
        'on-secondary': '#FE914C',
        'surface': '#f5f6fa',
        'on-surface': '#494949',
        'highlight': '#EBF5FF',
        'outline': '#C5C6C9',
        'outline-focus': '#295782',
        'error': '#D32F2F',
        'b-success': '#388E3C',
        'b-warning': '#F57C00',
        'button-si': '#00FF84',
        'categories': '#D3E6F9',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'xsm': '427px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    nextui()
  ],
  darkMode: "class",
};
export default config;
