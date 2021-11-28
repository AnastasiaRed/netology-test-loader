// webpack.config.js
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProductionMode = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.min.js',
  },

  mode: isProductionMode ? 'production' : 'development',
  devtool: isProductionMode ? 'source-map' : 'eval-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          }, 'postcss-loader'],
      },
    ],
  },

  plugins: [
    new StylelintPlugin(),
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Loader',
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isProductionMode ? '[name].min.[contenthash].css' : '[name].min.css',
    }),
  ],
};
