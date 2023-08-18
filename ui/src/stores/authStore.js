import { defineStore } from "pinia/dist/pinia";
import axios from 'axios';
import { actionWrapper } from "@/helpers";

// use this keyword to access state data
export const useAuthStore = defineStore('authStore', {
    state: () => ({
        authUser: null,
        token: {
            value: '',
            isExpired: false
        },
        subscription: null
    }),
    getters: {
        // get user registere courses
        // get user schedules
        // get user subscription
    },
    actions: {
        async login(user) {
            try {

                let response = await axios.post('login', user)
                this.authUser = response.data.message.user
                this.token.value = response.data.message.token
                this.getUserSubscription()
                localStorage.setItem('englinex-token', response.data.message.token);
                localStorage.setItem('englinex-authUser', JSON.stringify(this.authUser));
                return { success: true, message: 'User connected successfully' }
            } catch (e) {
                localStorage.removeItem('englinex-token');
                localStorage.removeItem('englinex-authUser');
                if (e.response != undefined) return { success: false, message: e.response.data.errorMessage }
                return { success: false, message: 'Could not connect to platform because of ' + e.message }
            }
        },
        async signup(user) {
            try {
                let response = await axios.post('signup', user)
                this.authUser = response.data.message.user
                this.token.value = response.data.message.token
                localStorage.setItem('englinex-token', response.data.message.token);
                localStorage.setItem('englinex-authUser', JSON.stringify(this.authUser));
                return { success: true, message: 'User signed & connected successfully' }
            } catch (e) {
                localStorage.removeItem('englinex-token');
                localStorage.removeItem('englinex-authUser');
                if (e.response != undefined) return { success: false, message: e.response.data.errorMessage }
                return { success: false, message: 'Could not connect to platform because of ' + e.message }
            }
        },
        async loadUserFromLocalStorage() {
            this.authUser = localStorage.getItem('englinex-authUser') ? JSON.parse(localStorage.getItem('englinex-authUser')) : null;
            this.token.value = localStorage.getItem('englinex-token');
            this.getUserSubscription()
        },
        disconnect() {
            this.authUser = null;
            this.token.value = '';
            this.token.isExpired = true;

            localStorage.removeItem('englinex-authUser')
            localStorage.removeItem('englinex-token');
        },
        async getUserSubscription() {
            if (this.authUser) {
                let response = await axios.get(`/subscriptions/student/${this.authUser._id}`)
                this.subscription = response.data.message.subscriptions.length > 0 ? response.data.message.subscriptions : null;
            }
        },
        async registerCourse(courseId) {
            return actionWrapper(async () => {
                let response = await axios.patch(`register/course/${courseId}`);
                if(!this.authUser.registeredCourses) this.authUser.registeredCourses = []
                this.authUser.registeredCourses.push(response.data.message.registeredCourse)
                localStorage.setItem('englinex-authUser', JSON.stringify(this.authUser));
            }, 'New Course registerd with success')

        },
        async unRegisterCourse(courseId) {
            return actionWrapper(async () => {
                await axios.patch(`de-register/course/${courseId}`);
                this.authUser.registeredCourses = this.authUser.registeredCourses.filter((course)=>course._id != courseId)
            }, 'Course un-registered with success')
        }
    },
})
