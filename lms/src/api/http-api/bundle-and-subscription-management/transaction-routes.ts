/**
* @description Routes for managing user bundles
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:11: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { getAuthenticatedUser } from '../../../logic';
import { routeSecurityLevel, IBundle, ITransaction, ISubscription } from '../../../logic/lms-interfaces';
import httpverbs from '../HTTPVERB';


export default function(respository:any){
    return [
        {
            actionName: 'get-transaction-id',
            actionScope: routeSecurityLevel.public,
            method: httpverbs.get,
            routeDescription: 'route used to get a transaction ID',
            route: '/transaction/id',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let _id = await respository.generateTransactionID()
                    message.message = { _id };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'initiate-Transaction',
            actionScope: routeSecurityLevel.protected,
            method: httpverbs.post,
            routeDescription: 'route used to initiate a transaction',
            route: '/transaction/initiate/:transactionId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let collection:ITransaction = req.body;
                    let user: any = await getAuthenticatedUser(req.headers.authorization.split(' ')[1]);
                    user._doc._id ? collection.student = user._doc._id : '';
                    collection._id = req.params.transactionId;
                    let transaction = await respository.initiateTransaction(collection)
                    let subscription:any;
                    if(collection.status === 'success'){
                        subscription=  await respository.createSubscription({ bundle:collection.bundle, student:collection.student} as ISubscription)
                    }
                    message.message = {transaction :transaction, subscription};
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'transaction-status-notify',
            actionScope: routeSecurityLevel.public,
            method: httpverbs.post,
            routeDescription: 'Route used by service provider to notify on payment success',
            route: '/transaction/notify/:transactionId',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {

                    // let bundle = await respository.updateBundle({
                    //     filter:{_id:req.params.bundleId},
                    //     update:req.body as IBundle
                    // });
                    // console.log(req.params.courseId)
                    // message.message = {...bundle._doc, ...req.body as IBundle}
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-all-transactions',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.get,
            routeDescription: 'no doc',
            route: '/transactions',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let transactions = await respository.getAllTransaction();
                    message.message = {transactions}
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
            routeDescription: 'route used to get all active bundles in the system',
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