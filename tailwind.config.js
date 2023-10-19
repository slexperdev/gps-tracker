const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "340px",
        md: "640px",
        lg: "976px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
});
