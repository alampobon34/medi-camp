const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   'primary': '#62445d',
      //   'bg-color': '#fbf2ff'
      // }
    },
  },
  plugins: [],
});



