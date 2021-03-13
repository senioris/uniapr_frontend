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
  devtool: "source-map",
  entry: {
    app: [
      path.join(CURRENT_WORKING_DIR, "/src/main.tsx"),
    ],
  },
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist/client"),
    filename: "bundle.[chunkhash].js",
    publicPath: "/dist/",
  },
  devServer: {
    contentBase: path.join(CURRENT_WORKING_DIR, "/dist/client"),
    historyApiFallback: true,
    port: 3355,
    inline: true,
    hot: true,
    writeToDisk: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
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
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

module.exports = config
