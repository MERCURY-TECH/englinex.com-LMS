<template>
    <div v-if="connectedUser.username" class="card border-0 col-8 p-4" style="background-color: #F7EBFF;">
        <!-- student laft panel -->
        <div class="d-flex align-items-start justify-content-between">
            <div class="d-flex align-items-center">
                <!-- <img src="https://github.com/mdo.png" alt="" width="45" height="45" class="rounded-circle me-2"> -->
                <span class="text-bold">{{ connectedUser.username }}</span>
            </div>
            <div class="">
                <span class="" style="font-size: 15px;">Connected as</span> <br>
                <span class="fw-bold" style="color: #9F1FED; font-size: 15px;">{{ connectedUser.accountType }}</span>
            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-evenly">
            <button  @click="navigateToAccount" class="btn btn-outline-primary">Go to Account</button>
            <button @click="disconnect" class="btn text-white" style="background-color: #9F1FED;">Disconnect</button>
        </div>
    </div>
    <div v-show="!connectedUser.username" class="card col-auto col-12 p-4 py-5" style="background-color: #FCF6FF;">
        <LoginForm v-if="isLogin" />
        <p v-if="isLogin" class="text-muted px-3">
            <small>Forgot your password?<br>
                Don't have an account? <a href="#" @click="toggleAuthForm" class="primary-text fw-bold">Register
                    now.</a>
            </small>
        </p>
        <SignUpForm v-if="!isLogin" />
        <p v-if="!isLogin" class="text-muted px-3">
            <small> Have an existing account? <a href="#" @click="toggleAuthForm" class="primary-text fw-bold">Login</a>
            </small>
        </p>
    </div>
</template>

<script setup>
import LoginForm from './LoginForm.vue';
import SignUpForm from './SignUpForm.vue';
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore()
import router from '@/router'

const connectedUser = computed(() => { return { ...authStore.authUser, subscription: authStore.subscription } })
function disconnect(){
    authStore.disconnect();
    router.push({name:'HomeView'})
}
function navigateToAccount(){
    router.push({name:'UserDasboard'})
}
const isLogin = ref(true);
function toggleAuthForm() { isLogin.value = !isLogin.value }
</script>
