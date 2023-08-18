<template>
    <div v-if="!props.isLecturer" class="card p-2 my-2">
        <div class="row d-flex align-items-center justify-content-between  ">
            <div class="col-2">
                <img :src="cPicture" contain style=" height: 50px; border-radius: 10%;" @error="onImgError" />
            </div>
            <div class="col-6">
                <div>{{ props.course.title }} / #{{ props.course._id }}</div>
                <p class="border-top" v-html="props.course.description"></p>
                <!-- <div class="p-1 levels mt-1">
                <div class="row justify-content-between">
                    <div class="col-6 justify-content-start">
                        <span class="h6 p-2">
                            <span class="badge bg-primary">{{ levelRange.min.ranking }}
                            </span>
                        </span>
                        <small style="font-size: 0.8em">{{ levelRange.min.title
                        }}</small>
                    </div>
                    <div class="col-6 justify-content-end">
                        <span class="h6 p-2">
                            <span class="badge bg-success ">{{ levelRange.max.ranking
                            }}</span>
                        </span>
                        <small style="font-size: 0.8em ">{{ levelRange.max.title
                        }}</small>
                    </div>
                </div>
            </div> -->
            </div>
            <div class="col-4">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button @click="unregisterCourse" type="button" class="btn btn-secondary">Un-register</button>
                    <button @click="navigateToCourse" type="button" class="btn btn-secondary"
                        style="background-color: #9F1FED;">view course</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="d-flex align-items-center justify-content-between">
        <div class="row">
            <span class="col-6 text-truncate" style="color: font-size: 14px;">{{ props.course.title }}</span> <br>
            <span class="" style="color: #8b8b8b; font-size: 13px;">#{{ props.course._id }}</span>
        </div>
        <div class="d-flex">
            <button class="btn btn-sm mx-2" style="background-color: #F7EBFF;">
                <span style="font-size: 13px;">
                    View Students
                </span>
            </button>
            <!-- <button class="btn btn-sm mx-2" style="background-color: #F7EBFF;">
                <span style="font-size: 13px;">
                    Go to Class
                </span>
            </button> -->
        </div>
        <!-- <div class="">
            <router-link to="/" class="nav-link rounded-pill px-1" style="border:1px solid #9F1FED;">
                <i class="bi bi-chevron-right"></i>
            </router-link>
        </div> -->
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { actionNotificationWrapper } from '@/helpers';
import router from '@/router';
import { ref, computed } from 'vue';

const fallBackimage = require('@/assets/placeholder.jpg')
const authStore = useAuthStore();
let props = defineProps(['course', 'isLecturer']);

let failed_image = ref(false);
function onImgError() {
    failed_image.value = true;
}

function navigateToCourse() {
    router.push({ name: 'MaterialOverview', params: { courseId: props.course._id } })
}
async function unregisterCourse() {
    actionNotificationWrapper(await authStore.unRegisterCourse(props.course._id))

}

let cPicture = computed(() => failed_image.value ? fallBackimage : props.course.coverimage)
</script>