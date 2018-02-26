const express = require('express');
const webpack = require('webpack');
const opn = require('opn');
const proxyMiddleware = require('http-proxy-middleware');

const webpackConfig = require('./webpack.dev');
const paths = require('./config/paths');

const app = express();

const hotClient = ['webpack-hot-middleware/client?noInfo=true&reload=true'];
Object.keys(webpackConfig.entry).forEach(name => {
    webpackConfig.entry[name] = hotClient.concat(webpackConfig.entry[name]);
});

const compiler = webpack(webpackConfig);

// https://www.npmjs.com/package/http-proxy-middleware
// 配置反向代理
const proxyTable = {
    '/api': {
        target: process.env.DOMAIN,
        changeOrigin: true,
    }
};

Object.keys(proxyTable).forEach(contextOrUri => {
    app.use(proxyMiddleware(contextOrUri, proxyTable[contextOrUri]));
});

// https://www.jianshu.com/p/469ad98ad1da
// https://github.com/glenjamin/webpack-hot-middleware
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
app.listen(3000, () => { });
