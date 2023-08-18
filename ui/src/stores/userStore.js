import { defineStore } from "pinia/dist/pinia";
import axios from 'axios';

async function actionWrapper(callback, message, onErrorFunction) {
    try {
        let result = await callback()
        if(result) return { success: true, message: message ? message : 'action was successful' , result}
        return { success: true, message: message ? message : 'action was successful',result:null }
    } catch (e) {
        onErrorFunction ? await onErrorFunction() : ''
        if (e.response != undefined) return { success: false, message: e.response.data.errorMessage }
        return { success: false, message: 'Could not connect to platform because of ' + e.message }
    }
}

export const useUserStore = defineStore('userStore', {
    state: () => ({
        lecturers: null,
        students: null,
        admins: null
    }),
    actions: {
        async getUserById(id,accountType){
            await this.getUsersPerAccountType(accountType)
            if(accountType === 'lecturer') return this.lecturers.find(val=>val._id===id) 
            if(accountType === 'student' ) return this.students.find(val=>val._id===id) 
            if(accountType === 'admin' ) return this.admins.find(val=>val._id===id)  
        },
        async getUsersPerAccountType(accountType){
            return actionWrapper(async () => {
                let response  = await axios.get(`/get-all-users/${accountType}`)
                if(accountType === 'lecturer') this.lecturers = response.data.message.lecturers
                if(accountType === 'student') this.students = response.data.message.students
                if(accountType === 'admin') this.admins = response.data.message.admins
            }, 'User Fetched')
        },
        async deleteAccount(accountId, accountType){
            return actionWrapper(async () => {
                await axios.delete(`delete/user/${accountId}`)
                if(accountType === 'lecturer') this.lecturers=this.lecturers.filter((val)=>val._id != accountId)
                if(accountType === 'student') this.students=this.students.filter((val)=>val._id != accountId)
                if(accountType === 'admin') this.admins=this.admins.filter((val)=>val._id != accountId)
            }, 'User account deleted with success')
        },
        async toggleSuspendUser(userId){
            return actionWrapper(async () => {
                await axios.patch(`suspend-user/${userId}`)
            }, 'User suspension toggled with Success')
        },
        async createTeacher(user){
            return actionWrapper(async () => {
                let response  = await axios.post(`signup-teacher`,user)
                this.lecturers.push(response.data.message.lecturer)
                return response.data.message.lecturer
            }, 'New Teacher Created')
        }, 
        async createAdmin(user){
            return actionWrapper(async () => {
                let response  = await axios.post(`signup-admin`,user);
                this.admins.push(response.data.message.admin)
                return response.data.message.admin
            }, 'New Admin Created')
        },
        async updateAccount(userId,userUpdate, accountType){
            return actionWrapper(async () => {
                if(!accountType) throw new Error('please provide the account type')
                let response  = await axios.post(`update/user/${userId}`,userUpdate);
                let user = response.data.message.user;
                console.log(user)
                if(accountType === 'lecturer') this.lecturers=this.lecturers.forEach((val,index)=>{ if(val._id === userId) this.admins[index]={...user} })
                if(accountType === 'student') this.students=this.students.forEach((val,index)=>{ if(val._id === userId) this.admins[index]={...user} })
                if(accountType === 'admin') this.admins=this.admins.forEach((val,index)=>{ if(val._id === userId) this.admins[index]={...user} })
                
            }, 'Account Updated with Success')
        },
    },
})
