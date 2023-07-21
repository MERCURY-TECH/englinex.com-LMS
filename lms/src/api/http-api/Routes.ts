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
import courseManagementRoutes from './course-management/course-management-routes';
import courseSectionsRoutes from './course-management/course-sections-routes';
import courseMaterialRoutes from './course-management/course-material-routes';
import courseContentLevelRoutes from './course-management/course-content-level-routes';
import tagRoutes from './course-management/tag-routes';
import colorRoutes from './course-management/color-routes';
import studentLecturersRoutes from './student-lecturers-routes';
import bundelRoutes from './bundle-and-subscription-management/bundel-routes';


let serviceRouteDocumentation = (repository: any) => {
    return {
        serviceName: 'Englinx.com',
        baseUrl: 'http://' + os.hostname(),
        version: 'v1.0.0',
        serviceDescription: 'Englinx.com backend api service',
        actions: [
            {
                actionName: 'Englinx.com-routes-doc',
                actionScope: routeSecurityLevel.public,
                method: httpverbs.get,
                routeDescription: 'Provides the documentation for the service routes and possible service action names as well as their degree of protection or privileges needed to access them.',
                route: '/',
                callback: async function (req: any, res: any, next: any) {
                    let message: any = { success: true };
                    try {
                        message.message = { service: serviceRouteDocumentation(repository) };
                    } catch (error: any) {
                        message.errorMessage = error.message;
                        message.success = false
                    }
                    message.success ? res.status(200).json(message) : res.status(403).json(message);
                }
            },
          ...userAccountManagementRoutes(repository),
          ...permmisionManagementRoutes(repository),
          ...courseManagementRoutes(repository),
          ...courseSectionsRoutes(repository),
          ...courseMaterialRoutes(repository),
          ...courseContentLevelRoutes(repository),
          ...tagRoutes(repository),
          ...colorRoutes(repository),
          ...studentLecturersRoutes(repository),
          ...bundelRoutes(repository)
        ]
    } as serviceRoutes
}

export let canonicalServiceRoutes = (repository: any): serviceRoutes => {
    return serviceRouteDocumentation(repository)
}

export default function (repository: any) {
    return canonicalServiceRoutes(repository)
}


