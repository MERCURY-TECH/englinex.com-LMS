import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router";
import './axios.js';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';


let app = createApp(App);
app.use(VCalendar, {})
app.use(setupCalendar, {})
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
app.use(router);
app.use(createPinia());
app.use(VueSweetalert2);
app.mount('#app')
