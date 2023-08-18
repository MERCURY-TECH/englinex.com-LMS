import { defineStore } from "pinia/dist/pinia";
import axios from 'axios';

async function actionWrapper(callback, message, onErrorFunction) {
    try {
        let result =  await callback()
        if(result) return { success: true, message: message ? message : 'action was successful', result }
        return { success: true, message: message ? message : 'action was successful',result:null }
    } catch (e) {
        onErrorFunction ? await onErrorFunction() : ''
        if (e.response != undefined) return { success: false, message: e.response.data.errorMessage }
        return { success: false, message: 'Could not connect to platform because of ' + e.message }
    }
}

export const useScheduleStore = defineStore('scheduleStore', {
    state: () => ({
        schedules: [],
        connectedUserSchedules:[]
    }),

    actions: {
        async getAllSchedules() {
            return actionWrapper(async () => {
                let response = await axios.get('schedules/valid')
                this.schedules = response.data.message.schedules;
            }, 'collected schedules with success')
        },
        async getSchedulesByStudentId(studentId) {
            return actionWrapper(async () => {
                let response = await axios.get(`schedules/student/${studentId}`)
                this.connectedUserSchedules = response.data.message.schedules
            }, 'Collected schedules with student ID with success')
        },
        async getSchedulesByLecturerId(lecturerId) {
            return actionWrapper(async () => {
                let response = await axios.get(`schedules/lecturer/${lecturerId}`)
                this.connectedUserSchedules = response.data.message.schedules;
                return response.data.message.schedules;
            }, 'Collected schedules with lecturer ID with success')
        },
        async getSchedulesByCourseId(courseId) {
            return actionWrapper(async () => {
                let response = await axios.get(`schedules/course/${courseId}`)
                return response.data.message.schedules;
            }, 'Collected schedules with course Id with success')
        },
        async createSchedule(schedule) {
            return actionWrapper(async () => {
                let response = await axios.post('schedules/create', schedule)
                this.connectedUserSchedules.push(response.data.message.schedule);
            }, 'Created new schedules with success')
        },
        async cancelSchedule(scheduleId) {
            return actionWrapper(async () => {
                await axios.delete(`schedules/cancel/${scheduleId}`)
                this.connectedUserSchedules = this.connectedUserSchedules.filter((schedule)=>schedule._id != scheduleId)
            }, 'Cancelled schedule with success')
        },
        async comfirmSchedule(scheduleId) {
            return actionWrapper(async () => {
                let response = await axios.patch(`schedules/comfirm/${scheduleId}`)
                this.schedules = this.schedules.forEach((schedule,index) => {
                    if(schedule._id === scheduleId) this.schedules[index] = response.data.message.schedule
                });
            }, 'Comfirmed schedule with success')
        },
        async assignLecturerToSchedule(scheduleId,lecturerId) {
            return actionWrapper(async () => {
                let response = await axios.patch(`schedules/assign/${lecturerId}/${scheduleId}`)
                this.schedules = this.schedules.forEach((schedule,index) => {
                    if(schedule._id === scheduleId) this.schedules[index] = response.data.message.schedule
                });
            }, 'Assigned lecturer to schedule with success')
        }
    },
})
