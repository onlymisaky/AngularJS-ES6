const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rules = require('./rules');
const paths = require('./paths');

const entry = {
    vendor: [
        'angular',
        '@uirouter/angularjs',
    ],
    app: paths.src + '/app.js',
};


module.exports = {
    entry,
    module: {
        rules
    },
    plugins: [
        // new CleanWebpackPlugin(path.resolve(__dirname, '../dist')),
        new HtmlWebpackPlugin({
            template: paths.src + '/index.html',
            inject: 'body'
        }),
    ]
}
