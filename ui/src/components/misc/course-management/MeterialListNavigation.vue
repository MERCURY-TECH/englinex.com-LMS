<template>
    <div class="col-md-4 px-4">
        <small
            class="d-inline-flex w-100 mb-3 ms-md-4 px-2 py-1 fw-semibold text-dark-emphasis bg-danger-subtle border border-danger-subtle rounded-2">
            <router-link :to="{ name: 'MaterialsList' }">Courses</router-link>
            <i class="bi-chevron-right"></i> {{ props.course.title }}</small>
        <a @click="() => { emit('content',null) }" class="btn primary-button ms-md-4 w-100 mb-4">About this Course</a>
        <MaterialListItem  v-for="section in props.course.content" :key="section._id" @content="sendContentToDisplay" :section="section"/>
    </div>
</template>

<script setup>
import MaterialListItem from './MaterialListItem.vue';
let props = defineProps(['course']);
let emit = defineEmits(['content']);

function sendContentToDisplay(material){
    emit('content',material)
}
</script>

<style scoped>

</style>