process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackCommonConfig = require('./webpack.common');
const environments = require('./../environments/production');
const { getNpmargv } = require('./utils');

const webpackProdConfig = merge(webpackCommonConfig, {
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },

  mode: 'production',

  devtool: '#source-map',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        angular: {
          name: `chunk-angular`,
          test: /[\\/]node_modules[\\/]angular[\\/]/,
          priority: 1,
          chunks: 'initial'
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(environments),
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve('public'), to: path.resolve('dist'), }
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin()
  ]
});

const report = getNpmargv('report');
if (report === '' || report === 'true') {
  webpackProdConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackProdConfig;
