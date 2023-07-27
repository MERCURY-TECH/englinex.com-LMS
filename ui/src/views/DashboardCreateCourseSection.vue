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
            <form @submit.prevent="createSection" class="col-12 rounded bg-body p-3">
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
                    <button
                      type="submit"
                      class="btn btn-sm primary-button-outline px-5"
                      >Save</button
                    >
                  </p>
                </div>
              </div>
              <hr />
              <!-- End Form Head Row -->

              <form class="row p-3" @submit.prevent="createSection()">
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
                      <div class="form-floating mb-3">
                        <select class="form-select" id="floatingLevel" v-model="contentLevel">
                          <option v-for="(level,index) in contentLevels" :key="index" :value="level">#{{level.ranking}} {{level.title}}</option>
                        </select>
                        <label for="floatingLevel">Difficulty Level</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-5 px-3">
                  <div class="col-md-12 mb-3">
                    <div class="new-file-drag bg-light p-2 rounded-4" :style="{ backgroundImage: `url(${imagePath})` }" style="background-size: cover; background-position: center;">
                      <div class="drag-zone p-3 rounded-4 text-center" style="background-color: #F7EBFF; border: 2px dashed #ccc; opacity: .8;">
                        <p class="h1 primary-text"><i class="bi-image"></i></p>
                        <p style="font-size: .85em">
                          <small>Drag your photo here to start uploading</small>
                        </p>
                        <div class="row">
                          <div class="col-5"><hr></div>
                          <div class="col-2 p-0"><p class="h4">OR</p></div>
                          <div class="col-5"><hr></div>
                        </div>
                        <label class="btn btn-sm primary-button w-100 rounded-2" for="inputImage">
                          Browse files
                          <input type="file" @change="onImageSelected" class="visually-hidden" accept=".jpg, .jpeg, .png" id="inputImage" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-12 mt-3">
                  <ckeditor :editor="editor" v-model="description" ></ckeditor>
                </div>
              </form>
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
            </form>
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
    this.fetchContentLevels();
  },
  data() {
    return {
      courseId: this.$route.params.courseId,
      editor: ClassicEditor,
      course: '',
      contentLevels: '',
      contentLevel: '',
      image: null,
      coverimage: '',
      imagePath: '',
      title: '',
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
    fetchContentLevels() {
      axios.get('get-all-course-content-levels')
      .then(response => {
        this.contentLevels = response.data.message.levels
        console.log(this.contentLevels)
      })
      .catch(error => {
        console.log(error)
      })
    },
    onImageSelected(event) {
      this.image = event.target.files[0];
      this.imagePath = URL.createObjectURL(this.image);
      this.coverimage = this.image.name;
      alert('Image selected: '+ this.coverimage);
    },
    createSection() {
      const arr = [];
      arr.push({
        parent: null,
        coverimage: null,
        contentLevel: this.contentLevel,
        title: this.title,
        description: this.description,
        material: []
      });

      axios.post('create-course-section/'+this.courseId, arr)
      .then(response => {
        if (this.image !== null) {
          const fd = new FormData();
          fd.append('upload', this.image);
          axios.patch('/section/cover-image/'+response.data.message.courseSections[0]._id, fd)
          .then(() => {
            alert('Course Section Successfully Created')
            this.$router.push('/dashboard/get-course/'+this.courseId);
          })
          .catch(error => {
            console.log(error)
          })
        } else {
          alert('Course Section Successfully Created')
          this.$router.push('/dashboard/get-course/'+this.courseId)
          console.log(response.data)
        }
      })
    }
  }

};
</script>
