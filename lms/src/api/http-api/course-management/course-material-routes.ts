/**
* @description User management routes creator
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:11: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import { getAuthenticatedUser } from '../../../logic';
import { routeSecurityLevel } from '../../../logic/lms-interfaces';
import httpverbs from '../HTTPVERB';


export default function(repository:any){
    return [
        {
            actionName: 'get-materials-per-section',
            actionScope: routeSecurityLevel.public,
            routeDescription: 'Route used to get all course sections in the system',
            method: httpverbs.get,
            route: '/section-materials/:sectionId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { materials : await repository.getAllSectionMaterialPerSectionId(req.params.sectionId) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'create-material-section',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to create a single or multiple course material sections in the system',
            method: httpverbs.post,
            route: '/create-material-section/:sectionId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);
                    let courseSectionMaterials:any = [...req.body];
                    for(let courseSectionMaterial of courseSectionMaterials){
                        courseSectionMaterial['createdBy'] = user._doc._id;
                        courseSectionMaterial['sectionId'] = req.params.sectionId;
                    }

                    message.message = { courseMaterial : await repository.createCourseSectionMaterial({sectionId:req.params.sectionId, materials:courseSectionMaterials}) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'Edit-a-course-Section-material',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to create a single course section in the system',
            method: httpverbs.patch,
            route: '/edit-section-material/:materialId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let materialId = req.params.materialId;
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);
                    if(!materialId) throw new Error('Please provide the course section ID');
                    message.message = { material : {...(await repository.updateCourseSectionMaterial({filter:{_id:materialId, update:{...req.body, lastUpdatedBy:user._doc._id }}}))._doc, ...req.body} }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            route: '/delete/material/:materialId',
            method: httpverbs.delete,
            actionName: 'delete-course-section-material',
            routeDescription: 'Route used by admin to delete the course material per section',
            actionScope: routeSecurityLevel.forbiden,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    if(!req.params.materialId) throw new Error('Please provide the course section material ID');
                    await repository.deleteCourseSectionMaterial({ filter: { _id: req.params.materialId } });
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
    ]
}