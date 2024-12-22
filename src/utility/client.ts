import axios from 'axios';

import {API_BASE_URL} from './constant';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default client;
