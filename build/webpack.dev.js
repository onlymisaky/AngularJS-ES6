process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackCommonConfig = require('./webpack.common');
const environments = require('./../environments/development');

module.exports = merge(webpackCommonConfig, {
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(environments),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    hot: true,
    port: 8080,
    historyApiFallback: true,
    open: true,
    inline: true,
    contentBase: path.resolve('static'),
    before(app) {
    },
    proxy: {
      '/api': {
        target: 'http://news-at.zhihu.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
    }
  }
});
