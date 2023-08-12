<template>
    <WebsiteTemplate>
        <section class="p-md-5 p-3 file-drag"
            style="background-color: rgba(0, 0, 0, 0.7); background-blend-mode: multiply; background-position: top center; background-size: cover;">
            <div class="container">
                <p class="text-center text-light fs-5 mt-3" style="font-family: sans-serif;">PRICING</p>
                <h2 class="text-center text-light display-3" style="font-weight: bold;font-family: sans-serif;">Get Started
                    Now, <br> Pick a Plan Later</h2>
                <p class="my-4 text-center text-light fs-5">Try Premium free for 7 days and get unrestricted <br> access to
                    all our products and features.</p>
                <div class="d-flex align-items-center justify-content-center">
                    <p class="text-center px-3 py-2 rounded-pill fs-6 text-white" style="background-color: #ffffff50;"> No
                        Credit card required</p>
                </div>
            </div>
        </section>
        <section class="p-md-3 pt-5">
            <div class="container mt-2 mt-md-5">
                <div class="row">
                    <div class="col-12 col-md-4 my-2">
                        <div class="card p-3">
                            <h1 class="">Basic</h1>
                            <p class="my-2">The quick brown fox scores the whatever Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit.
                                quis.</p>

                            <h2 class="" style="font-family: sans-serif;"> <strong class="fs-1">$30</strong>/<small
                                    class="fs-5" style="color: #828282;">3 months Unlimited Access</small></h2>
                            <div v-for="i in 7" :key="i" class="d-flex align-items-center px-md-0 mx-md-0">
                                <span class="h5">
                                    <i class="bi-check-circle-fill me-2 primary-text"></i>
                                </span>
                                <span style="margin-top: -10px;">
                                    <small>Lorem ipsum dolor sit amet.</small>
                                </span>
                            </div>
                            <button class="btn text-white rounded-pill my-3" style="background-color: #A01FEF;">Subcribe
                                Now</button>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 my-2">
                        <div class="card p-3">
                            <h1 class="">Premium</h1>
                            <p class="my-2">The quick brown fox scores the whatever Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit.
                                quis.</p>

                            <h2 class="" style="font-family: sans-serif;"> <strong class="fs-1">$60</strong>/<small
                                    class="fs-5" style="color: #828282;">6 months Unlimited Access</small></h2>
                            <div v-for="i in 7" :key="i" class="d-flex align-items-center px-md-0 mx-md-0">
                                <span class="h5">
                                    <i class="bi-check-circle-fill me-2 primary-text"></i>
                                </span>
                                <span style="margin-top: -10px;">
                                    <small>Lorem ipsum dolor sit amet.</small>
                                </span>
                            </div>
                            <button class="btn btn-outline-primary rounded-pill my-3">Start Free Trial</button>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 my-2">
                        <div class="card p-3">
                            <h1 class="">Plus</h1>
                            <p class="my-2">The quick brown fox scores the whatever Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit.
                                quis.</p>

                            <h2 class="" style="font-family: sans-serif;"> <strong class="fs-1">$120</strong>/<small
                                    class="fs-5" style="color: #828282;">12 months Unlimited Access</small></h2>
                            <div v-for="i in 7" :key="i" class="d-flex align-items-center px-md-0 mx-md-0">
                                <span class="h5">
                                    <i class="bi-check-circle-fill me-2 primary-text"></i>
                                </span>
                                <span style="margin-top: -10px;">
                                    <small>Lorem ipsum dolor sit amet.</small>
                                </span>
                            </div>
                            <button class="btn btn-outline-primary rounded-pill my-3">Start Free Trial</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="p-md-3">
            <div class="container  py-5">
                <div class="row">
                    <div class="col-md-6">
                        <div class="rounded-4 file-drag p-5 mx-md-4 text-center text-light h-100"
                            style="background-color: rgba(0, 0, 0, 0.2); background-blend-mode: multiply; background-position: center; background-size: cover;">

                            <h2 style="opacity: 0%;">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis natus voluptas alias nostrum explicabo sed nemo laboriosam tenetur deserunt. Nulla nihil incidunt eveniet quae accusamus veniam, fuga et voluptates dolore.</h2>
                        </div>
                    </div>
                    <div class="col-md-6 mt-3">
                        <span class="h2 px-md-5 mx-md-5" style="font-family: 'Raleway', sans-serif;">Unlock your</span> <br>
                        <span class="h2 px-md-5 mx-md-5" style="font-family: 'Raleway', sans-serif;"> professional
                            English</span>
                        <p class="px-md-5 mx-md-5 my-4 fw-bold">The quick brown fox scores the whatever Lorem ipsum dolor
                            sit amet, consectetur adipisicing elit.
                            quis.</p>

                        <div v-for="i in 5" :key="i" class="d-flex align-items-center px-md-5 mx-md-5">
                            <span class="h5">
                                <i class="bi-check-circle-fill me-2 primary-text"></i>
                            </span>
                            <span style="margin-top: -10px;">
                                <small>Lorem ipsum dolor sit amet.</small>
                            </span>
                        </div>


                        <p class="px-md-5 mx-md-5 mt-3">
                            <a href="" class="btn btn-lg text-light" style="background: #490194; z-index: 122;">Get Started
                                <i class="bi-arrow-right-circle ms-3 me-2"></i></a>
                            <a href="" class="btn btn-lg btn-light primary-text primary-border px-3"
                                style="margin-left: -15px; background: #fff;">Learn More</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="container" style="overflow: hidden;">
            <div class="row">
                <div class="col-md-7 row p-5 " style="background: #A01FEF;">
                    <div class="col-md-5 pt-4">
                        <p class="h2 text-light" style="font-family: 'Raleway', sans-serif;">Access to <br>+500 courses</p>
                    </div>
                    <div class="col-md-7 pt-4">
                        <p class="text-light"><small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris t mollit anim id est laborum.</small></p>
                    </div>
                </div>
                <div class="col-md-5 file-drag"
                    style="background-color: rgba(0, 0, 0, 0.43); background-blend-mode: multiply; background-position: center; background-size: cover;">
                    <div class="row pt-md-5">
                        <div class="col-2">
                            <span class="display-1 text-light">
                                <i class="bi-caret-left-fill"></i>
                            </span>
                        </div>
                        <div class="col-9 px-md-5">
                            <p class="h2 text-light px-5 mt-3 mt-md-0">The Way to Good English</p>
                        </div>
                        <div class="col-12 text-center">
                            <a class="btn primary-button px-4 py-2 mt-5 mb-4">TAKE THIS COURSE</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="p-md-5 mt-2 mt-md-3">
            <div class="container">
                <div class="row mx-2">
                    <div class=" col-12 col-md-7 d-none d-md-block" style="position: relative;">
                        <div class="" style="z-index: 155; position: absolute; width: 75%; right: 30%">
                            <img class="shadow rounded-2 w-100" src="@/assets/woman-teaching.jpg" />
                        </div>
                        <div class=""
                            style="z-index: 135; position: absolute; height: 75%; width: 68%; right: 25%; top: 5%;">
                            <img class="shadow rounded-2 w-100" src="@/assets/woman-teaching.jpg" />
                        </div>
                        <div class=""
                            style="z-index: 115; position: absolute; height: 65%; width: 60%; right: 20%; top: 10%;">
                            <img class="shadow rounded-2 w-100" src="@/assets/woman-teaching.jpg" />
                        </div>
                    </div>
                    <div class=" col-12 col-md-5 p-3 mt-md-0">
                        <p class="h2 px-md-5 pt-md-5 text-start mt-5 mt-md-0" style="font-family: 'Raleway', sans-serif;">
                            Study At Flexible <br><span style="border-bottom: 5px solid #A01FEF;">Schedule</span></p>
                        <p class="text-start px-md-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                        <a class="btn btn-lg text-light mx-md-5" style="background: #490194;">
                            <i class="bi-exclamation-circle-fill me-4"></i> <small>100% customer satisfaction</small>
                        </a>
                        <a class="btn btn-lg mt-2  primary-button-outline d-flex flex-column flex-md-row align-items-end ms-md-5 ms-0">
                            <div class="d-flex align-items-start justify-content-start">
                                <span class="h2">
                                    <i class="bi-arrow-repeat me-1"></i>
                                </span>
                                <div class="">
                                    <span class="">Our Refundment policy policy</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-end  ms-auto" style="margin-bottom: -18px;">
                                <p> <small style="text-decoration: underline;">Read More</small> </p>
                            </div>
                        </a>
                        <p class="px-md-5 mx-md-5 mt-5 text-center">
                            <a href="" class="btn btn-lg text-light" style="background: #490194; z-index: 122;">Get Started
                                <i class="bi-arrow-right-circle ms-3 me-2"></i></a>

                        </p>
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
    name: 'HomePage',
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

<style>.file-drag {
    background-image: url(@/assets/woman-teaching.jpg);
}</style>