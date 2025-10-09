/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base-100': '#1D232A', // Fundo principal mais escuro
        'base-200': '#2A323C', // Fundo de cards e elementos secundários
        'base-300': '#4A5568', // Bordas e divisórias
        'primary': '#66CC8A',   // Cor de destaque principal (verde claro)
        'primary-focus': '#4C9966', // Cor para hover em botões primários
        'secondary': '#374151', // Cor para botões e elementos secundários
        'accent': '#38BDF8',    // Uma cor de acento opcional (azul claro)
        'text-base': '#A6ADBB',  // Cor do texto principal
        'text-heading': '#FFFFFF', // Cor para títulos
        'success': '#36D399',
        'error': '#F87272',
      },
    },
  },
  plugins: [],
}