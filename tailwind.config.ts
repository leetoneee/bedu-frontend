import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F9FAFB',
        'OnPrimary': '#00adef',
        'Secondary': '#FFFEFA',
        'OnSecondary': '#FE914C',
        'Surface': '#f5f6fa',
        'OnSurface': '#494949',
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
  plugins: [],
};
export default config;
