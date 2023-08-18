/**
* @description Subscription operations
* @version 1.0
* @since  Friday, 21 07 2023, at 15:26: 22 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { ITransaction } from "../../logic/lms-interfaces";
import { ILogic } from "../IOperations";
import mongoose from "mongoose";
import Transaction from "../../models/account-models/Subscriptions/transaction-model";


const generateTransactionID:ILogic = {
    name: "generateTransactionID",
    callback: async function () {
        return new mongoose.Types.ObjectId();
    }
}


const initiateTransaction:ILogic = {
    name: "initiateTransaction",
    callback: async function (transaction:ITransaction) {
        return new Transaction(transaction).save();
    }
}
const updateTransactionStatus:ILogic = {
    name: "updateTransactionStatus",
    callback: async function (transactionId:string, status:'success' | 'failed'  | 'pending', providerResponse?:string) {
        let transaction = await Transaction.findOne({_id:transactionId});
        if(!transaction) throw new Error('Subscription does not exist in the system');
        transaction.status = status;
        transaction.providerTransactionResponse = providerResponse;
        // emit subscription info needed if success
        return await transaction.save();
    }
}
const getAllTransaction:ILogic = {
    name: "getAllTransaction",
    callback: async function () {
        return await await Transaction.find().populate(['student', 'bundle']);
    }
}





export default [generateTransactionID, initiateTransaction, updateTransactionStatus, getAllTransaction];
