import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router";
import './axios.js';
const pinia = createPinia()

createApp(App).use(pinia,router, VueSweetalert2 ).mount('#app')
