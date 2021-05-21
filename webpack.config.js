// https://webpack.js.org/guides/typescript/
var nodeExternals = require("webpack-node-externals");
var glob = require("glob");
const path = require("path");

module.exports = [
  {
    entry:
      // every ts file in the apps dir
      // TODO: webpack needs to be restarted when adding new files
      glob.sync("apps/*.js").reduce((p, c) => {
        p[path.basename(c).split(".")[0]] = "./" + c;
        return p;
      }, {}),
    mode: "development",
    resolve: {
      extensions: [".js"],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "public/dist"),
    },
  },
];
