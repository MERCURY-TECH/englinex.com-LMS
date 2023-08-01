<template>
  <DashboardTemplate>
    <div class="container px-md-5 py-3">
      <form class="rounded bg-body p-3" @submit.prevent="createMaterial">
        <!-- Form Head Row -->
        <div class="row">
          <div class="col">
            <p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif">
              New Section Material
            </p>
            <p>Section title: {{sectionTitle}}</p>
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
            <div class="pt-3">
              <button class="btn btn-sm primary-button-outline mx-2">
                <i class="bi-upload"></i> Upload via CSV
              </button>
            </div>
            <router-link
              :to="{ name: 'EditCourseSection', params: { sectionId: sectionId } }"
              class="h3 text-danger ms-3"
              ><i class="bi-x-circle"></i
            ></router-link>
          </div>
        </div>
        <hr />
        <!-- End Form Head Row -->
        <div class="row p-3">
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
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
  name: "DashboardCreateSectionMaterial",
  components: {
    DashboardTemplate,
    ckeditor: CKEditor.component
  },
  props: {},
  mounted() {
    this.fetchSection();
  },
  data() {
    return {
      sectionId: this.$route.params.sectionId,
      sectionTitle: '',
      editor: ClassicEditor,
      materialType: 'rich-text',
      title: '',
      description: '',
      content: '',
      loader: false
    };
  },
  methods: {
    fetchSection() {
      axios.get('section/'+this.sectionId)
      .then(response => {
        this.sectionTitle = response.data.message.sections.title
        console.log(response.data.message.sections)
      })
      .catch(error => {
        console.log(error)
      })
    },
    createMaterial() {
      this.loader = true;
      const arr = [];
      arr.push({
        materialType: this.materialType,
        title: this.title,
        description: this.description,
        content: this.content
      });

      axios.post('create-material-section/'+this.sectionId, arr)
      .then(response => {
        alert('Section Material Created Successfully')
        console.log(response)
        this.loader = false
        this.$router.push('/dashboard/edit-course-section/'+response.data.message.courseMaterial[0].sectionId)
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
