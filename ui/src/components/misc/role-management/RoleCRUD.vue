<template>
    <div class="col-md-4  mb-3">
        <div class="roles-list bg-body rounded " v-if="rolesList">
            <div class="row px-3 pb-2 pt-3 ">
                <div class="col px-3">
                    <p class="h5 fw-bold">Manage Roles</p>
                </div>
                <div class="col-auto">
                    <p class="h4" style="color: #490194; cursor: pointer;"><i class="bi-plus-circle-fill"
                            @click="toggleRoles()"></i></p>
                </div>
            </div>
            <hr>
            <div class="px-3 pb-5 ">
                
                <div class="row table-row border" v-for="role in roleStore.roles" :key="role._id">
                    <div class="col-8 pt-3">
                        <p>
                            <span class="text-muted">{{ role.Sid }}</span>
                        </p>
                    </div>
                    <div class="col-4 pt-3" >
                        <p class="table-actions">
                            <i class="bi-pencil-square primary-text px-2" @click="()=>{editRole(role)}"></i>
                            <i class="bi-trash-fill primary-text px-2" @click="()=>deleteRole(role._id)"></i>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="create-role bg-body rounded " v-else>
            <div class="row px-3 pb-2 pt-3">
                <div class="col px-3">
                    <p class="h5 fw-bold">Create Role</p>
                </div>
                <div class="col-auto">
                    <p class="h4" style="color: crimson; cursor: pointer;"><i class="bi-x-circle-fill"
                            @click="toggleRoles()"></i></p>
                </div>
            </div>
            <hr>
            <div class="px-3 pb-5">
                <form class="p-3">
                    <div class="mb-3">
                        <input v-model="newRole.Sid" type="text" name="role" class="form-control" placeholder="Role Sid" />
                    </div>
                    <div class="mb-3">
                        <label class="fw-bold">
                            <small>User permissions</small>
                        </label>
                        <div class="border p-2 row" style="height: 150px; overflow-y: scroll;">
                            <div v-for="action in roleStore.actions" :key="action._id" class="form-check col-6">
              
                                <input @change="toggleAddAction" class="form-check-input" :checked="isActioninRole(action.name)" type="checkbox" :value="action.name" :id="action._id">
                                <label  class="form-check-label" :for="action._id">
                                    <small>{{ action.name }}</small>
                                </label>
                            </div>
                        </div>
                </div>
            </form>
            <div class="col-12 text-center">
                <button @click="upsertRole" class="btn primary-button-outline px-5" type="submit" name="">Save</button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoleStore} from '@/stores/roleStore';
import Swal from 'sweetalert2';
const roleStore = useRoleStore();
onMounted(async () => {
    await roleStore.getServerActions();
    await roleStore.getRoles();
})
const newRole = ref({
    Sid:'',
    actions:[],
    update:false
}) 

const rolesList = ref(true);


function isActioninRole(actionName){return newRole.value.actions.includes(actionName)} 
function toggleAddAction(e){
    if(newRole.value.actions.includes(e.target.value)){
        newRole.value.actions = newRole.value.actions.filter((actionName)=> actionName === e.target.value)
        return
    }
    newRole.value.actions.push(e.target.value);
}
async function upsertRole(){
    if(newRole.value.update) {updateRole(newRole.value); newRole.value = { Sid:'', actions:[], update:false }; return} 
    createRole();
    newRole.value = { Sid:'', actions:[], update:false }
}

async function createRole(){
    let statusObj = await roleStore.createrole(newRole.value);
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
      toggleRoles()
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });
    }
}

async function updateRole(role){
     let statusObj = await roleStore.updateRole(role._id, role);
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
      toggleRoles()
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });
    }
    
}
async function deleteRole(roleId){
    let statusObj = await roleStore.deleteRole(roleId);
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
      newRole.value = { Sid:'', actions:[] }
      rolesList.value = true
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });
    }
}
function toggleRoles() {
      rolesList.value = !rolesList.value
    }

async function editRole(role){
    toggleRoles();
    newRole.value = role
    newRole.value.update = true
}

</script>