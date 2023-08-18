<template>
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
                <div v-for="bundle in bundleStore.activeBundles" :key="bundle._Id" class="col-12 col-md-4 my-2">
                    <BundleCard :bundle="bundle" />
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
</template>

<script setup>
import BundleCard from '@/components/misc/bundle-management/BundleCard.vue';
import { useBundleStore } from '@/stores/bundleStore';

const bundleStore = useBundleStore();

</script>

<style>
.file-drag {
    background-image: url(@/assets/woman-teaching.jpg);
}
</style>