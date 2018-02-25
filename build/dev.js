const express = require('express');
const webpack = require('webpack');
const opn = require('opn');

const webpackConfig = require('./webpack.dev');
const paths = require('./config/paths');

const app = express();
const compiler = webpack(webpackConfig);

// https://www.jianshu.com/p/469ad98ad1da
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    stats: {
        colors: true,
    },
    publicPath: '/',
    quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => { },
    heartbeat: 2000
});

// 静态资源
app.use('/static', express.static(paths.static));

// 支持 HTML5 history 
app.use(require('connect-history-api-fallback')());

// 热更新,基于内存
app.use(devMiddleware);

// 热加载
app.use(hotMiddleware);

// 自动打开浏览器
devMiddleware.waitUntilValid(stats => {
    opn('http://localhost:' + 3000);
});

// 监听端口
app.listen(3000);
