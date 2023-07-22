<template>
  <DashboardTemplate>
    <div class="container px-md-5 py-3">
      <div class="rounded bg-body p-3">
        <!-- Form Head Row -->
        <div class="row">
          <div class="col">
            <p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif">
              New Section Material
            </p>
            <p>Section title: Lorem ipsum dolor sit</p>
          </div>
          <div class="col-auto d-flex">
            <div class="pt-3">
              <button class="btn btn-sm primary-button-outline px-5 mx-2">
                Save
              </button>
            </div>
            <div class="pt-3">
              <button class="btn btn-sm primary-button-outline mx-2">
                <i class="bi-upload"></i> Upload via CSV
              </button>
            </div>
            <router-link
              :to="{ name: 'EditCourseSection' }"
              class="h3 text-danger ms-3"
              ><i class="bi-x-circle"></i
            ></router-link>
          </div>
        </div>
        <hr />
        <!-- End Form Head Row -->
        <div class="row p-3">
          <div class="col-md-5">
            <div class="mb-3">
              <select class="form-select" name="section_id">
                <option>Section Title:</option>
                <option>Section 1</option>
                <option>Section 2</option>
                <option>Section 3</option>
                <option>Section 4</option>
                <option>Section 5</option>
              </select>
            </div>
            <div class="mb-3">
              <input
                type="text"
                name="title"
                placeholder="Content Title"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <textarea
                class="form-control"
                placeholder="Content Short description"
                style="min-height: 75px"
                name="description"
              ></textarea>
            </div>
            <p class="h4 mt-4">Content Tags</p>
            <p class="text-muted" style="font-size: 0.9em">
              <small
                >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                do eiusmod tempor incididunt ut labore et dol.</small
              >
            </p>
            <div class="form-control">
              <div class="row">
                <div class="col">
                  <small
                    class="d-inline-flex mb-3 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
                    >tag1</small
                  >
                  <small
                    class="d-inline-flex mb-3 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
                    >tag1</small
                  >
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    name="tags"
                    placeholder="Enter tag names..."
                    class="form-control form-control-sm"
                    style="
                      border: none;
                      border-left: 1px solid grey;
                      border-radius: 0;
                    "
                  />
                </div>
              </div>
              <div class="bg-light p-3 mt-3 border rounded">
                <small
                  class="d-inline-flex mb-3 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
                  >tag1</small
                >
                <small
                  class="d-inline-flex mb-3 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
                  >tag1</small
                >
                <small
                  class="d-inline-flex mb-3 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
                  >tag1</small
                >
                <small
                  class="d-inline-flex mb-3 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
                  >tag1</small
                >
                <small
                  class="d-inline-flex mb-3 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
                  >tag1</small
                >
                <small
                  class="d-inline-flex mb-3 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
                  >tag1</small
                >
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="p-2">
              <form class="mb-3">
                <div class="row border p-2">
                  <div class="col-md-6">
                    <div class="mb-3 mt-3">
                      <input
                        type="text"
                        name="title"
                        placeholder="Material Title"
                        class="form-control"
                      />
                    </div>
                    <div class="mb-3">
                      <select class="form-select" name="section_id">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Expert</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3 mt-3">
                    <textarea
                      class="form-control"
                      placeholder="Material description"
                      style="min-height: 75px"
                      name="description"
                    ></textarea>
                  </div>
                </div>
              </form>
              <div class="row">
                <div class="col">
                  <p>
                    <span class="h4">Section Material</span><br /><small
                      >Section ID: #er3482671</small
                    >
                  </p>
                </div>
                <div class="col-auto">
                  <p
                    class="fw-bold"
                    style="color: #490194; cursor: pointer"
                    @click="toggleShowForm()"
                  >
                    <small>Create new content</small>
                    <a class="h4 ps-2" style="color: #490194"
                      ><i class="bi-plus-circle-fill"></i
                    ></a>
                  </p>
                </div>
              </div>
              <!-- Content form -->
              <div
                class="p-2 rounded"
                v-if="showForm"
                style="background-color: #f7ebff"
              >
                <div class="row">
                  <div class="col">
                    <p>
                      <button
                        class="btn btn-sm btn-light px-4 primary-text fw-bold"
                      >
                        Save
                      </button>
                    </p>
                  </div>
                  <div class="col-auto">
                    <a class="text-danger" @click="toggleShowForm()"
                      ><i class="bi-x-circle"></i
                    ></a>
                  </div>
                </div>
                <form class="row">
                  <div class="col-md-6">
                    <textarea
                      class="form-control editor h-100"
                      name="material-content"
                    >
Content...</textarea
                    >
                  </div>
                  <div class="col-md-6">
                    <div class="mb-1">
                      <label
                        ><small>Content type + associated color</small></label
                      >
                      <select class="form-select" name="section_id">
                        <option>Parent Section:</option>
                        <option>Section 1</option>
                        <option>Section 2</option>
                        <option>Section 3</option>
                      </select>
                    </div>
                    <div class="mb-1">
                      <select class="form-select" name="section_id">
                        <option>Content Type:</option>
                        <option>Sound</option>
                        <option>Text</option>
                        <option>Video</option>
                      </select>
                    </div>
                    <div class="mb-1">
                      <input class="form-control" placeholder="Color" />
                    </div>
                  </div>
                </form>
              </div>
              <div style="overflow-y: scroll" class="p-2">
                <div class="p-2">
                  <div
                    class="row bg-light rounded-2 mb-2 section-material"
                    style="transition: 0.2s"
                  >
                    <div class="col">
                      <p class="pt-2">
                        <small style="font-size: 0.78em"
                          ><span class="primary-text fw-bold"
                            >Common Verb + Noun Collocation</span
                          ><br /><span>#34556678fdw</span></small
                        >
                      </p>
                    </div>
                    <div class="col-auto text-center">
                      <p class="pt-3">
                        <span class="rounded bg-body mb-3 px-2">
                          <router-link
                            :to="{ name: 'EditSectionMaterial' }"
                            class="primary-text ps-1"
                            ><i class="bi-pencil-square"></i
                          ></router-link>
                          <a href="" class="text-danger ps-1"
                            ><i class="bi-trash-fill"></i
                          ></a>
                        </span>
                        <span class="ps-3 primary-text"
                          ><i class="bi-chevron-right"></i
                        ></span>
                      </p>
                    </div>
                    <hr class="px-3" />
                    <div class="col-12 px-2">
                      <p
                        style="
                          font-size: 0.76em;
                          display: none;
                          transition: 0.2s;
                        "
                        class="sub-content"
                      >
                        <small>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam
                        </small>
                      </p>
                    </div>
                  </div>
                  <div
                    class="row bg-light rounded-2 mb-2 section-material"
                    style="transition: 0.2s"
                  >
                    <div class="col">
                      <p class="pt-2">
                        <small style="font-size: 0.78em"
                          ><span class="primary-text fw-bold"
                            >Common Verb + Noun Collocation</span
                          ><br /><span>#34556678fdw</span></small
                        >
                      </p>
                    </div>
                    <div class="col-auto text-center">
                      <p class="pt-3">
                        <span class="rounded bg-body mb-3 px-2">
                          <a href="" class="primary-text ps-1"
                            ><i class="bi-pencil-square"></i
                          ></a>
                          <a href="" class="text-danger ps-1"
                            ><i class="bi-trash-fill"></i
                          ></a>
                        </span>
                        <span class="ps-3 primary-text"
                          ><i class="bi-chevron-right"></i
                        ></span>
                      </p>
                    </div>
                    <hr class="px-3" />
                    <div class="col-12 px-2">
                      <p
                        style="font-size: 0.76em; display: none"
                        class="sub-content"
                      >
                        <small>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam
                        </small>
                      </p>
                    </div>
                  </div>
                  <div
                    class="row bg-light rounded-2 mb-2 section-material"
                    style="transition: 0.2s"
                  >
                    <div class="col">
                      <p class="pt-2">
                        <small style="font-size: 0.78em"
                          ><span class="primary-text fw-bold"
                            >Common Verb + Noun Collocation</span
                          ><br /><span>#34556678fdw</span></small
                        >
                      </p>
                    </div>
                    <div class="col-auto text-center">
                      <p class="pt-3">
                        <span class="rounded bg-body mb-3 px-2">
                          <a href="" class="primary-text ps-1"
                            ><i class="bi-pencil-square"></i
                          ></a>
                          <a href="" class="text-danger ps-1"
                            ><i class="bi-trash-fill"></i
                          ></a>
                        </span>
                        <span class="ps-3 primary-text"
                          ><i class="bi-chevron-right"></i
                        ></span>
                      </p>
                    </div>
                    <hr class="px-3" />
                    <div class="col-12 px-2">
                      <p
                        style="
                          font-size: 0.76em;
                          display: none;
                          transition: 0.2s;
                        "
                        class="sub-content"
                      >
                        <small>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam
                        </small>
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
  </DashboardTemplate>
</template>

<script>
import DashboardTemplate from "../components/DashboardTemplate.vue";

export default {
  name: "DashboardCreateSectionMaterial",
  components: {
    DashboardTemplate,
  },
  props: {},
  data() {
    return {
      showForm: false,
    };
  },
  methods: {
    toggleShowForm() {
      this.showForm = !this.showForm;
    },
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
