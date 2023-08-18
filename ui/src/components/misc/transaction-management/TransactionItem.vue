<template>
        <div class="col-2">
            <p class="m-0">{{ props.transaction.updatedAt }}</p>
        </div>
        <div class="col">
            <p class="m-0">{{ props.transaction.amount }}</p>
        </div>
        <div class="col">
            <p class="m-0">{{ props.transaction.channels }}</p>
        </div>
        <div class="col">
            <p class="m-0">{{ payersName }}</p>
        </div>
        <div class="col">
            <p class="m-0">{{ bundle }}</p>
        </div>
    <div class="col">
        <p class="m-0">{{ student }}</p>
    </div>
    <div class="col">
        <p :class="`m-0 ${props.transaction.status}`">{{ props.transaction.status }}</p>
    </div>
    <!-- <div class="col">
        <p :class="`m-0`"> <i class="bi bi-caret-down-fill"></i></p>
    </div> -->
</template>
// amount, student, _id, description, currency, channels, bundle, status
<script setup>
const props = defineProps(['transaction'])
const bundle = props.transaction.bundle ? props.transaction.bundle.title : '';
const student = props.transaction.student ? props.transaction.student.username :''
const payersName = props.transaction.payersName ? props.transaction.payersName : ''

</script>