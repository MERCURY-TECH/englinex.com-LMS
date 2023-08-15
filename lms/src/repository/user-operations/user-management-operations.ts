/**
* @description User management database operations
* @version 1.0
* @since  Monday, 17 07 2023, at 08:57: 31 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { IUser } from "../../logic";
import { AccountType } from "../../logic/lms-interfaces";
import User from "../../models/user-models/User";
import { ILogic } from "../IOperations";

const registerUsers:ILogic = {
    name: "registerUsers",
    callback: async function (collection: Array<IUser>) {
       return await new User(collection).save()
    }
}

const findUserByID:ILogic = {
    name: "findUserByID",
    callback: async function (userId:String) {
       return await User.findOne({_id:userId}).populate(['registeredCourses']).select(['-password', "-isRoot"]);
    }
}
const toggleSuspendUserByID:ILogic = {
    name: "toggleSuspendUserByID",
    callback: async function (userId:String) {
        let userToSuspend:any = await User.findOne({_id:userId});
        if(userToSuspend) userToSuspend.isSuspended = !userToSuspend.isSuspended
        return await userToSuspend.save().then((t:any)=>t.populate(['registeredCourses']).select(['-password', "-isRoot"]));
    }
}
const updateUserAccountByID:ILogic = {
    name: "updateUserAccountByID",
    callback: async function (userId:String,update:any) {
        let updatedUser:any = await User.findOneAndUpdate({_id:userId},update);
        
        return updatedUser._doc;
    }
}

const findUserByField:ILogic = {
    name: "findUserByField",
    callback: async function (collection:any) {
       return await User.findOne(collection).populate(['registeredCourses']).select(['-password', "-isRoot"]);
    }
}

const getAllUsers:ILogic = {
    name: "getAllUsers",
    callback: async function () {
       return await User.find({isRoot:false}).populate(['registeredCourses']).select(['-password', "-isRoot"]);
    }
}

const getAllUsersPerAccountType:ILogic = {
    name: "getAllUsersPerAccountType",
    callback: async function (accountType:string) {
        if(!(Object.values(AccountType) as Array<string>).includes(accountType)) throw new Error('Invalid account type, possible options are :: == > > '+ (Object.values(AccountType) as Array<string>))
        let users = await User.find({isRoot:false,accountType: accountType}).populate(['registeredCourses']).select(["-isRoot"]);
       return users;
    }
}

const createTeacherAccount:ILogic = {
    name: "createTeacherAccount",
    callback: async function (collection:IUser) {
       collection.isActive = false;
       collection.accountType = AccountType.lecturer
       return await new User(collection).save().then((t:any)=> t.populate(['registeredCourses']));
    }
}
const createAdminAccount:ILogic = {
    name: "createAdminAccount",
    callback: async function (collection:IUser) {
       collection.isActive = true;
       collection.accountType = AccountType.admin
       return await new User(collection).save().then((t:any)=> t.populate(['registeredCourses']));
    }
}
const deleteAccount:ILogic = {
    name: "deleteAccount",
    callback: async function (userId:string) {
        console.log(userId)
        if(!userId) throw new Error('Please provide user ID')
       return await User.findOneAndDelete({_id:userId})
    }
}

export default [getAllUsers,createTeacherAccount,registerUsers,findUserByID, findUserByField,getAllUsersPerAccountType,createAdminAccount,toggleSuspendUserByID,deleteAccount,updateUserAccountByID];