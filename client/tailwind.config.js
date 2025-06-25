module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6000",
        secondary: "#FFE6C7",
        dark: "#090040",
        gray: "#454545",
        light: "#FFFFFF",
        accent: "#FFA559",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
