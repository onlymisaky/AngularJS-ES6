const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');
const paths = require('./config/paths');

// 出口
const output = {
    path: paths.dist,
    filename: 'js/[name].[chunkhash].js'
};

module.exports = merge(common, {
    output,
    plugins: [
        // 提取公共模块
        // https://zhuanlan.zhihu.com/p/32361759 
        new webpack.HashedModuleIdsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'common'] }),
        new webpack.optimize.CommonsChunkPlugin({ names: 'vendor' }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', chunks: ['vendor'] }),

        // 提取css
        new ExtractTextPlugin({ filename: 'css/[name].[contenthash].css', }),

        // 将打包好的文件注入到 html 中
        new HtmlWebpackPlugin({
            template: paths.src + '/index.html',
            inject: 'body'
        }),

        // // 压缩代码
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false },
        //     output: { comments: false, }
        // })
    ]
});
