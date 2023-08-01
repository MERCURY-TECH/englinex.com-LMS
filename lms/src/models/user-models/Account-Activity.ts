/**
* @description Account activation storage
* @version 1.0
* @since  Friday, 28 07 2023, at 11:43: 08 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { AccountActivityType } from "../../logic/lms-interfaces";


function makePhoneticFieldsRequired(){
    // @ts-ignore
    return this.materialType == CourseMaterialType.phonetic
}




let AccountActivitySchema = new mongoose.Schema({
    user: {
        required: [true, 'Provide user ID'],
        type: String,
    },
    activityType : {type:String, enum:[...Object.values(AccountActivityType)]},
    //@ts-ignore
    uuid:{type:String, default:function (){return uuidv4()}},
    expireAt:Date
    
});

AccountActivitySchema.index( { "expireAt": 1 }, { expireAfterSeconds: 0 } );

const AccountActivity = mongoose.model('AccountActivity', AccountActivitySchema);
export default AccountActivity;


