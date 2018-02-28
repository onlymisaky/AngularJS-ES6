const webpack = require('webpack');

const rules = require('./rules');
const paths = require('./config/paths');
const env = require('./config/env');

// 入口文件
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
    // 插件的顺序会影响打包
    plugins: [
        // 指定环境
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(env),
        })
    ]
};
