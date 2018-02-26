const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const webpackCommon = require('./webpack.common');
const paths = require('./config/paths');

const output = {
    path: paths.dist,
    filename: '[name].[hash].js'
};

module.exports = merge(webpackCommon, {
    output,
    devtool: 'eval-source-map',

    // 放弃使用 webpack-dev-server
    // 改用 express, webpack-dev-middleware, webpack-hot-middleware
    // webpack-dev-server --hot --inline --progress --open --config  build/webpack.dev.js
    // devServer,
    // watch: true,

    plugins: [
        // 热加载
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        // 处理 index.html
        new HtmlWebpackPlugin({
            template: paths.src + '/index.html',
            inject: 'body',
        }),

        new FriendlyErrorsPlugin()
    ]
});
