const merge = require('webpack-merge');

const common = require('./webpack.common');
const paths = require('./paths');

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
