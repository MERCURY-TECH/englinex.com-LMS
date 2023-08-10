<template>
    <div class=" ms-md-4 w-100">
        <div class="row p-3">
                <div @click="sendContentToDisplay('section', props.section)" class="col-10 section-item">
                   <h5> {{ props.section.title }}</h5>
                </div>
                <div v-if="props.section.material.length" @click="() => displayMaterial = !displayMaterial" class="col-2 section"
                    style="border-left: 1px solid #A01FEF;height: 100%;">
                    <i v-if="displayMaterial" class="bi bi-chevron-double-down"></i>
                    <i v-if="!displayMaterial" class="bi bi-chevron-double-up"></i>
                </div>
            </div>
            <div v-if="displayMaterial" class="material">
                <ul >
                     <li @click="sendContentToDisplay('material', material)" v-for="material in props.section.material"
                        :key="material._id" class="list-group-item accordion-item p-1"> 
                        <i class="bi bi-caret-right-fill"></i> {{ material.title }}
                    </li>
                </ul>
            </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
let props = defineProps(['section']);
let emit = defineEmits(['content'])
let displayMaterial = ref(false);
function sendContentToDisplay(contentType, object) {
    emit('content', { contentType, object })
}
</script>

<style scoped>
    .material{
        margin-left: 30px;
        border-left: 1px solid #A01FEF;
        cursor: pointer;
    }
    .section{
        border-radius: 4px;
        background-color: #efdbfc;
        height: 30px;
        cursor: pointer;
    }
    .section-item{
        cursor: pointer;
    }
</style>