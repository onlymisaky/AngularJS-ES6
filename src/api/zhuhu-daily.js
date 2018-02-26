import http from './../utils/http';

export function getList(requet) {
    return http.get('/4/news/latest', { params: requet });
}

