import axios from "axios";



export class FinanceManager {
    config: { API_KEY: string, SITE_ID: string, NOTIFY_URL: string } =
        { API_KEY: "399180733644a8eaf1322d3.59356924", SITE_ID: "570941", NOTIFY_URL: "" }
    
    constructor(){
    
      


    //     cp.checkPayStatus('TRANSACTION_ID')
    // .then(response => console.log(response))
    // .catch(err => console.log(err))

    }


    static isValidPayment():boolean{
        
        return true
    }
}



/**
 * 
   {
       "code": "201",
       "message": "CREATED",
       "description": "Transaction created with success",
       "data": {
           "payment_token": "5df64dd9c5447739327eb88e1e4ea0ac015555cc262ea308c91acbd4e5c8fb95f4bd0bd7cad877a452f877fa6f51fe74184d00a84ab7f9",
           "payment_url": "https://checkout.cinetpay.com/payment/5df64dd9c5447739327eb88e1e4ea0ac015555cc262ea308c91acbd4e5c8fb95f4bd0bd7cad877a452f877fa6f51fe74184d00a84ab7f9"
       },
       "api_response_id": "1632143554.8513"
   }

 */