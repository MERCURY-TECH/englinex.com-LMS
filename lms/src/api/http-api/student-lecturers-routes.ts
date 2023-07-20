/**
* @description User management routes for
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:11: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import httpverbs from './HTTPVERB';
import { IStudentLecturerRelationShip, routeSecurityLevel } from "../../logic/lms-interfaces";


export default function(respository:any){
    return [
        {
            actionName: 'link-lecturer-to-student',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.post,
            routeDescription: 'route used to link a lecturer to a student',
            route: '/link-lecturer',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let linkedUsers = await respository.linkStudentToLecturer(req.body as IStudentLecturerRelationShip)
                    message.message = { link:linkedUsers };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'unLink-lecturer-to-student',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.post,
            routeDescription: 'route used to unlink a lecturer to a student',
            route: '/unlink-lecturer',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    await respository.unLinkStudentToLecturer(req.body as IStudentLecturerRelationShip)
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-all-linked-students-and-lecturers',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.get,
            routeDescription: 'route used to get all related lecturers and students',
            route: '/get-links',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let links = await respository.getLinkedStudentAndLecturers();

                    message.message = {links}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-all-linked-students-and-lecturers-per-course',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.get,
            routeDescription: 'route used to get all lectures and student related to a specific course',
            route: '/get-links-per-course/:courseId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let links = await respository.getLinkedStudentAndLecturersPerCourse(req.params.courseId);
                    message.message = {links}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        


    ]
}