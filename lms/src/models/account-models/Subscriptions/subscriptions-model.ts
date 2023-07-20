/**
* @description Platform sunbscription transaction
* @version 1.0
* @since  Thursday, 20 07 2023, at 17:32: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/
import mongoose from "mongoose";



const SubscriptionSchema = new mongoose.Schema({
    bundle: {type: mongoose.Schema.Types.ObjectId,ref: 'Bundle', require:[true, 'you must provide the bundle ID']},
    student: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: [true, 'please provide the students ID '] },
    numberOfClassHoursConsumed: {Type:Number, default:0},
    isActive:{type:Boolean, default:true},
    isExpired:{type:Boolean, default:false}
});
const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;