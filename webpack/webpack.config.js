const webpack = require('webpack')
const path = require('path')

const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const inProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: inProduction ? 'production' : 'development',
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'build')
  },

  plugins: [
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6
      }
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),

    new OptimizeCssAssetsPlugin({})
  ],

  module: {
    rules: [{
      test: /\.s?[ac]ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpg|svg|gif)$/,
      use: [
        'file-loader'
      ]
    }]
  },

  devServer: {
    contentBase: './build',
    port: 8080
  }
}