// 通过 cross-env 指定 node 环境变量
// cross-env APP_ENV=dev node xxx.js
switch (process.env.APP_ENV) {
    case 'prod':
        break;
    case 'dev':
        break;
    default:
        break;
}
