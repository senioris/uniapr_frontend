const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')

const CURRENT_WORKING_DIR = process.cwd()

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

const config = {
  mode: "development",
  entry: {
    app: [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/dev-server",
      path.join(CURRENT_WORKING_DIR, "/src/main.tsx"),
    ],
  },
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist/client"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [path.resolve(__dirname, "client"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    htmlWebpackPlugin,
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config
