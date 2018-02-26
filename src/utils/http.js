import axios from 'axios';

let prefix = '/api'

const http = axios.create({
    baseURL: process.env.DOMAIN + prefix,
    timeout: 1000
});

export default http;
