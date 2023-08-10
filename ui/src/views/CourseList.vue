<template>
  <section>
    <div class="row p-3" style="overflow-x: hidden;">
      <div class="col-md-3">
        <small
        class="d-inline-flex mb-3 ms-md-4 px-2 py-1 fw-semibold text-dark-emphasis bg-danger-subtle border border-danger-subtle rounded-2">Home
        <i class="bi-chevron-right"></i> All Materials</small>
        
        <div class="card bg-body py-3">
          <p class="h5 fw-bold border-bottom p-2 mx-4">Filter By</p>
          
          <div class="col-12 px-4 mb-3">
            <div class="border-start primary-border px-3">
              <label for="customRange2" class="form-label fw-semibold"><small>Level</small></label>
              <input type="range" class="form-range" min="1" max="10" id="customRange2" />
              <div class="row">
                <div class="col"><small>1</small></div>
                <div class="col-auto"><small>10</small></div>
              </div>
            </div>
          </div>
          
          <div class="col-12 px-4 mb-3">
            <div class="border-start primary-border px-2">
              <p class="fw-semibold"><small>Keywords:</small></p>
              <input type="text" v-model="tagNames" placeholder="Enter Keywords..."
              class="form-control form-control-sm w-75 d-inline-flex border primary-border" />
              <a @click="createTags" class="btn btn-sm primary-button d-inline-flex"><i class="bi-search"></i></a>
            </div>
          </div>
          <div class="col-12 px-4 mb-3">
            <div class="border-start primary-border px-2">
              <p class="fw-semibold"><small>Tags:</small></p>
              <input type="text" v-model="tagNames" placeholder="Enter tag names..."
              class="form-control form-control-sm w-75 d-inline-flex border primary-border" />
              <a @click="createTags" class="btn btn-sm primary-button d-inline-flex"><i class="bi-search"></i></a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-9">
        <div class="bg-light rounded-2 shadow-sm border-bottom border-start">
          <div class="row p-3" v-if="loaded">
            <div class="col-12 col-md-3 mb-3" v-for="course in courseStore.courses" :key="course._id">
              <CourseCard :course="course" />
            </div>
          </div>
          
          <div v-else class="p-5 text-centered">
            Loading Courses...
            <div class="spinner-border primary-text" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCourseStore } from "@/stores/courseStore";
import CourseCard from '@/components/misc/course-management/course-list-components/CourseCard.vue'

const courseStore = useCourseStore();
const loaded = ref(false);

onMounted(async () => {
  await courseStore.getAllCourses();
  loaded.value = ref(true);
})

// add search to courses
</script>

<style>
.file-drag {
  background-image: url(@/assets/woman-teaching.jpg);
}
.levels{
  position: relative;
  top: 10px;
}
</style>
