import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#007546',
        secondaryColor: '#00D480',
        inputLabelolor: '#D9D9D9',
        bgColor: '#ffffff',
        textColor: '#002718',
        primaryButtonColor: '#00AD1d',
        secondaryButtonColor: '#FF8000',
        primaryButtonHoverColor: '#006B12',
        secondaryButtonHoverColor: '#834100',
        cartBg: '#EFEFEF',
        bgRed: '#DC2626'
    },
  },
},
plugins: [],
} satisfies Config;
