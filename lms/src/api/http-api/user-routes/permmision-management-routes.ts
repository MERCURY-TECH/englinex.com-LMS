/**
* @description Routes related to platform permissions
* @version 1.0
* @since 2023, 06, Wednesday, 14,18, 36, 28 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import { routeSecurityLevel } from '../../../logic/lms-interfaces';
import httpverbs from '../HTTPVERB';

interface IPermissionRoleStructure {
    Sid: string,
    actions: String[]
}

export default function (repository: any) {
    return [
        {
            actionName: 'create-role',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Creates and returns a new role',
            method: httpverbs.post,
            route: '/create/role',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    // function areValidCandidateObjects(arr: any, arr2: any) {
                    //     return arr.every((i: any) => {
                    //         return arr2.includes(i)
                    //     });
                    // }
                    message.message = { newRole: await repository.createRole(req.body as IPermissionRoleStructure) };

                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'delete-role',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'deletes an existing role',
            method: httpverbs.delete,
            route: '/role/delete/:roleID',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    await repository.deleteRole({_id:req.params.roleID});
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-role',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'get existing roles',
            method: httpverbs.get,
            route: '/roles',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = {roles:await repository.getAllRole()}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-user-role',
            actionScope: routeSecurityLevel.protected,
            routeDescription: 'get user role',
            method: httpverbs.get,
            route: '/roles/:userId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = {userRole:await repository.getUserRole(req.params.userId)}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'update-role',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'update a role',
            method: httpverbs.patch,
            route: '/role/update/:roleID',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message ={role : await repository.updateRole({filter:{_id:req.params.roleID}, update:req.body as {Sid?:string, actions?:string[]}})};
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            route: '/delete/userpermissionrole/:permissionRoleID',
            method: httpverbs.delete,
            actionName: 'delete-userpermission-role',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Delete a role ID and comfirm on deletion',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    await repository.deletePermissionRole({ _id: req.params.permissionRoleID })
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            route: '/assign/:roleID/:userID',
            method: httpverbs.put,
            actionName: 'assign-role-to-user',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'assign a role to a user',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.UserPermission = repository.assignRoleToUser({ userID: req.params.userID, Role: req.params.roleID })
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            route: '/action-list',
            method: httpverbs.get,
            actionName: 'server-action-listing',
            actionScope: routeSecurityLevel.protected,
            routeDescription: 'assign a role to a user',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.actions = await repository.getActionList();
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        }
    ]
}