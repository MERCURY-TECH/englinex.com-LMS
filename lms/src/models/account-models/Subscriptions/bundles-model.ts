/**
* @description The mongoose schema to map students and lecturer together
* @version 1.0
* @since  Thursday, 20 07 2023, at 17:44: 06 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";

const BundleSchema = new mongoose.Schema({
    title: {type: String, require:[true, 'you must provide the bundle title ID']},
    constraints:{
        durationInMonths:{type:Number, max:[12,'please the maximum number of months is 12'], require:[true,'Please provide the duration of the bundle in months']},
        unitCostInFCFAPerMonths:{type:Number, require:[true,'Please provide the cost in FCFA of the bundle per months']},
        totalCost:Number,
        isActive:{type:Boolean, required:[true,'please you must provide the bundle activaion status']},
        percentageDiscount:{type:Number, default:0},
        numberOfClassHours:{type:Number, required:[true,'please you must provide the number of class hours this bundle authorizes']}
    },
    desription: {type:String, required:[true,'please provide a description for this bundle']},
});

BundleSchema.pre('save',function(next:any){
     // @ts-ignore
     this.totalCost = this.unitCostInFCFAPerMonths * this.durationInMonths
    // @ts-ignore
    if(this.percentageDiscount != 0){
    // @ts-ignore
    let discount = (this.totalCost * this.percentageDiscount)/100
    // @ts-ignore
     this.totalCost = this.totalCost - discount;
    }
    next()
})
const Bundle = mongoose.model('Bundle', BundleSchema);

export default Bundle;