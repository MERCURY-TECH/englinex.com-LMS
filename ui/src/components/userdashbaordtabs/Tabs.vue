<template>
    
    <div v-show="title == selectedTitle">
        <slot/>
    </div>
</template>

<script>
import { inject } from 'vue';
export default {
    name:"TabsComponent",
    props:['title'],
    setup() {
        const selectedTitle = inject("selectedTitle")
        return {
            selectedTitle
        }
    },
    
}
</script>