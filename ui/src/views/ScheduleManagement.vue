<template>
    <DashboardTemplate>
        <div class="bundles">
            <div class="row my-5">
                <div class="col rounded-2 overflow-hidden">

                    <div class="bg-white rounded p-2">
                        <div class="d-flex align-items-center justify-content-between flex-column flex-md-row">
                            <p class="h6 fw-bold fs-5">Schedule Management</p>
                            <form class="w-50" role="search">
                                <input class="form-control  rounded" type="search" placeholder="Search" aria-label="Search"
                                    style="background-color: #eddff553;">

                            </form>
                        </div>
                       
                        <div v-for="schedule in schedules" :key="schedule" class="d-flex rounded align-items-center flex-column flex-md-row mt-3" style="background-color: #FBF6FF;">
                           <div class="d-flex align-items-center">
                            <img src="https://unsplash.com/photos/s9CC2SKySJM/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkyMDkyMTY3fA&force=true&w=640" alt="" class="rounded-start" width="90" height="70">
                            <div class="ms-3">
                                <span class="fw-bold fs-6" style="color: #9F1FED;">Course Name</span> <br>
                                <span class=" fs-6">Section Name</span> <br>
                                <span class=" fs-6 text-primary">Material Name</span>
                            </div>
                            <span class="badge px-3 py-2 rounded-pill ms-3 fs-6" style="background-color: #9F1FED;">09:00 PM WAT</span>
                           </div>
                           <div class="d-flex align-items-center p-2 ms-2" style="background-color: #F7EBFF;">
                            <img src="https://github.com/mdo.png" alt="" width="60" height="60" class="rounded-circle me-2">
                            <div class="d-flex align-items-center ms-2">
                                <div class="">
                                    <span class="fs-6"> <strong>{{ schedule.teacherName }}</strong> <span class="ms-1" style="color: #9F1FED;"> | {{ schedule.email }}</span> </span> <br>
                                    <span class="" style="color: #A2A2A2;">#tt5475tdgdyyudhd557844g</span> 
                                    <span class="mt-1 mt-md-0 ms-md-3 badge rounded-pill" :class="`${schedule.status}`" style="font-size: 13px;"> {{schedule.status}}</span>
                                </div>
                               <div class="">
                                <button class="btn ms-4  btn-sm text-white" style="background-color: #9F1FED;" v-if="schedule.scheduled"> Confirmed</button>
                                <button class="btn ms-4 btn-secondary btn-sm" v-else>Confirm Schedule</button>
                               </div>
                            </div>
                           </div>
                           <div class="mx-3 pt-2 pt-md-0 d-flex align-items-center flex-fill">
                            <select class="form-select rounded-0 rounded-start" id="autoSizingSelect">
      <option selected>Slect/ search Teacher</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <button class="btn text-white rounded-0 rounded-end" style="background-color: #9F1FED;">Assign</button>
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
    name: "platformBundle",
    components: {
        DashboardTemplate
    },
    data() {
        return {
            schedules:[
                { teacherName:"Ngum buka Fon", email:"johndoe@gmail.com", scheduled:true,status:"Valid"},
                { teacherName:"Ngum buka Fon",email:"johndoe@gmail.com", scheduled:false,status:"Expired"},
                { teacherName:"Ngum buka Fon",email:"johndoe@gmail.com", scheduled:true,status:"Expired"},
                { teacherName:"Ngum buka Fon", email:"johndoe@gmail.com", scheduled:false,status:"Valid"},
                { teacherName:"Ngum buka Fon",email:"johndoe@gmail.com", scheduled:false,status:"Expired"},
                { teacherName:"Ngum buka Fon", email:"johndoe@gmail.com", scheduled:true,status:"Valid"},
            ]
        }
    },
}
</script>

<style>
.Valid {
    background-color: #C4E02F;
    color: #000;
}
.Expired {
    background-color: #FF0000;
    color: #fff;
}

</style>