<template>
    <DashboardTemplate>
        <div class="bundles">
            <div class="row my-5 p-2">
                <div class="col rounded-2 overflow-hidden">

                    <div class="bg-white rounded p-2">
                        <div class="d-flex align-items-center justify-content-between">
                            <p class="h6 fw-bold">Platform Transactions</p>
                            <form class="w-50" role="search">
                                <input class="form-control  rounded" type="search" placeholder="Search" aria-label="Search"
                                    style="background-color: #eddff553;">

                            </form>
                        </div>
                        <div class="row p-3 rounded my-3 mx-2" style="background-color: #F2F2F2;">
                           <div class="col-2"><p class="m-0">Date</p></div>    
                           <div class="col"><p class="m-0">Amount</p></div>    
                           <div class="col"><p class="m-0">Payment Mode</p></div>    
                           <div class="col"><p class="m-0">Payer's Name</p></div>    
                           <div class="col"><p class="m-0">Bundle</p></div>    
                           <div class="col"><p class="m-0">User</p></div>    
                           <div class="col"><p class="m-0">Status</p></div>    
                        </div>
                        <div v-for="transaction in transactions" :key="transaction.name" class="row p-3 rounded my-3 mx-2 p-3 rounded my-2">
                           <div class="col-2"><p class="m-0">{{ transaction.date }}</p></div>    
                           <div class="col"><p class="m-0">{{ transaction.amount }}</p></div>    
                           <div class="col"><p class="m-0">{{ transaction.paymentMode }}</p></div>    
                           <div class="col"><p class="m-0">{{ transaction.payerName }}</p></div>    
                           <div class="col"><p class="m-0">{{ transaction.bundle }}</p></div>    
                           <div class="col"><p class="m-0">{{ transaction.user }}</p></div>    
                           <div class="col"><p :class="`m-0 ${transaction.status}`">{{ transaction.status }}</p></div>    
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </DashboardTemplate>
</template>
<script>
import DashboardTemplate from "../components/DashboardTemplate.vue";
export default {
    name: "platformBundle",
    components: {
        DashboardTemplate
    },
    data() {
        return {
            transactions:[
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"success"},
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"Failed"},
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"success"},
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"Pending"},
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"success"},
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"success"},
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"Failed"},
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"success"},
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"success"},
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"Pending"},
                { date:'22/07/2023 3:15pm',amount:"10,000 FCFA", paymentMode:"MTN MOMO",payerName:"Ngum buka Fon",bundle:"Premium 1", user:"Yousouf Alim", status:"success"},
            ]
        }
    },
}
</script>

<style>
.success {
    color: #C4E02F;
}
.Pending {
    color: #A01FEF;
}
.Failed {
    color: #FF0000;
}

</style>