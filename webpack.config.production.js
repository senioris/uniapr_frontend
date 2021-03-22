const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyFilePlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const CURRENT_WORKING_DIR = process.cwd()

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
})

const config = {
  mode: 'production',
  entry: [path.join(CURRENT_WORKING_DIR, '/src/main.tsx')],
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/client'),
    filename: 'bundle.js',
    publicPath: '/public/client/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    htmlWebpackPlugin,
    new CopyFilePlugin(
      {
        patterns: [
          {
            context: 'src/assets',
            from: '**/*.ico',
            to: path.resolve(__dirname, 'dist/client/'),
          },
        ],
      },
      { copyUnmodified: true }
    ),
    new Dotenv(),
  ],
}

module.exports = config
