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
import { getAuthenticatedUser, subscriptionWorker } from "../../../logic";
import { upload } from "../../../logic/image-upload";
import { routeSecurityLevel } from "../../../logic/lms-interfaces";



export default function(repository:any){
    return [
        
        {
            actionName: 'get all courses',
            actionScope: routeSecurityLevel.public,
            routeDescription: 'Route used to get all course in the system',
            method: httpverbs.get,
            route: '/get-all-courses',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { courses : await repository.getAllCourses() }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'register-course',
            actionScope: routeSecurityLevel.protected,
            method: httpverbs.patch,
            routeDescription: 'Route by user to register for a specific course ',
            middleware:[subscriptionWorker],
            route: '/register/course/:courseId',
            callback: async function (req: any, res: any) {
                let message: any = { success: true };
                try {
                    let course = req.params.courseId as string;
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);            
                    message.message = { registeredCourse: await repository.registerCourse({courseId:course, studentId:user._doc._id}) };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(500).json(message);
            }
        },
        {
            actionName: 'un-register-course',
            actionScope: routeSecurityLevel.protected,
            method: httpverbs.patch,
            routeDescription: 'Route by user to un-register for a specific course ',
            route: '/de-register/course/:courseId',
            callback: async function (req: any, res: any) {
                let message: any = { success: true };
                try {
                    let course = req.params.courseId as string;
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);            
                    message.message = { registeredCourse: await repository.deregisterCourse({courseId:course, studentId:user._doc._id}) };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(500).json(message);
            }
        },
        {
            actionName: 'get a single course',
            actionScope: routeSecurityLevel.public,
            routeDescription: 'Route used to get a course in the system',
            method: httpverbs.get,
            route: '/get-course/:courseId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { courses : await repository.findCourseByID(req.params.courseId) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'create courses',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to create a single or multiple courses in the system',
            method: httpverbs.post,
            route: '/create-courses',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);
                    let courses:any = [...req.body];
                    for(let course of courses){
                        course['createdBy'] = user._doc._id
                    }
                    message.message = { courses : await repository.createCourse(courses) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'mass import courses',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to import whole courses a single or multiple courses in the system',
            method: httpverbs.post,
            route: '/import-course',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);
                    let courses:any = [...req.body];
                    for(let course of courses){
                        course['createdBy'] = user._doc._id;
                    }
                    message.message = { courses : await repository.importCourse(courses) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'Edit courses',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to Edit a single course in the system',
            method: httpverbs.patch,
            route: '/edit-courses/:courseID',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);
                    if(!req.params.courseID) throw new Error('Please provide the course ID');
                    let update:any = {...req.body};
                    update['lastUpdatedBy'] = user._doc._id ;
                    console.log(user)
                    message.message = { courses : {...(await repository.updateCourse({filter:{_id:req.params.courseID}, update}))._doc, ...req.body} }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            route: '/cover-image/:courseID',
            method: httpverbs.patch,
            actionName: 'edit course-cover-image',
            routeDescription: 'Update course cover image',
            middleware:upload.single('upload'),
            actionScope: routeSecurityLevel.forbiden,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    if(!req.params.courseID) throw new Error('Please provide the course ID')
                    let course=await repository.findCourseByID(req.params.courseID);
                    if(course){
                        if(course.coverimage) {
                            //unlink image if exist
                            fs.unlink(path.join(__dirname,'../../..',course.coverimage), (err:any)=>{
                                throw err;
                            })
                        }
                        course.coverimage = req.uploadedImageURI;
                        await course.save();
                        message.message = { url:req.uploadedImageURI };
                    } else throw new Error('Invalid user id');
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            route: '/delete/course/:courseId',
            method: httpverbs.delete,
            actionName: 'delete-course',
            routeDescription: 'Delete course from platform',
            middleware:upload.single('upload'),
            actionScope: routeSecurityLevel.forbiden,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    if(!req.params.courseId) throw new Error('Please provide the course  ID');
                    await repository.deleteCourse({ filter: { _id: req.params.courseId } });
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
    ]
}