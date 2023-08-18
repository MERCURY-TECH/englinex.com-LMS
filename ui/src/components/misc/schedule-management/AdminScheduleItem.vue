<template>
    <div class="d-flex rounded align-items-center flex-column flex-md-row mt-3" style="background-color: #FBF6FF;">
        <div class="d-flex align-items-center">
            <!-- {{ props.schedule.student }} -->
            <ImageWithFallBack :class="'rounded-start'" :width="'90'" :height="'70'"
                :image="props.schedule.course.coverimage" />
            <div class="ms-3">
                <span class="fw-bold fs-6" style="color: #9F1FED;">{{ props.schedule.course.title }}</span> <br>
            </div>
            <span class="badge px-3 py-2 rounded-pill ms-3 fs-6" style="background-color: #9F1FED;">{{ datetime }} </span>
        </div>

        <div class="d-flex align-items-center p-2 ms-2" style="background-color: #F7EBFF;">
            <!-- <img src="https://github.com/mdo.png" alt="" width="60" height="60" class="rounded-circle me-2"> -->
            <div class="  d-flex align-items-center ms-2">
                <div class="">
                    <span class="fs-6"> <strong>{{ props.schedule.student.firstname }}, {{ props.schedule.student.lastname
                    }}</strong> <span class="ms-1" style="color: #9F1FED;"> | {{ props.schedule.student.username
}}</span> </span> <br>
                    <span class="" style="color: #A2A2A2;"># {{ props.schedule.student._id }}</span>
                    <!-- <span class="mt-1 mt-md-0 ms-md-3 badge badge-primary rounded-pill" :class="`schedule.status`"
                        style="font-size: 13px;"> schedule.status</span> -->
                </div>
                <div class="p-2">
                    <div class="form-group">
                        <label class="form-check-label" for="flexSwitchCheckDefault">Comfirmed ?</label>
                        <div class="form-check form-switch">
                            <input :checked="props.schedule.isConfirmed" @change="toggleComfirmSchedule"
                                class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mx-3 pt-2 pt-md-0 d-flex align-items-center flex-fill">
            <select @change="assignLecturer" class="form-select rounded-0 rounded-start" id="autoSizingSelect">
                <option disabled selected>{{ lecturer ? lecturer : 'Select a Lecturer' }} </option>
                <option v-for="lecturer in userStore.lecturers" :key="lecturer._id" :value="lecturer._id">{{
                    lecturer.firstname }}, {{ lecturer.lastname }}</option>
            </select>
            <button class="btn text-white rounded-0 rounded-end" style="background-color: #9F1FED;">Assign</button>
        </div>
    </div>
</template>
<script setup>
import ImageWithFallBack from '../ImageWithFallBack.vue';
import { actionNotificationWrapperWithComfirmationModal, actionNotificationWrapper } from '@/helpers';
import { onMounted,ref } from 'vue'
import moment from 'moment';
import { useUserStore } from '@/stores/userStore';
import { useScheduleStore } from '@/stores/scheduleStore';
const props = defineProps(['schedule'])

const scheduleStore = useScheduleStore();
const lecturer =  ref('')
onMounted(()=>{
    props.schedule.lecturer ? lecturer.value = props.schedule.lecturer.firstname+', '+props.schedule.lecturer.lastname : lecturer.value = null
} )

const userStore = useUserStore();
onMounted(async () => await userStore.getUsersPerAccountType('lecturer'))


let datetime = moment(props.schedule.datetime).format("MMMM Do YYYY, h:mm:ss a");


async function toggleComfirmSchedule() {
    await actionNotificationWrapperWithComfirmationModal(async () => await scheduleStore.comfirmSchedule(props.schedule._id), {
        title: 'Toggle Comfirm Schedule ?',
        text: 'You want to toggle these schedule state ?',
        icon: 'info',
        btnText: 'Toggle Comfirmation Status'
    })
}

async function assignLecturer(e){
    await actionNotificationWrapper(await scheduleStore.assignLecturerToSchedule(props.schedule._id, e.target.value))
}
</script>

<style>
.Valid {
    background-color: #C4E02F;
    color: #000;
}

.Expired {
    background-color: #FF0000;
    color: #fff;
}
</style>