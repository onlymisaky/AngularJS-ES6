const webpack = require('webpack');
const ora = require('ora');

const webpackProdConfig = require('./webpack.prod');

const tips = ora('building...');
tips.start();

webpack(webpackProdConfig, (err, stats) => {
  tips.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  tips.succeed('build complete' + '\n');
});
