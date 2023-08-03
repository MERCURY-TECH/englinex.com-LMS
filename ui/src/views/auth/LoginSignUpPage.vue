<template>
    <section class="my-5 pb-5 pt-3 ">
        <div class="container">
            <div class="row">
                <AuthHandler />
                <div class="col-md-7 d-none d-md-block">
                    <div class="row h-100" style="padding-left: 10px;">
                        <div class="col-md-5 file-drag" style="background-size: cover; background-position: center center;">
                        </div>
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
import AuthHandler from '../../components/misc/authentication/AuthHandler.vue'

export default {
    name: 'LoginSignUpPage',
    components: {
        AuthHandler
    }
}
</script>

<style>
.file-drag {
    background-image: url(@/assets/woman-teaching.jpg);
}
</style>