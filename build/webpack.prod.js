const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const common = require('./webpack.common');
const paths = require('./paths');

const output = {
    path: paths.dist,
    filename: '[name].[chunkhash].js'
};

module.exports = merge(common, {
    output,
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'common']
        }),
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
