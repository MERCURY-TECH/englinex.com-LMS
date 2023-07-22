<template>
    <DashboardTemplate>
        <div class="container p-5">
            <h1>Welcome to Englinex</h1>
        </div>
    </DashboardTemplate>
</template>

<script>
import DashboardTemplate from '../components/DashboardTemplate.vue';

export default {
  name: 'DashboardHome',
  components: {
    DashboardTemplate,
  },
  props: {
  }
}
</script>

<style scoped>
  body { background-color: #15223214; }
</style>