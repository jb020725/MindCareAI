/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        mindcareBlue: "#2563eb",
        stressRelief: "#38bdf8",
        motivator: "#facc15",
        calm: "#a78bfa",
      },
      boxShadow: {
        soft: "0 4px 14px rgba(0, 0, 0, 0.1)",
        deep: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      animation: {
        fadeIn: "fade-in 0.6s ease-out",
        bounceIn: "bounce-in 0.6s ease-out"
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0px)" }
        },
        'bounce-in': {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '60%': { opacity: 1, transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}
