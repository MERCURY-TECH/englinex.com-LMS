<template>
    <form method="POST" class="text-center p-3" @submit.prevent="handleSubmit">
        <input type="text" v-model="user.username" placeholder="Username" class="form-control mb-3 p-2 px-3" />
        <input type="password" v-model="user.password" placeholder="Password" class="form-control mb-3 p-2 px-3" />
        <button class="btn primary-button-outline form-control">
            Connect
            <div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginForm',
    components: {
    },
    data() {
        return {
            isLogin: true,
            user: {
                username: '',
                password: ''
            },
            loader: false
        }
    },

    methods: {
        async handleSubmit() {
            this.loader = true
            let user = {
                username: this.user.username,
                password: this.user.password
            }
            try {
                let response = await axios.post('login', user);
                if (response) {
                    localStorage.setItem('englinex-token', response.data.message.token);
                    alert('Logged in successfully');
                    this.loader = false
                }
                this.$router.push('/admin/');
            } catch (error) {
                alert('Login Error: ' + error.message)
                this.loader = false
            }
        }

    }
}
</script>

<style>
.file-drag {
    background-image: url(@/assets/woman-teaching.jpg);
}
</style>