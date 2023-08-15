<template>
  <DashboardTemplate>
    <div class="container px-md-5">
        <p class="h1 py-3">Settings</p>
        <div class="p-3">
          <div class="row">
          <AdminManager />
          <RoleCRUD />
          </div>
          <p class="mt-3">Course Elements</p>
          <hr>
          <div class="row">
           <div class="col-md-6">
            <colorAdder/>
           </div>
           <div class="col-md-6">
            <tags/>
            <levels/>
           </div>
          </div>
        </div>
    </div>
  </DashboardTemplate>
</template>

<script setup>
import DashboardTemplate from '../components/DashboardTemplate.vue';
import RoleCRUD from '@/components/misc/role-management/RoleCRUD.vue'
import AdminManager from '@/components/misc/role-management/AdminManager.vue'
import colorAdder from '@/components/misc/Setting/AddColor.vue'
import tags from '@/components/misc/Setting/Tags.vue'
import levels from '@/components/misc/Setting/Levels.vue'

</script>

<style scoped>
  body { background-color: #15223214; }
</style>