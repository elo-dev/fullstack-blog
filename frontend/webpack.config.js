const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

let mode = 'development'

if (process.env.NODE_ENV === 'production') {
  mode === 'production'
}

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  mode: mode,

  devServer: {
    port: 3000,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
  ],

  devtool: 'source-map',
}
