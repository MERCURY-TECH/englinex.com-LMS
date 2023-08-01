/**
* @description Platform sunbscription transaction
* @version 1.0
* @since  Thursday, 20 07 2023, at 17:32: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/
import mongoose from "mongoose";
import EventMediator from "../../../api/event-service";
import { SubscriptionEvents } from "../../../logic/lms-interfaces";
import Bundle from "./bundles-model";

const SubscriptionSchema = new mongoose.Schema({
    bundle: {type: mongoose.Schema.Types.ObjectId,ref: 'Bundle', require:[true, 'you must provide the bundle ID']},
    startDate: {type:Date, default:new Date()},
    endDate: {type:Date,require:[true, 'you must provide the end date'] },
    student: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: [true, 'please provide the students ID ']},
    numberOfClassHoursConsumed: {type:Number, default:0},
    isActive:{type:Boolean, default:true},
    isExpired:{type:Boolean, default:false}
});

SubscriptionSchema.pre('save', async function (next: any) {
    //@ts-ignore
    let durationInMonths:number = (await Bundle.findOne({ _id: this.bundle })).constraints.durationInMonths
    //@ts-ignore
    let startDate = new Date(this.startDate)
    startDate.setMonth(startDate.getMonth() + durationInMonths)
    //@ts-ignore
    this.endDate =  new Date(startDate);
    next();
})

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

let pipe:any = []
const SubscriptionEventEmitter = Subscription.watch(pipe,{ fullDocument: "updateLookup" });
SubscriptionEventEmitter.on('change', (change) =>{
    let subscription =  change.documentKey._id;
    if(change.operationType === 'insert') return EventMediator.mediator.emit(SubscriptionEvents.newSubscription, change.fullDocument);
    if(change.operationType === 'delete') return EventMediator.mediator.emit(SubscriptionEvents.subscriptionEnded, change.fullDocument);
    return EventMediator.mediator.emit(SubscriptionEvents.updateSubscription, change.fullDocument);
});

export default Subscription;