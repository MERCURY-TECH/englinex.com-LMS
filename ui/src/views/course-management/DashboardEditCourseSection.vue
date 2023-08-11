<template>
  <DashboardTemplate>
    <div class="container px-md-3 py-3">
        <div class="p-3">
          <div class="row">
            <div class="col-md-8">
              <div class="row p-2 col-12 rounded-2 m-1" style="background-color: #F7EBFF;">
                <div class="col"><p class="h6 fw-bold">{{course.title}}</p></div>
                <div class="col-auto">
                <router-link class="btn primary-button btn-sm w-100 px-3" :to="'/dashboard/get-course/'+courseId">Navigate to Course</router-link>
                </div>
              </div>
                <div class="col-12 rounded bg-body p-3">
                  <!-- Form Head Row -->
                  <form @submit.prevent="editSection">
                    <div class="row">
                      <div class="col">
                        <p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif;">{{sectionTitle}}</p>
                        <p>Course title: #{{course.title}}</p>
                      </div>
                      <div class="col-auto d-flex">
                        <p>
                          <button type="submit" class="btn btn-sm primary-button-outline px-5">Update 
                            <div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </button>
                          <router-link :to="'/dashboard/get-course/'+courseId" class="h3 text-danger ms-3 pt-3 mt-2"><i class="bi-x-circle"></i></router-link>
                        </p>
                      </div>
                    </div>
                    <hr>
                    <!-- End Form Head Row -->

                    <div class="row p-3">
                      <div class="col-md-8">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="mb-3">
                              <input
                                type="text"
                                v-model="sectionTitle"
                                placeholder="Section Title"
                                class="form-control"
                              />
                            </div>
                            <div class="form-floating mb-3">
                              <select class="form-select" id="floatingLevel" v-model="contentLevel">
                                <option :value="contentLevel">#{{contentLevel.ranking}} {{contentLevel.title}}</option>
                                <option v-for="(level,index) in contentLevels" :key="index" :value="level">#{{level.ranking}} {{level.title}}</option>
                              </select>
                              <label for="floatingLevel">Difficulty Level</label>
                            </div>
                          </div>
                          <div class="col-md-12 mt-3">
                            <ckeditor :editor="editor" v-model="description" ></ckeditor>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 p-3">
                        <div class="col-md-12 mb-3">
                            <div class="file-dragg bg-light p-2 rounded-4" :style="{ backgroundImage: `url(${imagePath})` }" style="background-size: cover; background-position: center;">
                              <div class="drag-zone p-2 rounded-4 text-center" style="background-color: #F7EBFF; border: 2px dashed #ccc; opacity: 0.8;">
                                <p class="h1 primary-text"><i class="bi-image"></i></p>
                                <p style="font-size: .85em">
                                  <small>Browse files and start uploading</small>
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
                      </div>
                    </div>
                    <hr>
                  </form>
                  <div class="p-2">
                    <div class="row">
                      <div class="col">
                        <p><span class="h4">Section Material</span><br><small>Section ID: #{{sectionId}}</small></p>
                      </div>
                      <div @click="toggleCreateMaterialForm"  class="fw-bold col-auto" style="color: #490194;" >
                        <small>Create new material</small> <a class="h4 ps-2"  style="color: #490194;"><i class="bi-plus-circle-fill"></i></a>
                      </div>
                      <DashboardCreateSectionMaterial :course-section="this.currentSection" @toggleCreateMaterialForm="toggleCreateMaterialForm"   v-if="isCreateMaterial" />
                    </div>
                    <div style="max-height: 220px; overflow-y: scroll;" class="p-2">
                      <div class="p-2">
                        <div v-for="(material,index) in materialList" :key="index" class="row bg-light rounded-2 mb-2 section-material" style="transition: .2s;">
                          <div class="col"> 
                            <p class="pt-2"><small style="font-size: .78em;"><span class="primary-text fw-bold">{{material.title}}</span><br><span>#{{material._id}}</span></small></p>

                          </div>
                          <div class="col-auto text-center">
                            <p class="pt-3">
                              <span class="rounded bg-body mb-3 px-2">
                                <router-link :to="{ name: 'EditSectionMaterial', params: { materialId: material._id } }" class="primary-text ps-1"><i class="bi-pencil-square"></i></router-link>
                                <a @click="deleteMaterial(material._id)" class="text-danger ps-1"><i class="bi-trash-fill"></i></a>
                              </span>
                              <span class="ps-3 primary-text"><i class="bi-chevron-right"></i></span>
                            </p>
                          </div>
                          <hr class="px-3">
                          <div class="col-12 px-2">
                            <p style="font-size: .76em; display: none; transition: .2s;" class="sub-content">
                              <small>
                                {{material.description}}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
            </div>

            <div class="col-md-4">
              <div class="rounded bg-body p-3" style="position: relative;">
                <p class="h2">Course Sections</p>
                <p><small>Course title: lorem ipsum dolor sit</small></p>
                <div class="section-list-view" style="max-height: 455px; overflow-y: scroll;">
                  
                  <div class="bg-light rounded-2 mx-1 mb-2" style="display: grid; grid-template-columns: 2fr 5fr 2fr;">
                    <div class="p-1 pt-3">
                      <img src="@/assets/woman-teaching.jpg" class="w-100 rounded">
                    </div>
                    <div class="">
                      <p class="pt-2 px-2">
                        <span class="h5 p-0">Section title</span><br>
                        <span class="text-muted"><small>#2896jkas34</small></span>
                      </p>
                    </div>
                    <div class="">
                      <p class="rounded bg-body p-0 mt-4 me-1">
                        <a href="" class="primary-text ps-2"><i class="bi-pencil-square"></i></a>
                        <a href="" class="text-danger ps-1"><i class="bi-trash-fill"></i></a>
                      </p>
                    </div>
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
  import DashboardTemplate from '@/components/DashboardTemplate.vue';
  import axios from 'axios';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import DashboardCreateSectionMaterial from '@/views/course-management/DashboardCreateSectionMaterial.vue'

    export default {
        name: 'DashboardEditCourseSection',
        components: {
          DashboardTemplate,
          ckeditor: CKEditor.component,
          DashboardCreateSectionMaterial
        },
        props: {
        },
        mounted() {
          this.fetchSection();
          this.fetchContentLevels();
          this.fetchMaterials();
        },
        data() {
          return {
            isCreateMaterial:false,
            sectionId: this.$route.params.sectionId,
            courseId: '',
            editor: ClassicEditor,
            sectionTitle: '',
            description: '',
            contentLevels: '',
            contentLevel: '',
            course: '',
            material: '',
            materialList: '',
            image: null,
            imagePath: '',
            coverImage: '',
            loader: false,
            currentSection:''
          }
        },

        methods: {
          toggleCreateMaterialForm(){
            this.isCreateMaterial = !this.isCreateMaterial;
          },
          fetchSection() {
            axios.get('section/'+this.sectionId)
            .then(response => {
              this.courseId = response.data.message.sections.courseId
              this.sectionTitle = response.data.message.sections.title
              this.description = response.data.message.sections.description
              this.contentLevel = response.data.message.sections.contentLevel
              this.coverimage = response.data.message.sections.coverimage
              this.material = response.data.message.sections.material
              this.currentSection = response.data.message.sections;
              if (this.coverimage.length > 0) {
                this.imagePath = 'http://185.216.26.155:3000'+response.data.message.sections.coverimage;
              }
              
              console.log(response.data.message.sections)
            })
            .then(() => {
              this.fetchCourse();
            })
            .catch(error => {
              console.log(error)
            })
          },

          fetchCourse() {
            axios.get('get-course/'+this.courseId)
            .then(response => {
              this.course = response.data.message.courses;
              console.log('Course: '+this.course)
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

          fetchMaterials() {
            axios.get('section-materials/'+this.sectionId)
            .then(response => {
              this.materialList = response.data.message.materials
              console.log(this.materialList)
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

          deleteMaterial(e) {
            if (window.confirm('Are you sure you want to delete this section material?')) {
              axios.delete('delete/material/'+e)
              .then(() => {
                alert('Section material has been deleted');
                this.fetchMaterials();
              })
              .catch(error => {
                console.log(error)
              })
            }
          },

          editSection() {
            this.loader = true
            const arr = [];
            arr.push({
              parent: null,
              coverimage: this.coverimage,
              contentLevel: this.contentLevel,
              title: this.sectionTitle,
              description: this.description,
              material: this.material
            });

            axios.patch('edit-course-section/'+this.sectionId, arr)
            .then(response => {
              if (this.image !== null) {
                const fd = new FormData();
                fd.append('upload', this.image);
                axios.patch('/section/cover-image/'+this.sectionId, fd)
                .then(() => {
                  alert('Course Section Successfully Updated')
                  this.loader = false
                  this.fetchMaterials()
                })
                .catch(error => {
                  this.loader = false
                  alert('An error occured. Please try again later')
                  console.log(error)
                })
              } else {
                alert('Course Section Successfully Updated')
                this.loader = false
                this.$router.push('/dashboard/get-course/'+this.courseId)
                console.log(response.data)
              }
            })
          }
        }
    }
</script>

<style>
  .file-drag {
    background-image: url(@/assets/woman-teaching.jpg);
  }
    .section-material:hover {
        background-color: #F7EBFF !important;
    }
    .section-material:hover .sub-content {
        display: block !important;
    }
</style>