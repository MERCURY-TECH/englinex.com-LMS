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
            actionName: 'create courses',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to create a single or multiple courses in the system',
            method: httpverbs.post,
            route: '/create-courses',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    // check if content is provided and create it at once
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
            actionName: 'Edit courses',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to Edit a single course in the system',
            method: httpverbs.patch,
            route: '/edit-courses/:courseID',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    // check if content is provided and create it at once
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);
                    if(!req.params.courseID) throw new Error('Please provide the course ID')
                    let course=await repository.findCourseByID(req.params.courseID);
                    course['lastUpdatedBy'] = user._doc._id
                    message.message = { courses : {...(await repository.updateCourse({filter:{_id:req.params.courseID, update:req.body}}))._doc, ...req.body} }
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