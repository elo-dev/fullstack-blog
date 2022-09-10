const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

let mode = 'development'

if (process.env.NODE_ENV === 'production') {
  mode === 'production'
}

module.exports = {
  entry: './src/index.tsx',
  mode,

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },

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
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path]_[name]_[local]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({ template: './public/index.html' }),
  ],

  devtool: 'source-map',
}
