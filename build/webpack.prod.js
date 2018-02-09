
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require('./webpack.common');

const paths = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist')
}


const output = {
    path: paths.dist,
    filename: '[name].[chunkhash].js'
};

module.exports = merge(common, {
    output,
    plugins: [
        // new CleanWebpackPlugin(path.resolve(__dirname, '../dist')),
        new HtmlWebpackPlugin({
            template: paths.src + '/index.html',
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin(
            { names: ["vendor"] }
        ),
        new ExtractTextPlugin("[name].[contenthash].css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        })
    ]
});
