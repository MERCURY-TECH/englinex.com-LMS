<template>
    <LoaderSpinner v-if="bundleStore.bundles"/>
    <div v-if="bundleStore.bundles" class="bg-white rounded p-2">
        <BundleItem @deletebundle="deleteBundleById" @editbundle="(bundletoedit)=>emit('editbundle',bundletoedit)" :bundle="bundle" :key="bundle._id" v-for="bundle in bundleStore.bundles"/>  
    </div>
    <div v-if="!bundleStore.bundles" class="bg-white rounded p-2">
        <p>
            No bundles exist on the platform
        </p>            
    </div>
</template>

<script setup>
import BundleItem from './BundleItem.vue';
import {useBundleStore} from '@/stores/bundleStore'
import LoaderSpinner from '@/components/misc/LoaderSpinner.vue'
import {  ref } from 'vue';
import Swal from 'sweetalert2';
const emit = defineEmits(['editbundle'])

const loader = ref(false);
const bundleStore = useBundleStore();

async function deleteBundleById(bundleId) {
    loader.value = true;
  let modalValue = await new Swal({
    title: "Delete this Platform bundle?",
    text: "Are you sure you want to delete this Bundles!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#490194",
    confirmButtonText: "Yes, Delete it!",
  });
  if (modalValue.value) {
    let statusObj = await bundleStore.deleteBundle(bundleId.id);
    if (statusObj.success) {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "success" });
    } else {
      Swal.fire(statusObj.message);
      Swal.update({ icon: "error" });
    }
  }
  loader.value = false;
}

</script>