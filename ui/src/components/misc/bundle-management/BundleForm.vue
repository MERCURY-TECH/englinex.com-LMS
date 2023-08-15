<template>
    <form class="mt-2">
        <div class="mb-3">
            <input type="text" v-model="bundle.uuid" class="form-control form-control-sm" id="" placeholder="UUID">
        </div>
        <div class="mb-3">
            <input type="text" v-model="bundle.title"  class="form-control form-control-sm" id="" placeholder="Title">
        </div>
        <div class="mb-3">
            <textarea v-model="bundle.description"  class="form-control form-control-sm" placeholder="Bundle short description" id="" rows="3"></textarea>
        </div>
        <div class="px-2" style="border: #A01FEF solid 1px;">
            <p class="fw-bold text-center mt-2">Constrains</p>
            <hr class="mx-3" style="color: #A01FEF;">
            <div class="row mb-2">
                <div class="col">
                    <input v-model="bundle.constraints.durationInMonths"  type="text" class="form-control form-control-sm" placeholder="Duration">
                </div>
                <div class="col">
                    <input v-model="bundle.constraints.unitCostInFCFAPerMonths"  type="text" class="form-control form-control-sm" placeholder="unit cost">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input type="text" v-model="bundle.constraints.percentageDiscount" class="form-control form-control-sm" placeholder="Discount">
                </div>
                <div class="col">
                    <input type="text" v-model="bundle.constraints.numberOfClassHours" class="form-control form-control-sm" placeholder="Class hours">
                </div>
            </div>
            <div class="col-12">
                <div class="form-check mt-2">
                    <input class="form-check-input" v-model="bundle.constraints.isActive" type="checkbox" id="gridCheck">
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
</template>

<script setup>
import { ref} from 'vue';
import Swal from 'sweetalert2';
import {useBundleStore} from '@/stores/bundleStore';

const bundleStore = useBundleStore();
 let baseBundle  = {title:'', uuid:'', description:'', 
        constraints:{
        durationInMonths:null,
        unitCostInFCFAPerMonths:null,
        isActive:false,
        percentageDiscount:null,
        numberOfClassHours:null
    }}
let bundle = ref({...baseBundle})

async function upsertBundle(){
    let statusObj = await bundleStore.createBundle(bundle.value);
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });
    }
    bundle.value = {...baseBundle}
}

</script>