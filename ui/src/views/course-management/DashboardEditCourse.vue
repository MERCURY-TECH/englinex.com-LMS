<template>
  <DashboardTemplate>
    <div class="container px-md-5 py-3">
      <form class="rounded bg-body p-3" @submit.prevent="editCourse">
        <!-- Form Head Row -->
        <div class="row">
          <div class="col">
            <p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif;">{{ course.title }}</p>
          </div>
          <div class="col-auto d-flex">
            <div class="form-check form-switch form-check-reverse pt-3">
              <label class="form-check-label" for="makeCoursePublic">
                <span v-if="course.isPublic">
                  <span class="badge primary-bg"><i class="bi-globe-europe-africa"></i> Public</span>
                </span>
                <span v-else>
                  <small><span>Make Course Public</span></small>
                </span>
              </label>
              <input class="form-check-input" type="checkbox" v-if="course.isPublic" checked role="switch"
                id="makeCoursePublic" @change="makePublic">
              <input class="form-check-input" type="checkbox" v-else role="switch" id="makeCoursePublic"
                @change="makePublic">
            </div>
            <div class="pt-3">
              <button class="btn btn-sm primary-button-outline px-5 mx-2">
                Update
                <div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            </div>
            <router-link :to="'/dashboard/get-course/' + courseId" class="h3 text-danger ms-3 pt-3"><i
                class="bi-x-circle"></i></router-link>
          </div>
        </div>
        <hr>
        <!-- End Form Head Row -->

        <div class="row p-3">
          <div class="col-md-7">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <input type="text" name="title" placeholder="Course Title" class="form-control"
                    v-model="course.title" />
                </div>
                <div class="mb-3">
                  <!-- <textarea class="form-control" v-model="course.description" placeholder="Course description" style="min-height: 150px;" name="description">
                      
                    </textarea> -->
                  <ckeditor :editor="editor"  v-model="course.description"></ckeditor>

                </div>
              </div>

            </div>
            <hr>

            <p class="h4">Course Tags</p>

            <div class="form-control">
              <div class="row">
                <div class="col-12">
                  <small v-for="(tag, index) in tags" :key="index" @click="removeFromTagsList(index)"
                    class="d-inline-flex mb-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3 me-1"
                    style="cursor: pointer;">{{ tag.title }}</small>
                </div>
                <div class="col-12">
                  <p class="fw-semibold"><small>Create new tags:</small></p>
                  <input type="text" v-model="tagNames" placeholder="Enter tag names..."
                    class="form-control form-control-sm w-75 d-inline-flex"
                    style="border: none; border-left: 1px solid grey; border-radius: 0" />
                  <a @click="createTags" class="btn btn-sm primary-button d-inline-flex">
                    Add
                    <div class="spinner-border spinner-border-sm text-light" v-if="tagloader" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="bg-light p-2 mt-3 border rounded">
                <small v-for="tag in courseStore.tags" :key="tag" @click="addToTagsList(tag)"
                  class="d-inline-flex mb-3 me-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
                  style="cursor: pointer;">
                  {{ tag.title }}
                </small>
              </div>
            </div>
            <ImportCourseContent import-section-title="Course section import"
              import-section-description="Used to import course related sections"
              :target-end-point="'import-sections/' + courseId" />
          </div>
          <div class="col-md-5 px-3" style="border-left: 1px solid #A01FEF;">
            <div class="col-md-12">
              <div class="file-dragg bg-light p-2 rounded-4" :style="{ backgroundImage: `url(${imagePath})` }"
                style=" background-size: cover; background-position: center;">
                <div class="drag-zone p-2 rounded-4 text-center"
                  style="background-color: #F7EBFF; border: 2px dashed #ccc; opacity: .8;">
                  <p class="h1 primary-text"><i class="bi-image"></i></p>
                  <p style="font-size: .85em" class="mb-4">
                    <small>Browse files & select your photo here to start uploading</small>
                  </p>
                  <div class="row">
                    <div class="col-5">
                      <hr>
                    </div>
                    <div class="col-2 p-0">
                      <p class="h4">OR</p>
                    </div>
                    <div class="col-5">
                      <hr>
                    </div>
                  </div>
                  <label class="btn btn-sm primary-button w-100 rounded-2" for="inputImage" style="opacity: 1;">
                    Browse files
                    <input type="file" @change="onImageSelected" class="visually-hidden" accept=".jpg, .jpeg, .png"
                      id="inputImage" />
                  </label>
                </div>
              </div>
            </div>

            <p class="h4 mt-5">Navigate Course Sections</p>
            <router-link :to="{ name: 'CreateCourseSection', params: { courseId: courseId } }"
              class="btn btn-sm mb-2 primary-button w-100">Create New Section <i class="bi-plus-circle"></i></router-link>

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
                                <router-link :to="{ name: 'EditSectionMaterial', params: { materialId: material._id } }"
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
      </form>
    </div>
  </DashboardTemplate>
</template>

<script setup>
import DashboardTemplate from '@/components/DashboardTemplate.vue';
import ImportCourseContent from '@/components/misc/course-management/ImportCourseContent.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';
import { useCourseStore } from '@/stores/courseStore';
import { useRouter } from 'vue-router';
import router from '@/router';

const ckeditor = CKEditor.component
const editor = ref(ClassicEditor);
let courseStore = useCourseStore()
let course = ref({})
let tagNames = ref('');
let tags = ref([]);
let routerObj = useRouter();
const courseId = routerObj.currentRoute.value.params.id;
const image = ref('')
const imagePath = ref('')
const coverImage = ref('')
const isPublic = ref(false)
const loader = ref(false)
const tagloader = ref(false)


onMounted(async () => {
  await courseStore.fetchTags();
  course.value =await courseStore.getCourseById(courseId);
  tags.value = course.value.tags;
  isPublic.value = course.value.isPublic;
})

function makePublic() { if (course.value.isPublic) { course.value.isPublic = !course.value.isPublic } }

async function editCourse() {
  loader.value = true;
  let update = {
    coverimage: course.value.coverimage,
    title: course.value.title,
    description: course.value.description,
    isPublic: course.value.isPublic
  }
  if (image.value !== '') {
    const fd = new FormData();
    fd.append('upload', image.value);
    update['fd'] = fd
  }

  let statusObj = await courseStore.editCourseByID(courseId, update);
  if (statusObj.success) {
    Swal.fire(statusObj.message);
    Swal.update({ icon: "success" });
  } else {
    Swal.fire(statusObj.message);
    Swal.update({ icon: "error" });
  }
  loader.value = false;
  router.push({ name: 'GetSingleCourse', params: { id: courseId } });
}


async function createTags() {
  tagloader.value = true
  let statusObj = await courseStore.createTag(tagNames.value);
  if (statusObj.success) {
    Swal.fire(statusObj.message);
    Swal.update({ icon: "success" });
    tagloader.value = false;
    tagNames.value =''
  } else {
    Swal.fire(statusObj.message);
    Swal.update({ icon: "error" });
    tagloader.value = false;
  }
  
}

function addToTagsList(tag) {
  if (!tags.value.includes(tag)) { tags.value.push(tag); } else { alert('Tag already included') }
}

function removeFromTagsList(index) {
  tags.value.splice(index, 1);
}

function onImageSelected(event) {
  image.value = event.target.files[0];
  imagePath.value = URL.createObjectURL(image.value);
  coverImage.value = image.value.name;
  alert('Image selected: ' + coverImage.value);
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