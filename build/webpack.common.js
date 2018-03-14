const webpack = require('webpack');
const path = require('path');

const rules = require('./rules');
const paths = require('./config/paths');
const env = require('./config/env');

// 入口文件
const entry = {
    /**
     * 确实可以在此处指定第三方依赖
     * 然后在 plugins 里面 通过   new webpack.optimize.CommonsChunkPlugin({ names: 'vendor' }),
     * 将第三方依赖分离出来，也许起初我们可以确定用到了 angular, @uirouter/angularjs 两个依赖
     * 但是很难保证后续不会再引入其它的第三方库，比如我就用到了 axios 
     * 这就意味着我又要在这里添加一行 axios 
     * 既然不能确定所有的依赖，那不如一劳永逸的在 plugins 中配置，
     * 将所有来自 node_modules 都抽出来
     */
    // vendor: [
    //     'angular',
    //     '@uirouter/angularjs',
    // ],
    app: paths.src + '/app.js',
};

module.exports = {
    entry,
    module: {
        rules
    },
    resolve: {
        alias: {
            // 简化路径， @/ 则表示 src/
            '@': path.resolve('src')
        }
    },
    // 插件的顺序会影响打包
    plugins: [
        // 指定环境
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(env),
        })
    ]
};
