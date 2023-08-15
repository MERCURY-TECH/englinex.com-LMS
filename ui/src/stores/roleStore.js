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

// use this keyword to access state data
export const useRoleStore = defineStore('roleStore', {
    state: () => ({
        roles: null,
        actions: [],
    }),
    // getters: {

    // },
    actions: {
        async getroles() {
            return actionWrapper(async () => {
                let response = await axios.get('roles')
                this.roles = response.data.message.roles;
            }, 'collected roles with success')
        },
        async createrole(role) {
            try {
                let response = await axios.post('create/role', role)
                this.roles ? this.roles.push(response.data.message.newRole) : this.roles = [response.data.message.newRole];
                return { success: true, message: 'role Created successfully' }
            } catch (e) {
                if (e.response != undefined) return { success: false, message: e.response.data.errorMessage }
                return { success: false, message: 'Could not connect to platform because of ' + e.message }
            }
        },
        async unassignUserRole(userpermissionroleId) {
            return actionWrapper(async () => {
                await axios.delete(`delete/userpermissionrole/${userpermissionroleId}`)
            }, 'deleted role with success')
        },
        async deleteRole(roleId) {
            return actionWrapper(async () => {
                await axios.delete(`role/delete/${roleId}`)
                this.roles = this.roles.filter(role => role._id != roleId);
            }, 'deleted role with success')
        },
        async updateRole(roleId, update) {
            return actionWrapper(async () => {
                let response = await axios.patch(`role/update/${roleId}`, update)
                this.roles.forEach((role,index) => {
                    if(role._id === roleId) {
                        this.roles[index] = response.data.message.role;
                        this.roles = [...this.roles]
                    }
                });
            }, 'Updated role with success')
        },
        async getServerActions(){
            return actionWrapper(async () => {
                let response  = await axios.get(`action-list/`)
                this.actions = response.data.actions.actions
            }, '')
        },
        async getRoles(){
            return actionWrapper(async () => {
                let response  = await axios.get(`roles/`)
                this.roles = response.data.message.roles
            }, '')
        },
        async getUserRoles(userID){
            return actionWrapper(async () => {
                let response  = await axios.get(`roles/${userID}`)
                console.log(response.data.message.Role)
                return response.data.message.userRole ? response.data.message.userRole.Role : null
            }, '')
        },
        async assignUserRole(userID, roleID){
            return actionWrapper(async () => {
                let response  = await axios.put(`assign/${roleID}/${userID}`)
                console.log(response)
            }, 'New Role Assigned with success')
        }
    },
})
