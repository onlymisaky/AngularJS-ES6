const path = require('path');
const webpack = require('webpack');
const ora = require('ora')
const rimraf = require('rimraf');
const { copySync } = require('fs-extra');

const webpackConfig = require('./webpack.prod');
const paths = require('./config/paths');

const tips = ora('building...');
tips.start();

// 删除 dist 目录
rimraf(paths.dist, err => {
    if (err) throw err;
    // 复制 static 目录到 dist/static 
    copySync(paths.static, path.join(paths.dist, 'static'));
    // webpack --config build/webpack.prod.js
    webpack(webpackConfig, (err, stats) => {
        tips.stop();
        if (err) throw err;
        // 输出打包信息
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        tips.succeed('build complete' + '\n');
    });
});
