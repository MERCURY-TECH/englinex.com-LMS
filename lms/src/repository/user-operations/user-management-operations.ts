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
       return await User.insertMany(collection);
    }
}

const findUserByID:ILogic = {
    name: "findUserByID",
    callback: async function (userId:String) {
       return await User.findOne({_id:userId});
    }
}

const findUserByField:ILogic = {
    name: "findUserByField",
    callback: async function (collection:any) {
       return await User.findOne(collection);
    }
}

const getAllUsers:ILogic = {
    name: "getAllUsers",
    callback: async function () {
       return await User.find({isRoot:false}).select(['-password', "-isRoot","-isSuspended"]);
    }
}

const getAllUsersPerAccountType:ILogic = {
    name: "getAllUsersPerAccountType",
    callback: async function (accountType:string) {
        if(!(Object.values(AccountType) as Array<string>).includes(accountType)) throw new Error('Invalid account type, possible options are :: == > > '+ (Object.values(AccountType) as Array<string>))
        let users = await User.find({isRoot:false,accountType: accountType}).select(['-password', "-isRoot","-isSuspended"]);
       return users;
    }
}


const createTeacherAccount:ILogic = {
    name: "createTeacherAccount",
    callback: async function (collection:IUser) {
       collection.isActive = false;
       collection.accountType = AccountType.lecturer
       return await new User(collection).save()//.select(['-password', "-isRoot","-isSuspended"]);
    }
}

export default [getAllUsers,createTeacherAccount,registerUsers,findUserByID, findUserByField,getAllUsersPerAccountType];