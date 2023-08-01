import axios from 'axios';

axios.defaults.baseURL = 'http://185.216.26.155:3000/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');