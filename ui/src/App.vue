<template>
  <WebsiteHeader v-if="!this.isAdminRoute" />
  <router-view />
  <WebsiteFooter v-if="!this.isAdminRoute" />
</template>

<script>
import WebsiteHeader from './components/website/WebsiteHeader.vue'
import WebsiteFooter from './components/website/WebsiteFooter.vue'
export default {
  name: 'App',
  components: {
    WebsiteHeader,
    WebsiteFooter
  },
  computed: {
    isAdminRoute: {
      get() {
        try {
          return this.$router.currentRoute.value.path.includes('admin')
        } catch (error) {
          console.log(error)
        }
      },
    }
  }
}
</script>


