<template>
    <DashboardTemplate>
        <div class="col-md-6 d-flex align-items-center bg-white w-25 mt-4 p-1 rounded">
                <!-- <i class="bi bi-search"></i> -->
                <input type="text" class="form-control border-0 form-control-sm flex-fill serch-box" placeholder="Search">
        </div>
        <div class="row py-3 mx-3">
              <div class="col-md-10">
                <tabsWrapper>
                <tab title="Subscribed" class="">
                    <LoaderSpinner v-if="userStore.students"/>
                   <div class="" v-for="student in userStore.students" :key="student._id">
                
                    <div class="d-flex  p-2 tabs-content card border-0 mb-4">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex">
                                <!-- <img src="https://github.com/mdo.png" alt="" width="45" height="45" class="rounded-circle me-2"> -->
                                <div class="d-flex flex-column ms-2">
                                    <span class="fw-bold user-details">{{ student.firstname }}, {{ student.lastname }}</span>
                                    <span class=" user-details">{{ student.username }}</span> 
                                    <span class=" user-details">{{ student.telephone }}</span>
                                    <span class=" user-details" style="color: #a29f9f;">#{{ student._id }}</span>
                                </div>
                            </div>
                            <button class="btn text-white btn-sm" style="background-color: #9F1FED;">Suspend Student</button>
                            <router-link to="/userdashboard" class="btn  btn-sm">View Profile</router-link>
                        </div>
                    </div>
                </div>
                </tab>
                <tab title="Not Subscribed">
                     <div class="" v-for="i in 6" :key="i">
                
                    <div class="d-flex  p-2 tabs-content card border-0 mb-4">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex">
                                <img src="https://github.com/mdo.png" alt="" width="45" height="45" class="rounded-circle me-2">
                                <div class="d-flex flex-column ms-2">
                                    <span class="fw-bold user-details">John Doe</span>
                                    <span class=" user-details">johndoes@yahoo.com</span> 
                                    <span class=" user-details">+237600976534</span>
                                    <span class=" user-details" style="color: #a29f9f;">#65trurgrvrr55ee6</span>
                                </div>
                            </div>
                            <button class="btn text-white btn-sm" style="background-color: #9F1FED;">Suspend Student</button>
                            <router-link to="/userdashboard" class="btn  btn-sm">View Profile</router-link>
                        </div>
                    </div>
                </div>
                </tab>
                <tab title="Active Users">
                     <div class="" v-for="i in 6" :key="i">
                
                    <div class="d-flex  p-2 tabs-content card border-0 mb-4">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex">
                                <img src="https://github.com/mdo.png" alt="" width="45" height="45" class="rounded-circle me-2">
                                <div class="d-flex flex-column ms-2">
                                    <span class="fw-bold user-details">John Doe</span>
                                    <span class=" user-details">johndoes@yahoo.com</span> 
                                    <span class=" user-details">+237600976534</span>
                                    <span class=" user-details" style="color: #a29f9f;">#65trurgrvrr55ee6</span>
                                </div>
                            </div>
                            <button class="btn text-white btn-sm" style="background-color: #9F1FED;">Suspend Student</button>
                            <router-link to="/userdashboard" class="btn  btn-sm">View Profile</router-link>
                        </div>
                    </div>
                </div>
                </tab>
              </tabsWrapper>
              </div>
            
        </div>
       
    </DashboardTemplate>
</template>
<script setup>
import DashboardTemplate from '@/components/DashboardTemplate.vue'
import tab from '@/components/userdashbaordtabs/Tabs.vue'
import tabsWrapper from '@/components/userdashbaordtabs/Tabswrapper.vue'
import LoaderSpinner from  "@/components/misc/LoaderSpinner.vue"
// import { ref } from 'vue';
import {useUserStore} from '@/stores/userStore';
// import Swal from 'sweetalert2';
import {onMounted} from 'vue';
const userStore = useUserStore();

onMounted(async () => {
    await userStore.getUsersPerAccountType('student')
})

</script>
<style>
.serch-box:hover{
     border: 0px;
}
.tabs-content{
    margin-top: -14px;
}
.user-details{
    font-size: 14px;
    margin-top: -2px;
}

</style>