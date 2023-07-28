/**
* @description Platform financial Transactions
* @version 1.0
* @since  Thursday, 27 07 2023, at 08:35: 52 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";


const TransactionSchema = new mongoose.Schema({
    username: {type: String, required:[true, 'you must provide the Transaction title ID']},
    amount : {type:Number, default:0, required:[true,'Please provide the transaction amount in FCFA']},
    paymentMode : {type:String, required:[true,'please provide the Transaction payment mode']},
    payersName : {type:String, required:[true,'please provide the Transaction payment name']},
    transactionItem:{type:String, required:[true,'please provide the Transaction associated line item']},
    paymentStatus: {type:String, required:[true,'please provide the Transaction payment status']},
    callbackLink:{type:String},
    provideTransactionResponse:{type:String, required:[true, 'Please provide the transcation details']}
});

TransactionSchema.pre('save',function(next:any){
    
   next();
})
const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;