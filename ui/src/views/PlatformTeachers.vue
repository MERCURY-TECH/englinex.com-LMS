<template>
    <DashboardTemplate>
        <div class="bundles">
            <div class="row my-5 p-5">
                <TeachersCRUD />
                <RoleCRUD />
            </div>
        </div>
    </DashboardTemplate>
</template>
<script setup>
import DashboardTemplate from "../components/DashboardTemplate.vue";
import TeachersCRUD from "@/components/misc/teacher-management/TeachersCRUD.vue";
import RoleCRUD from "@/components/misc/role-management/RoleCRUD.vue";


</script>



