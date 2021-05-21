const path = require("path");

module.exports = [
  {
    entry: "./app.js",
    mode: "development",
    resolve: {
      extensions: [".js"],
    },
    output: {
      filename: "app.js",
      path: path.resolve(__dirname, "public/dist"),
    },
  },
];
