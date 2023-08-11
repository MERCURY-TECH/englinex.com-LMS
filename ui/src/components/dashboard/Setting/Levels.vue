<template>
    <div class="card mt-5">
        <div class="card-header border-0 bg-white">
            <p class="fw-bold h2">Manage Levels</p>
        </div>
        
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-md-5 my-2">
                    <input type="text" class="form-control" placeholder="Color Name">
                </div>
                <div class="col-12 col-md-5 my-2">
                    <input type="text" class="form-control" placeholder="Color Code">
                </div>
                <div class="col-12 col-md-2 my-2">
                   <button class="btn btn-outline-primary">Add</button>
                </div>
            </div>
            <hr class="mx-2">
        <div class="row  g-2 p-2" >
           <div v-for="level in levels" :key="level.title" class="col-12 rounded pb-2 me-2 px-2 border-bottom">
             <div class="d-flex align-items-center">
                 {{ level.title }} | <span class="ms-2">#{{ level.rank }}</span>
            <span class=" ms-auto px-3 rounded" style="cursor: pointer;">
                <span class=""><i class="bi bi-pencil-square fs-5 mx-2" style="color: #9F1FED;"></i></span>
                <span class="ms-3"><i class="bi bi-trash-fill text-danger mx-2"></i></span> 
            </span> 
             </div>
           </div>
        </div>
        </div>
       
    </div>
</template>

<script>
export default {
    name:"tagsView",
    data() {
        return {
            levels:[
                {title:"Beginner", rank:1},
                {title:"Beginner", rank:2},
                {title:"Beginner", rank:3},
                {title:"Intermediate", rank:4},
                {title:"Pro", rank:5},
                {title:"Senior", rank:6},
            ]
        }
    },
}
</script>