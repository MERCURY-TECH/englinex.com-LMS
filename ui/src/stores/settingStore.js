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
export const useSettingStore = defineStore('settingStore', {
    state: () => ({
        colors: [],
        level: [],
        tags:[]
    }),
    // getters: {

    // },
    actions: {
        /*============== Colors =======================*/
        async getColors() {
            return actionWrapper(async () => {
               
            }, 'collected Settings with success')
        },
        async createColors(color) {
            return actionWrapper(async () => {
                console.log(color)
            }, 'collected Settings with success')
        },
        async editColors(colorId, color) {
            return actionWrapper(async () => {
                console.log(colorId,color)
            }, 'collected Settings with success')
        },
        async deleteColor(colorId) {
            return actionWrapper(async () => {
               console.log(colorId)
            }, 'collected Settings with success')
        },
        /*============== Tags =======================*/
        async getTags() {
            return actionWrapper(async () => {
               
            }, 'collected Settings with success')
        },
        async createTags(tag) {
            return actionWrapper(async () => {
                console.log(tag)
            }, 'collected Settings with success')
        },
        async editTags(tagId, tag) {
            return actionWrapper(async () => {
                console.log(tagId,tag)
            }, 'collected Settings with success')
        },
        async deleteTag(tagId) {
            return actionWrapper(async () => {
               console.log(tagId)
            }, 'collected Settings with success')
        },
         /*============== Levels =======================*/
         async getTags() {
            return actionWrapper(async () => {
               
            }, 'collected Settings with success')
        },
        async createTags(tag) {
            return actionWrapper(async () => {
                console.log(tag)
            }, 'collected Settings with success')
        },
        async editTags(tagId, tag) {
            return actionWrapper(async () => {
                console.log(tagId,tag)
            }, 'collected Settings with success')
        },
        async deleteTag(tagId) {
            return actionWrapper(async () => {
               console.log(tagId)
            }, 'collected Settings with success')
        },
    },
})
