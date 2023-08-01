<template>
  <DashboardTemplate>
    <div class="container p-md-5">
          <div class="row">

            <div class="col-md-3 mb-4">
              <div class="card pt-2 px-3">
                <p class="h6 text-muted">Total Courses</p>
                <div class="row">
                  <div class="col"><p class="h3 fw-bold">{{courseList.length}}</p></div>
                  <div class="col-auto">
                    <div class="p-2 text-center" style="background-color: lightblue; border-radius: 50%; padding-top: 17px; height: 40px; width: 40px;">
                      <p class="h5 text-primary" style=""><i class="bi-arrow-repeat"></i></p>
                    </div>
                  </div>
                </div>
                <p class="text-muted" style="font-size: 0.79em;">
                  <small>
                    <span class="text-success"><strong>250</strong> <i class="bi-arrow-up"></i></span>
                     participants this month
                  </small>
                </p>
              </div>
            </div>

            <div class="col-md-3 mb-4">
              <div class="card pt-2 px-3">
                <p class="h6 text-muted">Total Number of Roles</p>
                <div class="row">
                  <div class="col"><p class="h3 fw-bold">56%</p></div>
                  <div class="col-auto">
                    <div class="p-2 text-center" style="background-color: lightblue; border-radius: 50%; padding-top: 17px; height: 40px; width: 40px;">
                      <p class="h5 text-primary" style=""><i class="bi-percent"></i></p>
                    </div>
                  </div>
                </div>
                <p class="text-muted" style="font-size: 0.79em;">
                  <small>
                    <span class="text-success"><strong>21%</strong> <i class="bi-arrow-up"></i></span>
                     than last year
                  </small>
                </p>
              </div>
            </div>

            <div class="col-md-3 mb-4">
              <div class="card pt-2 px-3">
                <p class="h6 text-muted">Total Revenues</p>
                <div class="row">
                  <div class="col"><p class="h3 fw-bold">$714,234</p></div>
                  <div class="col-auto">
                    <div class="p-2 text-center" style="background-color: lightblue; border-radius: 50%; padding-top: 17px; height: 40px; width: 40px;">
                      <p class="h5 text-primary" style=""><i class="bi-coin"></i></p>
                    </div>
                  </div>
                </div>
                <p class="text-muted" style="font-size: 0.79em;">
                  <small>
                    <span class="text-danger"><strong>1.8%</strong> <i class="bi-arrow-down"></i></span>
                     than last year
                  </small>
                </p>
              </div>
            </div>

            <div class="col-md-3 mb-4">
              <div class="card pt-2 px-3">
                <p class="h6 text-muted">Total Users</p>
                <div class="row">
                  <div class="col"><p class="h3 fw-bold">20k</p></div>
                  <div class="col-auto">
                    <div class="p-2 text-center" style="background-color: lightblue; border-radius: 50%; padding-top: 17px; height: 40px; width: 40px;">
                      <p class="h5 text-primary" style=""><i class="bi-people"></i></p>
                    </div>
                  </div>
                </div>
                <p class="text-muted" style="font-size: 0.79em;">
                  <small>
                    <span class="text-success"><strong>1.3%</strong> <i class="bi-arrow-up"></i></span>
                     than last year
                  </small>
                </p>
              </div>
            </div>


            <div class="col-md-12 rounded bg-body mb-3">
              <div class="row px-3 pb-3 pt-3">
                <div class="col px-3 pt-1"><p class="h4 fw-bold">Courses</p></div>
                <div class="col-auto">
                  <router-link class="btn btn-sm primary-button-outline px-5" :to="{ name: 'CreateCourse' }"> New </router-link>
                </div>
              </div>
              <div class="px-md-2 pb-5">
                <hr>
                <div class="my-2">
                    <table class="w-100">
                      <tbody>
                        <tr v-for="course in courseList" :key="course._id" class="table-row" style="margin-bottom: 10px;">
                          <td class="pt-3 px-4">
                            <p>
                              
                              <a @click="viewCourse(course._id)" class="nav-link" style="cursor: pointer;">
                              <span class="h6 fw-bold">{{ course.title }}</span><br>
                              <span class="text-muted"><small>{{ course._id }}</small></span>
                              </a>
                            </p>
                          </td>
                          <!-- <td class="pt-3 px-4">
                            <p><small><strong>Uploaded on:</strong><span class="text-muted">{{ course.createdAt }}</span></small></p>
                          </td>
                          <td class="pt-3 px-4 pe-md-5">
                            <p><small><strong>Updated on:</strong><span class="text-muted">{{ course.updatedAt }}</span></small></p>
                          </td> -->
                          <td class="pt-3 px-3 ps-md-5">
                            <p>
                              <span v-if="course.isPublic">
                                <span class='badge pill text-purple primary-bg-subtle h2 px-2 me-1'> Active</span>
                                <span class='badge pill text-info-emphasis bg-info-subtle h2 px-2'> Public</span>
                              </span>
                              <span v-else>
                                <span class='badge pill text-danger-emphasis bg-danger-subtle h2 px-2 me-1'> Inactive</span>
                                <span class='badge pill text-secondary-emphasis bg-secondary-subtle h2 px-2'>Not Published</span>
                              </span>
                            </p>
                          </td>
                          <td class="pt-3 px-3">
                            <p class="table-action">
                              <router-link :to="{ name: 'EditCourse', params: { id: course._id } }" class="primary-text px-2"><i class="bi-pencil-square"></i></router-link>
                              <a @click="deleteCourse(course._id)" class="text-danger px-2"><i class="bi-trash-fill"></i></a>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
              </div>
            </div>

          </div>
    </div>
  </DashboardTemplate>
</template>

<script>
import axios from 'axios';
import DashboardTemplate from '../components/DashboardTemplate.vue';

export default {
  name: 'DashboardCourses',
  components: {
    DashboardTemplate,
  },
  data() {
    return {
      courseList: []
    }
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      axios.get('get-all-courses/')
        .then(response => {
          this.courseList = response.data.message.courses;
          console.log(response.data.message.courses);
        })
        .catch(error => {
          // Handle the error
          console.log(error);
        });
    },
    viewCourse(e) {
      this.$router.push('/dashboard/get-course/'+ e);
    },
    deleteCourse(e) {
      if (window.confirm('Are you sure you want to delete this course?')) {
        axios.delete('delete/course/'+e)
        .then(() => {
          alert('The course has been deleted')
          this.fetchData();
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
  }
}
</script>

<style scoped>
  body { background-color: #15223214; }
</style>