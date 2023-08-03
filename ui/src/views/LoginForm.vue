<template>
		<section class="my-5 pb-5 pt-3 ">
			<div class="container">
				<div class="row">
					<div v-if="this.isLogin" class="col-md-4 p-4 py-5" style="background-color: #FCF6FF;">
						<p class="h1 text-center fw-bold" style="font-family: 'Raleway', sans-serif;">Login</p>
						<form method="POST" class="text-center p-3" @submit.prevent="handleSubmit">
							<input type="text" v-model="user.username" placeholder="Username"
								class="form-control mb-3 p-2 px-3" />
							<input type="password" v-model="user.password" placeholder="Password"
								class="form-control mb-3 p-2 px-3" />
							<button class="btn primary-button-outline form-control">
								Connect
								<div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
									<span class="visually-hidden">Loading...</span>
								</div>
							</button>
						</form>
						<p class="text-muted px-3">
							<small>Forgot your password?<br>
								Don't have an account? <a href="#"  @click="this.toggleAuthForm" class="primary-text fw-bold">Register now.</a>
							</small>
						</p>
					</div>
					<div v-if="!this.isLogin" class="col-md-4 p-4 py-5" style="background-color: #FCF6FF;">
						<p class="h1 text-center fw-bold" style="font-family: 'Raleway', sans-serif;">Signup</p>
						<form method="POST" class="text-center p-3" @submit.prevent="handleSubmit">
							<input type="text" v-model="user.username" placeholder="email Address"
								class="form-control mb-1 p-2 px-3 rounded-0" />
							<input type="password" v-model="user.password" placeholder="New Password"
								class="form-control mb-1 p-2 px-3 rounded-0" />
							<input type="password" v-model="user.password" placeholder="Confirm Password"
								class="form-control mb-4 p-2 px-3 rounded-0" />
							<div class="mb-3 form-check">
								<input type="checkbox" class="form-check-input" id="exampleCheck1">
								<label class="form-check-label" for="exampleCheck1">I agree with platform policies and
									rules</label>
							</div>
							<button class="btn primary-button-outline form-control">Register</button>
						</form>
						<p class="text-muted px-3">
							<small>Forgot your password?<br>
								Don't have an account? <a href="#"  @click="this.toggleAuthForm" class="primary-text fw-bold">Login now.</a>
							</small>
						</p>
					</div>
					<div class="col-md-8 d-none d-md-block">
						<div class="row h-100" style="padding-left: 10px;">
							<div class="col-md-5 file-drag"
								style="background-size: cover; background-position: center center;"></div>
							<div class="col-md-7 text-center pt-5"
								style="background-color: #490194; padding-left: 2em; padding-right: 2.6em;">
								<p class="h1 text-light fw-bold mt-5"
									style="font-family: 'Raleway', sans-serif; text-align: left;">Learn in a glance</p>
								<p style="text-align: left; font-size: .9em;" class="text-light">
									<small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna aliqua. Ut ut labore et dolore magna
										aliqua</small>
								</p>
								<a class="btn btn-outline-warning px-5 mt-4 text-center"> Go to class</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
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
		toggleAuthForm() {
			this.isLogin =  !this.isLogin
		},
		async handleSubmit() {
			this.loader = true
				// switch and limit screen per user account type and enfore it accross refresh
			let user = {
				username: this.user.username,
				password: this.user.password
			}
			try {
				let response = axios.post('login', user);
				await localStorage.setItem('englinex-token', response.data.message.token);
				alert('Logged in successfully');
				this.loader = false
				this.$router.push('/dashboard/');
			} catch (error) {
				alert('Login Error: ' + error.message)
				this.loader = false
				console.log(error.message)
			}
		}

	}
}
</script>

<style>
.file-drag {
	background-image: url(@/assets/woman-teaching.jpg);
}</style>