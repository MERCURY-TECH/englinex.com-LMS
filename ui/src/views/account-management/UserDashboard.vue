<template>
    <div class="py-4 container">
        <div class="row">
            <div class="col-md-4">
                <div class="w-50 rounded p-1 d-flex align-item-center justify-content-center"
                    style="background-color: #F7EBFF;">
                    <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);"
                        aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item "><a class="text-dark" style="text-decoration: none;"
                                    href="#">Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Account</li>
                        </ol>
                    </nav>
                </div>
                <div class="card p-3 my-3">
                    <div class="card border-0  p-2" style="background-color: #F7EBFF;">
                        <!-- student laft panel -->
                        <div class="d-flex align-items-start justify-content-between">
                            <div class="d-flex p-2 align-items-center">
                                <!-- <img src="https://github.com/mdo.png" alt="" width="45" height="45" class="rounded-circle me-2"> -->
                                <span class="">{{ firstname }}, {{ lastname }}</span>
                            </div>
                            <div class="p-1">
                                <span class="" style="font-size: 15px;">Connected as</span> <br>
                                <span class="fw-bold" style="color: #9F1FED; font-size: 15px;">
                                    {{ isStudent ? 'Student' : 'Lecturer' }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <form action="">
                        <div class="row mt-2">
                            <div class="col-12">
                                <input :value="username" type="text" placeholder="jeniferwatson@gmail.com"
                                    class="form-control form-control-sm my-2" disabled>
                                <input type="password" placeholder="new password" class="form-control form-control-sm my-2">
                                <input type="password" placeholder="confirm password"
                                    class="form-control form-control-sm my-2">
                            </div>
                            <div class="d-grid">
                                <button class="btn btn-outline-primary">Save</button>
                            </div>
                        </div>
                    </form>
                    <hr>
                    <div class="d-flex justify-content-evenly">
                        <button class="btn btn-outline-primary">Go to Account</button>
                        <button @click="disconnect" class="btn text-white"
                            style="background-color: #9F1FED;">Disconnect</button>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <!-- student card -->
                <div class="" v-if="isStudent">
                    <TabsWrapper class="p-2">
                        <tab title="My Courses">
                            <DashBoardCourseItem v-for="course in registeredCourses" :key="course._id" :course="course" />
                        </tab>
                        <tab title="Schedules" class=" p-2">
                            <DashBoardScheduleManager :courses="registeredCourses" />
                        </tab>
                        <tab title="Subscription" class="card p-2">
                            <DashBoardSubscriptionItem v-for="subscription in authStore.subscription"
                                :subscription="subscription" :key="subscription._id" />
                        </tab>
                    </TabsWrapper>
                </div>
                <!-- Lecturer card -->
                <div class="" v-else>
                    <TabsWrapper class="p-2">
                        <tab title="My Courses" class=" p-3 rounded" style="background-color: #d1d1d156;">
                            <DashBoardCourseItem :is-lecturer="true"
                                v-for="schedule in scheduleStore.connectedUserSchedules" :key="schedule.course._id"
                                :course="schedule.course" />
                        </tab>
                        <tab title="Schedules" class=" p-2">
                            <DashBoardScheduleManager :is-lecturer="true" :courses="registeredCourses" />
                        </tab>
                    </TabsWrapper>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Tab from '@/components/userdashbaordtabs/Tabs.vue'
import TabsWrapper from '@/components/userdashbaordtabs/Tabswrapper.vue'
import { useAuthStore } from '@/stores/authStore';
import { ref, onMounted, computed } from 'vue';
import router from '@/router';
import DashBoardCourseItem from './DashBoardCourseItem.vue';
// import DashBoardScheduleItem from './DashBoardScheduleItem.vue';
import DashBoardSubscriptionItem from './DashBoardSubscriptionItem.vue';
import DashBoardScheduleManager from './DashBoardScheduleManager.vue';
import { useScheduleStore } from '@/stores/scheduleStore';

const scheduleStore = useScheduleStore();
const isStudent = ref(true);
const authStore = useAuthStore();
const firstname = computed(() => authStore.authUser ? authStore.authUser.firstname : '')
const lastname = computed(() => authStore.authUser ? authStore.authUser.lastname : '')
const username = computed(() => authStore.authUser ? authStore.authUser.username : '')
const registeredCourses = computed(() => authStore.authUser ? authStore.authUser.registeredCourses : '')

onMounted(() => {
    isStudent.value = authStore.authUser.accountType === 'student' ? true : false
    if(!isStudent.value) scheduleStore.getSchedulesByLecturerId(authStore.authUser?._id)
})

function disconnect() {
    authStore.disconnect();
    router.push({ name: 'HomeView' })
}

</script>
