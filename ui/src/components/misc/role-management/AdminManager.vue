<template>
    <div class="col-md-7 me-2 mb-3">
        <div class="admin-list bg-body rounded " v-if="adminList">
            <div class="row px-3 pb-2 pt-3">
                <div class="col px-3">
                    <p class="h5 fw-bold">Manage Admins</p>
                </div>
                <div class="col-auto">
                    <p class="h4" style="color: #490194; cursor: pointer;">
                        <i class="bi-plus-circle-fill" @click="toggleAdmins()"></i>
                    </p>
                </div>
            </div>
            <hr>
            <div class="px-md-4 pb-5">
                <div class="p-2">
                    <AdminListItem @editadmin="editAdmin" :key="admin._id" :admin="admin"
                        v-for="(admin, index) in userStore.admins" :index="index" />
                </div>
            </div>
        </div>

        <div v-else class="create-form bg-body rounded ">
            <div class="row px-3 pb-2 pt-3">
                <div class="col px-3">
                    <p class="h5 fw-bold">Create Admin</p>
                </div>
                <div class="col-auto">
                    <p class="h4" style="color: crimson;"><i class="bi-x-circle-fill" @click="toggleAdmins"></i></p>
                </div>
            </div>
            <hr>
            <div class="px-md-4 pb-5">
                <div class="p-2">
                    <form class="row">
                        <div class="col-md-6">

                            <div class="mb-2">

                                <input type="text" v-model="newAdmin.firstname" name="firstname" class="form-control"
                                    placeholder="First Name">
                            </div>
                            <div class="mb-2">
                                <input type="text" name="lastname" v-model="newAdmin.lastname" class="form-control"
                                    placeholder="Last Name">
                            </div>
                            <div class="mb-2">
                                <input type="password" name="password" v-model="newAdmin.password" class="form-control"
                                    placeholder="Password">
                            </div>
                            <!-- <div class="mb-2">
                                <input type="password" name="repeat_password" v-model="newAdmin.passwordComfirm" class="form-control"
                                    placeholder="Repeat Password">
                            </div> -->

                        </div>
                        <div class="col-md-6">
                            <div class="mb-2">
                                <input type="email" name="email" v-model="newAdmin.email" class="form-control"
                                    placeholder="Email Address">
                            </div>
                            <div class="mb-2">
                                <input type="telephone" name="telephone" v-model="newAdmin.telephone" class="form-control"
                                    placeholder="Telephone Number">
                            </div>
                            <div class="mb-5">
                                <label class="fw-bold"><small>Authorization (Role)</small></label>
                                <select @change="handleChange" class="form-select " aria-label="Default select example">
                                    <option selected disabled>{{ newAdmin.role === null ? 'Assign user Role' :
                                        newAdmin.role.Sid}}</option>
                                    <option v-for="role in roleStore.roles" :key="role._id" :value="role._id">{{ role.Sid }}
                                    </option>
                                </select>
                            </div>
                        </div>

                    </form>
                    <button @click="upsertAdmin" class="btn primary-button-outline w-100" type="submit">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
// import LoaderSpinner from  "@/components/misc/LoaderSpinner.vue"
import { ref } from 'vue';
import { useRoleStore } from '@/stores/roleStore';
import { useUserStore } from '@/stores/userStore';
import AdminListItem from '@/components/misc/role-management/AdminListItem.vue'
import Swal from 'sweetalert2';
import { onMounted } from 'vue';

const roleStore = useRoleStore();
const userStore = useUserStore();
onMounted(async () => {
    await roleStore.getRoles();
    await userStore.getUsersPerAccountType('admin')
})

const adminList = ref(true);
let baseState = {
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    password: '',
    role: null,
    update: false
}

const newAdmin = ref({ ...baseState });
function editAdmin(index,userRole) {
    adminList.value = false
    newAdmin.value = userStore.admins[index]
    newAdmin.value.update = true
    newAdmin.value.role = userRole ? userRole : null
}

async function updateAdmin() {
    let statusObj = await userStore.updateAccount(newAdmin.value._id,newAdmin.value, 'admin');
    if (statusObj.success) {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "success" });
    } else {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "error" });
    }
}
function handleChange(e) {
    if(newAdmin.value.update) assignUserRole(e);
    newAdmin.value.role = e.target.value;
}

async function assignUserRole(e) {
    const roleID = e.target.value
    let statusObj = await roleStore.assignUserRole(newAdmin.value._id, roleID);
    if (statusObj.success) {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "success" });
    } else {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "error" });
    }
}
async function createAdmin() {
    // adminList.value=false
    let statusObj = await userStore.createAdmin(newAdmin.value);
    if (statusObj.success) {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "success" });
        setTimeout(async () => {
            let status = await roleStore.assignUserRole(statusObj.result._id, newAdmin.value.role)
            if (status.success) {
                Swal.fire('roles assigned to user');
                Swal.update({ icon: "success" });
            } else {
                Swal.fire('no role assigned to user');
                Swal.update({ icon: "error" });
            }
        }, 2000);
    } else {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "error" });
    }
    
}

function upsertAdmin() {
    newAdmin.value.update ? updateAdmin() : createAdmin();
    adminList.value = true
}

function toggleAdmins() {
    newAdmin.value = { ...baseState };
    newAdmin.value.update = false;
    adminList.value = !adminList.value
}
</script>