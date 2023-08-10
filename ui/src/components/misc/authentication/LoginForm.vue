<template>
    <form method="POST" class="text-center p-3" @submit.prevent="handleSubmit">
        <div class="imput-group has-validation">
            <input @keyup="handleChange" type="text" v-model="user.username" name="username" placeholder="Username" class="form-control mb-3 p-2 px-3" />
            <div :key="error" v-for="error in formErrors.messages.username" :error="error" class="invalid-feedback p2"> {{ error }} </div>
        </div>
        <div class="imput-group has-validation">
            <input @keyup="handleChange" type="password" v-model="user.password" placeholder="Password" name="password" class="form-control mb-3 p-2 px-3" />
            <div :key="error" v-for="error in formErrors.messages.password" :error="error" class="invalid-feedback p2"> {{ error }} </div>
        </div>
        <button :disabled="formErrors.error" class="btn primary-button-outline form-control">
            Connect
            <div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>
    </form>
</template>

<script setup>
    import { useAuthStore } from '@/stores/authStore';
    import { ref } from 'vue';
    import router from '@/router';
    import Swal from 'sweetalert2';

    const user = ref({ username: '', password: '' });
    const loader = ref(false);
    const formErrors = ref({ error: false, messages: {} });
    const authStore = useAuthStore();

    function handleChange(e) {
			isError();
			if (formErrors.value.messages[e.target.getAttribute('name')]) {
				e.target.classList.add("is-invalid");
				e.target.classList.remove("is-valid");
				return
			}
			e.target.classList.remove("is-invalid");
			e.target.classList.add("is-valid");
		}
        
    function isError() {
			let errorMessages = {};
			if (!user.value.username) { errorMessages['username'] = ['Please provide user name'] }
			if (!user.value.password) { errorMessages['password'] = ['You must provide the user password'] }
			formErrors.value = { error: Object.keys(errorMessages).length > 0 ? true : false, messages: errorMessages }
		}

    async function handleSubmit() {
        if(formErrors.value.error) return
        loader.value = true;
        let statusObj = await authStore.login(user.value);
            if(statusObj.success) {
                Swal.fire(statusObj.message);
                Swal.update({icon:'success'});
                if(authStore.authUser.accountType === 'admin') router.push({name:'DashboardHome'});
                if(authStore.authUser.accountType === 'teacher') router.push({name:'HomeView'})
                if(authStore.authUser.accountType === 'student') router.push({name:'HomeView'})
                loader.value = false
                return
            }
                Swal.fire(statusObj.message);
                Swal.update({icon:'error'});
            loader.value = false
    }

</script>

<style>
.file-drag {
    background-image: url(@/assets/woman-teaching.jpg);
}
</style>