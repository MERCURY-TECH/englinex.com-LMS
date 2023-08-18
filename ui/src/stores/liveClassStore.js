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
export const useLiveClassStore = defineStore('liveClassStore', {
    state: () => ({
        liveClass: null,
        schedule: [],
    }),

    actions: {
        
    }
})
