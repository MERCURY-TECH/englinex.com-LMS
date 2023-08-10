<template>
  <WebsiteHeader v-if="!isAdminRoute" />
  <router-view />
  <WebsiteFooter v-if="!isAdminRoute" />
</template>

<script setup>
import WebsiteHeader from './components/website/WebsiteHeader.vue'
import WebsiteFooter from './components/website/WebsiteFooter.vue'
import router from '@/router'
import {computed,onMounted} from 'vue'
import { useAuthStore } from './stores/authStore';
const authStore = useAuthStore()

onMounted(()=>authStore.loadUserFromLocalStorage());

let  isAdminRoute =  computed(()=>router.currentRoute.value.path.includes('admin'))
</script>


