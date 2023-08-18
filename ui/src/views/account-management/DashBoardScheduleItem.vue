<template>
    <div>
        <div class="row">
            <div class="col-6">
                <strong><i class="bi bi-smartwatch" style="font-size: 1rem; color: #9F1FED;"></i> {{ datetime }} </strong>
                <p class="border-top border-primary h6 my-1">
                    Course : {{ props.schedule.course.title }} <br>
                    <small> #{{ props.schedule.course._id }}</small>
                </p>
                <div v-if="props.schedule.isConfirmed && !props.isLecturer"  class="border-top border-primary">
                    <small><strong>Lecturer :</strong> {{ lecturer }}</small>
                </div>
            </div>
            <div class="col">
                <span v-if="props.schedule.isConfirmed" class="badge rounded-pill bg-success">Comfirmed</span>
                <span v-if="!props.schedule.isConfirmed" class="badge rounded-pill bg-warning text-dark">Pending</span>
            </div>
            <div class="col">
                <div class="btn-group mx-1" role="group" aria-label="Basic example">
                    <button @click="joinWaitingRoom" style="background-color: #9F1FED; color: white;" v-if="props.schedule.isConfirmed" type="button" class="btn btn-outline-primary">Start Class <i class="bi bi-camera-video"></i></button>
                    <button v-if="!props.isLecturer" @click="cancelSchedule" type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';
import {ref, onMounted} from 'vue'
import {useScheduleStore} from "@/stores/scheduleStore"
import { actionNotificationWrapperWithComfirmationModal } from '@/helpers';
const props = defineProps(['schedule','isLecturer']);
const lecturer =  ref('')
import router from '@/router';

let scheduleStore = useScheduleStore();
let datetime = moment(props.schedule.datetime).format("MMMM Do YYYY, h:mm:ss a");

onMounted(()=>{
    props.schedule.lecturer ? lecturer.value = props.schedule.lecturer.firstname+', '+props.schedule.lecturer.lastname : lecturer.value = null
} )
async function cancelSchedule(){
    actionNotificationWrapperWithComfirmationModal(async ()=>await scheduleStore.cancelSchedule(props.schedule._id),{
        title:'Cancel Schedule ?',
        text:'Are you sure you wish to cancel this schedule',
        btnText:'Comfirm to Cancel'
    })
}
function joinWaitingRoom(){
    router.push({name:'WaitingsCreen', query:{roomId:props.schedule._id}})
}
</script>