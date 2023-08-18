import { defineStore } from "pinia/dist/pinia";
import axios from 'axios';

async function actionWrapper(callback, message, onErrorFunction){
    try {
        await callback()
        return {success:true, message:message?message:'action was successful'}
    } catch (e) {
        onErrorFunction ? await onErrorFunction() : ''
        if(e.response != undefined) return {success:false, message:e.response.data.errorMessage}
        return {success:false, message:'Could not connect to platform because of ' + e.message}
    }
}

export const useBundleStore = defineStore('bundleStore', {
    state: () => ({
        bundles: null,
        bundleToEdit:null
    }),
    getters:{
        activeBundles(){
            if(this.bundles) return this.bundles.filter((bundle)=>bundle.constraints.isActive)
            return []
        }
    },
    actions:{

       async getBundles(){
        return actionWrapper(async ()=>{
            let response = await axios.get('bundles')
            this.bundles = response.data.message.bundles;
        },'collected bundles with success' )
       },
       getBundleById(bundleId){
        return this.bundles ? this.bundles.find(bundle=>bundle._id === bundleId) :[]
       },
       async createBundle(bundle){
        try {
            let response = await axios.post('bundle/create',bundle)
            this.bundles ? this.bundles.push(response.data.message.bundle) : this.bundles=[response.data.message.bundle];
            return {success:true, message:'Bundle Created successfully'}
        } catch (e) {
            if(e.response != undefined) return {success:false, message:e.response.data.errorMessage}
            return {success:false, message:'Could not connect to platform because of ' + e.message}
        }
       },
       async deleteBundle(bundleId){
        return actionWrapper(async ()=>{
                    await axios.delete(`bundle/delete/${bundleId}`)
                    this.bundles = this.bundles.filter(bundle=>bundle._id != bundleId);
                },'deleted bundle with success' )
            },
       async editBundle(bundleId, bundleUpdate){
        return actionWrapper(async ()=>{
            let response = await axios.patch(`bundle/update/${bundleId}`, bundleUpdate);
            this.bundles.forEach(bundle => {if(bundle._id === bundleId) bundle = response.data.message});
        },'Bundle updated with success' )
       }
    },
})
