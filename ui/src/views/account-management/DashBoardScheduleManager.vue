<template>
    <div class="row">
        <div class="col-4 ">
            <div class="d-flex align-items-center justify-content-between">
                <VDatePicker v-if="!props.isLecturer" :attributes="attributes" color='purple' v-model="date"
                    mode="dateTime" />
                <VCalendar v-if="props.isLecturer" :attributes="attributes" color='purple' v-model="date" mode="dateTime" />
            </div>
            <div v-if="!props.isLecturer" class="form-group my-2">
                <label for="exampleFormControlSelect1">Select Course</label>
                <select v-model="course" class="form-control" id="exampleFormControlSelect1">
                    <option selected disabled value=""> select Registered Course</option>
                    <option v-for="course in props.courses" :key="course._id" :value="course._id">{{ course.title }}
                    </option>
                </select>
            </div>
            <button v-if="!props.isLecturer" @click="createSchedule" class="btn text-white"
                style="background-color: #9F1FED;">Schedule</button>
        </div>
        <div class="col-8">
            <div v-for="schedule in scheduleStore.connectedUserSchedules" :key="schedule._id" class="card p-2 my-2">
                <DashBoardScheduleItem :is-lecturer="props.isLecturer" :schedule="schedule" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useScheduleStore } from '@/stores/scheduleStore';
import { actionNotificationWrapper } from '@/helpers';
import { useAuthStore } from '@/stores/authStore';
import DashBoardScheduleItem from './DashBoardScheduleItem.vue'

const authStore = useAuthStore()
const scheduleStore = useScheduleStore();
const props = defineProps(['courses', 'isLecturer'])
const date = ref(new Date());
const course = ref('');

const attributes = computed(() => {
    let scheduleDateTrack = [
        {
            highlight: {
                color: 'purple',
                fillMode: 'solid',
            },
            dates: new Date(),
        }
    ];
    const highlight = {
        color: 'purple',
        fillMode: 'light',
    }
    scheduleStore.connectedUserSchedules.forEach((schedule) => {
        let actualDate = new Date(schedule.datetime)
        scheduleDateTrack.push({ highlight, dates: actualDate })
    })
    return scheduleDateTrack
});



onMounted(async () => {
    scheduleStore.getSchedulesByStudentId(authStore.authUser?._id)

   
})
async function createSchedule() {
    let schedules = {
        datetime: date.value,
        course: course.value,
        student: authStore.authUser?._id,
    }
    await actionNotificationWrapper(await scheduleStore.createSchedule(schedules))
}
</script>

<style>
.vc-container .vc-weekday-1,
.vc-container .vc-weekday-7 {
    color: #6366f1;
}</style>