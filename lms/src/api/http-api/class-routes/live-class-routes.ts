/**
* @description Routes used to manage live classes
* @version 1.0
* @since  Saturday, 22 07 2023, at 15:34: 59 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import { subscriptionWorker } from '../../../logic';
import { routeSecurityLevel } from '../../../logic/lms-interfaces';
import httpverbs from '../HTTPVERB';


export default function(repository:any){
    return [
        
        {
            actionName: 'get-all-scheduled-live-classes',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to get all available upcoming schedules live classes',
            method: httpverbs.get,
            route: '/live/classes',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {

                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        
        {
            actionName: 'start-live-class',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to start a live class per schedule ID',
            method: httpverbs.get,
            route: '/live/:scheduleId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    // make sure its lecturer
                    // keep user waiting if lecturer is not online
                    // create room for schedule
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'join-live-class',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to get user schedule per course ID',
            middleware:[subscriptionWorker],
            method: httpverbs.get,
            route: '/live/join/:scheduleId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { schedule : await repository.getSchedulesByCourse(req.params.courseId) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'terminate-live-class',
            actionScope: routeSecurityLevel.protected,
            routeDescription: 'Route used to get lecturer schedule for courses he teaches',
            method: httpverbs.get,
            route: '/live/stop/:scheduleId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {

                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        }
    ]
}