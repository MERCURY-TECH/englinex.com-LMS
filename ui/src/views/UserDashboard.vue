<template>
    <WebsiteTemplate>
        <div class="py-4 container">
            <div class="row">
                <div class="col-md-4">
                    <div class="w-50 rounded p-1 d-flex align-item-center justify-content-center" style="background-color: #F7EBFF;">
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
                            <div class="d-flex align-items-center" >
                            <img src="https://github.com/mdo.png" alt="" width="45" height="45" class="rounded-circle me-2">
                            <span class="" >Jenifer Watson</span>
                           </div>
                           <div class="">
                            <span class="" style="font-size: 15px;">Connected as</span> <br>
                            <span class="fw-bold" style="color: #9F1FED; font-size: 15px;" v-if="studentRole">Student</span>
                            <span class="fw-bold" style="color: #9F1FED; font-size: 15px;" v-else>Lecturer</span>
                           </div>
                           </div> 
                        </div>
                        <hr>
                        <form action="">
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <input type="text" placeholder="jeniferwatson@gmail.com" class="form-control form-control-sm my-2" disabled>
                                        <input type="password" placeholder="new password" class="form-control form-control-sm my-2" >
                                        <input type="password" placeholder="confirm password" class="form-control form-control-sm my-2">
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
                    <TabsWrapper>
                        <Tab></Tab>
                    </TabsWrapper>
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
            studentRole:true
        }
    },
}
</script>