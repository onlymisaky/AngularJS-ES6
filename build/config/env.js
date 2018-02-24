let env = {
    NODE_ENV: '"production"',
    DOMAIN: '正式环境'
};

// 通过 cross-env 指定 node 环境变量
switch (process.env.APP_ENV) {
    case 'prod':
        DOMAIN = '正式环境';
        break;
    case 'dev':
        DOMAIN = '开发环境';
        break;
    default:
        DOMAIN = '未知环境';
        break;
}

module.exports = {
    DOMAIN
}
