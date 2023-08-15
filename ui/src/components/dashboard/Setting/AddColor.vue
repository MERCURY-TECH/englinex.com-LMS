<template>
    <div class="card">
        <div class="card-header bg-white">
            <p class="fw-bold h2">Manage Colors</p>
        </div>
        <div class="card-body bg-light">
            <div class="row">
                <div class="col-12 col-md-5 my-2">
                    <input type="text" class="form-control" placeholder="Color Name">
                </div>
                <div class="col-12 col-md-5 my-2">
                    <input type="text" class="form-control" placeholder="Color Code">
                </div>
                <div class="col-12 col-md-2 my-2">
                   <button class="btn btn-outline-primary">Save</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row px-3" v-for="color in colors" :key="color.name">
                <div class="col-12 col-md-5 my-2 p-4 rounded" :style="{backgroundColor:color.code}"></div>
                <div class="col-12 col-md-3 ms-3">
                    <span class="fw-bold text-center">{{ color.name }}</span> <br>
                    <span class="">{{ color.code }}</span> 
                </div>
                <div class="col-12 col-md-3 rounded my-2" style="background-color: #EACEFC;">
                    <button class="btn mt-1 ms-2">
                        <i class="bi bi-pencil-square fs-5" style="color: #9F1FED;"></i>
                    </button>
                    <button class="btn mt-1 me-2">
                        <i class="bi bi-trash-fill text-danger fs-5"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            colors:[
                {name:'Grey', code:"#A2A2A2"},
                {name:'Salmon Red', code:"#FF0000"},
                {name:'Red', code:"#7E1B1B"},
            ]
        }
    },
}
</script>