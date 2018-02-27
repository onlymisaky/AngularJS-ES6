/** 
 * @name 判断是否为生产环境
 * @return {Boolean} 
*/
export function isProduction() {
    return process.env.NODE_ENV === 'production';
}
