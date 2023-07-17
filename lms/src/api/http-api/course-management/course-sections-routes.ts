/**
* @description User management routes creator
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:11: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import path from 'path';
import { getAuthenticatedUser } from '../../../logic';
import { routeSecurityLevel } from '../../../logic/lms-interfaces';
import httpverbs from '../HTTPVERB';
import { upload } from '../../../logic/image-upload';


export default function(repository:any){
    return [
        {
            actionName: 'get-course-sections-per-course',
            actionScope: routeSecurityLevel.public,
            routeDescription: 'Route used to get all course sections in the system',
            method: httpverbs.get,
            route: '/course-sections/:courseId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { sections : await repository.getAllCourseSectionPerCourseId(req.params.courseId) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'create-course-section',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to create a single or multiple courses in the system',
            method: httpverbs.post,
            route: '/create-course-section/:courseId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);
                    let courseSections:any = [...req.body];
                    for(let courseSection of courseSections){
                        courseSection['createdBy'] = user._doc._id;
                        courseSection['courseId'] = req.params.courseId;
                    }
                    console.log( courseSections )
                    message.message = { courseSections : await repository.createCourseSections({courseId:req.params.courseId, sections:courseSections}) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'Edit-a-course-Section',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to create a single course section in the system',
            method: httpverbs.patch,
            route: '/edit-course-section/:sectionId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let sectionId = req.params.sectionId;
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);
                    if(!sectionId) throw new Error('Please provide the course section ID');
                    message.message = { section : {...(await repository.updateCourseSection({filter:{_id:sectionId, update:{...req.body, lastUpdatedBy:user._doc._id }}}))._doc, ...req.body} }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            route: '/section/cover-image/:sectionId',
            method: httpverbs.patch,
            actionName: 'edit-course--section-cover-image',
            routeDescription: 'Update course section cover image',
            middleware:upload.single('upload'),
            actionScope: routeSecurityLevel.forbiden,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    if(!req.params.sectionId) throw new Error('Please provide the course section ID');
                    
                    let section=await repository.findCourseSectionByID(req.params.sectionId);
                    if(section){
                        if(section.coverimage) {
                            //unlink image if exist
                            fs.unlink(path.join(__dirname,'../../..',section.coverimage), (err:any)=>{
                                throw err;
                            })
                        }
                        section.coverimage = req.uploadedImageURI;
                        await section.save();
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
            route: '/delete/section/:sectionId',
            method: httpverbs.delete,
            actionName: 'delete-course-section',
            routeDescription: 'Update course section cover image',
            actionScope: routeSecurityLevel.forbiden,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    if(!req.params.sectionId) throw new Error('Please provide the course section ID');
                    await repository.deleteCourseSection({ filter: { _id: req.params.sectionId } });
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
    ]
}