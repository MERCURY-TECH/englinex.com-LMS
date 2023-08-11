<template>
    <div class="card"  :style="{ backgroundImage: 'url(' + tutor.tutorVideo + ')' }" style="background-position: center; background-size: cover; background-repeat: no-repeat; height: 20rem;">
       <div class="p-2 d-flex flex-column justify-content-between video-overlay">
       <div class="d-flex justify-content-between">
        <span class="text-white fw-bold">
            {{ tutor.name }} <i class="bi bi-dot text-success fs-4"></i>
        </span>
        <img src="https://github.com/mdo.png" alt="" width="80" height="80" class="rounded">
       </div>
       <div class="d-flex justify-content-center">
        <button class="btn rounded-pill px-3 py-2 mx-1">
            <i class="bi bi-mic text-white fs-5"></i>
        </button>
        <button class="btn rounded-pill px-3 py-2 mx-1">
            <i class="bi bi-camera-video text-white fs-5"></i>
        </button>
        <button class="btn btn-danger rounded-pill px-3 py-2 mx-1">
            <i class="bi bi-telephone text-white fs-5"></i>
        </button>
        <button class="btn  rounded-pill px-3 py-2 mx-1">
            <i class="bi bi-person-add text-white fs-5"></i>
        </button>
        <button class="btn  rounded-pill px-3 py-2 mx-1">
            <i class="bi bi-three-dots text-white fs-5"></i>
        </button>
       </div>
       </div>
      
    </div>
    <p class="mt-3 fw-bold fs-6" style="color: #9F1FED;"> Class Live Chat <i class="bi bi-dot" style="color: #9F1FED;"></i></p>
   <div class="p-3" style="background-color: #F7EBFF; border-right: #9F1FED 5px solid;">
    <div class="d-flex justify-content-between">
        <span>7:47pm</span>
        <div class="d-flex align-items-center">
            <span class="fw-bold me-2">
            {{ tutor.name }}
        </span>
            <img src="https://github.com/mdo.png" alt="" width="40" height="40" class="rounded-pill">
        </div>
    </div>
    <hr>
    <span class="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse quos dignissimos nihil? Pariatur minima quos officiis aspernatur nemo</span>
   </div>
   <div class="d-flex justify-content-between align-items-center my-3" v-for="i in 2" :key="i">
      <div class="d-flex">
        <img src="https://github.com/mdo.png" alt="" width="40" height="40" class="rounded-pill">
       <div class="ms-2">
        <span class="fw-bold">Gaius Finggs</span>  <br>
        <span class=""> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quidem quia tenetur!</span>
       </div>
      </div>
      <span><small>7:45PM</small></span>
    </div>
    <div class="row bg-light p-2">
        <div class="col-md-10">
            <textarea name="" rows="2" class="form-control"></textarea>
        </div>
        <div class="col-md-2 mt-2">
            <button class="btn text-white" style="background-color: #9F1FED;">Send</button>
        </div>
    </div>
  
</template>

<script>
export default {
    data() {
        return {
            tutor:
                {name:"Micheal Wong",
            
                tutorVideo: require('..//../assets/tutorvideo.jpg')},
                liveChat:{

                }
           
        }
    },
}
</script>
<style>
.video-overlay{
    background-image: linear-gradient(172deg, rgba(2, 0, 36, 0.144) 40%, rgba(0, 0, 0, 0.258) 99%);
    background-size: cover;
    background-position: center;
    height: inherit;
}
</style>