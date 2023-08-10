import { defineStore } from "pinia/dist/pinia";
import axios from 'axios';


// use this keyword to access state data
export const useAuthStore = defineStore('authStore', {
    state: () => ({
        authUser: null,
        token: {
            value: '',
            isExpired: false
        }
    }),
    getters:{
        // get user registere courses
        // get user schedules
        // get user subscription
    },
    actions:{
        async login(user){
            try {
                let response = await axios.post('login', user)
                this.authUser = response.data.message.user
                this.token.value = response.data.message.token
                localStorage.setItem('englinex-token', response.data.message.token);
                localStorage.setItem('englinex-authstore', JSON.stringify(this));
                return {success:true, message:'User connected successfully'}
            } catch (e) {
                localStorage.removeItem('englinex-token');
                localStorage.removeItem('englinex-authstore');
                if(e.response != undefined) return {success:false, message:e.response.data.errorMessage}
                return {success:false, message:'Could not connect to platform because of ' + e.message}
            }
        },
        async signup(user){
            try {
                let response = await axios.post('signup', user)
                this.authUser = response.data.message.user
                this.token.value = response.data.message.token
                localStorage.setItem('englinex-token', response.data.message.token);
                localStorage.setItem('englinex-authstore', JSON.stringify(this));
                return {success:true, message:'User signed & connected successfully'}
            } catch (e) {
                localStorage.removeItem('englinex-token');
                localStorage.removeItem('englinex-authstore');
                if(e.response != undefined) return {success:false, message:e.response.data.errorMessage}
                return {success:false, message:'Could not connect to platform because of ' + e.message}
            }
        },
        loadUserFromLocalStorage(){
            this.authUser = JSON.parse(localStorage.getItem('englinex-authstore')).authUser;
            this.token.value = localStorage.getItem('englinex-token');
        },
        disconnect(){
            this.authUser = null;
            this.token.value = '';
            this.token.isExpired = true;

            localStorage.removeItem('englinex-authstore')
            localStorage.removeItem('englinex-token');
        }
        // regiser or un-register course
        // manage user subscription   
    },
})