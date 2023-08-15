<template>
    <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between my-2"
        style="background-color: #F2F2F2;">
        <div class="p-2">
            <span class="text-primary fw-bold">{{ props.bundle.title }}
                <span v-if="props.bundle.constraints.percentageDiscount" class="text-dark">
                    {{ `(${props.bundle.constraints.percentageDiscount})` }}
                </span>
            </span>
            <br>
            <span class="">{{ props.bundle.uuid }}</span>
            <h6 class="h6 text-secondary">#{{ props.bundle._id }}</h6>
        </div>
        <div class="p-2">
            <span><del>{{ totalCost }} FCFA</del></span>
            <span v-if="discountCost" class="ms-2" style="color: #C4E02F;">{{ discountCost }} FCFA</span>
        </div>
        <div class="d-flex align-items-center flex-row flex-md-column px-5 px-md-2 mx-2"
            style="border-left: #A01FEF 2px solid;border-right: #A01FEF 2px solid;">
            <span class="me-3"> {{ props.bundle.constraints.durationInMonths }} months</span>
            <span class="badge rounded text-dark" style="border: #A01FEF 1px solid;">
                {{ props.bundle.constraints.numberOfClassHours }} Hours of Class</span>
        </div>
        <div class="px-1 my-4 my-md-0">
            <span style="color: #A01FEF;"><i class="bi bi-archive-fill"></i> <span class="text-dark ms-1">{{
                props.bundle.constraints.isActive ? 'Active' : 'in-active' }}</span></span>
        </div>
        <div class="d-flex p-4 justify-content-between align-item-center w-md-50" style="background-color: #dfc3f1;">
            <button v-if="!isEditBundle" @click="()=>isEditBundle = !isEditBundle" class="btn btn-outline-primary rounded-pill btn-sm ">
                <i class="bi bi-pencil-fill"></i>
            </button>
            <button v-if="isEditBundle" @click="()=>isEditBundle = !isEditBundle" type="button" class="btn-close btn btn-outline-danger rounded-pill btn-sm" aria-label="Close"></button>
            <button @click="() => deleteBundle(props.bundle._id)" class="btn btn-outline-danger border-0 ms-2">
                <i class="bi bi-trash3-fill"></i>
            </button>
        </div>
    </div>
    <div v-if="isEditBundle">
        <form class="mt-2">
            <div class="mb-3">
                <input type="text" v-model="bundle.uuid" class="form-control form-control-sm" id="" placeholder="UUID">
            </div>
            <div class="mb-3">
                <input type="text" v-model="bundle.title" class="form-control form-control-sm" id="" placeholder="Title">
            </div>
            <div class="mb-3">
                <textarea v-model="bundle.description" class="form-control form-control-sm"
                    placeholder="Bundle short description" id="" rows="3"></textarea>
            </div>
            <div class="px-2" style="border: #A01FEF solid 1px;">
                <p class="fw-bold text-center mt-2">Constrains</p>
                <hr class="mx-3" style="color: #A01FEF;">
                <div class="row mb-2">
                    <div class="col">
                        <input v-model="bundle.constraints.durationInMonths" type="text"
                            class="form-control form-control-sm" placeholder="Duration">
                    </div>
                    <div class="col">
                        <input v-model="bundle.constraints.unitCostInFCFAPerMonths" type="text"
                            class="form-control form-control-sm" placeholder="unit cost">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <input type="text" v-model="bundle.constraints.percentageDiscount"
                            class="form-control form-control-sm" placeholder="Discount">
                    </div>
                    <div class="col">
                        <input type="text" v-model="bundle.constraints.numberOfClassHours"
                            class="form-control form-control-sm" placeholder="Class hours">
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-check mt-2">
                        <input class="form-check-input" v-model="bundle.constraints.isActive" type="checkbox"
                            id="gridCheck">
                        <label class="form-check-label" for="gridCheck">
                            Activate
                        </label>
                    </div>
                </div>
                <hr class="mx-3" style="color: #A01FEF;">

            </div>
        </form>
        <div class="d-flex justify-content-center mt-2">
            <button @click="upsertBundle" class="btn btn-outline-primary">Save</button>
        </div>
    </div>
</template>

<script setup>
import {ref, toRef} from 'vue';
import Swal from 'sweetalert2';
import {useBundleStore} from '@/stores/bundleStore';

const bundleStore = useBundleStore();
let props = defineProps(['bundle'])
const emit = defineEmits(['editbundle', 'deletebundle'])
const totalCost = props.bundle.constraints.unitCostInFCFAPerMonths * props.bundle.constraints.durationInMonths;
const discountCost = (((props.bundle.constraints.unitCostInFCFAPerMonths * props.bundle.constraints.percentageDiscount) / 100) * props.bundle.constraints.durationInMonths).toFixed(2);

let bundle = toRef(props, 'bundle')
const isEditBundle = ref(false)
async function deleteBundle(bundleId) {
    emit('deletebundle', { id: bundleId })
}
async function upsertBundle(){
    let statusObj = await bundleStore.editBundle(props.bundle._id, bundle.value)
        if (statusObj.success) {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "success" });
        } else {
        Swal.fire(statusObj.message);
        Swal.update({ icon: "error" });
    }
    isEditBundle.value = false
}
</script>