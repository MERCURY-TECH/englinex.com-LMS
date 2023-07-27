<template>
	<WebsiteTemplate>
		<section>
	      <div class="row p-3">
	        <div class="col-md-3">
	          <small class="d-inline-flex mb-3 ms-md-4 px-2 py-1 fw-semibold text-dark-emphasis bg-danger-subtle border border-danger-subtle rounded-2">Home <i class="bi-chevron-right"></i> Courses</small>

	          <div class="card bg-body py-3">
	            <p class="h5 fw-bold border-bottom p-2 mx-4">Filter By</p>

	            <div class="col-12 px-4 mb-3">
	              <div class="border-start primary-border px-3">
	                <label for="customRange2" class="form-label fw-semibold"><small>Level</small></label>
	                <input type="range" class="form-range"  min="1" max="10" id="customRange2">
	                <div class="row">
	                  <div class="col"><small>1</small></div>
	                  <div class="col-auto"><small>10</small></div>
	                </div>
	              </div>
	            </div>

	            <div class="col-12 px-4 mb-3">
	              <div class="border-start primary-border px-2">
	                <p class="fw-semibold"><small>Keywords:</small></p>
	                <input type="text" v-model="tagNames" placeholder="Enter Keywords..." class="form-control form-control-sm w-75 d-inline-flex border primary-border" />
	                <a @click="createTags" class="btn btn-sm primary-button d-inline-flex"><i class="bi-search"></i></a>
	              </div>
	            </div>
	            <div class="col-12 px-4 mb-3">
	              <div class="border-start primary-border px-2">
	                <p class="fw-semibold"><small>Tags:</small></p>
	                <input type="text" v-model="tagNames" placeholder="Enter tag names..." class="form-control form-control-sm w-75 d-inline-flex border primary-border" />
	                <a @click="createTags" class="btn btn-sm primary-button d-inline-flex"><i class="bi-search"></i></a>
	              </div>
	            </div>
	          </div>
	        </div>

	        <div class="col-md-9">
	          <div class="bg-light p-1 rounded-2 shadow-sm border-bottom border-start">
	            <div class="row">
	              <div class="col-md-3 mb-3">
	                <a class="card h-100 bg-body p-3 nav-link" href="./course">
	                  <p class="h6 mt-3 border-bottom primary-border" style="font-family: 'Raleway', sans-serif;">
	                    The Course Title
	                  </p>
	                  <img class="w-100" src="@/assets/woman-teaching.jpg">
	                  <p class="pt-1 border-top primary-border mt-1">
	                    <span class="h6">
	                      <span class="badge bg-primary">1</span>
	                    </span> <small style="font-size: .8em">Beginner</small> 
	                    - 
	                    <span class="h6">
	                      <span class="badge bg-success">7</span>
	                    </span> <small style="font-size: .8em">Advanced</small>
	                  </p>
	                </a>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
	    </section>
	</WebsiteTemplate>
</template>

<script>
	import WebsiteTemplate from '../components/WebsiteTemplate.vue';
	import axios from 'axios';

	export default {
		name: 'CourseList',
		components: {
			WebsiteTemplate,
		},
	    data() {
	      return {
	        
	      }
	    },
	    methods: {
	      
	    }
	}
</script>

<style>
  .file-drag {
    background-image: url(@/assets/woman-teaching.jpg);
  }
</style>