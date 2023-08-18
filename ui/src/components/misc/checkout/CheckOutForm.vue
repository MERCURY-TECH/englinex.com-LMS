<template>
    <div class="col-12 row mx-3">
        <div class="col">
            <p class="h1 fw-bold" style="font-family: 'Raleway', sans-serif">
                Checkout
            </p>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'MaterialsList' }"><small>Back to courses</small></router-link>
        </div>
    </div>
    <div class="col-12 row border-bottom primary-border mx-3"> </div>
    <form v-if="authStore.authUser" class="row p-3 mx-3" @submit.prevent="">
        <!-- <span class="col-12">
            <p class="fw-bold mt-2">
                <small>Where's this order going?</small>
            </p>
        </span> -->
       
        <div class="col-md-6 mb-2">
            <input v-model="userCheckout.firstname" type="text" class="form-control" name="firstname"
                placeholder="Firstname" />
        </div>
        <div class="col-md-6 mb-2">
            <input v-model="userCheckout.lastname" type="text" class="form-control" name="lastname"
                placeholder="Lastname" />
        </div>
        <div class="col-6 mb-2">
            <input v-model="userCheckout.address.country" type="text" class="form-control" name="country" placeholder="Country" />
        </div>
        <div class="col-md-6 mb-2">

            <input class="form-control" v-model="userCheckout.address.City" name="city" type="text" placeholder="City" />
        </div>
        <!-- <div class="col-md-4 mb-2">
            <input v-model="userCheckout.address.state" class="form-control" name="state" type="text" placeholder="State" />
        </div> -->
        <!-- <div class="col-md-4 mb-2">
            <input class="form-control" name="zip" type="text" placeholder="Zip Code" />
        </div> -->
        <div class="col-md-12 mb-2">
            <input class="form-control" v-model="userCheckout.telephone" name="Phone" type="text" placeholder="Phone" />
        </div>
        <div class="col-12 text-end">
            <button @click="checkout" class="btn primary-button px-5 mb-2">Next</button>
        </div>

        <div class="col-12 row border-bottom border-top primary-border pt-1">
            <div v-if="userCheckout.bundle" class="col">
                <bundle-item v-if="userCheckout.bundle" :bundle="userCheckout.bundle" />
            </div>
            <div v-if="!userCheckout.bundle" class="col">
                <bundle-item @click="editBundle(bundle)" :bundle="bundle" v-for="bundle in bundleStore.activeBundles"
                    :key="bundle._id" />
            </div>
            <p class="col-auto">
                <small class="edit-bundle" @click="editBundle(null)">
                    <span><i class="bi bi-pen"></i> Edit</span>
                </small>
            </p>
        </div>
    </form>
</template>

<script setup>
import { useBundleStore } from '@/stores/bundleStore';
import { useAuthStore } from '@/stores/authStore';
import { toRef, onMounted } from 'vue';
import BundleItem from './BundleItem.vue';
import router from '@/router';
import {useTransactionStore} from '@/stores/transactionStore';
import { actionNotificationWrapper } from '@/helpers';

const bundleStore = useBundleStore();
const authStore = useAuthStore()
const transactionStore = useTransactionStore();
const userCheckout = toRef({ ...authStore.authUser, bundle: '' })

onMounted(() => {
    userCheckout.value.bundle = router.currentRoute.value.query.bundle ? bundleStore.getBundleById(router.currentRoute.value.query.bundle) : ''
})
function editBundle(selectedBundle = '') {
    userCheckout.value.bundle = selectedBundle
}

async function checkout() {
    let transObj = {
        username:userCheckout.value.username,
        firstname:userCheckout.value.firstname,
        lastname:userCheckout.value.lastname,
        student: authStore.authUser._id,
        description: 'Transaction operation',
        currency: 'XOF',
        channels: 'mobile-money',
        status: 'pending',
        telephone:'+237697835780',
        payersName: `${userCheckout.value.firstname}, ${userCheckout.value.lastname}`,
        bundle: userCheckout.value.bundle._id,
        callbackLink: '',
        amount: 50000,
        address:{
        country:userCheckout.value.address.country,
        city:userCheckout.value.address.City
    },
    }
    let statusObj= await transactionStore.initiateTransaction(transObj, transactionStore.cinetPayCheckout)
    actionNotificationWrapper(statusObj)
}



</script>

<style scoped>
.edit-bundle {
    padding: 5px;
    height: 15px;
    border-radius: 4px;
    /* background-color: aliceblue; */
}

.edit-bundle:hover {
    background-color: #F7EBFF;
    cursor: pointer;
}</style>