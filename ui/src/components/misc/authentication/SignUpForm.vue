<template>
	<form method="POST" class="text-center p-3">
		<!-- <div v-show="formErrors.error" class="col-12 alert danger">
            <p :key="error" v-for="error in this.formErrors.messages" :error="error">
                {{ error.message }}
            </p>
        </div> -->
		<div class="row">
			<div class="col-12">
				<div class="input-group has-validation">
					<input name="email" @keyup="handleChange" type="email" v-model="user.email" placeholder="Email"
						class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in this.formErrors.messages.email" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
				<div class="input-group has-validation">
					<input name="telephone" @keyup="handleChange" type="telephone" v-model="user.telephone"
						placeholder="Tel: +237xxx" class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in this.formErrors.messages.telephone" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-md-6">
				<div class="input-group has-validation">
					<input name="firstname" @keyup="handleChange" type="text" id="firstname" v-model="user.firstname"
						required placeholder="First Name" class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in this.formErrors.messages.firstname" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
				<input type="adress" name="country" v-model="this.user.address.country" placeholder="Country"
					class="mb-3 form-control  p-2 px-3" />
				<input type="adress" name="city" v-model="this.user.address.City" placeholder="City"
					class="mb-3 form-control  p-2 px-3" />
			</div>
			<div class="col-12 col-md-6">
				<div class="input-group has-validation">
					<input name="lastname" @keyup="handleChange" type="text" v-model="user.lastname" placeholder="Last Name"
						class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in this.formErrors.messages.lastname" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>

				<div class="form-group">
					<select @change="handleChange" class="mb-3 form-control  p-2 px-3" name="EnglishProficiency"
						v-model="user.EnglishProficiency">
						<option selected disabled key='none' value="">English Proficiency</option>
						<option v-for="proficiency in this.EnglishProficiency" v-bind:key="proficiency"
							v-bind:proficiency="proficiency"> {{ proficiency }}</option>
					</select>
					<div :key="error" v-for="error in this.formErrors.messages.EnglishProficiency" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>

				<div class="form-group">
					<select @change="handleChange" class="mb-3 form-control  p-2 px-3" name="LearningGoals"
						v-model="user.LearningGoals">
						<option selected disabled key='none' value="">Learning Goals</option>
						<option v-for="goal in this.LearningGoals" v-bind:key="goal" v-bind:goal="goal"> {{ goal
						}}</option>
					</select>
					<div :key="error" v-for="error in this.formErrors.messages.LearningGoals" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="input-group has-validation">
					<input @keyup="handleChange" name="password" type="password" v-model="user.password"
						placeholder="Password" class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in this.formErrors.messages.password" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
				<div class="input-group has-validation">
					<input @keyup="handleChange" name="passwordComfirmation" type="password"
						v-model="user.passwordComfirmation" placeholder="Comfirm Password"
						class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in this.formErrors.messages.passwordComfirmation" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
			</div>
		</div>
		<div class="row ">
			<div class="col-12 p-1 mt-2">
				<div class="mb-3 form-check">
					<input @change="handleChange" name="acceptPolicy" v-model="this.acceptPolicy"  :value="this.acceptPolicy" type="checkbox"
						class="form-check-input"  id="agreementPolicy">
					<label class="form-check-label m0" for="agreementPolicy">I agree with platform policies and
						rules</label>
					<div :key="error" v-for="error in this.formErrors.messages.acceptPolicy" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
			</div>
		</div>
	</form>
	<button :disabled="formErrors.error" type="button" @click="handleSubmit" class="btn primary-button-outline form-control">
		Signup
		<div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</button>
</template>

<script>
import axios from 'axios'
// import { useToast } from "vue-toastification";

export default {
	name: 'SignUpForm',
	data() {
		return {
			// toast: useToast(),
			isLogin: true,
			EnglishProficiency: ["Beginner", "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced"],
			LearningGoals: ["English exams (TOEFL/IELTS)", "Business English", "English for Kids", "English for Conversation"],
			user: {
				password: '',
				passwordComfirmation: '',
				firstname: '',
				lastname: '',
				email: '',
				telephone: '',
				address: {
					country: '',
					City: ''
				},
				EnglishProficiency: '',
				LearningGoals: '',
			},
			loader: false,
			acceptPolicy: false,
			formErrors: { error: false, messages: {} }
		}
	},
	methods: {
		handleChange(e) {
			this.isError();
			if (this.formErrors.messages[e.target.getAttribute('name')]) {
				e.target.classList.add("is-invalid");
				e.target.classList.remove("is-valid");
				return
			}
			e.target.classList.remove("is-invalid");
			e.target.classList.add("is-valid");
		},
		
		async handleSubmit() {
			this.isError()
			if (Object.values(this.formErrors.messages).length > 0) return;
			this.loader = true
			try {
				let response = await axios.post('signup', { ...this.user });
				if (response) {
					let user = response.data.message;
					localStorage.setItem('englinex-user', user);
					localStorage.setItem('englinex-token', response.data.message.token);
					alert('SignUp was successfully');
					this.loader = false
					this.$router.push({ name: 'HomeView', params: { username: 'erina' } });
				}
			} catch (error) {
				alert('Login Error: ' + error.message)
				this.loader = false
			}
		},
		isError() {
			let errorMessages = {};
			if (!this.user.password) { errorMessages['password'] = ['You must provide the user password'] }
			if (!this.user.passwordComfirmation) { errorMessages['passwordComfirmation'] = ['Please comfirm user password'] }
			if (this.user.password.toString() != this.user.passwordComfirmation.toString()) { errorMessages['passwordComfirmation'] = ['comfirmation password not equivalent to password'] }
			if (!this.user.firstname) { errorMessages['firstname'] = ['You must provide the users first name'] }
			if (!this.user.lastname) { errorMessages['lastname'] = ['You must provide the users last name'] }
			if (!this.user.telephone) {
				errorMessages['telephone'] ?
				errorMessages['telephone'].push('You must provide the telephone number') :
				errorMessages['telephone'] = ['You must provide the telephone number']
			}
			if (!this.user.EnglishProficiency) { errorMessages['EnglishProficiency'] = ['Please, select your current proficiency level'] }
			if (!this.user.LearningGoals) { errorMessages['LearningGoals'] = ['Please, select your current Learning Goals'] }
			if (!this.user.email) errorMessages['email'] = ['Please, provide email']
			if (this.user.email && !(/^[^@]+@\w+(\.\w+)+\w$/.test(this.user.email))) errorMessages['email'] = ['Please, provide valid email']
			if (!this.acceptPolicy) { errorMessages['acceptPolicy'] = ['You must accept the platforms policies'] }
			this.formErrors = { error: Object.keys(errorMessages).length > 0 ? true : false, messages: errorMessages }
		}
	}
}

</script>

