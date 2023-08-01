<template>
  <WebsiteTemplate>
    <section>
      <div class="container">
        <div class="row p-2">
          <div
            class="col-md-6 file-drag row rounded-2 justify-content-center py-5"
            style="
              background-color: rgba(0, 0, 0, 0.6);
              background-blend-mode: multiply;
              background-size: cover;
              background-position: center;
            "
          >
            <div class="col-md-8 px-3 py-3" style="background-color: #fcf6ff">
              <p
                class="h1 text-center fw-bold"
                style="font-family: 'Raleway', sans-serif"
              >
                Sign Up
              </p>
              <form method="POST" class="text-center p-3" action="">
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  class="form-control mb-2 p-2 px-3"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  class="form-control mb-2 p-2 px-3"
                />
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  class="form-control mb-1 p-2 px-3"
                />
                <label for="agreement" class="mb-2">
                  <input
                    id="agreement"
                    type="checkbox"
                    required
                    value="1"
                    name="agree_terms"
                  />
                  <small>I agree with the terms and conditions</small>
                </label>
                <button class="btn primary-button-outline form-control">
                  Register
                </button>
              </form>
              <p class="text-muted px-3">
                <small>
                  Already have an account?
                  <a href="./login" class="primary-text fw-bold">Login now.</a>
                </small>
              </p>
            </div>
          </div>
          <div class="col-md-6 px-4">
            <div class="col-12 row mx-3">
              <div class="col">
                <p
                  class="h1 fw-bold"
                  style="font-family: 'Raleway', sans-serif"
                >
                  Checkout
                </p>
              </div>
              <div class="col-auto">
                <p><small>Back to courses</small></p>
              </div>
            </div>
            <div class="col-12 row border-bottom primary-border mx-3">
              <div class="col">
                <p class=""><small>Continue with free trial</small></p>
              </div>
              <div class="col-auto">
                <p><small>Edit</small></p>
              </div>
            </div>
            <form class="row mx-3" @submit.prevent="">
              <span class="col-12">
                <p class="fw-bold mt-2">
                  <small>Where's this order going?</small>
                </p>
              </span>
              <div class="col-12 mb-2">
                <input
                  type="text"
                  class="form-control"
                  name="country"
                  placeholder="Country"
                />
              </div>
              <div class="col-md-6 mb-2">
                <input
                  type="text"
                  class="form-control"
                  name="firstname"
                  placeholder="Firstname"
                />
              </div>
              <div class="col-md-6 mb-2">
                <input
                  type="text"
                  class="form-control"
                  name="lastname"
                  placeholder="Lastname"
                />
              </div>
              <div class="col-md-7 mb-2">
                <input
                  class="form-control"
                  name="address"
                  type="text"
                  placeholder="Address"
                />
              </div>
              <div class="col-md-5 mb-2">
                <input
                  class="form-control"
                  name="building"
                  type="text"
                  placeholder="Appt/Floor/Suite"
                />
              </div>
              <div class="col-md-4 mb-2">
                <input
                  class="form-control"
                  name="city"
                  type="text"
                  placeholder="City"
                />
              </div>
              <div class="col-md-4 mb-2">
                <input
                  class="form-control"
                  name="state"
                  type="text"
                  placeholder="State"
                />
              </div>
              <div class="col-md-4 mb-2">
                <input
                  class="form-control"
                  name="zip"
                  type="text"
                  placeholder="Zip Code"
                />
              </div>
              <div class="col-md-12 mb-2">
                <input
                  class="form-control"
                  name="Phone"
                  type="text"
                  placeholder="Phone"
                />
              </div>
              <div class="col-12 text-end">
                <button class="btn primary-button px-5 mb-2">Next</button>
              </div>

              <div
                class="col-12 row border-bottom border-top primary-border pt-1"
              >
                <p class="col">
                  <small>
                    <span class="fw-bold">Bundle</span><br />
                    Premium - 12 months ($120)
                  </small>
                </p>
                <p class="col-auto">
                  <small>
                    <a class="nav-link">Edit</a>
                  </small>
                </p>
              </div>
            </form>
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
  name: "SignupCheckout",
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
