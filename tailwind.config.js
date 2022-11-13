module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        wagmi: "Satoshi",
      },
      colors: {
        primary: "#ffae33",
      },
      boxShadow: {
        damn: "0 2px 2px rgba(4,4,7,.45),0 8px 24px rgba(4,4,7,.6)",
      },
      dropShadow: {
        soju: "0 0 5px #fff",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--gradient-color-stops))",
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")({
      variantPrefix: "rdx",
    }),
  ],
};
