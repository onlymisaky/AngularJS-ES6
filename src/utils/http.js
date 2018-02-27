import axios from 'axios';

import { isProduction } from './index';

let baseURL = isProduction() ? process.env.DOMAIN : '';
let prefix = 'api'

const http = axios.create({
    baseURL: baseURL + prefix,
    timeout: 1000
});

export default http;
