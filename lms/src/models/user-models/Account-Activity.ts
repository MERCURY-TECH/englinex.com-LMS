/**
* @description Account activation storage
* @version 1.0
* @since  Friday, 28 07 2023, at 11:43: 08 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";
import { AccountType } from "../../logic/lms-interfaces";

enum AccountActivityType {
    "accountActivation"="activation",
    "passwordRecovery" = "recovery"
}

function makePhoneticFieldsRequired(){
    // @ts-ignore
    return this.materialType == CourseMaterialType.phonetic
}

/**
 * sound: {
        type: String,
        required : makePhoneticFieldsRequired
    },
    englishText:  {
        type: String,
        required : makePhoneticFieldsRequired
    },
 */

let AccountActivitySchema = new mongoose.Schema({
    user: {
        required: [true, 'Provide user ID'],
        type: String,
    },
    activityType : {type:String, enum:[...Object.values(AccountActivityType)]},
    activity:{
        activation:{
           
            // firt check if the account is activated or not
            // activation link
            // auto delete 
        },
        passwordRecovery:{
            isExpired:{type:Boolean, default:false, required:true}
            // recovery link
            // auto delete :: expires duration (5  mins)
            // recoveryURL  = timeStamp, userID, UUID
        }
    }
});

const AccountActivity = mongoose.model('AccountActivity', AccountActivitySchema);
export default AccountActivity;


