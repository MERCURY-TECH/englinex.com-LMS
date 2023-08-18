<template>
    <div class="my-2 p-2 bundle-item">
        <i class="bi bi-bucket mx-2"></i>
        <span class="fw-bold">{{ props.bundle.title }}</span><br />
        Premium - {{props.bundle.constraints.durationInMonths}} months ({{ discountCost>0 ? discountCost : totalCost }} FCFA)
    </div>
</template>

<script setup>
const props = defineProps(['bundle']);
const totalCost = props.bundle.constraints.unitCostInFCFAPerMonths * props.bundle.constraints.durationInMonths;
const discountCost = (((props.bundle.constraints.unitCostInFCFAPerMonths * props.bundle.constraints.percentageDiscount) / 100) * props.bundle.constraints.durationInMonths).toFixed(2);

</script>

<style scoped>
.bundle-item:hover{
    background-color: #F7EBFF;
    border-radius: 4px;
    cursor: pointer;
}
</style>