/**
* @description Platform financial Transactions
* @version 1.0
* @since  Thursday, 27 07 2023, at 08:35: 52 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";



const TransactionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: [true, 'please provide the students ID ']},
    amount : {type:Number, default:0, required:[true,'Please provide the transaction amount in FCFA']},
    description:String,
    currency:{type:String, default:'XAF'},
    channels : {type:String, required:[true,'please provide the Transaction payment mode/ channel']},
    payersName : {type:String},
    bundle: {type: mongoose.Schema.Types.ObjectId,ref: 'Bundle', require:[true, 'you must provide the bundle ID']},
    status: {type:String, enum:['pending', 'failed', 'success'], default:'pending', required:[true,'please provide the Transaction payment status']},
    callbackLink:{type:String},
    address:{
        country:String,
        city:String,
    },
    providerTransactionResponse:{type:String}
},{ timestamps: true });

TransactionSchema.pre('save',function(next:any){
    
   next();
})
const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;