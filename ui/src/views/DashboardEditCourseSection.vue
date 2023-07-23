<template>
  <DashboardTemplate>
    <div class="container px-md-3 py-3">
        <div class="p-3">
          <div class="row">
            <div class="col-md-7">
              <div class="row p-2 col-12 rounded-2 m-1" style="background-color: #F7EBFF;">
                <div class="col"><p class="h6 fw-bold">Vocabulary Course</p></div>
                <div class="col-auto">
                <router-link class="btn primary-button btn-sm w-100 px-3" :to="{ name: 'ViewCourse' }">Navigate to Course</router-link>
                </div>
              </div>
              <div class="col-12 rounded bg-body p-3">
                <!-- Form Head Row -->
              <div class="row">
                <div class="col">
                  <p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif;">Vocabulary Course Section</p>
                  <p>Course title: # title name today</p>
                </div>
                <div class="col-auto d-flex">
                  <p>
                    <router-link :to="{ name: 'ViewCourse' }" class="btn btn-sm primary-button-outline px-5">Save</router-link>
                  </p>
                </div>
              </div>
              <hr>
              <!-- End Form Head Row -->

              <div class="row p-3">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="mb-3">
                        <input type="text" name="title" placeholder="Section Name" class="form-control" value="Vocabulary & Noun Collocation" />
                      </div>
                      <div class="mb-3">
                        <textarea class="form-control" placeholder="Section Short description" name="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dol. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dol.</textarea>
                      </div>
                    </div>

                    <div class="col-12 form-control">
                      <p class="h4">Course Tags</p>
                      <div class="row">
                        <div class="col">
                          <small class="d-inline-flex mb-3 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3">tag1</small>
                          <small class="d-inline-flex mb-3 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3">tag1</small>
                        </div>
                        <div class="col-auto">
                          <input type="text" name="tags" placeholder="Enter tag names..." class="form-control form-control-sm" style="border: none; border-left: 1px solid grey; border-radius: 0" />
                        </div>
                      </div>
                      <div class="bg-light p-2 mt-3 border rounded">
                          <small class="d-inline-flex mb-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3">tag1</small>
                            <small class="d-inline-flex mb-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3">tag1</small>
                            <small class="d-inline-flex mb-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3">tag1</small>
                            <small class="d-inline-flex mb-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3">tag1</small>
                            <small class="d-inline-flex mb-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3">tag1</small>
                            <small class="d-inline-flex mb-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3">tag1</small>              
                      </div>
                    </div>
                  </div>
            
                </div>
                <div class="col-md-6 p-3">
                  <div class="col-md-12 mb-3">
                      <div class="file-drag bg-light p-2 rounded-4" style="background-size: cover; background-position: center;">
                        <div class="drag-zone p-2 rounded-4 text-center" style="background-color: #F7EBFF; border: 2px dashed #ccc; opacity: 0.8;">
                          <p class="h1 primary-text"><i class="bi-image"></i></p>
                          <p style="font-size: .85em">
                            <small>Drag your photo here to start uploading</small>
                          </p>
                          <div class="row">
                            <div class="col-5"><hr></div>
                            <div class="col-2 p-0"><p class="h4">OR</p></div>
                            <div class="col-5"><hr></div>
                          </div>
                          <label class="btn btn-sm primary-button w-100 rounded-2" for="inputImage" style="opacity: 1;">
                            Browse files
                            <input type="file" name="image" class="visually-hidden" accept=".jpg, .jpeg, .png" id="inputImage" />
                          </label>
                        </div>
                      </div>
                  </div>
                </div>

                <div class="col-md-12 mt-3">
                  <textarea class="form-control editor" style="height: 155px;" name="long_description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dol.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dol.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dol.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dol.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dol.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dol.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dol.</textarea>
                </div>
              </div>
              <hr>
              <div class="p-2">
                <div class="row">
                  <div class="col">
                    <p><span class="h4">Section Material</span><br><small>Section ID: #er3482671</small></p>
                  </div>
                  <div class="col-auto">
                    <router-link :to="{ name: 'CreateSectionMaterial' }" class="fw-bold" style="color: #490194;">
                      <small>Create new material</small> <a class="h4 ps-2" style="color: #490194;"><i class="bi-plus-circle-fill"></i></a></router-link>
                  </div>
                </div>
                <div style="max-height: 220px; overflow-y: scroll;" class="p-2">
                  
                  <div class="p-2">
                    <div class="row bg-light rounded-2 mb-2 section-material" style="transition: .2s;">
                      <div class="col"> 
                        <p class="pt-2"><small style="font-size: .78em;"><span class="primary-text fw-bold">Common Verb + Noun Collocation</span><br><span>#34556678fdw</span></small></p>
                      </div>
                      <div class="col-auto text-center">
                        <p class="pt-3">
                          <span class="rounded bg-body mb-3 px-2">
                            <router-link :to="{ name: 'EditSectionMaterial' }" class="primary-text ps-1"><i class="bi-pencil-square"></i></router-link>
                            <a href="" class="text-danger ps-1"><i class="bi-trash-fill"></i></a>
                          </span>
                          <span class="ps-3 primary-text"><i class="bi-chevron-right"></i></span>
                        </p>
                      </div>
                      <hr class="px-3">
                      <div class="col-12 px-2">
                        <p style="font-size: .76em; display: none; transition: .2s;" class="sub-content">
                          <small>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                          </small>
                        </p>
                      </div>
                    </div>
                    <div class="row bg-light rounded-2 mb-2 section-material" style="transition: .2s;">
                      <div class="col"> 
                        <p class="pt-2"><small style="font-size: .78em;"><span class="primary-text fw-bold">Common Verb + Noun Collocation</span><br><span>#34556678fdw</span></small></p>
                      </div>
                      <div class="col-auto text-center">
                        <p class="pt-3">
                          <span class="rounded bg-body mb-3 px-2">
                            <a href="" class="primary-text ps-1"><i class="bi-pencil-square"></i></a>
                            <a href="" class="text-danger ps-1"><i class="bi-trash-fill"></i></a>
                          </span>
                          <span class="ps-3 primary-text"><i class="bi-chevron-right"></i></span>
                        </p>
                      </div>
                      <hr class="px-3">
                      <div class="col-12 px-2">
                        <p style="font-size: .76em; display: none;" class="sub-content">
                          <small>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                          </small>
                        </p>
                      </div>
                    </div>
                    <div class="row bg-light rounded-2 mb-2 section-material" style="transition: .2s;">
                      <div class="col"> 
                        <p class="pt-2"><small style="font-size: .78em;"><span class="primary-text fw-bold">Common Verb + Noun Collocation</span><br><span>#34556678fdw</span></small></p>
                      </div>
                      <div class="col-auto text-center">
                        <p class="pt-3">
                          <span class="rounded bg-body mb-3 px-2">
                            <a href="" class="primary-text ps-1"><i class="bi-pencil-square"></i></a>
                            <a href="" class="text-danger ps-1"><i class="bi-trash-fill"></i></a>
                          </span>
                          <span class="ps-3 primary-text"><i class="bi-chevron-right"></i></span>
                        </p>
                      </div>
                      <hr class="px-3">
                      <div class="col-12 px-2">
                        <p style="font-size: .76em; display: none; transition: .2s;" class="sub-content">
                          <small>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              
            </div>

            <div class="col-md-5">
              <div class="rounded bg-body p-3" style="position: relative;">
                <p class="h2">Course Sections</p>
                <p><small>Course title: lorem ipsum dolor sit</small></p>
                <div class="section-list-view" style="max-height: 455px; overflow-y: scroll;">
                  <!-- Related Section -->
                  <div class="bg-light rounded-2 mx-1 mb-2" style="display: grid; grid-template-columns: 2fr 5fr 1.5fr 1fr;">
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
                    <div class="">
                      <p class="p-2">
                        <a href="" class="text-secondary pb-1"><i class="bi-chevron-up"></i></a><br>
                        <a href="" class="text-secondary pt-2"><i class="bi-chevron-down"></i></a>
                      </p>
                    </div>
                  </div>

                  <!-- Related Section -->
                  <div class="bg-light rounded-2 mx-1 mb-2" style="display: grid; grid-template-columns: 2fr 5fr 1.5fr 1fr;">
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
                    <div class="">
                      <p class="p-2">
                        <a href="" class="text-secondary pb-1"><i class="bi-chevron-up"></i></a><br>
                        <a href="" class="text-secondary pt-2"><i class="bi-chevron-down"></i></a>
                      </p>
                    </div>
                  </div>

                  <!-- Related Section -->
                  <div class="bg-light rounded-2 mx-1 mb-2" style="display: grid; grid-template-columns: 2fr 5fr 1.5fr 1fr;">
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
                    <div class="">
                      <p class="p-2 h-100">
                        <a href="" class="text-secondary pb-1"><i class="bi-chevron-up"></i></a><br>
                        <a href="" class="text-secondary pt-2"><i class="bi-chevron-down"></i></a>
                      </p>
                    </div>
                  </div>

                  <!-- Related Section -->
                  <div class="bg-light rounded-2 mx-1 mb-2" style="display: grid; grid-template-columns: 2fr 5fr 1.5fr 1fr;">
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
                    <div class="">
                      <p class="p-2 h-100">
                        <a href="" class="text-secondary pb-1"><i class="bi-chevron-up"></i></a><br>
                        <a href="" class="text-secondary pt-2"><i class="bi-chevron-down"></i></a>
                      </p>
                    </div>
                  </div>

                  <!-- Related Section -->
                  <div class="bg-light rounded-2 mx-1 mb-2" style="display: grid; grid-template-columns: 2fr 5fr 1.5fr 1fr;">
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
                    <div class="">
                      <p class="p-2 h-100">
                        <a href="" class="text-secondary pb-1"><i class="bi-chevron-up"></i></a><br>
                        <a href="" class="text-secondary pt-2"><i class="bi-chevron-down"></i></a>
                      </p>
                    </div>
                  </div>

                  <!-- Related Section -->
                  <div class="bg-light rounded-2 mx-1 mb-2" style="display: grid; grid-template-columns: 2fr 5fr 1.5fr 1fr;">
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
                    <div class="">
                      <p class="p-2 h-100">
                        <a href="" class="text-secondary pb-1"><i class="bi-chevron-up"></i></a><br>
                        <a href="" class="text-secondary pt-2"><i class="bi-chevron-down"></i></a>
                      </p>
                    </div>
                  </div>

                  <!-- Related Section -->
                  <div class="bg-light rounded-2 mx-1 mb-2" style="display: grid; grid-template-columns: 2fr 5fr 1.5fr 1fr;">
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
                    <div class="">
                      <p class="p-2 h-100">
                        <a href="" class="text-secondary pb-1"><i class="bi-chevron-up"></i></a><br>
                        <a href="" class="text-secondary pt-2"><i class="bi-chevron-down"></i></a>
                      </p>
                    </div>
                  </div>

                </div>

                <div class="col-12" style="position: absolute;">
                    
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </DashboardTemplate>
</template>

<script>
  import DashboardTemplate from '../components/DashboardTemplate.vue';

    export default {
        name: 'DashboardEditCourseSection',
        components: {
          DashboardTemplate,
        },
        props: {
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