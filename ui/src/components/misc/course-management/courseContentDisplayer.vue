<template>
  <div v-if="!props.contenttodisplay" class="col-md-3">
    <div class="h-100 rounded-2 file-drag" style="
              background-color: rgba(0, 0, 0, 0.5);
              background-blend-mode: multiply;
              background-size: cover;
              background-position: center;
            ">
      <p class="p-3 mt-1 text-light row">
        <span class="col">
          <span class="h4">
            <span class="badge bg-light primary-text">{{ levelRange?.min.ranking }}</span>
          </span>
          {{ levelRange?.min.title }}
        </span>

        <span class="col-auto">
          <span class="h4">
            <span class="badge bg-success">{{ levelRange?.max.ranking }}</span>
          </span>
          {{ levelRange?.max.title }}
        </span>
      </p>
    </div>
  </div>
  <div v-if="!props.contenttodisplay" class="col-md-5">
    <div class="pt-5 px-2">
      <p class="row">
        <span class="h3 fw-bold col" style="font-family: 'Raleway', sans-serif">{{ props.course.title }}</span>
        <router-link :to="{ name: authStore.authUser === null ? 'SignupForm' : '' }"
          class="btn btn-sm primary-button col-auto px-md-4 py-2">Register Course</router-link>
      </p>
      <p class="border-start border-warning bg-warning-subtle p-4" style="line-height: -5px">
        <small v-html="props.course.description" style="font-size: 0.8em"> </small>
      </p>
      <div class="p-3 row file-drag" style=" background-color: rgba(0, 0, 0, 0.6); background-blend-mode: multiply; background-size: cover; background-position: center ">
        <div class="col">
          <p class="h3 text-light fw-bold" style="font-family: 'Raleway', sans-serif">
            <span style="border-bottom: 5px solid #a01fef">Live</span>
            Class
          </p>
          <p class="text-light">
            <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod</small>
          </p>
        </div>
        <div class="col-auto">
          <a class="btn btn-light primary-text" style="background: #fff">Go to class <i
              class="bi-camera-video-fill"></i></a>
        </div>
      </div>
    </div>
  </div>
  <div v-if="props.contenttodisplay" class="p-3 col-auto col-md-8">
    <span class="h4 fw-bold col" style="font-family: 'Raleway', sans-serif">{{ props.contenttodisplay.object.title
    }}</span>
    <p v-html="props.contenttodisplay.object.description"></p>
    <p v-html="props.contenttodisplay.object.content"></p>
  </div>
</template>

<script setup>
import { useCourseStore } from "@/stores/courseStore";
import { useAuthStore } from "@/stores/authStore";
import { computed } from "vue";
const courseStore = useCourseStore();
const authStore = useAuthStore();
let props = defineProps(['course', 'contenttodisplay']);
let levelRange = computed(() => courseStore.evalutaeCourseDifficultyRange(props.course._id))
</script>
