<template>
    <section>
      <div class="container">
        <div class="row p-2">
          <div
            class="col-md-6 file-drag row rounded-2 justify-content-center py-5"
            style="
              background-color: rgba(0, 0, 0, 0.6);
              background-blend-mode: multiply;
              background-size: cover;
              background-position: center;
            "
          >
           <AuthHandler />
          </div>
          <div class="col-md-6 px-4">
            <CheckOutForm />
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>
//import axios from 'axios';
import CheckOutForm from '@/components/misc/checkout/CheckOutForm.vue'
import AuthHandler from '@/components/misc/authentication/AuthHandler.vue';

</script>

<style>
.file-drag {
  background-image: url(@/assets/woman-teaching.jpg);
}
</style>
