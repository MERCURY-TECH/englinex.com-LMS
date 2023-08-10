<template>
    <section class="p-3">
      <div class="row col-md-12">
        <MeterialListNavigation @content="sendContentToDisplay" :course="course" />
        <CourseContentDisplayer :contenttodisplay="contentToDisplay" :course="course"/>
      </div>
    </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref,onMounted } from "vue";
import { useCourseStore } from "@/stores/courseStore";
import CourseContentDisplayer from "@/components/misc/course-management/courseContentDisplayer.vue";
import MeterialListNavigation from '@/components/misc/course-management/MeterialListNavigation.vue'

const routerObj = useRouter();
const courseStore = useCourseStore();
const course = ref({});
const contentToDisplay = ref(null);

onMounted(async () => {
  course.value = await courseStore.getCourseById(routerObj.currentRoute.value.params.courseId)
})

function sendContentToDisplay(content){
  contentToDisplay.value = content
}

</script>

<style>
.file-drag {
  background-image: url(@/assets/woman-teaching.jpg);
}
</style>
