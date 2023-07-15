

import { ILogic, IUser } from "../IOperations";
import User from "../models/User";

//create course
// create course sections
// create course materials
// update course
// delete course

const registerUsers:ILogic = {
    name: "registerUsers",
    callback: async function (collection: Array<IUser>) {
       return await User.insertMany(collection);
    },
    error: function (err: any): void {console.log(err.message)}
}

const findUserByID:ILogic = {
    name: "findUserByID",
    callback: async function (userId:String) {
       return await User.findOne({_id:userId});
    },
    error: function (err: any): void {console.log(err.message)}
}
const getAllUsers:ILogic = {
    name: "getAllUsers",
    callback: async function () {
       return await User.find().select(['-biometry', "-isActive",
       "-isSuspended","-votingsSessionsRegisteredFor"]);
    },
    error: function (err: any): void {console.log(err.message)}
}


const activateUser:ILogic = {
    name: "activateUser",
    callback: async function (collection:{biometricString: string, username: string}) {
        return await User.findOneAndUpdate({username:collection.username.trim().toLowerCase()},{biometry:collection.biometricString, isActive:true}).select(['-biometry'])
    },
    error: function (err: any): void {console.log(err.message)}
}

export default [getAllUsers,registerUsers,findUserByID,findUsersPerVoteType,activateUser]