import axios from 'axios';

const api = axios.create({
    baseURL: 'http://www.apibox.gochoose.xyz'
});

export default api;