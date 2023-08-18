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
                           <!-- <div class="col"><p class="m-0"></p></div>     -->
                        </div>
                        <div v-if="transactionStore.transactions.length"  >
                            <div v-for="transaction in transactionStore.transactions" :key="transaction.name" class="row p-3 rounded my-3 mx-2 p-3 rounded my-2">
                                <TransactionItem  :transaction ="transaction"/>  
                            </div>
                        </div>
                        <div v-if="!transactionStore.transactions.length"  class="row p-3 rounded my-3 mx-2 p-3 rounded my-2">
                           No Transactions  
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </DashboardTemplate>
</template>
<script setup>
import DashboardTemplate from "../components/DashboardTemplate.vue";
import TransactionItem from '@/components/misc/transaction-management/TransactionItem.vue'
import { useTransactionStore } from "@/stores/transactionStore";
import { onMounted } from "vue";
const transactionStore = useTransactionStore()
onMounted(async () => {
    await transactionStore.getTransactions()
})
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