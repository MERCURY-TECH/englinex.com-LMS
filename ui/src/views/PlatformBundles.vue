<template>
    <DashboardTemplate>
        <div class="bundles">
            <div class="row my-5 p-2">
                <div class="col-md-9 rounded-2 overflow-hidden">
                    <div class="p-2 rounded" style="background-color: #F2F2F2;">
                        <p class="h6 fw-bold">Platform Bundles</p>
                    </div>
                    <div class="bg-white rounded p-2">
                        <div v-for="i in 6" :key="i"
                            class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between my-2"
                            style="background-color: #F2F2F2;">
                            <div class="p-2">
                                <span class="text-primary fw-bold">Bundle Title <span class="text-dark">(-10%)</span></span>
                                <br>
                                <span class="">Bundle UUID</span>
                                <h6 class="h6 text-secondary">#64baf299460a735fc4311bc6</h6>
                            </div>
                            <div class="p-2">
                                <span><del>12,000 FCFA</del></span>
                                <span class="ms-2" style="color: #C4E02F;">10,000 FCFA</span>
                            </div>
                            <div class="d-flex align-items-center flex-row flex-md-column px-5 px-md-2 mx-2"
                                style="border-left: #A01FEF 2px solid;border-right: #A01FEF 2px solid;">
                                <span class="me-3">3 months</span>
                                <span class="badge rounded text-dark" style="border: #A01FEF 1px solid;">72 Hours of
                                    Class</span>
                            </div>
                            <div class="px-1 my-4 my-md-0">
                                <span style="color: #A01FEF;"><i class="bi bi-archive-fill"></i> <span
                                        class="text-dark ms-1">Active</span></span>
                            </div>
                            <div class="d-flex p-4 justify-content-between align-item-center w-md-50"
                                style="background-color: #dfc3f1;">
                                <button class="btn btn-outline-primary rounded-pill btn-sm ">
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button class="btn btn-outline-danger border-0 ms-2">
                                    <i class="bi bi-trash3-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3  mt-3 mt-md-0">
                    <div class="rounded p-2" style="background-color: #F2F2F2;">
                        <p class="h6 fw-bold text-center">Platform Bundles</p>
                    </div>
                    <div class="bg-white p-2">
                        <form action="" class="mt-2">
                            <div class="mb-3">
                                <input type="text" class="form-control form-control-sm" id="" placeholder="UUID">
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control form-control-sm" id="" placeholder="Title">
                            </div>
                            <div class="mb-3">

                                <textarea class="form-control form-control-sm" placeholder="Bundle short description" id=""
                                    rows="3"></textarea>
                            </div>
                            <div class="px-2" style="border: #A01FEF solid 1px;">
                                <p class="fw-bold text-center mt-2">Constrains</p>
                                <hr class="mx-3" style="color: #A01FEF;">

                                <div class="row mb-2">
                                    <div class="col">
                                        <input type="text" class="form-control form-control-sm" placeholder="Duration">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control form-control-sm" placeholder="unit cost">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control form-control-sm" placeholder="Discount">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control form-control-sm" placeholder="Class hours">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-check mt-2">
                                        <input class="form-check-input" type="checkbox" id="gridCheck">
                                        <label class="form-check-label" for="gridCheck">
                                            Activate
                                        </label>
                                    </div>
                                </div>
                                <hr class="mx-3" style="color: #A01FEF;">

                            </div>
                            <div class="d-flex justify-content-center mt-2">
                                <button type="submit" class="btn btn-outline-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </DashboardTemplate>
</template>
<script>
import DashboardTemplate from "../components/DashboardTemplate.vue";
export default {
    name: "platformBundle",
    components: {
        DashboardTemplate
    }
}
</script>

<style>
.bundles {
    font-size: 13px;
}

.btn-outline-primary {
    color: #A01FEF;
    border: #A01FEF 1px solid;
}
</style>