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
