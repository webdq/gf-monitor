const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const resolve = (src) => path.resolve(__dirname, src);

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: resolve("dist"),
    filename: "monitor.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "head",
    }),
  ],
  devServer: {
    contentBase: resolve("dist"),
  },
};
