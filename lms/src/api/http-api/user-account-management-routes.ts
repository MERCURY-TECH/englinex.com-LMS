/**
* @description User management routes creator
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:11: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import path from "path";
import fs from "fs"
import { upload } from "../../logic/image-upload";
import RealTimeVoteCommunicator from "../socket/socket";
import httpverbs from './HTTPVERB';
import { IUser, generateToken, connectUser, serializeUserDataResponse, encrytpUserPassword, subscriptionWorker } from "../../logic";
import { routeSecurityLevel } from "../../logic/lms-interfaces";


export default function(respository:any){
    return [
        {
            actionName: 'register-or-signup-users',
            actionScope: routeSecurityLevel.public,
            method: httpverbs.post,
            routeDescription: 'route used for the registration of user, this route is only available to all users. req.body : {firstname, lastname, email, telephone, password}, be aware that the username is the email',
            route: '/signup',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let registerUsers = await respository.registerUsers(req.body as Array<IUser>)
                    message.message = { users:registerUsers };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'register-or-signup-teacher',
            actionScope: routeSecurityLevel.public,
            method: httpverbs.post,
            routeDescription: 'route used for the registration of teachers, this route is only available to all users. req.body : {firstname, lastname, email, telephone, password}, be aware that the username is the email',
            route: '/signup-teacher',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let lecturer = await respository.createTeacherAccount(req.body as IUser)
                    message.message = { lecturer };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get all user per account type',
            actionScope: routeSecurityLevel.forbiden,
            method: httpverbs.get,
            routeDescription: 'Get all users in the application with a specific account type',
            route: '/get-all-users/:accountType',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let accountType = req.params.accountType;
                    let users = await respository.getAllUsersPerAccountType(accountType);
                    message.message = {} as any;
                    message.message[accountType+'s'] = users
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        
        {
            actionName: 'login',
            actionScope: routeSecurityLevel.public,
            routeDescription: 'Route used to login user. User has to provide his user name and his password data for system to authenticate him. This is public route so it can accessed publicly by anyone.',
            middleware:[subscriptionWorker],
            method: httpverbs.post,
            route: '/login',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let user = await connectUser(req.body.username as string, req.body.password as string);
                    let token = generateToken({ ...user }, process.env.Token_sercret, 60 * 60 * 60 * 24);
                    message.message = { token, user: serializeUserDataResponse(user) }
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            route: '/profile/picture',
            method: httpverbs.patch,
            actionName: 'update-profile-picture',
            routeDescription: 'Update users profile picture',
            middleware:upload.single('upload'),
            actionScope: routeSecurityLevel.protected,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let userid = req.authenticatedUser._doc._id as string;
                    let user=await respository.findUserByID(userid);
                    if(user){
                        if(user.profilePicture) {
                            //unlink image if exist
                            fs.unlink(path.join(__dirname,'../../..',user.profilePicture), (err:any)=>{
                                throw err;
                            })
                        }
                        user.profilePicture = req.uploadedImageURI;
                        await user.save();
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
            actionName: 'activate-users',
            actionScope: routeSecurityLevel.public,
            method: httpverbs.patch,
            routeDescription: 'Route to activate a user: When a user is created, his is initially not activated because he has to provide his account comfirmation information, so this routes gets the biometric data as password inorder to activate the user. ',
            route: '/register/activate',
            callback: async function (req: any, res: any) {
                let message: any = { success: true };
                try {
                    if (!req.body.username) throw new Error('Please provide username');
                    if (!req.body.biomertricString) throw new Error('Please provide biometric string');
                    let activateUser = await respository.activateUser();
                    let user = await activateUser({ biometricString: await encrytpUserPassword(req.body.biomertricString.trim()), username: req.body.username.trim() });
                    let token = generateToken({ ...user }, process.env.Token_sercret, 60 * 60 * 60 * 24);
                    message.message = { user: { ...user._doc, isActive: true }, token };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    console.log(error.message)
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(500).json(message);
            }
        },
        {
            route: '/get-all-users',
            method: httpverbs.get,
            actionName: 'get-all-users',
            routeDescription: 'gets all students, lecturers and admins on the platform, (Only accessible to admins) ',
            actionScope: routeSecurityLevel.forbiden,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let allUsers=await respository.getAllUsers();
                    message.message = { users:allUsers };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false;
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },


    ]
}