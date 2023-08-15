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
        </div>
        <div class="bg-white rounded p-2">
            <div class="teacher">
                <TeachersItemList v-for="lecturer in userStore.lecturers" :lecturer="lecturer" :roles="roleStore.roles" :key="lecturer._id" />
            </div>
        </div>
    </div>
</template>

<script setup>
import TeachersItemList from "@/components/misc/teacher-management/TeachersItemList.vue";
import LoaderSpinner from  "@/components/misc/LoaderSpinner.vue"
import {useRoleStore} from '@/stores/roleStore';
import {useUserStore} from '@/stores/userStore';
import {onMounted} from 'vue';
const roleStore = useRoleStore();
const userStore = useUserStore();

onMounted(async () => {
    await roleStore.getRoles();
    await userStore.getUsersPerAccountType('lecturer')
})

</script>