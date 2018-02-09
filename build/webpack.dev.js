const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const paths = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist')
}


const output = {
    path: paths.dist,
    filename: '[name].[hash].js'
};

const devServer = {
    contentBase: paths.dist,
    port: '8090',
    inline: true,
    historyApiFallback: true
};

module.exports = merge(common, {
    output,
    devtool: 'eval-source-map',
    devServer,
    watch: true
});
