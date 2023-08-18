<template>
    <DashboardTemplate>
        <div class="bundles">
            <div class="row px-5 my-5">
                <div class="col rounded-2 overflow-hidden">

                    <div class="bg-white rounded p-2">
                        <div class="d-flex align-items-center justify-content-between flex-column flex-md-row">
                            <p class="h6 fw-bold fs-5">Schedule Management</p>
                            <form class="w-50" role="search">
                                <input class="form-control  rounded" type="search" placeholder="Search" aria-label="Search"
                                    style="background-color: #eddff553;">
                            </form>
                        </div>
                    </div>
                </div>
                <AdminScheduleItem v-for="schedule in scheduleStore.schedules" :schedule="schedule" :key="schedule._id"/> 
            </div>
        </div>
    </DashboardTemplate>
</template>
<script setup>
import DashboardTemplate from "../components/DashboardTemplate.vue";
import { useScheduleStore } from '@/stores/scheduleStore'
import AdminScheduleItem from '@/components/misc/schedule-management/AdminScheduleItem.vue'
import { onMounted } from 'vue';

const scheduleStore = useScheduleStore()
onMounted(() => {
    scheduleStore.getAllSchedules()
})

</script>

