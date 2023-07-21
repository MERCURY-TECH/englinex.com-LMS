/**
* @description Subscription-routes
* @version 1.0
* @since  Friday, 21 07 2023, at 16:10: 05 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { isValidateObjectID } from '../../../logic';
import { routeSecurityLevel, ISubscription } from '../../../logic/lms-interfaces';
import httpverbs from '../HTTPVERB';


export default function(respository:any){
    return [
        {
            actionName: 'create-a-subscription',
            actionScope: routeSecurityLevel.public,
            method: httpverbs.post,
            routeDescription: 'route used by any user to create a subscription',
            route: '/subscription/create',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    // make payment and proceed.
                    let subscription = await respository.createSubscription(req.body as ISubscription)
                    message.message = { subscription };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'cancel-subscription',
            actionScope: routeSecurityLevel.protected,
            method: httpverbs.delete,
            routeDescription: 'route used to cancel a user subscription',
            route: '/subscription/cancel/:subscriptionId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    await respository.cancelSubscription(req.params.subscriptionId)
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'update-subscription-bundle',
            actionScope: routeSecurityLevel.protected,
            method: httpverbs.patch,
            routeDescription: 'route used to get all related lecturers and students',
            route: '/subscription/update/bundle/:subscriptionId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    if(!isValidateObjectID(req.params.subscriptionId)) throw new Error('Please provide a valid subscription ID');
                    let subscription = await respository.updateSubscriptionBundle({filter:{_id:req.params.subscriptionId}, update:{bundle:req.body.bundle}});
                    message.message = {subscription}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
       
        {
            actionName: 'get-all-subscriptions & get-all-subscriptions-per-search-field',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.get,
            routeDescription: 'route used to get all subscriptions in the system',
            route: '/subscription',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let subscriptions = await respository.getAllSubscriptions();
                    message.message = {subscriptions}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-user-subscription',
            actionScope: routeSecurityLevel.protected,
            method: httpverbs.get,
            routeDescription: 'route used to get an individual user subscription',
            route: '/subscriptions/student/:studentId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let subscriptions = await respository.getSubscriptionsByUserId(req.params.studentId);
                    message.message = {subscriptions}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-single-subscription-by-ID',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.get,
            routeDescription: 'route used to get an individual subscription by its ID',
            route: '/subscriptions/:subscriptionId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let subscription = await respository.getSubscriptionById(req.params.subscriptionId);
                    message.message = {subscription}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
    ]
}