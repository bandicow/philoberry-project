/**  @type {import('tailwindcss').Config}  */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        reflect:
          "0 0 1px rgba(0,0,0,0.5), 0 1px 1px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.2)",
      },
      textShadow: {
        default: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      },
      filter: {
        invert: "invert(100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.7s",
        "slide-up": "slide-up 3s forwards",
        shake: "shake 0.3s cubic-bezier(.36,.07,.19,.97) both",
        "shake-modal": "shake-modal 0.3s cubic-bezier(.36,.07,.19,.97) both",
      },
      screens: {
        mobile: "480px",
        mobileLandscape: "640px",
        tablet: "768px",
        tabletLandscape: "1024px",
        desktop: "1024px",
        desktopLarge: "1440px",
      },

      scale: {
        200: "2",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "50%": { transform: "translateY(0)", opacity: "1" },
          "75%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(10px)" },
        },
        "shake-modal": {
          "0%, 100%": { transform: "translateX(0) translate(-50%, -2%)" },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-10px) translate(-50%, -2%)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(10px) translate(-50%, -2%)",
          },
        },
      },
    },
  },
  variants: {
    extend: {
      textShadow: ["responsive", "hover", "focus"],
    },
  },
  plugins: ["@tailwindcss/forms", require("tailwindcss-textshadow")],
};
