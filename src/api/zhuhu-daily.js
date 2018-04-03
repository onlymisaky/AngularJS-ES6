import http from '@/utils/http';

export function getList(request) {
    return http.get('/4/news/latest', { params: request }).then(response => {
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('server error');
        }
    }).catch(err => {
        // 由于知乎日报的接口不支持跨域，所以打包到线上如果不接转发，肯定会报错
        // 为了演示，所有在此处mock数据
        // 本地环境不会出现这样的问题
        return require('./../mock/db.json');
    });
}
