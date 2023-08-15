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
        levels: [],
        tags:[]
    }),
    // getters: {

    // },
    actions: {
        /*============== Colors =======================*/
        async getColors() {
            return actionWrapper(async () => {
               if(this.colors.length) return;
               let response = await axios.get('get-colors')
               this.colors = response.data.message.colors
            }, 'collected Settings with success')
        },
        async createColors(color) {
            return actionWrapper(async () => {
                let response = await axios.post('create-colors',[color])
                this.colors.push(...response.data.message.colors)
            }, 'Color Created with success')
        },
        async editColors() {
            // colorId, color

            return actionWrapper(async () => {
            }, 'collected Settings with success')
        },
        async deleteColor(colorId) {
            return actionWrapper(async () => {
                await axios.delete(`/delete/color/${colorId}`)
                this.colors = this.colors.filter((val)=>val._id != colorId)
            }, 'Color Deleted With Success')
        },
        /*============== Tags =======================*/
        async getTags() {
            return actionWrapper(async () => {
               if(this.tags.length) return;
               let response = await axios.get('get-tags')
               this.tags = response.data.message.tags
            }, 'collected tags with success')
        },
        async createTags(tag) {
            return actionWrapper(async () => {
                let response = await axios.post('create-tags',[tag])
                this.tags.push(...response.data.message.tags)
            }, 'created tag with success')
        },
        async editTags(tagId, tag) {
            return actionWrapper(async () => {
                console.log(tagId,tag)
            }, 'collected Settings with success')
        },
        async deleteTag(tagId) {
            return actionWrapper(async () => {
               await axios.delete(`delete/tag/${tagId}`)
               this.tags = this.tags.filter((val)=>val._id!=tagId)
            }, 'Tags deleted with success')
        },
         /*============== Levels =======================
         
           ranking:number,
           title:string
         
         */
         async getLevels() {
            return actionWrapper(async () => {
               if(this.levels.length) return;
               let response = await axios.get('get-all-course-content-levels');
               this.levels = response.data.message.levels;
            }, 'Course levels loaded with success')
        },
        async createLevels(level) {
            return actionWrapper(async () => {
                let response = await axios.post('create-courses-content-level',[level]);
                this.levels.push(...response.data.message.levels)
            }, 'Created Level with success')
        },
        async editLevels(tagId, tag) {
            return actionWrapper(async () => {
                console.log(tagId,tag)
            }, 'collected Settings with success')
        },
        async deleteLevel(levelId) {
            return actionWrapper(async () => {
               await axios.delete(`delete/content-level/${levelId}`)
               this.levels = this.levels.filter((val)=>val._id!=levelId)
            }, 'Deleted level with success')
        },
    },
})
