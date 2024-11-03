import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|modal|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F9FAFB',
        'OnPrimary': '#00adef',
        'Secondary': '#FFFEFA',
        'OnSecondary': '#FE914C',
        'Surface': '#f5f6fa',
        'OnSurface': '#0071F9',
        'Highlight': '#EBF5FF',
        'Outline': '#C5C6C9',
        'OutlineFocus': '#295782',
        'Error': '#D32F2F',
        'Success': '#388E3C',
        'Warning': '#F57C00',
        'ButtonSI': '#00FF84',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
