<template>
 <img :src="cPicture" :class="props.class" :height="props.height" :width="props.width" contain @error="onImgError" />
</template>

<script setup>
import { computed, ref} from 'vue'
const props = defineProps(['image','class','width','height'])
const fallBackimage = require('@/assets/placeholder.jpg')

let failed_image = ref(false);
function onImgError() {
    failed_image.value = true;
}
let cPicture = computed(() => failed_image.value ? fallBackimage : props.image)
</script>