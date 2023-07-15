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
import { IUser, encrytpUserBiometry, generateToken, connectUser, serializeUserDataResponse } from "../../logic";
import { routeSecurityLevel } from "../../logic/lms-interfaces";


export default function(respository:any){
    return [
        {
            actionName: 'register-users',
            actionScope: routeSecurityLevel.public,
            method: httpverbs.post,
            routeDescription: 'route used for the registration of user, this route is only available to user with higher prividleges and service role or user with authorized service actions. req.body : {firstname, lastname, email, telephone} ',
            route: '/register',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let registerUsers = await respository.registerUsers()
                    let users = await registerUsers(req.body as Array<IUser>);
                    message.message = { users };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'get-all-users',
            actionScope: routeSecurityLevel.public,
            method: httpverbs.get,
            routeDescription: 'Get all users in the application ',
            route: '/get-all-users',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let getAllUsers = await respository.getAllUsers()
                    let users = await getAllUsers();
                    message.message = { users };
                } catch (error: any) {
                    message.errorMessage = error.message;
                    message.success = false
                }
                message.success ? res.status(200).json(message) : res.status(403).json(message);
            }
        },
        {
            actionName: 'activate-users',
            actionScope: routeSecurityLevel.public,
            method: httpverbs.patch,
            routeDescription: 'Route to activate a user: When a user is created, his is initially not activated because he has to provide his biometric information, so this routes gets the biometric data as password inorder to activate the user. ',
            route: '/register/activate',
            callback: async function (req: any, res: any) {
                let message: any = { success: true };
                try {
                    if (!req.body.username) throw new Error('Please provide username');
                    if (!req.body.biomertricString) throw new Error('Please provide biometric string');
                    let activateUser = await respository.activateUser();
                    let user = await activateUser({ biometricString: await encrytpUserBiometry(req.body.biomertricString.trim()), username: req.body.username.trim() });
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
            actionName: 'login',
            actionScope: routeSecurityLevel.public,
            routeDescription: 'route used to login user. User has to provide his user name and his biometric data for system to authenticate him. This is public route so it can accessed publicly by anyone',
            method: httpverbs.post,
            route: '/login',
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let user = await connectUser(req.body.username as string, req.body.biomertricString as string);
                    let token = generateToken({ ...user }, process.env.Token_sercret, 60 * 60 * 60 * 24);
                    let socketObject = new RealTimeVoteCommunicator();
                    socketObject.onUserConnection();
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
            actionScope: routeSecurityLevel.public,
            callback: async function (req: any, res: any, next: any) {
                let message: any = { success: true };
                try {
                    let userid = req.authenticatedUser._doc._id as string;
                    let findUser=await respository.findUserByID();
                    let user = await findUser(userid);
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
        }
    ]
}