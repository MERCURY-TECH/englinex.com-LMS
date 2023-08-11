<template>
  <div v-if="courseSection" class="modal-body">
    <div class="container-fluid px-md-5 py-3">
      <form class="rounded bg-body p-3" @submit.prevent="createMaterial">
        <!-- Form Head Row -->
        <div class="row">
          <div class="col">
            <p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif">
          New Section Material
        </p>  {{ courseSection.sectionTitle }}
            <p>Section title: </p>
          </div>
          <div class="col">
            <div class="form-check form-switch form-check-reverse pt-3">
              <label class="form-check-label" for="makeCoursePublic">
                <span v-if="this.isPublic">
                  <span class="badge primary-bg"><i class="bi-globe-europe-africa"></i> Public</span>
                </span>
                <span v-else>
                  <small><span>Make Course Public</span></small>
                </span>
              </label>
              <input class="form-check-input" type="checkbox" role="switch" id="makeCoursePublic"
                @change="() => { this.isPublic = !this.isPublic }">
            </div>
          </div>
          <div class="col-auto d-flex">
            <div class="">
              <button class="btn btn-sm primary-button-outline px-5 mx-2">
                Save
                <div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            </div>
            <span class="h3 text-danger ms-3"><i class="bi-x-circle"></i></span>
          </div>
        </div>
        <!-- End Form Head Row -->
        <div style="border: 1px solid #70707034; border-radius: 11px;" class="row p-3">
          <div class="col-md-6">
            <div class="mb-3 col-md-12">
              <input type="text" v-model="this.title" placeholder="Material Title" class="form-control" />
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-10">
                  <select @change="handleChange" class="mb-3 form-control " name="materialType"
                    v-model="this.displayBGColor">
                    <option selected disabled key='none' value="">Material color</option>
                    <option v-for="matColor in this.materialColorList" v-bind:key="matColor" v-bind:matType="matColor">
                      <div
                        :style="'background-color:' + matColor.colorCode + '; width: 10px; height: 10px; border-radius: 11;'"
                        class="col-3"> </div>
                      <div class="col-9">
                        {{ matColor.title }}
                      </div>
                    </option>
                  </select>
                </div>
                <div class="col-2 py-2">
                  <span class="h4 ps-2" style="color: #490194;"><i class="bi-plus-circle-fill"></i></span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <select @change="handleChange" class="mb-3 form-control " name="materialType" v-model="this.materialType">
                <option selected disabled key='none' value="">Material Type</option>
                <option v-for="matType in this.materialTypeList" v-bind:key="matType" v-bind:matType="matType"> {{ matType
                }}</option>

              </select>

              <div :key="error" v-for="error in formErrors.messages.materialType" :error="error"
                class="invalid-feedback p2"> {{ error }} </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3 col-md-12">
              <textarea class="form-control" placeholder="Material description" style="min-height: 150px"
                v-model="this.description"></textarea>
            </div>
          </div>
          <hr />
          <div class="row mb-3">
            <div v-if="isMaterialAPhonetic" class="input-group has-validation">
              <input @keyup="handleChange" name="sound" type="text" v-model="this.sound" placeholder="Sound"
                class="mb-3 form-control  p-2 px-3" />
              <div :key="error" v-for="error in formErrors.messages.sound" :error="error" class="invalid-feedback p2">
                {{ error }} </div>
            </div>
            <div v-if="isMaterialAPhonetic" class="input-group has-validation">
              <input @keyup="handleChange" name="englishText" type="text" v-model="this.englishText"
                placeholder="English text" class="mb-3 form-control  p-2 px-3" />
              <div :key="error" v-for="error in formErrors.messages.englishText" :error="error"
                class="invalid-feedback p2"> {{ error }} </div>
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <p>Content</p>
            <div class="input-group has-validation">
              <ckeditor :editor="this.editor" v-model="this.content"></ckeditor>
              <div :key="error" v-for="error in formErrors.messages.content" :error="error" class="invalid-feedback p2">
                {{ error }} </div>
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <p>Answers</p>
            <div class="input-group has-validation">
              <ckeditor :editor="this.editor" v-model="this.answer"></ckeditor>
              <div :key="error" v-for="error in formErrors.messages.answer" :error="error" class="invalid-feedback p2">
                {{ error }} </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
  <div v-if="!courseSection" class="modal-body">
    <div class="container-fluid px-md-5 py-3">
            <p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif"> No Section  </p>
    </div>
  </div>
</template>

<script >
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
  name: "DashboardCreateSectionMaterial",
  components: {
    ckeditor: CKEditor.component
  },
  props: {courseSection:{type:String, require:true}},
  mounted() {
    this.fetchSection();
  },
  data() {
    return {
      sectionId: this.courseSection._id,
      sectionTitle: '',
      editor: ClassicEditor,
      materialType: 'rich-text',
      title: '',
      displayBGColor: '',
      description: '',
      content: '',
      answer: '',
      sound:'',
      englishText:'',
      isPublic:false,
      loader: false,
      formErrors: { error: false, messages: {} },
      materialTypeList: ['rich-text', 'phonetic'],
      materialColorList: []
    };
  },
  methods: {
    handleChange(e) {
      this.isError();
      if (this.formErrors.messages[e.target.getAttribute('name')]) {
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
        return
      }
      e.target.classList.remove("is-invalid");
      e.target.classList.add("is-valid");
    },

    isError() {
      let errorMessages = {};
      if (!this.materialType) { errorMessages['materialType'] = ['You must provide the material type'] }
      if (!this.title) { errorMessages['title'] = ['You must provide the material title'] }
      if (!this.description) { errorMessages['description'] = ['You must provide the material description'] }
      if (!this.content) { errorMessages['content'] = ['You must provide the material content'] }
      if(this.isMaterialAPhonetic){
        if (!this.sound) { errorMessages['sound'] = ['You must provide the material sound'] }
        if (!this.englishText) { errorMessages['englishText'] = ['You must provide the material englishText'] }
      }
      this.formErrors = { error: Object.keys(errorMessages).length > 0 ? true : false, messages: errorMessages }
    },

    fetchSection() {
      axios.get('section/' + this.sectionId)
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
      let material = {
        materialType: this.materialType,
        title: this.title,
        description: this.description,
        content: this.content
      }
      if(this.displayBGColor) material['displayBGColor'] = this.displayBGColor;
      if(this.answer) material['answer'] = this.answer;
      if(this.sound) material['sound'] = this.sound;
      if(this.englishText) material['englishText'] = this.englishText;
      material['isPublic'] = this.isPublic;
      arr.push(material);
    
      axios.post('create-material-section/' + this.sectionId, arr)
        .then(response => {
          alert('Section Material Created Successfully')
          this.loader = false
          this.$router.push('/admin/dashboard/edit-course-section/' + response.data.message.courseMaterial[0].sectionId)
        })
        .catch(error => {
          alert('An error occured, please retry later')
          this.loader = false
          console.log(error)
        })
    }
  },
  computed: {
    isMaterialAPhonetic: function () {
      return this.materialType === 'phonetic'
    }
  }
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
