/**
* @description AuthorizationManager for managing application wide authorization
* @class AuthorizationManager.ts
* @version 1.0
* @since 2023, 06, Friday, 23,15, 15, 31 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { getAuthenticatedUser } from "..";
import Role from "../../models/permission-models/Role";
import UserPermission from "../../models/permission-models/UserPermission";

export default class AuthorizationManager {
    routePermissionStructure: any;
    database_operations: any
    constructor(routeStructure: any, database_operations: any) {
        this.routePermissionStructure = routeStructure;
        this.database_operations = database_operations;
        this.createSystemPermissionStructure()
    }

    public validateAction(action: string) {
        return async function (req: any, res: any, next: any) {
            let message: any = { success: true };
            try {
                if (!req.headers.authorization) throw new Error('Please provide authorization token')
                let authenticatedUser = getAuthenticatedUser(req.headers.authorization.split(' ')[1].trim());
                if (authenticatedUser.isSuspended) throw new Error('User is suspended and can not proceed');
                if (authenticatedUser.isActive) throw new Error('User account is not activated yet, you need activation to proceed');
                let userPermission =await UserPermission.findOne({UserID:(authenticatedUser as any)._doc._id});
                if(userPermission){
                    let role = await Role.findOne({_id:userPermission.Role?.toString()});
                    if(role){
                        if(role.actions.includes(action)) return next();
                        throw new Error('user does not have to access that priviledges')
                    }
                }
                throw new Error('user has no assigned role')
            } catch (error: any) {
                message.errorMessage = error.message;
                message.success = false
                res.status(500).json(message);
            }
        }
    }

    async createSystemPermissionStructure() {
        let service = this.routePermissionStructure;
        let createPermissionStructure = await this.database_operations.createPermissionStructure();
        let serviceActions = service.actions.map((actionItem: any) => {
            return { name: actionItem.actionName, scope: actionItem.actionScope }
        })
        await createPermissionStructure({ version: service.version, actions: serviceActions });
    }
}