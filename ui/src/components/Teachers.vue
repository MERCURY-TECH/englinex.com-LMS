<template>
    <div :class="open ? 'teacher open' : 'teacher'">
        <div class="pe-3 ps-2 my-2 " style="background-color: #FBF6FF;">
            <div class="question pt-2 d-flex justify-content-between">
                <div class="">
                    <div class="d-flex align-items-center">
                        <img src="https://github.com/mdo.png" alt="" width="40" height="40" class="rounded-circle me-2">
                        <div class="ms-3">
                            <span class="fw-bold">{{ teacher.teacher_name }}</span> <br>
                            <span class="">#64baf299460a735fc4311bc6</span>
                        </div>
                    </div>
                </div>
                <button class="btn btn-outline-danger ms-auto border-0"><i class="bi bi-trash-fill"></i></button>
                <button class="btn toggle-btn" @click="$emit('toggleOpen', index)">open</button>

            </div>
            <div class="answer  p-2 overflow-hidden">
                <hr>
                <div class="row align-items-end justify-content-beetwen">
                    <div class="col-12 col-md-4">
                        <button class="btn btn-outline-primary">Suspend Teacher</button>
                    </div>
                    <div class="col-12 col-md-4">
                        <label for="" class="form-label fw-bold">Role</label>
                        <select class="form-select " aria-label="Default select example">
                            <option selected>User Role</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="d-flex">
                            <router-link class="nav-link rounded-start text-light p-2 bg-secondary w-100" to="/dashboard/courses">Courses</router-link>
                            <router-link class="nav-link rounded-end mx-2 text-light p-2 w-100" style="background-color: #9F1FED;" to="/dashboard/courses">Students</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'TeacherTomponent',
    props: ['teacher', 'index', 'open']
}
</script>
<style scoped>
.teacher .question {
    position: relative;
    transition: all 0.4s linear;
    cursor: pointer;
}

.teacher .question::after {
    content: '';

    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%) rotate(0deg);

    width: 20px;
    height: 20px;
    background-image: url('../assets/chevron-down.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    transition: all 0.2s linear;
}

.teacher.open .question::after {
    transform: translateY(-50%) rotate(180deg);
}

.teacher .answer {
    opacity: 0;
    max-height: 0px;
    overflow-y: hidden;
    transition: all 0.4s ease-out;
}

.teacher.open .answer {
    opacity: 1;
    max-height: 1000px;
    z-index: 1;
}

.toggle-btn {
    margin-right: -1rem;
    z-index: 100;
    opacity: 0%;
}

.btn-outline-primary {
    color: #A01FEF;
    border: #A01FEF 1px solid;
}

.btn-outline-primary:hover {
    color: #fff;
    border: #A01FEF 1px solid;
    background: #A01FEF;
}
</style>
