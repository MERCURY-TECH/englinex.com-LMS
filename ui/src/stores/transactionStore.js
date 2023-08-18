import { defineStore } from "pinia/dist/pinia";
import axios from 'axios';

async function actionWrapper(callback, message, onErrorFunction) {
    try {
        let result =  await callback()
        console.log(result)
        if(result) return { success: true, message: message ? message : 'action was successful', result }
        return { success: true, message: message ? message : 'action was successful',result:null }
    } catch (e) {
        onErrorFunction ? await onErrorFunction() : ''
        if (e.response != undefined) return { success: false, message: e.response.data.errorMessage }
        return { success: false, message: 'Could not connect to platform because of ' + e.message }
    }
}

export const useTransactionStore = defineStore('transactionStore', {
    state: () => ({
        transactions: []
    }),

    actions: {
        async getTransactions() {
            return actionWrapper(async () => {
                let response = await axios.get('transactions')
                this.transactions = response.data.message.transactions;
            }, 'Collected transactions with success')
        },
        async initiateTransaction (checkoutInfo={}, callback=()=>{}){
            return actionWrapper(async () => {
                let transactionID = (await axios.get('transaction/id')).data.message._id
                let providerResponse= await callback(transactionID,checkoutInfo );
                checkoutInfo.status= 'success'
                console.log(providerResponse)
                if(!providerResponse.success) checkoutInfo.status= 'failed'
                let transaction = await axios.post(`transaction/initiate/${transactionID}`, {_id:transactionID ,providerTransactionResponse:JSON.stringify(providerResponse), ...checkoutInfo});
                if(!providerResponse.success) throw new Error('Transaction error, please try later')
                return transaction;
            }, 'Transaction completed with success')
        },
        async cinetPayCheckout(transactionID, transObj) {
            var data = JSON.stringify({
                apikey: "8936433616017f33cc7a2b9.78720038",
                site_id: "302789",
                transaction_id: transactionID, //
                amount: transObj.amount,
                currency: transObj.currency,
                description: transObj.description,
                customer_id: transObj.student,
                customer_name: transObj.firstname,
                customer_surname: transObj.lastname,
                customer_email: transObj.username,
                customer_phone_number: transObj.telephone,
                // customer_address: "Antananarivo",
                customer_city: transObj.City,
                customer_country: "CM",
                notify_url: "https://webhook.site/d1dbbb89-52c7-49af-a689-b3c412df820d",
                return_url: "https://webhook.site/d1dbbb89-52c7-49af-a689-b3c412df820d",
                channels: "ALL",
                lang: "FR",
            });
            return actionWrapper(async ()=>{
                let response = await axios.post('http://api-checkout.cinetpay.com/v2/payment',data, {headers: { 
                    'Content-Type': 'application/json'
                  }});
                return response.data
            },'CPAY transaction Success')        
        }
       
    },
})
