<template>
    <div class="card">
        <div class="card-header border-0 bg-white">
            <p class="fw-bold h2">Manage Tags</p>
        </div>
        <hr class="mx-2">
        <div class="card-body">
            <div class="row">
            <div class="col-12 col-md-10">
                <input type="text" class="form-control" placeholder="Enter tag name">
            </div>
            <div class="col-12 col-md-2">
                <button class="btn text-white" style="background-color: #9F1FED;">Add</button>
            </div>
        </div>
        <div class="row  g-2 p-2" >
           <div v-for="tag in tags" :key="tag.name" class="col-md-5 rounded p-1 me-2 px-2" style="background-color: #EACEFC;" >
             <div class="d-flex align-items-center">
                {{ tag.name }} 
            <span class=" ms-auto px-3 rounded bg-white">
                <span class=""><i class="bi bi-pencil-square fs-5" style="color: #9F1FED;"></i></span> <span class="ms-3"><i class="bi bi-trash-fill text-danger"></i></span> 
            </span> 
             </div>
           </div>
        </div>
        </div>
        <hr class="mx-2">
    </div>
</template>

<script>
export default {
    name:"tagsView",
    data() {
        return {
            tags:[
                {name:"Tech 1"},
                {name:"Sugar Course "},
                {name:"Tech 8"},
                {name:"Tech 2"},
                {name:"Tech 12"},
                {name:"Tech 15"},
            ]
        }
    },
}
</script>