const webpack = require('webpack');
const styles = require('./style-loader');

/**
 * @type {webpack.RuleSetRule}
 */
const javascript = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/
};

/**
 * @type {webpack.RuleSetRule}
 */
const html = {
  test: /.html$/,
  loader: 'html-loader'
};

/**
 * @type {webpack.RuleSetRule}
 */
const image = {
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000, // 10KB 以下使用 base64
    name: 'images/[name].[hash:7].[ext]'
  }
};

/**
 * @type {webpack.RuleSetRule}
 */
const font = {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: 'fonts/[name].[hash:7].[ext]'
  }
};

/**
 * @type {webpack.RuleSetRule}
 */
const medias = {
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: 'media/[name].[hash:7].[ext]'
  }
};

/**
 * @type {Array<webpack.RuleSetRule>}
 */
let rules = [
  javascript,
  html,
  image,
  font,
  medias,
  /** add your loaders below */
].concat(styles);

module.exports = rules;
