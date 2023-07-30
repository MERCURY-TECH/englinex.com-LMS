/**
* @description Bundle database operations
* @version 1.0
* @since  Thursday, 20 07 2023, at 22:41: 30 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { IBundle } from "../../logic/lms-interfaces";
import Bundle from "../../models/account-models/Subscriptions/bundles-model";
import { ILogic } from "../IOperations";

const createBundle:ILogic = {
    name: "createBundle",
    callback: async function (bundle: IBundle) {
        console.log(bundle)
        return await new Bundle(bundle).save();
    }
}
const toggleActivateBundle:ILogic = {
    name: "toggleActivateBundle",
    callback: async function (bundleId:string) {
        let bundle = await Bundle.findOne({_id:bundleId});
        if(bundle?.constraints){
            bundle.constraints.isActive = !bundle.constraints.isActive;
        }
        return await bundle?.save();
    }
}

const updateBundle:ILogic = {
    name: "updateBundle",
    callback: async function (collection:{filter:{_id:string}, update:IBundle}) {
        return await Bundle.findOneAndUpdate(collection.filter, collection.update);
    }
}

const deleteBundle:ILogic = {
    name: "deleteBundle",
    callback: async function (bundleId:string) {
        let bundle = await Bundle.findOne({_id:bundleId});
        if(bundle?.constraints?.isActive) throw new Error('You can not delete an active bundle, first deactivate the bundle');
        return await bundle?.deleteOne();
        // return await Bundle.findOneAndDelete({_id:bundleId});
    }
}
const getAllBundles:ILogic = {
    name: "getAllBundles",
    callback: async function (filter:IBundle) {
        return await Bundle.find(filter)
    }
}
const getAllActiveBundles:ILogic = {
    name: "getAllActiveBundles",
    callback: async function () {
        return await Bundle.find({'constraints.isActive':true})
    }
}





export default [createBundle, deleteBundle, updateBundle, toggleActivateBundle, getAllBundles, getAllActiveBundles];