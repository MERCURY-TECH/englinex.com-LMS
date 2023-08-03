<template>
    <form method="POST" class="text-center p-3" @submit.prevent="handleSubmit">
        <div class="row">
            <div class="col-12 col-md-6">
                <input type="text" v-model="user.firstname" placeholder="First Name" class="form-control mb-3 p-2 px-3" />
                <input type="text" v-model="user.lastname" placeholder="Last Name" class="form-control mb-3 p-2 px-3" />
                <!-- <p v-if="!isValidEmail">Invalid email</p> -->
                <input type="email" v-model="user.email" placeholder="Email" class="form-control mb-3 p-2 px-3" />

                <input type="password" v-model="user.password" placeholder="Password" class="form-control mb-3 p-2 px-3" />
                <input type="password" v-model="user.passwordComfirmation" placeholder="Comfirm Password"
                    class="form-control mb-3 p-2 px-3" />
            </div>
            <div class="col-12 col-md-6">
                <input type="adress"  v-model=" this.user.address.country" placeholder="Country" class="form-control mb-3 p-2 px-3" />
                <input type="adress" v-model="this.user.address.City" placeholder="City" class="form-control mb-3 p-2 px-3" />
                <input type="telephone" v-model="user.telephone" placeholder="Tel: +237xxx"
                    class="form-control mb-3 p-2 px-3" />
                <div class="form-group">
                    <select class="form-control mb-3 p-2 px-3" name="EnglishProficiency" v-model="user.EnglishProficiency">
                        <option selected key='none' value="">English Proficiency</option>
                        <option v-for="proficiency in this.EnglishProficiency" v-bind:key="proficiency"
                            v-bind:proficiency="proficiency"> {{ proficiency }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <select class="form-control mb-3 p-2 px-3" name="LearningGoals" v-model="user.LearningGoals">
                        <option selected key='none' value="">Learning Goals</option>
                        <option v-for="goal in this.LearningGoals" v-bind:key="goal" v-bind:goal="goal"> {{ goal
                        }}</option>
                    </select>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="agreementPolicy">
                    <label class="form-check-label m0" for="agreementPolicy">I agree with platform policies and rules</label>
                </div>
            </div>
        </div>
        <button class="btn primary-button-outline form-control">
            Signup
            <div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SignUpForm',
    data() {
        return {
            isLogin: true,
            EnglishProficiency: ["Beginner","Elementary","Pre-Intermediate","Intermediate","Upper-Intermediate","Advanced"],
            LearningGoals: ["English exams (TOEFL/IELTS)", "Business English", "English for Kids", "English for Conversation"],
            user: {
                password: '',
                passwordComfirmation: '',
                firstname: '',
                lastname: '',
                email: '',
                telephone: '',
                address: {
                    country:'',
                    City:''
                },
                EnglishProficiency: '',
                LearningGoals: '',
            },
            loader: false
        }
    },
    methods: {
        async handleSubmit() {
            this.loader = true
            try {
                let response = await axios.post('signup', {...this.user});
                console.log(response)
                if (response) {
                    let user = response.data.message;
                    localStorage.setItem('englinex-user', user);
                    localStorage.setItem('englinex-token', response.data.message.token);
                    // redirect to dashboard per account type
                    alert('SignUp was successfully');
                    this.loader = false
                }
                this.$router.push('/');
            } catch (error) {
                alert('Login Error: ' + error.message)
                this.loader = false
            }
        }
    },
    computed: {
        isValidEmail() {
            return /^[^@]+@\w+(\.\w+)+\w$/.test(this.email);
        }
    }
}

</script>

