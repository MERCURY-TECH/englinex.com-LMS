/**
* @description Class scheduling routes
* @version 1.0
* @since  Friday, 21 07 2023, at 18:14: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { getAuthenticatedUser, subscriptionWorker } from '../../../logic';
import { IClassSchedule, routeSecurityLevel } from '../../../logic/lms-interfaces';
import httpverbs from '../HTTPVERB';



export default function(repository:any){
    return [
        
        {
            actionName: 'get-all-schedules',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to get all available upcoming schedules',
            method: httpverbs.get,
            route: '/schedules/valid',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { schedules : await repository.getAllValidSchedules() }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'create-a-schedule',
            actionScope: routeSecurityLevel.protected,
            routeDescription: 'Route used to create a user schedule',
            method: httpverbs.post,
            middleware:[subscriptionWorker],
            route: '/schedules/create',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);
                    let schedule = req.body as IClassSchedule
                    schedule.student = req.body.student ? req.body.student : user._doc._id
                    message.message = { schedule : await repository.createSchedule(schedule) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-schedule-by-course',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to get user schedule per course ID',
            method: httpverbs.get,
            route: '/schedules/course/:courseId',
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
            actionName: 'get-schedule-by-student',
            actionScope: routeSecurityLevel.protected,
            routeDescription: 'Route used to get user schedule per student ID',
            middleware:[subscriptionWorker],
            method: httpverbs.get,
            route: '/schedules/student/:studentId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let schedules = await repository.getSchedulesByStudent(req.params.studentId)
                    message.message = { schedules }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-schedule-by-lecturer',
            actionScope: routeSecurityLevel.protected,
            routeDescription: 'Route used to get lecturer schedule for courses he teaches',
            // middleware:[subscriptionWorker],
            method: httpverbs.get,
            route: '/schedules/lecturer/:lecturerId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { schedules : await repository.getScheduleAssociatedTolecturer(req.params.lecturerId) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'cancel-class-schedule',
            actionScope: routeSecurityLevel.protected,
            routeDescription: 'Route used to cancel a schedule per student ID',
            middleware:[subscriptionWorker],
            method: httpverbs.delete,
            route: '/schedules/cancel/:scheduleId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    await repository.cancelSchedule(req.params.scheduleId)
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'comfirm-class-schedule',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to comfirm a schedule per student ID',
            method: httpverbs.patch,
            route: '/schedules/comfirm/:scheduleId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { schedule : await repository.comfirmSchedule(req.params.scheduleId) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'assign-Lecturer-To-Schedule',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to Assign lecturer to schedule',
            method: httpverbs.patch,
            route: '/schedules/assign/:lecturerId/:scheduleId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { schedule : await repository.assignLecturerToSchedule({filter:{_id:req.params.scheduleId}, update:{lecturer:req.params.lecturerId}}) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
    ]
}