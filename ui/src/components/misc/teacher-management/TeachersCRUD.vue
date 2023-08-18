<template>
    <div class="col-md-7 rounded-2 overflow-hidden">
        <div class="d-flex align-items-center justify-content-between mb-2">
            <p class="h6 fw-bold">Platform Teachers
                <LoaderSpinner v-if="!userStore.lecturers" />
            </p>
            <form class="w-50" role="search">
                <input class="form-control  rounded" type="search" placeholder="Search" aria-label="Search">
                <!-- search results here -->
            </form>
            <p v-if="!isCreateNewTeacher" style="cursor: pointer;" @click="toggleIsCreateNewTeacher" class="h4"> <small>Create New Teacher</small> <i class="bi-plus-circle-fill" ></i></p>
            <p v-if="isCreateNewTeacher" @click="toggleIsCreateNewTeacher" class="h4" style="color:  crimson; cursor: pointer;"><small>Cancel</small> <i class="bi-x-circle-fill" ></i></p>
        </div>
        <div v-if="isCreateNewTeacher"  class="row create-form bg-body rounded mb-2">
            <div class="col-12">
                <div class="px-md-4 pb-2 ">
                    <div class="p-2">
                        <form class="row">
                            <div class="col-md-6">
                                <div class="mb-2">
                                    <input type="text" v-model="newLecturer.firstname" name="firstname" class="form-control"
                                        placeholder="First Name">
                                </div>
                                <div class="mb-2">
                                    <input type="text" name="lastname" v-model="newLecturer.lastname" class="form-control"
                                        placeholder="Last Name">
                                </div>
                                <div class="mb-2">
                                    <input type="password" name="password" v-model="newLecturer.password"
                                        class="form-control" placeholder="Password">
                                </div>
                                <!-- <div class="mb-2">
                                        <input type="password" name="repeat_password" v-model="newAdmin.passwordComfirm" class="form-control"
                                            placeholder="Repeat Password">
                                    </div> -->
                            </div>
                            <div class="col-md-6">
                                <div class="mb-2">
                                    <input type="email" name="email" v-model="newLecturer.email" class="form-control"
                                        placeholder="Email Address">
                                </div>
                                <div class="mb-2">
                                    <input type="telephone" name="telephone" v-model="newLecturer.telephone"
                                        class="form-control" placeholder="Telephone Number">
                                </div>
                                <div class="mb-5">
                                    <label class="fw-bold"><small>Authorization (Role)</small></label>
                                    <select @change="handleChange" class="form-select " aria-label="Default select example">
                                        <option selected disabled>{{ newLecturer.role === null ? 'Assign user Role' :
                                            newLecturer.role }}</option>
                                        <option v-for="role in roleStore.roles" :key="role._id" :value="role._id">{{
                                            role.Sid }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <button @click="upsertTeacher" class="btn primary-button-outline w-100" type="submit">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!isCreateNewTeacher" class="bg-white rounded p-2">
            <div class="teacher">
                <TeachersItemList v-for="lecturer in userStore.lecturers" :lecturer="lecturer" :roles="roleStore.roles"
                    :key="lecturer._id" />
            </div>
        </div>
    </div>
</template>

<script setup>
import TeachersItemList from "@/components/misc/teacher-management/TeachersItemList.vue";
import LoaderSpinner from "@/components/misc/LoaderSpinner.vue"
import { useRoleStore } from '@/stores/roleStore';
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';
import { actionNotificationWrapper } from "@/helpers";
const roleStore = useRoleStore();
const userStore = useUserStore();
let baseState = {
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    password: '',
    role: null,
    update: false
}
const newLecturer = ref({...baseState})
const isCreateNewTeacher = ref(false)

function toggleIsCreateNewTeacher(){
    isCreateNewTeacher.value = !isCreateNewTeacher.value
}

async function upsertTeacher(){
    let statusObj = await userStore.createTeacher(newLecturer.value)
    await actionNotificationWrapper(await userStore.createTeacher(newLecturer.value))
    if(statusObj.success) toggleIsCreateNewTeacher()
}

onMounted(async () => {
    await roleStore.getRoles();
    await userStore.getUsersPerAccountType('lecturer')
})

</script>