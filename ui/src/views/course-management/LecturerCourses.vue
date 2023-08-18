<template>
    <DashboardTemplate>
        
        <div class="row align-item-center justify-content-center py-3">
            <div class="col-sm-12 col-md-9">
                <div class="card border-0">
                    <div class="d-flex align-items-center  justify-content-center p-1" style="background-color: #F2F2F2;">
                        <p class="text-center fw-bold">Associated Course and Students</p>
                    </div>
                    <div class="d-flex align-items-center flex-column flex-md-row justify-content-between border-bottom border-secondary-subtle p-2 mx-3">
                        <div class="d-flex align-items-center">
                            <!-- <img src="https://github.com/mdo.png" alt="" width="40" height="40" class="rounded-circle me-2"> -->
                            <div class="ms-2">
                                <span class="fw-bold">
                                    {{ lecturer.firstname }}, {{ lecturer.lastname }}
                                </span> <br>
                                <span class="" style="color: #a3a3a3;">
                                    #{{ lecturer._id }}
                                </span> 
                            </div>
                        </div>
                        <button class="btn text-white btn-sm my-2 my-md-0" style="background-color: #9F1FED;">
                            Suspend Teacher
                        </button>
                    </div>
                    <!-- eslint-disable -->
                    <div class="p-3 mx-2 d-flex align-items-start flex-column flex-md-row" v-for=" course in 4" key="courses">
                        <div class=""><span class=" badge rounded-0  p-3 rounded-start my-2 my-md-0" style="background-color: #9F1FED;">Course Name</span></div>
                        <div class="card p-2 ms-1 w-100" style="background-color: #F7EBFF;">
                           <div class="d-flex align-items-center  flex-column flex-md-row justify-content-between border-bottom border-secondary-subtle">
                           <div class="">
                            <p class="fw-bold">Students</p>
                           </div>
                            <div class="my-2 my-md-0">
                                <form action="" class="">
                                <input type="text" class="form-control form-control-sm w-100" placeholder="Search">
                            </form>
                            </div>
                           </div>
                           <div class="d-flex align-items-center flex-column flex-md-row justify-content-between  p-1 mx-1" v-for="student in 4" key="student">
                        <div class="d-flex align-items-center">
                            <img src="https://github.com/mdo.png" alt="" width="40" height="40" class="rounded-circle me-2">
                            <div class="ms-2">
                                <span class="fw-bold" style="font-size: 14px;">
                                    Student Name
                                </span> <br>
                                <span class="" style="color: #a3a3a3; font-size: 13px;">
                                    #64baff31460a735fc4311c20
                                </span> 
                            </div>
                        </div>
                        <button class="btn text-white btn-sm my-2 my-md-0" style="background-color: #9F1FED;">
                            Unlink Student
                        </button>
                    </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DashboardTemplate>
</template>

<script setup>
import DashboardTemplate from '@/components/DashboardTemplate.vue';
import router from '@/router';
import {ref,onMounted} from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore =  useUserStore();
const lecturerId =  router.currentRoute.value.params.lecturerId;
const lecturer =  ref('');

onMounted(async ()=>{ lecturer.value = await userStore.getUserById(lecturerId,'lecturer') });

</script>