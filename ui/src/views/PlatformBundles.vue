<template>
    <DashboardTemplate>
        <div class="bundles">
            <div class="row my-5 p-2">
                <div class="col-md-9 rounded-2 overflow-hidden">
                    <div class="p-2 rounded" style="background-color: #F2F2F2;">
                        <p class="h6 fw-bold">Platform Bundles</p>
                    </div>
                    <BundleList @editbundle="updateBundle" />
                </div>
                <div class="col-md-3  mt-3 mt-md-0">
                    <div class="rounded p-2" style="background-color: #F2F2F2;">
                        <p class="h6 fw-bold text-center">Platform Bundles</p>
                    </div>
                    <div class="bg-white p-2">
                        <BundleForm @updateterminated="updateTerminated" :bundle="bundle"/>
                    </div>
                </div>

            </div>
        </div>
    </DashboardTemplate>
</template>
<script setup>
import DashboardTemplate from "@/components/DashboardTemplate.vue";
import BundleList from '@/components/misc/bundle-management/BundleList.vue'
import BundleForm from '@/components/misc/bundle-management/BundleForm.vue'
import {ref} from 'vue';

const bundle = ref(null)
function updateBundle(bundleToEdit){
    bundle.value = bundleToEdit
}
function updateTerminated(){
    bundle.value = null
}

// pass in bundle to edit
// if bundle to edit is null pass to create mode
// after edit clear form
</script>

<style>
.bundles {
    font-size: 13px;
}

.btn-outline-primary {
    color: #A01FEF;
    border: #A01FEF 1px solid;
    background-color: #fff;
}
.btn-outline-primary:hover{
    background-color: #A01FEF;
    color: #fff;
}
</style>