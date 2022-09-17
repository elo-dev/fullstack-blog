const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')

let mode = 'development'

if (process.env.NODE_ENV === 'production') {
  mode === 'production'
}

module.exports = {
  entry: './src/index.tsx',
  mode,

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name][contenthash].js',
    publicPath: '/',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
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
    new HTMLWebpackPlugin({
      title: 'webpack Boilerplate',
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
    }),
    new ReactRefreshPlugin(),
    new EnvironmentPlugin({
      REACT_APP_API_URL: 'https://blog-mern-frolov.herokuapp.com',
    }),
  ],

  devtool: 'source-map',
}
