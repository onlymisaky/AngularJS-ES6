const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackCommonConfig = require('./webpack.common');
const environments = require('./../environments/production');

module.exports = merge(webpackCommonConfig, {
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  devtool: '#source-map',

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       v: {

  //       }
  //     }
  //   }
  // },

  plugins: [
    // https://zhuanlan.zhihu.com/p/32361759 
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(environments),
    // }),
    new CleanWebpackPlugin(path.resolve('dist'), {
      root: path.resolve('dist'),
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([
      { from: path.resolve('static'), to: path.resolve('dist/static'), }
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin()
  ]
});
