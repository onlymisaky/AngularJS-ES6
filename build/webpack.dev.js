process.env._MODE = 'development';

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const portfinder = require('portfinder');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpackCommonConfig = require('./webpack.common');
const environments = require('../environments/development');
const { getNpmargv } = require('./utils');

const webpackDevConfig = merge(webpackCommonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        ...environments,
        ...{ NODE_ENV: 'development' },
      }),
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    inline: true,
    historyApiFallback: true,
    open: true,
    contentBase: path.join(__dirname, './../public'),
    quiet: true,
    before(app) {
    },
    proxy: {
      '/api': {
        target: 'https://daily.zhihu.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = getNpmargv('port') || 8080;
  portfinder.getPort((err, port) => {
    if (err) {
      return reject(err);
    }
    webpackDevConfig.devServer.port = port;
    webpackDevConfig.plugins.push(
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://localhost:${port}`],
        },
      }),
    );
    return resolve(webpackDevConfig);
  });
});
