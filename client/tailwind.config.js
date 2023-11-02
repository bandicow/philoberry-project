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

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};
