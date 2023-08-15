/**
* @description Database operations for managing permissions
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:13: 59 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { routeSecurityLevel } from "../../logic/lms-interfaces";
import PermissionStructure from "../../models/permission-models/PermissionStructure";
import Role from "../../models/permission-models/Role";
import UserPermission from "../../models/permission-models/UserPermission";


interface IPermissionStructure{
    version:string,
    actions: {name: string, scope: routeSecurityLevel}[]
}
export interface IPermissionRoleStructure{
    Sid:string,
    actions: String[]
}

/**
 * Creates and saves a permission policy
 *
 *  Example
 * -- 
 * 
 * ```
    let policy:PermissionPolicy = {.....}
    // get function to create a permission policy
    let permissionPolicy = await createPermissionPolicy();
    let createdPolicy = await  permissionPolicy(policy);
 *
 * ```
 * Policy is of type ``IPermisionPolicy``
 * 
 * Interface implemented
 * --
 * ```
 * 
    export interface IPermisionPolicy{
        Sid:string,
        Effect: 'Allow' | 'Denny',
        Statement: Array<{
                ERPServiceName: string,
        Actions: Array<String>
        }>
    }
 * ```
 */
const createPermissionStructure = {
    name: "createPermissionStructure",
    callback: async function (collection: IPermissionStructure) {
        let serviceVersion = await PermissionStructure.findOne({}, {}, { sort: { 'created_at' : -1 } });
        if(serviceVersion){
            serviceVersion.version = collection?.version,
            serviceVersion.actions = collection?.actions;
            return await serviceVersion.save();
        }
        let serviceEventRouteAndPERMStructure = await new PermissionStructure(collection).save();
        return serviceEventRouteAndPERMStructure;
    },
    error: function (err: any): void { console.log(err.message) }
}

const createRole={
    name: "createRole",
    callback: async function (collection: IPermissionRoleStructure) {
        return await new Role(collection).save();
    },
    error: function (err: any): void { console.log(err.message) }
}
const deleteRole={
    name: "deleteRole",
    callback: async function (collection: {_id:string}) {
        await Role.findOneAndDelete(collection);
        return {success:true};
    },
    error: function (err: any): void { console.log(err.message) }
}
const updateRole={
    name: "updateRole",
    callback: async function (collection: {filter:{_id:string},update:{Sid?:string, actions?:string[]}}) {
        return await Role.findOneAndUpdate(collection.filter, collection.update);;
    },
    error: function (err: any): void { console.log(err.message) }
}
const deletePermissionRole={
    name: "deletePermissionRole",
    callback: async function (collection: {_id:string}) {
        await UserPermission.findOneAndDelete(collection);
        return {success:true};
    },
    error: function (err: any): void { console.log(err.message) }
}
const updatePermissionRole={
    name: "updateUserPermissionRole",
    callback: async function (collection: {filter:{UserID:string},update:{Role:string}}) {
        return await UserPermission.findOneAndUpdate(collection.filter, collection.update);;
    },
    error: function (err: any): void { console.log(err.message) }
}
const getRoleBySID={
    name: "getRoleBySID",
    callback: async function (Sid:string) {
        return await Role.findOne({Sid});
    },
    error: function (err: any): void { console.log(err.message) }
}
const getAllRole={
    name: "getAllRole",
    callback: async function () {
        return await Role.find();
    },
    error: function (err: any): void { console.log(err.message) }
}

const assignRoleToUser = {
    name: "assignRoleToUser",
    callback: async function (collection: {userID:string, Role:string}) {
        await UserPermission.findOneAndDelete({UserID:collection.userID})
        return await new UserPermission({UserID:collection.userID, Role:collection.Role}).save();
    },
    error: function (err: any): void { console.log(err.message) }
}
const getActionList = {
    name: "getActionList",
    callback: async function () {
        return await PermissionStructure.findOne({}, {}, { sort: { 'created_at' : -1 } });
    },
    error: function (err: any): void { console.log(err.message) }
}

const getUserRole = {
    name: "getUserRole",
    callback: async function (UserID:string) {
        return await UserPermission.findOne({UserID}).populate(['Role']);
    },
    error: function (err: any): void { console.log(err.message) }
}


export default [ updateRole, deletePermissionRole, createPermissionStructure,createRole, assignRoleToUser,updatePermissionRole, deleteRole,getActionList, getRoleBySID, getAllRole, getUserRole]