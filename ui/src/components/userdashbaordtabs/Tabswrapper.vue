<template>
    <div>
        <ul class="d-flex px-2" style="border-bottom: 1px solid #9F1FED;">
            <li v-for="title in tabTitles" :key="title" @click="selectedTitle = title" 
        :class="{selected: title == selectedTitle}" class="nav-item mx-3" style="list-style: none; cursor: pointer;">
    
        {{ title }}
    </li>
        </ul>
        <slot/>
    </div>
</template>

<script>
import { provide } from 'vue';
import { ref } from 'vue';
export default {
    name:"TabsComponent",
    setup(props, {slots}) {
        const tabTitles = ref(slots.default().map((tab) => tab.props.title))
        const selectedTitle = ref(tabTitles.value[0])
        
        provide('selectedTitle', selectedTitle)

        return {
            tabTitles,
            selectedTitle
        }
    }
}
</script>

<style>
.selected{
    border-bottom: 2px solid #9F1FED;
}
</style>