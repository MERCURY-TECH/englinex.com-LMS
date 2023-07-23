<template>
  <DashboardTemplate>
    <div class="container px-md-1 py-3">
      <div class="p-3">
        <div class="row">
          <div class="col-md-8">
            <div
              class="row p-2 col-12 rounded-2 m-1"
              style="background-color: #f7ebff"
            >
              <div class="col"><p class="h6 fw-bold">{{course.title}}</p></div>
              <div class="col-auto">
                <router-link
                  :to="'/dashboard/get-course/'+courseId"
                  class="btn primary-button btn-sm w-100 px-3"
                  >Navigate to Course</router-link
                >
              </div>
            </div>
            <div class="col-12 rounded bg-body p-3">
              <!-- Form Head Row -->
              <div class="row">
                <div class="col">
                  <p
                    class="h2 fw-bold"
                    style="font-family: 'Raleway', sans-serif"
                  >
                    New Course Section
                  </p>
                  <p>Course title: #{{course.title}}</p>
                </div>
                <div class="col-auto d-flex">
                  <p>
                    <router-link
                      :to="{ name: 'ViewCourse' }"
                      class="btn btn-sm primary-button-outline px-5"
                      >Save</router-link
                    >
                  </p>
                </div>
              </div>
              <hr />
              <!-- End Form Head Row -->

              <div class="row p-3">
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="mb-3">
                        <input
                          type="text"
                          v-model="title"
                          placeholder="Section Title"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="form-control">
                      <div class="row p-1">
                        <div class="col-12 border rounded">
                          <p class="fw-semibold">Selected tags:</p>
                          <small v-for="(tag, index) in tags" :key="tag" @click="removeFromTagsList(index)" class="d-inline-flex mb-3 me-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3" style="cursor: pointer;">{{tag.title}}</small>
                        </div>
                        <div class="col-12">
                          <p class="fw-semibold"><small>Create new tags:</small></p>
                          <input type="text" v-model="tagNames" placeholder="Enter tag names..." class="form-control form-control-sm w-75 d-inline-flex" style="border: none; border-left: 1px solid grey; border-radius: 0" />
                          <a @click="createTags" class="btn btn-sm primary-button d-inline-flex">Add</a>
                        </div>
                      </div>
                      <div class="bg-light p-3 mt-3 border rounded">
                        <small v-for="tag in tagsList" :key="tag" @click="addToTagsList(tag)" class="d-inline-flex mb-3 me-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3" style="cursor: pointer;">
                          {{tag.title}}
                        </small>
                          
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-5 px-3">
                  <div class="col-md-12 mb-3">
                    <div class="new-file-drag bg-light p-2 rounded-4" style="">
                      <div
                        class="drag-zone p-2 rounded-4 text-center"
                        style="
                          background-color: #f7ebff;
                          border: 2px dashed #ccc;
                        "
                      >
                        <p class="h1 primary-text"><i class="bi-image"></i></p>
                        <p style="font-size: 0.85em">
                          <small>Drag your photo here to start uploading</small>
                        </p>
                        <div class="row">
                          <div class="col-5"><hr /></div>
                          <div class="col-2 p-0"><p class="h4">OR</p></div>
                          <div class="col-5"><hr /></div>
                        </div>
                        <label
                          class="btn btn-sm primary-button w-100 rounded-2"
                          for="inputImage"
                          style="opacity: 1"
                        >
                          Browse files
                          <input
                            type="file"
                            name="image"
                            class="visually-hidden"
                            accept=".jpg, .jpeg, .png"
                            id="inputImage"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-12 mt-3">
                  <ckeditor :editor="editor" v-model="description" ></ckeditor>
                </div>
              </div>
              <!-- <hr />
              <div class="p-2">
                <p class="h4">Section Content</p>
                <div class="content-drag bg-light p-2 rounded-4">
                  <div
                    class="drag-zone p-3 rounded-4 text-center"
                    style="background-color: #f7ebff; border: 2px dashed #ccc"
                  >
                    <p class="h1 primary-text py-1">
                      <i class="bi-folder-fill"></i>
                    </p>
                    <p style="font-size: 0.85em">
                      <small
                        >Drag your section content
                        <strong>CSV | JSON</strong> here to start
                        uploading</small
                      >
                    </p>
                    <div class="row my-2">
                      <div class="col-5"><hr /></div>
                      <div class="col-2 p-0"><p class="h2">OR</p></div>
                      <div class="col-5"><hr /></div>
                    </div>
                    <a class="btn btn-sm primary-button my-1 w-100 rounded-2"
                      >Add Course Sections & Material</a
                    >
                  </div>
                </div>
              </div> -->
            </div>
          </div>

          <div class="col-md-4">
            <div class="rounded bg-body p-3">
              <p class="h2">Course Sections</p>
              <!-- Related Section -->
              <div
                class="bg-light rounded-2 mx-1 mb-2"
                style="display: grid; grid-template-columns: 2fr 5fr 1.5fr"
              >
                <div class="p-1 pt-3">
                  <img
                    src="@/assets/woman-teaching.jpg"
                    class="w-100 rounded"
                  />
                </div>
                <div class="">
                  <p class="pt-2 px-1">
                    <span class="h5 p-0">Section title will be right here</span><br />
                    <span class="text-muted"><small>#2896jkas34</small></span>
                  </p>
                </div>
                <div class="">
                  <p class="rounded p-0 mt-4 me-1">
                    <router-link
                      :to="{ name: 'EditCourseSection' }"
                      class="primary-text "
                      ><i class="bi-pencil-square"></i
                    ></router-link>
                    <a href="" class="text-danger "
                      ><i class="bi-trash-fill"></i
                    ></a>
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

<script>
import DashboardTemplate from "../components/DashboardTemplate.vue";
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
  name: "DashboardCreateCourseSection",
  components: {
    DashboardTemplate,
    ckeditor: CKEditor.component
  },
  props: {},
  mounted() {
    this.fetchCourse();
    this.fetchTags();
  },
  data() {
    return {
      courseId: this.$route.params.courseId,
      editor: ClassicEditor,
      course: '',
      imagePath: '',
      tagsList: [],
      tags: [],
      description: ''
    }
  },
  methods: {
    fetchCourse() {
      axios.get('get-course/'+this.courseId)
      .then(response => {
        this.course = response.data.message.courses;
        console.log(this.course)
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchTags() {
      axios.get('get-tags/')
        .then(response => {
          this.tagsList = response.data.message.tags;
          console.log(response.data);
        })
        .catch(error => {
          // Handle the error
          console.log(error);
        });
    },
    
    addToTagsList(tag) {
      if (!this.tags.includes(tag)) { this.tags.push(tag); } else { alert('Tag already included') }
    },

    removeFromTagsList(index) {
      this.tags.splice(index,1);
    },
  }

};
</script>
