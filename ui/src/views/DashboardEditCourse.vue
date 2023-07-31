<template>
  <DashboardTemplate>
    <div class="container px-md-5 py-3">
        <form class="rounded bg-body p-3" @submit.prevent="editCourse">
          <!-- Form Head Row -->
          <div class="row">
            <div class="col">
              <p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif;">{{course.title}}</p>
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
                <input class="form-check-input" type="checkbox" v-if="course.isPublic" checked role="switch" id="makeCoursePublic" @change="makePublic">
                <input class="form-check-input" type="checkbox" v-else role="switch" id="makeCoursePublic" @change="makePublic">
              </div>
              <div class="pt-3">
                <button class="btn btn-sm primary-button-outline px-5 mx-2">Save</button>
              </div>
              <router-link :to="'/dashboard/get-course/'+courseId" class="h3 text-danger ms-3 pt-3"><i class="bi-x-circle"></i></router-link>
            </div>
          </div>
          <hr>
          <!-- End Form Head Row -->

          <div class="row p-3">
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-12">
                  <div class="mb-3">
                    <input type="text" name="title" placeholder="Course Title" class="form-control" v-model="course.title" />
                  </div>
                  <div class="mb-3">
                    <!-- <textarea class="form-control" v-model="course.description" placeholder="Course description" style="min-height: 150px;" name="description">
                      
                    </textarea> -->
                    <ckeditor :editor="editor" v-model="course.description" ></ckeditor>
                    
                  </div>
                </div>
                
              </div>
              <hr>

              <p class="h4">Course Tags</p>

              <div class="form-control">
                <div class="row">
                  <div class="col-12">
                    <small v-for="(tag, index) in tags" :key="index" @click="removeFromTagsList(index)" class="d-inline-flex mb-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3 me-1" style="cursor: pointer;">{{tag.title}}</small>
                  </div>
                  <div class="col-12">
                    <p class="fw-semibold"><small>Create new tags:</small></p>
                    <input type="text" v-model="tagNames" placeholder="Enter tag names..." class="form-control form-control-sm w-75 d-inline-flex" style="border: none; border-left: 1px solid grey; border-radius: 0" />
                    <a @click="createTags" class="btn btn-sm primary-button d-inline-flex">Add</a>
                  </div>
                </div>
                <div class="bg-light p-2 mt-3 border rounded">
                  <small v-for="tag in tagsList" :key="tag" @click="addToTagsList(tag)" class="d-inline-flex mb-3 me-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3" style="cursor: pointer;">
                    {{tag.title}}
                  </small>
                </div>
              </div>

              
              <!-- <div class="p-2">
                <p class="h4">Course Content</p>
                <p class="h6">Section & Material</p>

                <div class="content-drag bg-light p-2 rounded-4">
                  <div class="drag-zone p-3 rounded-4 text-center" style="background-color: #F7EBFF; border: 2px dashed #ccc;">
                    <p class="h1 primary-text py-1"><i class="bi-folder-fill"></i></p>
                    <p style="font-size: .85em" class="mb-5">
                      <small>Select your course content <strong>CSV | JSON</strong> here to start uploading</small>
                    </p>
                    <div class="row my-2">
                      <div class="col-5"><hr></div>
                      <div class="col-2  p-0"><p class="h2">OR</p></div>
                      <div class="col-5"><hr></div>
                    </div> 
                    <label class="btn btn-sm primary-button w-100 rounded-2" for="inputDoc">
                      Browse Files
                      <input type="file" @change="onDocumentSelected" class="visually-hidden" accept=".csv, .json" id="inputDoc" />
                    </label>
                  </div>
                </div>
              </div> -->
            </div>
            <div class="col-md-5 px-3" style="border-left: 1px solid #A01FEF;">
              <div class="col-md-12">
                  <div class="file-dragg bg-light p-2 rounded-4" :style="{ backgroundImage: `url(${imagePath})` }" style=" background-size: cover; background-position: center;">
                    <div class="drag-zone p-2 rounded-4 text-center" style="background-color: #F7EBFF; border: 2px dashed #ccc; opacity: .8;">
                      <p class="h1 primary-text"><i class="bi-image"></i></p>
                      <p style="font-size: .85em" class="mb-4">
                        <small>Browse files & select your photo here to start uploading</small>
                      </p>
                      <!-- <div class="row">
                        <div class="col-5"><hr></div>
                        <div class="col-2 p-0"><p class="h4">OR</p></div>
                        <div class="col-5"><hr></div>
                      </div> -->
                      <label class="btn btn-sm primary-button w-100 rounded-2" for="inputImage" style="opacity: 1;">
                        Browse files
                        <input type="file" @change="onImageSelected" class="visually-hidden" accept=".jpg, .jpeg, .png" id="inputImage" />
                      </label>
                    </div>
                  </div>
                </div>

                <p class="h4 mt-5">Navigate Course Sections</p>
                <router-link :to="{ name: 'CreateCourseSection', params: { courseId: courseId } }" class="btn btn-sm mb-2 primary-button w-100" >Create New Section <i class="bi-plus-circle"></i></router-link> 

              <div class="p-3 bg-light">
                <div class="accordion bg-light" id="accordionPanelsStayOpenExample">
                      <div v-for="(section, index) in course.content" :key="index" class="accordion-item">
                        <h2 class="accordion-header">
                          <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#panelsStayOpen-collapseOne' + section._id" aria-controls="panelsStayOpen-collapseOne">
                              {{ section.title }}
                          </button>
                        </h2>
                        <div :id="'panelsStayOpen-collapseOne' + section._id" class="accordion-collapse collapse">
                          <div class="accordion-body">
                            <p class="h6">
                              <router-link :to="{ name: 'EditCourseSection', params: { sectionId: section._id } }" class="primary-text ps-2 pe-1"><i class="bi-pencil-square"></i></router-link>
                              <a @click="deleteSection(section._id)" style="cursor: pointer;" class="text-danger ps-1"><i class="bi-trash-fill"></i></a>
                            </p>

                            <!-- Sub Section -->
                            <div class="accordion accordion-flush border" id="accordionPanelsStayOpenExample">
                              <div v-for="(material, index) in section.material" :key="index" class="accordion-item">
                                <h2 class="accordion-header p-0">
                                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#panelsStayChild-collapseOne' + material._id" aria-controls="panelsStayOpen-collapseOne">  
                                      <small>{{material.title}}</small>  
                                  </button>
                                </h2>
                                <div :id="'panelsStayChild-collapseOne' + material._id" class="accordion-collapse collapse">
                                  <div class="accordion-body">
                                   <p class="h6">
                                    <router-link :to="{ name: 'EditSectionMaterial', params: { materialId: material._id } }" class="primary-text ps-2 pe-1"><i class="bi-pencil-square"></i></router-link>
                                    <a @click="deleteMaterial(material._id)" style="cursor: pointer;" class="text-danger ps-1"><i class="bi-trash-fill"></i></a>
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

<script>
import DashboardTemplate from '../components/DashboardTemplate.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios';

export default {
  name: 'DashboardEditCourse',
  components: {
    DashboardTemplate,
    ckeditor: CKEditor.component
  },
  props: {
  },
  data() {
    return {
      tagNames: '',
      tagsList: [],
      tags: [],
      editor: ClassicEditor,
      courseId: this.$route.params.id,
      course: {
        coverimage: "",
        title: '',
        description: '',
        isPublic: false,
        content: [],
        tags: []
      },
      image: '',
      imagePath: '',
      coverImage: '',
      isPublic: '',
    }
  },
  mounted() {
    this.fetchTags();
    this.fetchCourse();
    this.isPublic = this.course.isPublic
  },
  methods: {
    makePublic() {
      if (this.course.isPublic) { this.course.isPublic = false } else { this.course.isPublic = true }
    },

    fetchCourse() {
      axios.get('get-course/'+this.courseId)
      .then(response => {
        this.tags = response.data.message.courses.tags
        this.course.tags = this.tags
        this.course.coverimage = response.data.message.courses.coverimage
        this.course.title = response.data.message.courses.title
        this.course.description = response.data.message.courses.description
        this.course.isPublic = response.data.message.courses.isPublic
        this.course.content = response.data.message.courses.content

        if (this.course.coverimage.length > 0) {
          this.imagePath = 'http://185.216.26.155:3000'+this.course.coverimage;
        }

        console.log(this.course)
      })
      .catch(error => {
        console.log(error)
      })
    },

    editCourse() {
      
      axios.patch('edit-courses/'+this.courseId, {
        coverimage: this.course.coverimage,
        title: this.course.title,
        description: this.course.description,
        isPublic: this.course.isPublic
      })
      .then(response => {

        if (this.image !== '') {

          const fd = new FormData();
          fd.append('upload', this.image);
          axios.patch('cover-image/'+this.courseId, fd)
          .then(() => {
            alert('Course successfully updated')
            this.$router.push('/dashboard/get-course/'+this.courseId);
          })
          .catch(error => {
            console.log(error)
          })
        }

        alert('Course successfully updated')
        console.log(response.data)
        this.$router.push('/dashboard/get-course/'+this.courseId);

      })
      .catch(error => {
        console.log(error)
      })

      console.log(this.course);
    },

    fetchTags() {
      axios.get('get-tags/')
      .then(response => {
        this.tagsList = response.data.message.tags;
        console.log(response.data.message.tags);
      })
      .catch(error => {
        // Handle the error
        console.log(error);
      });
    },

    createTags() {
      if (this.tagNames.length === 0) { alert('Empty tags list') } else {
      const arr = this.tagNames.split(",");
      const tagList = [];
      arr.forEach(function(tagin) {
        tagList.push({
          title: tagin
        })
      });
            
      axios.post('create-tags', tagList)
      .then(response => {
          console.log(response);
          alert('Tags successfully created');
          this.fetchTags();
          this.tagNames = '';
        })
        .catch(error => {
          // Handle the error
          console.log(error);
        });
      }
    },

    addToTagsList(tag) {
      if (!this.tags.includes(tag)) { this.tags.push(tag); } else { alert('Tag already included') }
    },

    removeFromTagsList(index) {
      this.tags.splice(index, 1);
    },

    onImageSelected(event) {
      this.image = event.target.files[0];
      this.imagePath = URL.createObjectURL(this.image);
      this.coverimage = this.image.name;
      alert('Image selected: '+ this.coverimage);
    },

    onDocumentSelected(event) {
      const file = event.target.files[0];
      this.readFileContent(file);
    },

    readFileContent(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = JSON.parse(e.target.result);
        this.processFileContent(content);
      };

      reader.readAsText(file);
    },

    processFileContent(content) {
      // Do something with the content (e.g., store it in a Vue data property)
      this.course.content = content;
      console.log(this.course.content)
      alert('Your file has been uploaded');
    },

    deleteMaterial(e) {
      if (window.confirm('Are you sure you want to delete this section material?')) {
        axios.delete('delete/material/'+e)
        .then(() => {
          alert('Section material has been deleted');
          this.$forceUpdate();
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
  }
}
</script>