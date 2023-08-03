import axios from 'axios';
let port = process.env.PORT | 3000;
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? `http://localhost:${port}/` : `http://185.216.26.155:${port}/`;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('englinex-token');