<template>
    <div class="card p-3 h-100">
        <h1 class="">{{ props.bundle.title }}</h1>
        <p class="my-2">{{ props.bundle.description }} </p>

        <h2 class="" style="font-family: sans-serif;"> <strong class="fs-1">{{ totalCost }} FCFA</strong>
            <br />
            <small class="fs-5" :style=" discountCost>0? 'text-decoraction:line-through; color: #828282;' : 'color: #828282;'">{{ props.bundle.constraints.durationInMonths }} months Unlimited
                Access</small>
        </h2>
        <div v-for="i in 3" :key="i" class="d-flex align-items-center px-md-0 mx-md-0">
                                <span class="h5">
                                    <i class="bi-check-circle-fill me-2 primary-text"></i>
                                </span>
                                <span style="margin-top: -10px;">
                                    <small>Lorem ipsum dolor sit amet.</small>
                                </span>
                            </div>
        <button @click="naviagteToCheckout" class="btn text-white rounded-pill my-3" style="background-color: #A01FEF;">Subcribe
            Now</button>
    </div>
</template>
<script setup>
import router from '@/router'
const props = defineProps(['bundle'])
const totalCost = props.bundle.constraints.unitCostInFCFAPerMonths * props.bundle.constraints.durationInMonths;
const discountCost = (((props.bundle.constraints.unitCostInFCFAPerMonths * props.bundle.constraints.percentageDiscount) / 100) * props.bundle.constraints.durationInMonths).toFixed(2);

function naviagteToCheckout(){
    router.push({name:'CheckOut',query: { bundle: props.bundle._id }})
}
</script>