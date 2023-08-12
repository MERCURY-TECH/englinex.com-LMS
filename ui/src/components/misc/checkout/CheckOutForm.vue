<template>
    <div class="col-12 row mx-3">
        <div class="col">
            <p class="h1 fw-bold" style="font-family: 'Raleway', sans-serif">
                Checkout
            </p>
        </div>
        <div class="col-auto">
            <p><small>Back to courses</small></p>
        </div>
    </div>
    <div class="col-12 row border-bottom primary-border mx-3">
        <div class="col">
            <p class=""><small>Continue with free trial</small></p>
        </div>
        <div class="col-auto">
            <p><small>Edit</small></p>
        </div>
    </div>
    <form class="row mx-3" @submit.prevent="">
        <span class="col-12">
            <p class="fw-bold mt-2">
                <small>Where's this order going?</small>
            </p>
        </span>
        <div class="col-12 mb-2">
            <input type="text" class="form-control" name="country" placeholder="Country" />
        </div>
        <div class="col-md-6 mb-2">
            <input type="text" class="form-control" name="firstname" placeholder="Firstname" />
        </div>
        <div class="col-md-6 mb-2">
            <input type="text" class="form-control" name="lastname" placeholder="Lastname" />
        </div>
        <div class="col-md-7 mb-2">
            <input class="form-control" name="address" type="text" placeholder="Address" />
        </div>
        <div class="col-md-5 mb-2">
            <input class="form-control" name="building" type="text" placeholder="Appt/Floor/Suite" />
        </div>
        <div class="col-md-4 mb-2">
            <input class="form-control" name="city" type="text" placeholder="City" />
        </div>
        <div class="col-md-4 mb-2">
            <input class="form-control" name="state" type="text" placeholder="State" />
        </div>
        <div class="col-md-4 mb-2">
            <input class="form-control" name="zip" type="text" placeholder="Zip Code" />
        </div>
        <div class="col-md-12 mb-2">
            <input class="form-control" name="Phone" type="text" placeholder="Phone" />
        </div>
        <div class="col-12 text-end">
            <button class="btn primary-button px-5 mb-2">Next</button>
        </div>

        <div class="col-12 row border-bottom border-top primary-border pt-1">
            <p class="col">
                <small>
                    <span class="fw-bold">Bundle</span><br />
                    Premium - 12 months ($120)
                </small>
            </p>
            <p class="col-auto">
                <small>
                    <a class="nav-link">Edit</a>
                </small>
            </p>
        </div>
    </form>
</template>

<script setup>


</script>