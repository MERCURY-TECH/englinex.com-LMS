<template>
    <router-link class="card  bg-body p-3 nav-link"
        :to="{ name: 'MaterialOverview', params: { courseId: props.course._id } }">
        <p class="h6 mt-3 border-bottom primary-border" style="font-family: 'Raleway', sans-serif">
            {{ props.course.title }}
        </p>
        <img class="w-100" style="max-height: 300px;" :src="props.course.coverimage" />
        <p class="pt-1 border-top primary-border levels mt-1">
            <span class="h6">
                <span class="badge bg-primary">{{ levelRange.min.ranking }}
                </span>
            </span>
            <small style="font-size: 0.8em">{{ levelRange.min.title
            }}</small>

            <span class="h6">
                <span class="badge bg-success">{{ levelRange.max.ranking
                }}</span>
            </span>
            <small style="font-size: 0.8em">{{ levelRange.max.title
            }}</small>
        </p>
    </router-link>
</template>

<script setup>
import {computed} from 'vue'
import { useCourseStore } from "@/stores/courseStore";


const courseStore = useCourseStore();
let props = defineProps(['course'])
let levelRange = computed(() => courseStore.evalutaeCourseDifficultyRange(props.course._id))
</script>