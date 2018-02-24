const webpack = require('webpack');
const ora = require('ora')
const rimraf = require('rimraf');

const webpackConfig = require('./webpack.prod');
const paths = require('./config/paths');

const tips = ora('building...');
tips.start();

rimraf(paths.dist, err => {
    if (err) throw err;
    // webpack --config build/webpack.prod.js
    webpack(webpackConfig, (err, stats) => {
        tips.stop();
        if (err) throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        tips.succeed('build complete');
    });
});

