/**
* @description User management database operations
* @version 1.0
* @since  Monday, 17 07 2023, at 08:57: 31 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { encrytpUserPassword } from "../../logic";
import { AccountActivityType, IAccountActivity, INodemailerConfig } from "../../logic/lms-interfaces";
import { Mailer } from "../../logic/system-operations/Mailer";
import AccountActivity from "../../models/user-models/Account-Activity";
import User from "../../models/user-models/User";
import { ILogic } from "../IOperations";
import { EmailComfirmation } from "./htmlmail-templates";


let config: INodemailerConfig = {
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: false,
    auth: {
        user: "ngum.nyuydze@gmail.com",
        pass: "rinkucwxwfviixuc"
    }
}
let mailSender = new Mailer(config);

const initiateAccountActivation: ILogic = {
    name: "initiateAccountActivation",
    callback: async function (collection: IAccountActivity) {
        let user:any = await User.findOne({ _id: collection.user })
        if (!(user)) throw new Error('Invalid user');
        let existingUserActivity = await AccountActivity.findOne({ user: collection.user });

        if (existingUserActivity) {

            return existingUserActivity
        }
        collection.activityType = AccountActivityType.accountActivation;
        existingUserActivity = new AccountActivity(collection);
        

        try {
            await mailSender.getTransport()
            await mailSender.sendMessage({
                from: "contact@gmail.com",
                to: user.username,
                subject: "Account Verification",
                html: EmailComfirmation(`http://localhost:3000/account/comfirm/activate/${collection.user}/${existingUserActivity.uuid}`,'','Account activation, please client the link bellow to ativate your accounr')
            })
        } catch (error: any) {

            throw new Error('Invalid emial address')
        }
        return await existingUserActivity.save();
    }
}
const comfirmAccountActivation: ILogic = {
    name: "comfirmAccountActivation",
    callback: async function (user: string, uuid: string) {
        let userAccount = await User.findOne({ _id: user });
        if (!(userAccount)) throw new Error('Invalid user');
        if (userAccount.isActive) return { activated: true, user: userAccount };
        userAccount.isActive = true;
        let activity = await AccountActivity.findOne().and([{ user }, { uuid }, { activityType: AccountActivityType.accountActivation }]);
        try {
            await userAccount.save();
            await activity?.deleteOne()
            return { activated: true, user: userAccount };
        } catch (error: any) {
            return false
        }
    }
}

const initiateAccountPasswordRecoveryByUserName: ILogic = {
    name: "initiateAccountPasswordRecoveryByUserName",
    callback: async function (username: string) {
        let collection: IAccountActivity | any = { user: username }
        let userAccount = await User.findOne({ username });
        if (!(userAccount)) throw new Error('Invalid User Name or user does not exist');
        let existingUserActivity = await AccountActivity.findOne({ user: userAccount._id });
        if (existingUserActivity) return existingUserActivity

        collection.activityType = AccountActivityType.passwordRecovery;
        collection.user = userAccount._id;

        let expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + 120);
        collection.expireAt = expirationTime
        existingUserActivity = new AccountActivity(collection);
        try {
            await mailSender.getTransport()
            await mailSender.sendMessage({
                from: "contact@gmail.com",
                to: userAccount.username as string,
                subject: "Account Verification",
                html: EmailComfirmation(`http://localhost:3000/account/comfirm/activate/${userAccount._id}/${existingUserActivity.uuid}`,'','Account activation, please client the link bellow to ativate your accounr')
            })
        } catch (error: any) {

            throw new Error('Invalid emial address')
        }
        return await existingUserActivity.save();
    }
}
const getAccountPasswordRecoveryActivity: ILogic = {
    name: "getAccountPasswordRecoveryActivity",
    callback: async function (user: string) {
        let userAccount = await User.findOne({ _id: user });
        if (!(userAccount)) throw new Error('Invalid user account');
        return await AccountActivity.findOne().and([{ user }, { activityType: AccountActivityType.passwordRecovery }]);
    }
}
const comfirmAccountPasswordRecovery: ILogic = {
    name: "comfirmAccountPasswordRecovery",
    callback: async function (user: string, uuid: string, newPassword: string) {
        let userAccount: any = await User.findOne({ _id: user });
        if (!(userAccount)) throw new Error('Invalid user account');
        let activity = await AccountActivity.findOne().and([{ user }, { uuid }, { activityType: AccountActivityType.passwordRecovery }]);
        if (!activity) throw new Error('Recovery activity expired');
        try {
            userAccount.password = encrytpUserPassword(newPassword);
            await userAccount.save();
            await activity?.deleteOne();
            return { recovery: true, user: userAccount };
        } catch (error: any) {
            return false
        }
    }
}

export default [initiateAccountActivation, comfirmAccountActivation, initiateAccountPasswordRecoveryByUserName, comfirmAccountPasswordRecovery, getAccountPasswordRecoveryActivity];