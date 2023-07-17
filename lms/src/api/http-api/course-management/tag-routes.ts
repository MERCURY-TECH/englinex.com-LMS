/**
* @description User management routes creator
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:11: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import { routeSecurityLevel } from '../../../logic/lms-interfaces';
import httpverbs from '../HTTPVERB';



export default function(repository:any){
    return [
        
        {
            actionName: 'get all tags',
            actionScope: routeSecurityLevel.public,
            routeDescription: 'Route used to get tags in the system',
            method: httpverbs.get,
            route: '/get-tags',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { tags : await repository.getAllTags() }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'create-tags',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to create a single or multiple tags in the system',
            method: httpverbs.post,
            route: '/create-tags',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    console.log(req.body)
                    message.message = { courses : await repository.createTag([...req.body]) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },       
        {
            route: '/delete/tag/:tagId',
            method: httpverbs.delete,
            actionName: 'delete-tag',
            routeDescription: 'Delete Tag',
            actionScope: routeSecurityLevel.forbiden,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    if(!req.params.tagId) throw new Error('Please provide tag  ID');
                    await repository.deleteTag({ filter: { _id: req.params.tagId } });
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
    ]
}