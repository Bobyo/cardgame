const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

const esLintOptions = {
  extensions: [`js`, `jsx`, `ts`],
  exclude: [`node_modules`],
};

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/dist',
    filename: "bundle.js",
  },
  plugins: [new ESLintPlugin(esLintOptions)],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  devServer: {
    static: {
        directory: path.resolve(__dirname),
    },
    compress: true,
    port: 9000,
  },
};
