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
            actionName: 'get-all-colors',
            actionScope: routeSecurityLevel.public,
            routeDescription: 'Route used to get content colors in the system',
            method: httpverbs.get,
            route: '/get-colors',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    message.message = { colors : await repository.getAllCourseMaterialColor() }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'create-colors',
            actionScope: routeSecurityLevel.forbiden,
            routeDescription: 'Route used to create a single or multiple colors in the system',
            method: httpverbs.post,
            route: '/create-colors',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    console.log(req.body)
                    message.message = { courses : await repository.createCourseMaterialColor([...req.body]) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },       
        {
            route: '/delete/color/:colorId',
            method: httpverbs.delete,
            actionName: 'delete-color',
            routeDescription: 'Delete color',
            actionScope: routeSecurityLevel.forbiden,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    if(!req.params.colorId) throw new Error('Please provide color  ID');
                    await repository.deleteCourseMaterialColor({ filter: { _id: req.params.colorId } });
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        }
    ]
}