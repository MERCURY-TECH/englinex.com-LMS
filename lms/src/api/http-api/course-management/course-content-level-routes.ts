/**
* @description User management routes creator
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:11: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import path from "path";
import fs from "fs"
// import RealTimeVoteCommunicator from "../socket/socket";
import httpverbs from '../HTTPVERB';
import { getAuthenticatedUser } from "../../../logic";
import { upload } from "../../../logic/image-upload";
import { routeSecurityLevel } from "../../../logic/lms-interfaces";



export default function(repository:any){
    return [
        
        {
            actionName: 'get all courses content levels',
            actionScope: routeSecurityLevel.public,
            routeDescription: 'Route used to get all course  conent levels in the system',
            method: httpverbs.get,
            route: '/get-all-course-content-levels',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { levels : await repository.getAllContentLevels() }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'create-courses-content-level',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to create a single or multiple courses content level in the system',
            method: httpverbs.post,
            route: '/create-courses-content-level',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    console.log(req.body)
                    message.message = { courses : await repository.createCourseContentLevel({levels:[...req.body]}) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },       
        {
            route: '/delete/content-level/:levelId',
            method: httpverbs.delete,
            actionName: 'delete-content-level',
            routeDescription: 'Delete course content level from platform',
            actionScope: routeSecurityLevel.forbiden,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    if(!req.params.levelId) throw new Error('Please provide the course content level  ID');
                    await repository.deleteCourseContentlevel({ filter: { _id: req.params.levelId } });
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
    ]
}