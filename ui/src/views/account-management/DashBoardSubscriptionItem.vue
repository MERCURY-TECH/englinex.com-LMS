<template>
    <div class="d-flex align-items-center justify-content-between">
        <div class="">
            <span class="" style="color: font-size: 14px;"># {{ props.subscription.bundle.title }}</span> <br>
            <span class="" style="color: #8b8b8b; font-size: 13px;">current Subscription</span>
        </div>
        <div class="">
            <span class="" style="color: #9F1FED; font-size: 14px;">{{ props.subscription.numberOfClassHoursConsumed }} Hours Consumed / {{ props.subscription.bundle.constraints.numberOfClassHours }} (total)
                for {{props.subscription.bundle.constraints.durationInMonths}} months</span> <br>
            <span class="" style="color: #8b8b8b; font-size: 13px;">Unlimited Access to
                material</span> <br>
            <span class="" style="color: #8b8b8b; font-size: 13px;">Register Unlimited
                Courses</span>
        </div>
        <div class="d-flex">
            <button class="btn btn-sm">
                <span style="font-size: 13px;">
                    <i class="bi bi-x-circle text-danger"></i>
                    Cancel Subscription
                </span>
            </button>
            <button class="btn btn-sm">
                <span style="font-size: 13px;">
                    <i class="bi bi-pencil-fill" style="color: #9F1FED;"></i>
                    Edit Subscription
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['subscription'])
</script>