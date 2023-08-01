<template>
    <DashboardTemplate>
        <div class="bundles">
            <div class="row my-5 p-2">
                <div class="col-md-8 rounded-2 overflow-hidden">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <p class="h6 fw-bold">Platform Teachers</p>
                        <form class="w-50" role="search">
                            <input class="form-control  rounded" type="search" placeholder="Search" aria-label="Search">

                        </form>
                    </div>
                    <div class="bg-white rounded p-2">
                        <div class="teacher">
                            <Teachers v-for="(teacher, i) in teachers" :teacher="teacher" :index="i" :key="i"
                                :open="teacher.open" @toggleOpen="toggleOpen" />


                        </div>
                    </div>
                </div>
                <div class="col-md-4  mt-3 mt-md-0">
                    <div class="bg-white p-2 rounded" v-if="adminRoles">
                        <div class=" p-2 d-flex align-items-center justify-content-between">
                            <p class="h6 fw-bold">Manage Roles</p>
                            <p class="h4 ms-auto" style="color: #490194; cursor: pointer;">
                      <i class="bi-plus-circle-fill" @click="createRoles()"></i>
                    </p>
                            <hr>
                        </div>
                        <ul class="list-group">
  <li class="list-group-item">Super Admin</li>
  <li class="list-group-item">Accountant</li>
  <li class="list-group-item">Content Curator</li>
  <li class="list-group-item">Super Admin Role</li>
  <li class="list-group-item">Super Admin Role</li>
</ul>
                    </div>
                    <div class="bg-white p-2 rounded" v-else>
                        <div class=" p-2 d-flex align-items-center justify-content-between">
                            <p class="h6 fw-bold">Create Roles</p>
                            <p class="h4 ms-auto" style="color: crimson; cursor: pointer;">
                                <i class="bi bi-x" @click="showRoles()"></i>
                    </p>
                            <hr>
                        </div>
                        <form action="" class="">

                            <div class="mb-3">
                                <input type="text" class="form-control form-control-sm" id="" placeholder="Role Name">
                            </div>
                            <div class="mb-3">

                                <textarea class="form-control form-control-sm" placeholder="Role description" id=""
                                    rows="3"></textarea>
                            </div>
                            <p class="fw-bold mt-2">User permissions</p>
                            <div class="px-2" style="border: #A01FEF solid 1px;">


                                <div class="row">
                                    <div class="col">
                                        <div class="form-check mt-2">
                                            <input class="form-check-input" type="checkbox" id="gridCheck">
                                            <label class="form-check-label" for="gridCheck">
                                                Activate User
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-check mt-2">
                                            <input class="form-check-input" type="checkbox" id="gridCheck">
                                            <label class="form-check-label" for="gridCheck">
                                                Activate Admin
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-check mt-2">
                                            <input class="form-check-input" type="checkbox" id="gridCheck">
                                            <label class="form-check-label" for="gridCheck">
                                                Suspend Admin
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-check mt-2">
                                            <input class="form-check-input" type="checkbox" id="gridCheck">
                                            <label class="form-check-label " for="gridCheck">
                                                Edit Course
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="d-flex justify-content-center mt-2">
                                <button type="submit" class="btn btn-outline-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </DashboardTemplate>
</template>
<script>
import DashboardTemplate from "../components/DashboardTemplate.vue";
import Teachers from "@/components/Teachers.vue"
export default {
    name: "platformBundle",
    components: {
        DashboardTemplate,
        Teachers
    },
    data() {
        return {
            adminRoles:true,
            createAdminRoles: false,
            teachers: [
                {
                    teacher_name: "Kingsley Chebonkeng",
                    open: false,
                    teacher_age: 23
                },
                {
                    teacher_name: "Ngum Fon",
                    open: false
                },
                {
                    teacher_name: "Lecturer Name",
                    open: false
                },
                {
                    teacher_name: "Lecturer Name",
                    open: false
                },
                {
                    teacher_name: "Lecturer Name",
                    open: false
                },
                {
                    teacher_name: "Lecturer Name",
                    open: false
                },
                {
                    teacher_name: "Lecturer Name",
                    open: false
                },
            ]
        }
    },
    methods: {
        toggleOpen: function (index) {
            this.teachers = this.teachers.map((teacher, i) => {
                if (index === i) {
                    teacher.open = !teacher.open;
                } else {
                    teacher.open = false;
                }

                return teacher;
            });
        },
        showRoles() {
      this.adminRoles = !this.adminRoles
    },
    createRoles() {
      this.createAdminRoles = !this.createAdminRoles
    }
    }
}
</script>



