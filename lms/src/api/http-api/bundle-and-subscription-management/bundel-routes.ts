/**
* @description Routes for managing user bundles
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:11: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { routeSecurityLevel, IStudentLecturerRelationShip, IBundle } from '../../../logic/lms-interfaces';
import httpverbs from '../HTTPVERB';


export default function(respository:any){
    return [
        {
            actionName: 'creat-a-bundle',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.post,
            routeDescription: 'route used by and admin with the create-a-bundle priviledges to create a bundle',
            route: '/bundle/create',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let bundle = await respository.createBundle(req.body as IBundle)
                    message.message = { bundle };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'delete-bundle',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.delete,
            routeDescription: 'route used to unlink a lecturer to a student',
            route: '/bundle/delete/:bundleId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    await respository.deleteBundle(req.params.bundleId)
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'toggle-activate-bundle',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.patch,
            routeDescription: 'route used to get all related lecturers and students',
            route: '/bundle/toggle-activate/:bundleId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let bundle = await respository.toggleActivateBundle(req.params.bundleId);
                    message.message = {bundle}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'update-bundle',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.patch,
            routeDescription: 'route used to get all lectures and student related to a specific course',
            route: '/bundle/update/:bundleId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let bundle = await respository.updateBundle({
                        filter:{_id:req.params.bundleId},
                        update:req.body as IBundle
                    });
                    console.log(req.params.courseId)
                    message.message = {...bundle._doc, ...req.body as IBundle}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-all-bundles & get-all-bundle-per-search-field',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.get,
            routeDescription: 'route used to get all lectures and student related to a specific course',
            route: '/bundles',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let bundles = await respository.getAllBundles(req.body as IBundle);
                    message.message = {bundles}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-active-bundles',
            actionScope: routeSecurityLevel.public,
            method: httpverbs.get,
            routeDescription: 'route used to get all lectures and student related to a specific course',
            route: '/bundles/active',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let bundles = await respository.getAllActiveBundles();
                    message.message = {bundles}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        


    ]
}