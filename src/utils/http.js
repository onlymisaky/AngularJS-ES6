import axios from 'axios';

let baseURL = process.env.DOMAIN;
let prefix = 'api'

const http = axios.create({
    baseURL: baseURL + prefix,
    timeout: 1000
});

export default http;
