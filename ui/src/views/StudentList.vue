<template>
    <DashboardTemplate>
        <div class="col-md-6 d-flex bg-white w-50">
                <i class="bi bi-search"></i>
                <input type="text" class="form-control form-control-sm w-50" placeholder="Search">
               </div>
        <div class="row align-items-center bg-white">
              
        </div>
       
    </DashboardTemplate>
</template>
<script>
import DashboardTemplate from '@/components/DashboardTemplate.vue'
export default {
    components:{
        DashboardTemplate
    },
    data() {
        return {
         
        }
    },
}
</script>