/**
* @description Subscription operations
* @version 1.0
* @since  Friday, 21 07 2023, at 15:26: 22 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { AccountType, ISubscription } from "../../logic/lms-interfaces";
import Bundle from "../../models/account-models/Subscriptions/bundles-model";
import Subscription from "../../models/account-models/Subscriptions/subscriptions-model";
import User from "../../models/user-models/User";
import { ILogic } from "../IOperations";
import { isValidateObjectID } from "../../logic";
import mongoose from "mongoose";

function paymentValidator(){
    return true
}


const createSubscription:ILogic = {
    name: "createSubscription",
    callback: async function (subscription: ISubscription) {
        if(!isValidateObjectID(subscription.bundle)) throw new Error('Please provide a valid bundle ID');
        if(!isValidateObjectID(subscription.student)) throw new Error('Please provide a valid student ID');
        let bundle = await Bundle.findOne({_id:subscription.bundle});
        if(!bundle) throw new Error('bundle does not exist in system, provide valid bundle ID');
        if(!bundle.constraints?.isActive) throw new Error('You can not subscribe, bundle is not active');
        let student = await User.findOne({_id:subscription.student});
        if(!student) throw new Error('Subscriber/student does not exist in system, provide valid student ID');
        if(student.accountType != AccountType.student) throw new Error('Account is not a student account, Only student accounts can subscribe');
        
        // TODO :: verify that payment has been done
        if(!paymentValidator()) throw new Error('invalid payment')

        subscription.isActive = true
        subscription.isExpired = false;
        let isExisingSubscription = await Subscription.findOne().and([{student:subscription.student}, {isActive:true}]);
        if(isExisingSubscription) throw new Error('User already has an active subscription, please either delete the existing subscription before creating another or simply update the existing one');
        return await new Subscription(subscription).save().then(t => t.populate(['student','bundle'])).then(t => t);
    }
}
const cancelSubscription:ILogic = {
    name: "cancelSubscription",
    callback: async function (subscriptionId:string) {
        let subscription = await Subscription.findOne({_id:subscriptionId});
        if(!subscription) throw new Error('Subscription does not exist in the system');
        subscription.deleteOne()
        return await subscription.deleteOne();
    }
}

const updateSubscriptionBundle:ILogic = {
    name: "updateSubscriptionBundle",
    callback: async function (collection:{filter:{_id:string}, update:{bundle:string}}) {
        let subscription = await Subscription.findOne({_id:collection.filter._id});
        if(!subscription) throw new Error('Subscription does not exist in the system');
        if(!isValidateObjectID(collection.update.bundle)) throw new Error('Please provide a valid Bundle ID');
        let bundle = await Bundle.findOne({_id:collection.update.bundle});
        if(!bundle) throw new Error('bundle does not exist in system, provide valid bundle ID');
        if(!bundle.constraints?.isActive) throw new Error('You can not subscribe, bundle is not active');

        if(subscription.bundle?.toString() == collection.update.bundle) 
        {
            return subscription
        }
        // TODO :: verify that payment has been done
        if(!paymentValidator()) throw new Error('invalid payment')
        subscription.bundle = new mongoose.Types.ObjectId(collection.update.bundle);
        subscription.startDate = new Date();
        subscription.isActive = true
        subscription.isExpired = false;
        
        return await subscription.save().then(t => t.populate(['student','bundle'])).then(t => t);
    }
}

const getAllSubscriptions:ILogic = {
    name: "getAllSubscriptions",
    callback: async function () {
        return await Subscription.find().populate(['student','bundle']);
    }
}
const getSubscriptionById:ILogic = {
    name: "getSubscriptionById",
    callback: async function (subscriptionId:string) {
        return await Subscription.findOne({_id:subscriptionId}).populate(['student','bundle']);
    }
}


const getSubscriptionsByUserId:ILogic = {
    name: "getSubscriptionsByUserId",
    callback: async function (userId:string) {
        return await Subscription.find({student:userId}).populate(['student','bundle']);
    }
}


export default [createSubscription, updateSubscriptionBundle, cancelSubscription, getSubscriptionsByUserId,getAllSubscriptions,getSubscriptionById];

//ISubscription