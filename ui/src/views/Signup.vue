<template>
	<WebsiteTemplate>
		<section class="my-5 pb-5 pt-3 ">
      <div class="container">
        <div class="row">
          <div class="col-md-4 p-4 py-5" style="background-color: #FCF6FF;">
            <p class="h1 text-center fw-bold" style="font-family: 'Raleway', sans-serif;">Signup</p>
            <form method="POST" class="text-center p-3" @submit.prevent="handleSubmit">
              <input type="text" v-model="user.username" placeholder="email Address" class="form-control mb-1 p-2 px-3 rounded-0" />
              <input type="password" v-model="user.password" placeholder="New Password" class="form-control mb-1 p-2 px-3 rounded-0" />
              <input type="password" v-model="user.password" placeholder="Confirm Password" class="form-control mb-4 p-2 px-3 rounded-0" />
              <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">I agree with platform policies and rules</label>
  </div>
              <button class="btn primary-button-outline form-control">Register</button>
            </form>
            <p class="text-muted px-3">
              <small>Forgot your password?<br>
              Don't have an account? <a href="./" class="primary-text fw-bold">Login now.</a>
              </small>
            </p>
          </div>
          <div class="col-md-8 d-none d-md-block">
            <div class="row h-100" style="padding-left: 10px;">
              <div class="col-md-5 file-drag" style="background-size: cover; background-position: center center;"></div>
              <div class="col-md-7 text-center pt-5" style="background-color: #490194; padding-left: 2em; padding-right: 2.6em;">
                <p class="h1 text-light fw-bold mt-5" style="font-family: 'Raleway', sans-serif; text-align: left;">Learn in a glance</p>
                <p style="text-align: left; font-size: .9em;" class="text-light">
                  <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ut labore et dolore magna aliqua</small>
                </p>
                <a class="btn btn-outline-warning px-5 mt-4 text-center"> Go to class</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
	</WebsiteTemplate>
</template>

<script>
	import WebsiteTemplate from '../components/WebsiteTemplate.vue';
	import axios from 'axios';

	export default {
		name: 'LoginForm',
		components: {
			WebsiteTemplate,
		},
    data() {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      
      handleSubmit() {
        // const fd = new FormData();
        // fd.append('username', this.username);
        // fd.append('pwd', this.pwd);

        axios.post('login', this.user)
        .then(response => {
          localStorage.setItem('token', response.data.token);
          alert('Logged in successfully');
          this.$router.push('/dashboard/');
        })
        .catch(error => {
          alert('Login Error: ' + error.response.data.errorMessage)
        })
      }

    }
	}
</script>

<style>
  .file-drag {
    background-image: url(@/assets/woman-teaching.jpg);
  }
</style>