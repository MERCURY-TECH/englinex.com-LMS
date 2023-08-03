<template>
    <div class="col-md-5 p-4 py-5" style="background-color: #FCF6FF;">
        <LoginForm v-if="this.isLogin" />
        <p v-if="this.isLogin" class="text-muted px-3">
            <small>Forgot your password?<br>
                Don't have an account? <a href="#" @click="this.toggleAuthForm" class="primary-text fw-bold">Register
                    now.</a>
            </small>
        </p>
        <SignUpForm v-if="!this.isLogin" />
        <p v-if="!this.isLogin" class="text-muted px-3">
            <small> Have an existing account? <a href="#" @click="this.toggleAuthForm"
                    class="primary-text fw-bold">Login</a>
            </small>
        </p>
    </div>
</template>

<script>
import LoginForm from './LoginForm.vue';
import SignUpForm from './SignUpForm.vue';

export default {
    name: 'AuthHandler',
    components: {
        LoginForm,
        SignUpForm
    },
    props: ['EnglinexConnectedUser'],
    data() {
        return {
            isLogin: true,
        }
    },
    methods: {
        connect() {

        },
        disconnect() {

        }
        ,
        verifyExistingEmails() {

        },
        toggleAuthForm() {
            this.isLogin = !this.isLogin
        }
    }

}
</script>
