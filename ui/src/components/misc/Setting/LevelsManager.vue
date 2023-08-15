<template>
    <div class="card mt-5">
        <div class="card-header border-0 bg-white">
            <p class="fw-bold h2">Manage Levels</p>
        </div>
        
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-md-5 my-2">
                    <input v-model="level.title" type="text" class="form-control" placeholder="Level title">
                </div>
                <div class="col-12 col-md-5 my-2">
                    <input v-model="level.ranking" type="text" class="form-control" placeholder="level ranking">
                </div>
                <div class="col-12 col-md-2 my-2">
                   <button @click="upsertLevel" class="btn btn-outline-primary">Add</button>
                </div>
            </div>
            <hr class="mx-2">
        <div class="row  g-2 p-2" >
           <div v-for="level in settingsStore.levels" :key="level.title" class="col-12 rounded pb-2 me-2 px-2 border-bottom">
             <div class="d-flex align-items-center">
                 {{ level.title }} | <span class="ms-2">#{{ level.ranking }}</span>
            <span class=" ms-auto px-3 rounded" style="cursor: pointer;">
                <span class=""><i class="bi bi-pencil-square fs-5 mx-2" style="color: #9F1FED;"></i></span>
                <span @click="deleteLevel(level._id)" class="ms-3"><i class="bi bi-trash-fill text-danger mx-2"></i></span> 
            </span> 
             </div>
           </div>
        </div>
        </div>
       
    </div>
</template>

<script setup>
import { useSettingStore } from '@/stores/settingStore';
import {ref,onMounted} from 'vue';
import Swal from 'sweetalert2';
let baseState = { title:'', ranking:'' }
const level = ref({...baseState})
const settingsStore =  useSettingStore()


async function upsertLevel(){
    await createLevel()
    level.value = {...baseState}
}

async function createLevel(){
    let statusObj = await settingsStore.createLevels(level.value);
    if (statusObj.success) {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "success" });
    } else {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "error" });
    }
}
async function deleteLevel(id){
    let statusObj = await settingsStore.deleteLevel(id);
    if (statusObj.success) {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "success" });
    } else {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "error" });
    }
}

onMounted(async () => {
    await settingsStore.getLevels()
})

</script>