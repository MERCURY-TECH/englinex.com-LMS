<template>
  <DashboardTemplate>
    <div class="container px-md-5 py-3">
      <form class="rounded bg-body p-3" @submit.prevent="editMaterial">
        <!-- Form Head Row -->
        <div class="row">
          <div class="col">
            <p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif">
              {{title}}
            </p>
            <p></p>
          </div>
          <div class="col-auto d-flex">
            <div class="pt-3">
              <button class="btn btn-sm primary-button-outline px-5 mx-2">
                Save
                <div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            </div>
            <!-- <div class="pt-3">
              <button class="btn btn-sm primary-button-outline mx-2">
                <i class="bi-upload"></i> Upload via CSV
              </button>
            </div> -->
            <router-link
              :to="'/dashboard/edit-course-section/'+sectionId"
              class="h3 text-danger ms-3"
              ><i class="bi-x-circle"></i
            ></router-link>
          </div>
        </div>
        <hr />
        <!-- End Form Head Row -->
        <div class="row p-3">
          <div class="form-control mb-3">
            <div class="form-check form-switch pt-3">
              <label class="form-check-label" for="makeCoursePublic">
                <span v-if="isPublic">
                  <span class="badge primary-bg"><i class="bi-globe-europe-africa"></i> Public</span>
                </span>
                <span v-else>
                  <small><span>Make This Material Public</span></small>
                </span>
              </label>
                  <input class="form-check-input" type="checkbox" v-if="isPublic" checked role="switch" id="makeCoursePublic" @change="makePublic">
                  <input class="form-check-input" type="checkbox" v-else role="switch" id="makeCoursePublic" @change="makePublic">
            </div>
          </div>
          <div class="col-md-12 row">
            <div class="mb-3 col-md-12">
              <input
                type="text"
                v-model="title"
                placeholder="Material Title"
                class="form-control"
              />
            </div>
            <div class="mb-3 col-md-12">
              <textarea
                class="form-control"
                placeholder="Material description"
                style="min-height: 75px"
                v-model="description"
              ></textarea>
            </div>
            
          </div>
          <div class="col-md-12">
            <div class="">
              <form class="mb-3">
                <div class="row">
                  <div class="col-md-12 mb-3 ">
                    <ckeditor :editor="editor" v-model="content" ></ckeditor>
                  </div>
                </div>
              </form>
          
            </div>
          </div>
        </div>
      </form>
    </div>
  </DashboardTemplate>
</template>

<script>
import DashboardTemplate from "../components/DashboardTemplate.vue";
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
  name: "DashboardEditSectionMaterial",
  components: {
    DashboardTemplate,
    ckeditor: CKEditor.component
  },
  props: {},
  data() {
    return {
      materialId: this.$route.params.materialId,
      sectionId: '',
      showForm: false,
      editor: ClassicEditor,
      title: '',
      description: '',
      content: '',
      isPublic: false,
      loader: false
    }
  },
  mounted() {
    this.fetchMaterial()
  },
  methods: {
    toggleShowForm() {
      this.showForm = !this.showForm;
    },
    fetchMaterial() {
      axios.get('materials/'+this.materialId)
      .then(response => {
        this.title = response.data.message.materials.title
        this.description = response.data.message.materials.description
        this.content = response.data.message.materials.content
        this.isPublic = response.data.message.materials.isPublic
        this.sectionId = response.data.message.materials.sectionId
        console.log(response.data.message)
      })
      .catch(error => {
        console.log(error)
      })
    },
    makePublic() {
      if (this.isPublic) { this.isPublic = false } else { this.isPublic = true }
    },
    editMaterial() {
      this.loader = true
      axios.patch('edit-section-material/'+this.materialId, {
        title: this.title,
        description: this.description,
        isPublic: this.isPublic,
        content: this.content
      })
      .then(response => {
        console.log(response)
        alert('The Material Was Succesfully Updated')
        this.loader = false
        this.$router.push('/dashboard/edit-course-section/'+this.sectionId)
      })
      .catch(error => {
        alert('An error occured, please retry later')
        this.loader = false
        console.log(error)
      })
    }
  },
};
</script>

<style>
.section-material:hover {
  background-color: #f7ebff !important;
}
.section-material:hover .sub-content {
  display: block !important;
}
</style>
