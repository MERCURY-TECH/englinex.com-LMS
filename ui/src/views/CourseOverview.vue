<template>
  <WebsiteTemplate>
    <section class="p-3">
      <div class="row col-md-12">
        <div class="col-md-4 px-4">
          <small
            class="d-inline-flex w-100 mb-3 ms-md-4 px-2 py-1 fw-semibold text-dark-emphasis bg-danger-subtle border border-danger-subtle rounded-2"
            >Courses <i class="bi-chevron-right"></i> The Material Title</small
          >
          <a class="btn primary-button ms-md-4 w-100 mb-4">About this Course</a>

          <div
            class="accordion ms-md-4 w-100 bg-light"
            id="accordionPanelsStayOpenExample"
          >
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  Section One
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                class="accordion-collapse collapse show"
              >
                <div class="accordion-body">
                  <!-- Sub Section -->
                  <div
                    class="accordion accordion-flush border"
                    id="accordionPanelsStayOpenExample"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header p-0">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayChild-collapseOne"
                          aria-controls="panelsStayOpen-collapseOne"
                        >
                          <small>Sub-Section</small>
                        </button>
                      </h2>
                      <div
                        id="panelsStayChild-collapseOne"
                        class="accordion-collapse collapse"
                      >
                        <div class="accordion-body"></div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayChild-collapseTwo"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseTwo"
                        >
                          <small>Sub-Section 2</small>
                        </button>
                      </h2>
                      <div
                        id="panelsStayChild-collapseTwo"
                        class="accordion-collapse collapse"
                      >
                        <div class="accordion-body"></div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayChild-collapseThree"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseThree"
                        >
                          <small>Sub-Section 3</small>
                        </button>
                      </h2>
                      <div
                        id="panelsStayChild-collapseThree"
                        class="accordion-collapse collapse"
                      >
                        <div class="accordion-body"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  Section 2
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                class="accordion-collapse collapse"
              >
                <div class="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  Section 3
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                class="accordion-collapse collapse"
              >
                <div class="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div
            class="h-100 rounded-2 file-drag"
            style="
              background-color: rgba(0, 0, 0, 0.5);
              background-blend-mode: multiply;
              background-size: cover;
              background-position: center;
            "
          >
            <p class="p-3 mt-1 text-light row">
              <span class="col">
                <span class="h4">
                  <span class="badge bg-light primary-text">1</span>
                </span>
                Beginner
              </span>

              <span class="col-auto">
                <span class="h4">
                  <span class="badge bg-success">7</span>
                </span>
                Advanced
              </span>
            </p>
          </div>
        </div>
        <div class="col-md-5">
          <div class="pt-5 px-2">
            <p class="row">
              <span
                class="h3 fw-bold col"
                style="font-family: 'Raleway', sans-serif"
                >The Course Title</span
              >
              <a class="btn btn-sm primary-button col-auto px-md-4 py-2"
                >Register Course</a
              >
            </p>
            <p
              class="border-start border-warning bg-warning-subtle p-4"
              style="line-height: -5px"
            >
              <small style="font-size: 0.8em"
                >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.</small
              >
            </p>
            <div
              class="p-3 row file-drag"
              style="
                background-color: rgba(0, 0, 0, 0.6);
                background-blend-mode: multiply;
                background-size: cover;
                background-position: center;
              "
            >
              <div class="col">
                <p
                  class="h3 text-light fw-bold"
                  style="font-family: 'Raleway', sans-serif"
                >
                  <span style="border-bottom: 5px solid #a01fef">Live</span>
                  Class
                </p>
                <p class="text-light">
                  <small
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod</small
                  >
                </p>
              </div>
              <div class="col-auto">
                <a class="btn btn-light primary-text" style="background: #fff"
                  >Go to class <i class="bi-camera-video-fill"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </WebsiteTemplate>
</template>

<script>
import WebsiteTemplate from "../components/WebsiteTemplate.vue";
//import axios from 'axios';

export default {
  name: "CourseOverview",
  components: {
    WebsiteTemplate,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.file-drag {
  background-image: url(@/assets/woman-teaching.jpg);
}
</style>
