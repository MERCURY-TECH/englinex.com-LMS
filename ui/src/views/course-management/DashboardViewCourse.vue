<template>
  <DashboardTemplate>
    <div class="container p-md-3">
      <div class="">
        <div class="row">
          <div class="col-md-8 rounded bg-body p-3">
            <!-- Form Head Row -->
            <div class="row">
              <div class="col">

                <p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif;">{{ course.title }}</p>
                <p>Course title: #{{ course.title }}</p>
              </div>
              <div class="col-auto d-flex">
                <a @click="deleteCourse" style="cursor: pointer;" class="h5 text-danger ms-3 pt-3"><i
                    class="bi-trash-fill"></i></a>
                <router-link :to="{ name: 'EditCourse', params: { id: courseId } }" class="h5 primary-text ms-3 pt-3"><i
                    class="bi-pencil-square"></i></router-link>
                <router-link :to="{ name: 'Courses' }" class="h5 text-danger ms-3 pt-3"><i
                    class="bi-x-circle"></i></router-link>
              </div>
            </div>
            <hr>
            <!-- End Form Head Row -->
            <div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="row p-3">
              <div class="col-md-7">
                <div class="row">

                  <div class="col-md-12">
                    <div class="form-floating mb-3">
                      <input type="text" placeholder="Course Title" disabled class="form-control" :value="course.title"
                        id="formTitle" />
                      <label for="formTitle">Course title</label>
                    </div>
                    <div class="mb-3">
                      <span class="text-muted"><small>Course description</small></span>
                      <ckeditor :editor="editor"  disabled=true v-model="course.description"></ckeditor>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <p class="h4">Course Tags</p>

                    <div class="bg-light p-2 mt-3 border rounded">
                      <small v-for="(tag, index) in course.tags" :key="index"
                        class="d-inline-flex mb-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3 me-1">{{ tag.title }}</small>
                    </div>
                  </div>
                </div>

              </div>
              <div class="col-md-5 p-3 pt-0">
                <div class="col-md-12 mb-3">
                  <div class="file-dragg bg-light p-2 mx-3 rounded-4"
                    style=" background-size: cover; background-position: center; min-height: 200px;">
                    <span v-if="imagePresent">
                      <div class="drag-zone p-2 rounded-4 text-center" :style="{ backgroundImage: `url(${imagePath})` }"
                        style="background-size: cover; border: 2px dashed #ccc; opacity: .8; min-height: 200px; background-position: center;">
                      </div>
                    </span>
                    <span v-else>
                      <div class="drag-zone p-2 rounded-4 text-center h-100"
                        style="background-color: #F7EBFF; border: 2px dashed #ccc; opacity: .8;">
                        <p class="h1 primary-text my-5"><i class="bi-image"></i></p>
                      </div>
                    </span>
                  </div>
                </div>

                <p class="h4">Navigate Course Sections</p>

                <router-link :to="{ name: 'CreateCourseSection', params: { courseId: courseId } }"
                  class="btn btn-sm mb-2 primary-button w-100">Create New Section <i
                    class="bi-plus-circle"></i></router-link>
                <div class="p-3 bg-light">
                  <div class="accordion bg-light" id="accordionPanelsStayOpenExample">
                    <div v-for="(section, index) in course.content" :key="index" class="accordion-item">
                      <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                          :data-bs-target="'#panelsStayOpen-collapseOne' + section._id"
                          aria-controls="panelsStayOpen-collapseOne">
                          {{ section.title }}
                        </button>
                      </h2>
                      <div :id="'panelsStayOpen-collapseOne' + section._id" class="accordion-collapse collapse">
                        <div class="accordion-body">
                          <p class="h6">
                            <router-link :to="{ name: 'EditCourseSection', params: { sectionId: section._id } }"
                              class="primary-text ps-2 pe-1"><i class="bi-pencil-square"></i></router-link>
                            <a @click="deleteSection(section._id)" style="cursor: pointer;" class="text-danger ps-1"><i
                                class="bi-trash-fill"></i></a>
                          </p>

                          <!-- Sub Section -->
                          <div class="accordion accordion-flush border" id="accordionPanelsStayOpenExample">
                            <div v-for="(material, index) in section.material" :key="index" class="accordion-item">
                              <h2 class="accordion-header p-0">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                  :data-bs-target="'#panelsStayChild-collapseOne' + material._id"
                                  aria-controls="panelsStayOpen-collapseOne">
                                  <small>{{ material.title }}</small>
                                </button>
                              </h2>
                              <div :id="'panelsStayChild-collapseOne' + material._id" class="accordion-collapse collapse">
                                <div class="accordion-body">
                                  <p class="h6">
                                    <router-link
                                      :to="{ name: 'EditSectionMaterial', params: { materialId: material._id } }"
                                      class="primary-text ps-2 pe-1"><i class="bi-pencil-square"></i></router-link>
                                    <a @click="deleteMaterial(section._id,material._id)" style="cursor: pointer;"
                                      class="text-danger ps-1"><i class="bi-trash-fill"></i></a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
              <div class="rounded bg-body p-3">
                <p class="h2">Related Courses</p>
                <p><small>Course title : {{ course.title }}</small></p>
                <div @click="viewCourse(relatedCourseItem._id)" v-for="relatedCourseItem in relatedCourses" :key="relatedCourseItem._id"  class="bg-light rounded-2 mx-1 mb-2" style="display: grid; grid-template-columns: 1fr 3fr">
                  <div class="p-2 pt-3">
                    <img :src="relatedCourseItem.coverImage"  class="w-100 rounded">
                  </div>
                  <div class="">
                    <p class="pt-2">
                      <span class="h5 p-0">{{ relatedCourseItem.title }}</span><br>
                      <span class="text-muted"><small>#{{ relatedCourseItem._id }}</small></span>
                    </p>
                  </div>
                </div>
              </div>
            </div> 
        </div>
      </div>
    </div>
  </DashboardTemplate>
</template>

<script setup>
import DashboardTemplate from '@/components/DashboardTemplate.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import router  from  '@/router'
import { useCourseStore } from '@/stores/courseStore'


const courseStore = useCourseStore();
const routerObj = useRouter();
const ckeditor = CKEditor.component
const editor = ref(ClassicEditor);
const loader = ref(false);
const courseId = routerObj.currentRoute.value.params.id;
const course = ref({});
const imagePresent = ref(false);
let relatedCourses ='';
const imagePath = ref('');
onMounted(async () => {
  course.value = await courseStore.getCourseById(courseId);
  relatedCourses=  courseStore.getRelatedCoursesByTags(courseId,course.value.tags);
})

async function deleteCourse() {
  loader.value = true;
  let modalValue = await new Swal({
    title: "Delete this Course?",
    text: "Are you sure? You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#490194",
    confirmButtonText: "Yes, Delete it!",
  });
  if (modalValue.value) {
    let statusObj = await courseStore.deleteCourse(courseId);
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
      router.push({ name: "Courses" });
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });

    }
  }
  loader.value = false;

}

function viewCourse(id) {
  router.push({ name: "GetSingleCourse", params: { id } });
}

async function deleteSection(sectionId) {
  loader.value = true;
  let modalValue = await new Swal({
    title: "Delete this Course Section?",
    text: "Are you sure you want to delete this course section? You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#490194",
    confirmButtonText: "Yes, Delete it!",
  });
  if (modalValue.value) {
    let statusObj = await courseStore.deleteCourseSection(courseId, sectionId);
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });
    }
  }
  loader.value = false;
}

async function deleteMaterial(sectionId,materialId) {

  loader.value = true;
  let modalValue = await new Swal({
    title: "Delete this Course Section?",
    text: "Are you sure you want to delete this section material? You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#490194",
    confirmButtonText: "Yes, Delete it!",
  });
  if (modalValue.value) {
    let statusObj = await courseStore.deleteCourseSectionMaterial(courseId, sectionId, materialId);
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });
    }
  }
  loader.value = false;
}

</script>

<style>/*.file-drag {
    background-image: url(@/assets/woman-teaching.jpg);
  }*/</style>

