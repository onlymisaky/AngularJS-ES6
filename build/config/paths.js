const path = require('path');

// 根目录
let root = path.resolve(__dirname, '../..');

module.exports = {
    dist: path.resolve(root, 'dist'),       // 打包后文件放置目录
    src: path.resolve(root, 'src'),         // 源代码目录
    static: path.resolve(root, 'static')    // 静态文件目录
};
