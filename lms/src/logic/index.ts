let jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';
import User from '../models/user-models/User';
import { IUser } from './lms-interfaces';

var ObjectId = require('mongoose').Types.ObjectId;



export function serializeUserDataResponse(user: IUser) {
    let response: any = {};
    typeof user.username == undefined ? '' : response.username = user.username
    typeof user.firstname == undefined ? '' : response.firstname = user.firstname
    typeof user.lastname == undefined ? '' : response.lastname = user.lastname
    typeof user.email == undefined ? '' : response.email = user.email
    typeof user.telephone == undefined ? '' : response.telephone = user.telephone
    typeof user.isCandidate == undefined ? '' : response.isCandidate = user.isCandidate
    typeof user.voteCount == undefined ? '' : response.voteCount = user.voteCount
    typeof user._id == undefined ? '' : response._id = user._id
    typeof user.isActive == undefined ? '' : response.isActive = user.isActive
    typeof user.isSuspended == undefined ? '' : response.isSuspended = user.isSuspended
    typeof user.accountType == undefined ? '' : response.accountType = user.accountType
    return response;
}

/**
 * 
 * @param {Isuer} user 
 * @param {string} key 
 * @param {Number} duration 
 * @returns {String} tuser session jwt token
 */
export let generateToken = function (user: any, key: any = process.env.Token_sercret, duration: any = 60) {
    if (duration)
        return jwt.sign(user, key, { expiresIn: duration });
    throw new Error('Duration of tocken must be precised');
}
export let verifyToken = function (bearerToken: string, secret: string): Partial<IUser> {
    let tokenPayload = jwt.verify(bearerToken, secret);
    return tokenPayload;
}

/**
   * @param {string} username ERP username
   * @param {string} password ERP user password
   * @returns {IUser} User Object
**/
export const connectUser = async function (username: any, password: string) {
    const user: IUser = (await User.findOne({ username: username })) as IUser;
    if (user) {
        if (user?.isSuspended) throw new Error('User account suspended');
        const auth = await bcrypt.compare(password, user.password as string)
        if (auth) return user
        throw Error('Incorrect username or password')
    }
    throw Error("Incorrect username or password")
}


/**
 * @param {String} authorizationToken 
 * @returns {Promise<Partial<IUser>>} IUser
 */
export function getAuthenticatedUser(authorizationToken: string): Partial<IUser> {
    if (typeof authorizationToken == 'undefined' || typeof authorizationToken == null) throw new Error('Please provide authorisation Headers');
    if (!typeof authorizationToken.includes('Bearer')) throw new Error('Please provide authorisation Bearer token in header');
    return (jwt.verify(authorizationToken, process.env.Token_sercret)) as Partial<IUser>
}

export function authorizeUserMiddleWare(req: any, res: any, next: any) {
    let message: any = { success: true };
    try {
        if (!req.headers.authorization) throw new Error('Please provide authorization token')
        let authenticatedUser = getAuthenticatedUser(req.headers.authorization.split(' ')[1].trim());
        if (authenticatedUser.isSuspended) throw new Error('User is suspended and can not proceed');
        if (authenticatedUser.isActive) throw new Error('User account is not activated yet, you need activation to proceed');
        req.authenticatedUser = authenticatedUser;
        next();

    } catch (error: any) {
        message.errorMessage = error.message;
        message.success = false
        res.status(500).json(message);
        next();
    }
}

export async function encrytpUserPassword(password: string) {
    const salt = await bcrypt.genSalt();
    if (!(password != undefined && password != null)) throw new Error('Please provice user credentials');
    return await bcrypt.hash(password as string, salt)
}

export function isDate(dateToTest: any) {
    return isNaN(dateToTest) && !isNaN(Date.parse(dateToTest));
}

/**
 * 
 * @param filter an object, that maps the searched fields to the search value {field : value}
 * @param recordModel Corresponding Mongoose model
 * @returns Boolean
 */
export async function checkIfRecordExist(filter: Object, recordModel: any): Promise<Boolean> {
    let record = await recordModel.findOne(filter);
    console.log(record)
    return record ? true : false;
}

/**
 * 
 * @param filter an object, that maps the searched fields to the search value {field : value}
 * @param recordModel 
 * @returns 
 */
async function findRecordForModel(filter: Array<Object>, recordModel: any): Promise<any> {
    return await recordModel.findOne().and(filter);
}

/**
 * 
 * @param id Random Object ID
 * @returns {Boolean} `true` if object is a valid ID or `false` otherwise.
 */
function isValidateObjectID(id: string): boolean {
    return ObjectId.isValid(id)
}

export function subscriptionWorker(req: any, res: any, next: any) {
    let message: any = { success: true };
    try {
        // throw new Error('testing error fallback')
        next();
    } catch (error: any) {
        message.errorMessage = error.message;
        message.success = false
        res.status(403).json(message)
    }
}

export { IUser, isValidateObjectID, findRecordForModel };


