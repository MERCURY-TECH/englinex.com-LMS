/**
* @description main application routes
* @version 1.0
* @since 2023, 06, Wednesday, 14,20, 10, 57 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/



import httpverbs from './HTTPVERB';
import os from 'os';
import userAccountManagementRoutes from './user-account-management-routes';
import permmisionManagementRoutes from './permmision-management-routes';
import { routeSecurityLevel, serviceRoutes } from '../../logic/lms-interfaces';


let serviceRouteDocumentation = (respository: any) => {
    return {
        serviceName: 'CamBar',
        baseUrl: 'http://' + os.hostname(),
        version: 'v1.0.0',
        serviceDescription: 'Baro-vote backend api service, for handle votes',
        actions: [
            {
                actionName: 'bravo-vote-routes-doc',
                actionScope: routeSecurityLevel.public,
                method: httpverbs.get,
                routeDescription: 'Provides the documentation for the service routes and possible service action names as well as their degree of protection or privileges needed to access them',
                route: '/',
                callback: async function (req: any, res: any, next: any) {
                    let message: any = { success: true };
                    try {
                        message.message = { service: serviceRouteDocumentation(respository) };
                    } catch (error: any) {
                        message.errorMessage = error.message;
                        message.success = false
                    }
                    message.success ? res.status(200).json(message) : res.status(403).json(message);
                }
            },
          ...userAccountManagementRoutes(respository),
          ...permmisionManagementRoutes(respository),
        ]
    } as serviceRoutes
}

export let canonicalServiceRoutes = (respository: any): serviceRoutes => {
    return serviceRouteDocumentation(respository)
}

export default function (repository: any) {
    return canonicalServiceRoutes(repository)
}


