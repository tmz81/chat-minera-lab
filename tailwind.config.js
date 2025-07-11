// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garanta que esta linha inclui seus arquivos React
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Adicione a fonte Inter aqui se desejar
      },
    },
  },
  plugins: [],
};
