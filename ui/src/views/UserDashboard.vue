<template>
    <WebsiteTemplate>
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
                                <div class="d-flex align-items-center">
                                    <img src="https://github.com/mdo.png" alt="" width="45" height="45"
                                        class="rounded-circle me-2">
                                    <span class="">Jenifer Watson</span>
                                </div>
                                <div class="">
                                    <span class="" style="font-size: 15px;">Connected as</span> <br>
                                    <span class="fw-bold" style="color: #9F1FED; font-size: 15px;"
                                        v-if="studentRole">Student</span>
                                    <span class="fw-bold" style="color: #9F1FED; font-size: 15px;" v-else>Lecturer</span>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <form action="">
                            <div class="row mt-2">
                                <div class="col-12">
                                    <input type="text" placeholder="jeniferwatson@gmail.com"
                                        class="form-control form-control-sm my-2" disabled>
                                    <input type="password" placeholder="new password"
                                        class="form-control form-control-sm my-2">
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
                            <button class="btn text-white" style="background-color: #9F1FED;">Disconnect</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <!-- student card -->
                    <div class="" v-if="studentRole">
                        <TabsWrapper class="p-2">
                            <tab title="My Courses" class="card p-2">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="">
                                        <span class="" style="color: font-size: 14px;">#Name</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">current Subscription</span>
                                    </div>
                                    <div class="">
                                        <span class="" style="color: #9F1FED; font-size: 14px;">12 classes Left 25 (total)
                                            for 3 months</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">Unlimited Access to
                                            material</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">Register Unlimited
                                            Courses</span>
                                    </div>
                                    <div class="d-flex">
                                        <button class="btn btn-sm">
                                            <span style="font-size: 13px;">
                                                <i class="bi bi-x-circle text-danger"></i>
                                                Cancel Subscription
                                            </span>
                                        </button>
                                        <button class="btn btn-sm">
                                            <span style="font-size: 13px;">
                                                <i class="bi bi-pencil-fill" style="color: #9F1FED;"></i>
                                                Edit Subscription
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </tab>
                            <tab title="Schedules" class="card p-2">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="">
                                        <span class="" style="color: font-size: 14px;">#Name</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">current Subscription</span>
                                    </div>
                                    <div class="">
                                        <span class="" style="color: #9F1FED; font-size: 14px;">12 classes Left 25 (total)
                                            for 3 months</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">Unlimited Access to
                                            material</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">Register Unlimited
                                            Courses</span>
                                    </div>
                                    <div class="d-flex">
                                        <button class="btn btn-sm">
                                            <span style="font-size: 13px;">
                                                <i class="bi bi-x-circle text-danger"></i>
                                                Cancel Subscription
                                            </span>
                                        </button>
                                        <button class="btn btn-sm">
                                            <span style="font-size: 13px;">
                                                <i class="bi bi-pencil-fill" style="color: #9F1FED;"></i>
                                                Edit Subscription
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </tab>
                            <tab title="Subscription" class="card p-2">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="">
                                        <span class="" style="color: font-size: 14px;">#Name</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">current Subscription</span>
                                    </div>
                                    <div class="">
                                        <span class="" style="color: #9F1FED; font-size: 14px;">12 classes Left 25 (total)
                                            for 3 months</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">Unlimited Access to
                                            material</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">Register Unlimited
                                            Courses</span>
                                    </div>
                                    <div class="d-flex">
                                        <button class="btn btn-sm">
                                            <span style="font-size: 13px;">
                                                <i class="bi bi-x-circle text-danger"></i>
                                                Cancel Subscription
                                            </span>
                                        </button>
                                        <button class="btn btn-sm">
                                            <span style="font-size: 13px;">
                                                <i class="bi bi-pencil-fill" style="color: #9F1FED;"></i>
                                                Edit Subscription
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </tab>

                        </TabsWrapper>
                    </div>
                    <!-- Lecturer card -->
                    <div class="" v-else>
                        <TabsWrapper class="p-2">
                            <tab title="My Courses" class=" p-3 rounded" style="background-color: #d1d1d156;">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="row">
                                        <span class="col-6 text-truncate" style="color: font-size: 14px;">The Quick brown
                                            fox</span> <br>
                                        <span class=""
                                            style="color: #8b8b8b; font-size: 13px;">#ytitytytgggffnvjuyfgfj</span>
                                    </div>

                                    <div class="d-flex">
                                        <button class="btn btn-sm mx-2" style="background-color: #F7EBFF;">
                                            <span style="font-size: 13px;">
                                                View Students
                                            </span>
                                        </button>
                                        <button class="btn btn-sm mx-2" style="background-color: #F7EBFF;">
                                            <span style="font-size: 13px;">

                                                Go to Class
                                            </span>
                                        </button>
                                    </div>
                                    <div class="">
                                        <router-link to="/" class="nav-link rounded-pill px-1"
                                            style="border:1px solid #9F1FED;">

                                            <i class="bi bi-chevron-right"></i>
                                        </router-link>
                                    </div>
                                </div>
                            </tab>
                            <tab title="Schedules" class="card p-2">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="">
                                        <span class="" style="color: font-size: 14px;">#Name</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">current Subscription</span>
                                    </div>
                                    <div class="">
                                        <span class="" style="color: #9F1FED; font-size: 14px;">12 classes Left 25 (total)
                                            for 3 months</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">Unlimited Access to
                                            material</span> <br>
                                        <span class="" style="color: #8b8b8b; font-size: 13px;">Register Unlimited
                                            Courses</span>
                                    </div>
                                    <div class="d-flex">
                                        <button class="btn btn-sm">
                                            <span style="font-size: 13px;">
                                                <i class="bi bi-x-circle text-danger"></i>
                                                Cancel Subscription
                                            </span>
                                        </button>
                                        <button class="btn btn-sm">
                                            <span style="font-size: 13px;">
                                                <i class="bi bi-pencil-fill" style="color: #9F1FED;"></i>
                                                Edit Subscription
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </tab>

                        </TabsWrapper>
                    </div>
                </div>
            </div>
        </div>
    </WebsiteTemplate>
</template>

<script>
import WebsiteTemplate from '../components/WebsiteTemplate.vue';
import Tab from '@/components/userdashbaordtabs/Tabs.vue'
import TabsWrapper from '@/components/userdashbaordtabs/Tabswrapper.vue'
export default {
    components: {
        WebsiteTemplate,
        Tab,
        TabsWrapper
    },
    data() {
        return {
            studentRole: true
        }
    },
}
</script>
