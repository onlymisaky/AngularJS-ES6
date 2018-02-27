import http from './../utils/http'; 

export function getList(request) {
    return http.get('/4/news/latest', { params: request });
}
