<template>
    <div class="card">
        <div class="card-header bg-white">
            <p class="fw-bold h2">Manage Colors</p>
        </div>
        <div class="card-body bg-light">
            <div class="row">
                <div class="col-12 col-md-5 my-2">
                    <input v-model="color.title" type="text" class="form-control" placeholder="Color Name">
                </div>
                <div class="col-12 col-md-5 my-2">
                    <input v-model="color.colorCode" type="text" class="form-control" placeholder="Color Code">
                </div>
                <div class="col-12 col-md-2 my-2">
                   <button @click="upsertColor" class="btn btn-outline-primary">Save</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row px-3" v-for="color in settingsStore.colors" :key="color.name">
                <div class="col-12 col-md-5 my-2 p-4 rounded" :style="{backgroundColor:color.colorCode}"></div>
                <div class="col-12 col-md-3 ms-3">
                    <span class="fw-bold text-center">{{ color.title }}</span> <br>
                    <span class="">{{ color.colorCode }}</span> 
                </div>
                <div class="col-12 col-md-3 rounded my-2" style="background-color: #EACEFC;">
                    <button class="btn mt-1 ms-2">
                        <i class="bi bi-pencil-square fs-5" style="color: #9F1FED;"></i>
                    </button>
                    <button @click="deleteColor(color._id)" class="btn mt-1 me-2">
                        <i class="bi bi-trash-fill text-danger fs-5"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSettingStore } from '@/stores/settingStore';
import {ref,onMounted} from 'vue';
import Swal from 'sweetalert2';
let baseState = { title:'', colorCode:'' }
const color = ref({...baseState})

async function upsertColor(){
    await createColor()
    color.value = {...baseState}
}
async function createColor(){
    let statusObj = await settingsStore.createColors(color.value);
    if (statusObj.success) {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "success" });
    } else {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "error" });
    }
}
async function deleteColor(id){
    let statusObj = await settingsStore.deleteColor(id);
    if (statusObj.success) {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "success" });
    } else {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "error" });
    }
}


const settingsStore =  useSettingStore()
onMounted(async () => {
    settingsStore.getColors()
})

</script>

