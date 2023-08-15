<template>
    <div :class="true ? 'teacher open' : 'teacher'">
        <div class="pe-3 ps-2 my-2 " style="background-color: #FBF6FF;">
            <div class="question py-2 d-flex justify-content-between">
                <div class="">
                    <div class="d-flex align-items-center">
                        <!-- <img src="https://github.com/mdo.png" alt="" width="40" height="40" class="rounded-circle me-2"> -->
                        <div class="ms-3">
                            <span class="fw-bold">{{ props.lecturer.firstname }}, {{ props.lecturer.lastname }}</span> <br>
                            <span class="">#{{ props.lecturer._id }}</span>
                        </div>
                    </div>
                </div>
                <button @click="deleteAccount" class="btn btn-outline-danger ms-auto border-0"><i class="bi bi-trash-fill"></i></button>
                <button @click="() => toggle = !toggle" class="btn toggle-btn">open</button>

            </div>
            <div v-if="toggle" class="answer  p-2 overflow-hidden">
                <hr>
                <div class="row align-items-end justify-content-beetwen">
                    <div class="col-12 col-md-4">
                        <!-- <button class="btn btn-outline-primary">Suspend Teacher</button> -->
                        <div  class="form-check form-switch form-check-reverse">
							<label class="form-check-label" for="suspend-user">
								<span v-if="props.lecturer.isSuspended">
									<span class="badge primary-bg"><i class="bi-globe-europe-africa"></i> Suspended </span>
                                </span>
								<span v-if="!props.lecturer.isSuspended">
									<small><span>Suspend User</span></small>
								</span>
							</label>
							<input @change="toggleSuspendUser" :checked="props.lecturer.isSuspended" class="form-check-input" type="checkbox" role="switch" id="suspend-user" >
						</div>
                    </div>
                    <div class="col-12 col-md-4">
                        <label for="" class="form-label fw-bold">Role</label>
                        <select @change="assignUserRole" class="form-select " aria-label="Default select example">
                            {{ userRole.result }}
                            <option selected disabled>{{ userRole.result === null ? 'Assign user Role' : userRole.result.Sid }}</option>
                            <option v-for="role in props.roles" :key="role._id" :value="role._id">{{ role.Sid }}</option>
                        </select>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="d-flex">
                            <router-link class="nav-link rounded-start text-light p-2 bg-secondary w-100"
                                to="/admin/dashboard/courses">Courses</router-link>
                            <router-link class="nav-link rounded-end mx-2 text-light p-2 w-100"
                                style="background-color: #9F1FED;" to="/dashboard/courses">Students</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useRoleStore } from '@/stores/roleStore';
import {useUserStore} from '@/stores/userStore';

const userStore = useUserStore();
const props = defineProps(['lecturer', 'roles'])
const toggle = ref(false)
const roleStore = useRoleStore();
let userRole = ref(null)


onMounted(async () => {
    userRole.value = await roleStore.getUserRoles(props.lecturer._id)
    console.log(userRole.value)
})

async function assignUserRole(e){
    const roleID = e.target.value
    let statusObj = await roleStore.assignUserRole(props.lecturer._id, roleID);
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });
    }
}
async function toggleSuspendUser(){
    let statusObj = await userStore.toggleSuspendUser(props.lecturer._id);
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });
    }  
    }

    async function deleteAccount(){
    let statusObj = await userStore.deleteAccount(props.lecturer._id,'lecturer');
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });
    }  
    }
</script>
<style scoped>
.teacher .question {
    position: relative;
    transition: all 0.4s linear;
    cursor: pointer;
}

.teacher .question::after {
    content: '';

    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%) rotate(0deg);

    width: 20px;
    height: 20px;
    background-image: url('@/assets/chevron-down.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    transition: all 0.2s linear;
}

.teacher.open .question::after {
    transform: translateY(-50%) rotate(180deg);
}

.teacher .answer {
    opacity: 0;
    max-height: 0px;
    overflow-y: hidden;
    transition: all 0.4s ease-out;
}

.teacher.open .answer {
    opacity: 1;
    max-height: 1000px;
    z-index: 1;
}

.toggle-btn {
    margin-right: -1rem;
    z-index: 100;
    opacity: 0%;
}

.btn-outline-primary {
    color: #A01FEF;
    border: #A01FEF 1px solid;
}

.btn-outline-primary:hover {
    color: #fff;
    border: #A01FEF 1px solid;
    background: #A01FEF;
}
</style>
