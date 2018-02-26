// 总感觉这里的代码怪怪的

const isProduction = process.env.APP_ENV === 'production';

module.exports = isProduction
    ? require('./prod')
    : require('./dev');
