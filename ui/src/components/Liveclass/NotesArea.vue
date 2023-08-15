<template>
   <div class="p-3" style="background-color: #F7EBFF;">
    <div class="d-flex justify-content-between">
        <div class="">
            <span class="fw-bold fs-5">The Quick Note</span> <br>
            <span class="fw-bold">- By John Doe -</span>
        </div>
        <div class="">
            <p class="fw-bold text-center">Lesson 5</p>
            <p class="text-center" style="margin-top: -15px;"> The Originals</p>
        </div>
        <div class="">
            <p class="fw-bold">7PM to 10PM</p>
            <p class="fw-bold" style="margin-top: -15px;"> West African Time</p>
        </div>
        
    </div>
    <span class="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse quos dignissimos nihil? Pariatur minima quos officiis aspernatur nemo</span>
   </div>
  
    <div class="row p-2">
        <div class="col-md-12">
            <textarea name="" rows="2" class="form-control" placeholder="live demonstraion can be made here "></textarea>
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