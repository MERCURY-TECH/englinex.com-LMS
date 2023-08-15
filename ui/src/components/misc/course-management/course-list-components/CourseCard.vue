<template>
    <router-link class="card  bg-body p-3 nav-link"
        :to="{ name: 'MaterialOverview', params: { courseId: props.course._id } }">
        <p class="h6 mt-3 border-bottom primary-border" style="font-family: 'Raleway', sans-serif">
            {{ props.course.title }}
        </p>
        <img class="w-100" :src="cPicture" contain style="height: 150px;" @error="onImgError" />
        <div class="pt-1 border-top primary-border levels mt-1">
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
                    <small style="font-size: 0.8em " >{{ levelRange.max.title
                    }}</small>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useCourseStore } from "@/stores/courseStore";
const fallBackimage= require('@/assets/placeholder.jpg')
import { ref } from 'vue';

const courseStore = useCourseStore();
let props = defineProps(['course']);

let failed_image = ref(false);
function onImgError() {
    failed_image.value = true;
}
let levelRange = computed(() => courseStore.evalutaeCourseDifficultyRange(props.course._id))
let cPicture = computed(() => failed_image.value ? fallBackimage : props.course.coverimage)
</script>