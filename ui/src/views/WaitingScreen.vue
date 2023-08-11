<template>
   <WebsiteTemplate>
    <div class="container">
        <div class="row align-items-center py-4">
        <div class="col-12 col-md-8 main-area rounded overflow-hidden">
              <div class="d-flex align-items-end justify-content-center py-3" style="height: inherit;">
                    <button class="btn rounded-pill px-4 py-3 d-flex align-items-center mx-2">
                    <i class="bi bi-mic text-white fs-4 mb-3 me-2"></i>
                </button>
               
                <button class="btn rounded-pill px-4 py-3 d-flex align-items-center mx-2">
                    <i class="bi bi-camera-video text-white fs-4 mb-3 me-2"></i>
                </button>
              </div>
        </div>
        <div class="col-12 col-md-4 p-4">
            <div class=" p-3" style="border: 1px dashed #9F1FED; stroke-dasharray: 18, 19, 17; background-color: #F7EBFF;">
                <h3 class=" fw-bold text-center">The Quick Note...</h3>

                <p class="mt-3 text-center">- By John Doe -</p>
                <p class="mt-3 text-center">7PM - 10pm </p>
                <p class="text-center">West African Time </p>
                <div class="d-flex align-items-center justify-content-center">
                    <button class="btn btn-sm btn-primary" style="background-color: #9F1FED;">Join Class Room</button>
                </div>

            </div>
        </div>
    </div>
    </div>
   </WebsiteTemplate>
</template>
<script>

import WebsiteTemplate from '@/components/WebsiteTemplate.vue'
export default {
    components:{
        WebsiteTemplate,
    }
}
</script>
<style>
.main-area{
    background-image: linear-gradient(172deg, rgba(2, 0, 36, 0.231) 40%, rgba(0, 0, 0, 0.568) 99%),url(@/assets/woman-teaching.jpg);
    background-size: cover;
    background-position: center;
    height: 32rem;

}


</style>