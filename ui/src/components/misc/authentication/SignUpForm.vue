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
					<div :key="error" v-for="error in formErrors.messages.email" :error="error" class="invalid-feedback p2">
						{{ error }} </div>
				</div>
				<div class="input-group has-validation">
					<input name="telephone" @keyup="handleChange" type="telephone" v-model="user.telephone"
						placeholder="Tel: +237xxx" class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in formErrors.messages.telephone" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-md-6">
				<div class="input-group has-validation">
					<input name="firstname" @keyup="handleChange" type="text" id="firstname" v-model="user.firstname"
						required placeholder="First Name" class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in formErrors.messages.firstname" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
				<input type="adress" name="country" v-model="user.address.country" placeholder="Country"
					class="mb-3 form-control  p-2 px-3" />
				<input type="adress" name="city" v-model="user.address.City" placeholder="City"
					class="mb-3 form-control  p-2 px-3" />
			</div>
			<div class="col-12 col-md-6">
				<div class="input-group has-validation">
					<input name="lastname" @keyup="handleChange" type="text" v-model="user.lastname" placeholder="Last Name"
						class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in formErrors.messages.lastname" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>

				<div class="form-group">
					<select @change="handleChange" class="mb-3 form-control  p-2 px-3" name="EnglishProficiency"
						v-model="user.EnglishProficiency">
						<option selected disabled key='none' value="">English Proficiency</option>
						<option v-for="proficiency in EnglishProficiency" v-bind:key="proficiency"
							v-bind:proficiency="proficiency"> {{ proficiency }}</option>
					</select>
					<div :key="error" v-for="error in formErrors.messages.EnglishProficiency" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>

				<div class="form-group">
					<select @change="handleChange" class="mb-3 form-control  p-2 px-3" name="LearningGoals"
						v-model="user.LearningGoals">
						<option selected disabled key='none' value="">Learning Goals</option>
						<option v-for="goal in LearningGoals" v-bind:key="goal" v-bind:goal="goal"> {{ goal
						}}</option>
					</select>
					<div :key="error" v-for="error in formErrors.messages.LearningGoals" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="input-group has-validation">
					<input @keyup="handleChange" name="password" type="password" v-model="user.password"
						placeholder="Password" class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in formErrors.messages.password" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
				<div class="input-group has-validation">
					<input @keyup="handleChange" name="passwordComfirmation" type="password"
						v-model="user.passwordComfirmation" placeholder="Comfirm Password"
						class="mb-3 form-control  p-2 px-3" />
					<div :key="error" v-for="error in formErrors.messages.passwordComfirmation" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
			</div>
		</div>
		<div class="row ">
			<div class="col-12 p-1 mt-2">
				<div class="mb-3 form-check">
					<input @change="handleChange" name="acceptPolicy" v-model="acceptPolicy" :value="acceptPolicy"
						type="checkbox" class="form-check-input" id="agreementPolicy">
					<label class="form-check-label m0" for="agreementPolicy">I agree with platform policies and
						rules</label>
					<div :key="error" v-for="error in formErrors.messages.acceptPolicy" :error="error"
						class="invalid-feedback p2"> {{ error }} </div>
				</div>
			</div>
		</div>
	</form>
	<button :disabled="formErrors.error" type="button" @click="handleSubmit"
		class="btn primary-button-outline form-control">
		Signup
		<div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</button>
</template>

<script setup>

	import router from '@/router';
	import Swal from 'sweetalert2';
	import { useAuthStore } from '@/stores/authStore';
	import { ref } from 'vue';

	const authStore = useAuthStore();
	const EnglishProficiency = ["Beginner", "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced"]
	const LearningGoals = ["English exams (TOEFL/IELTS)", "Business English", "English for Kids", "English for Conversation"]
	let loader = ref(false);
	let acceptPolicy = ref(false);
	let formErrors = ref({ error: false, messages: {} })

	let user = ref({
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
	})


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

	async function handleSubmit() {
		isError()
		if (Object.values(formErrors.value.messages).length > 0) return;
		loader.value = true
		let statusObj = await authStore.signup(user.value);
		if (statusObj.success) {
			Swal.fire(statusObj.message);
			Swal.update({ icon: 'success' });
			router.push({ name: 'HomeView' });
			loader.value = false
			return
		}
		Swal.fire(statusObj.message);
		Swal.update({ icon: 'error' });
		loader.value = false
	}

	function isError() {
		let errorMessages = {};
		if (!user.value.password) { errorMessages['password'] = ['You must provide the user password'] }
		if (!user.value.passwordComfirmation) { errorMessages['passwordComfirmation'] = ['Please comfirm user password'] }
		if (user.value.password.toString() != user.value.passwordComfirmation.toString()) { errorMessages['passwordComfirmation'] = ['comfirmation password not equivalent to password'] }
		if (!user.value.firstname) { errorMessages['firstname'] = ['You must provide the users first name'] }
		if (!user.value.lastname) { errorMessages['lastname'] = ['You must provide the users last name'] }
		if (!user.value.telephone) {
			errorMessages['telephone'] ?
				errorMessages['telephone'].push('You must provide the telephone number') :
				errorMessages['telephone'] = ['You must provide the telephone number']
		}
		if (!user.value.EnglishProficiency) { errorMessages['EnglishProficiency'] = ['Please, select your current proficiency level'] }
		if (!user.value.LearningGoals) { errorMessages['LearningGoals'] = ['Please, select your current Learning Goals'] }
		if (!user.value.email) errorMessages['email'] = ['Please, provide email']
		if (user.value.email && !(/^[^@]+@\w+(\.\w+)+\w$/.test(user.value.email))) errorMessages['email'] = ['Please, provide valid email']
		if (!acceptPolicy.value) { errorMessages['acceptPolicy'] = ['You must accept the platforms policies'] }
		formErrors.value = { error: Object.keys(errorMessages).length > 0 ? true : false, messages: errorMessages }
	}

</script>

