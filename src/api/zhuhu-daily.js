import http from './../utils/http';

export function getList(request) {
    return http.get('/4/news/latest', { params: request }).then(response => {
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('server error');
        }
    });
}
