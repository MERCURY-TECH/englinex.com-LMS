<template>
	<WebsiteTemplate>
    <section class="p-md-5" >
      <div class="container">
        <div class="row">
          <div class="col-md-4">
			<div class="cirlce-1">
				<div class="circle-2">
					<div class="circle-3">
						<p class="display-3 text-white primary-text call-out">Nice To Meet You!</p>
					</div>
				</div>
			</div>
          </div>
          <div class="col-md-8">
            <p class="h2" style="font-family: 'Raleway', sans-serif;" >By Professional English Speakers For All Learners</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd</p>
			

            <p class="px-md-5 mx-md-5">
              <a href="" class="btn btn-lg text-light" style="background: #490194; z-index: 122;">Get Started <i class="bi-arrow-right-circle ms-5 me-2"></i></a>
              <a href="" class="btn btn-lg btn-light primary-text primary-border px-5" style="margin-left: -19px; background: #fff;">See Pricing</a>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section style="overflow: hidden;">
      <div class="row">
        <div class="col-md-6">
          <div class="p-md-5" style="background: #A01FEF;">
            <div class="">
              <p class="h1 text-light text-center ps-5" style="border-bottom: 5px solid #E5; font-family: Raleway, sans-serif;"> Our Vision </p>
            </div>
            <p class="text-light pt-3 px-md-5"><small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.</small></p>
            <div class="row m-4">
              <div class="col-6 text-light"><i class="bi-check-circle-fill" style="color: #C4E02F;"></i> lorem ipsum dolor sit</div>
              <div class="col-6 text-light"><i class="bi-check-circle-fill" style="color: #C4E02F;"></i> lorem ipsum dolor sit</div>
              <div class="col-6 text-light"><i class="bi-check-circle-fill" style="color: #C4E02F;"></i> lorem ipsum dolor sit</div>
              <div class="col-6 text-light"><i class="bi-check-circle-fill" style="color: #C4E02F;"></i> lorem ipsum dolor sit</div>
            </div>
          </div>
          <div class="p-md-5" style="">
            <div class="">
              <p class="h1 primary-text text-center ps-5" style="border-bottom: 5px solid #E5; font-family: Raleway, sans-serif;"> Our Mission </p>
            </div>
            <p class="rounded-2 p-md-5 mt-3" style="border: 2px dashed #C4E02F;"><small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat</small></p>
            
          </div>
        </div>
        <div class="col-md-6 ps-md-5 pe-md-3">
          <div class="h-100 file-drag" style="background-color:rgba(0, 0, 0, 0.1); background-blend-mode: multiply; background-position: top center; background-size: cover;"></div>
        </div>
      </div>
    </section>
    
  </WebsiteTemplate>
</template>
<script>
	import WebsiteTemplate from '../components/WebsiteTemplate.vue';
	import axios from 'axios';

	export default {
		name: 'AboutPage',
		components: {
			WebsiteTemplate,
		},
    data() {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      
      handleSubmit() {
        // const fd = new FormData();
        // fd.append('username', this.username);
        // fd.append('pwd', this.pwd);

        axios.post('login', this.user)
        .then(response => {
          localStorage.setItem('token', response.data.token);
          alert('Logged in successfully');
          this.$router.push('/dashboard/');
        })
        .catch(error => {
          alert('Login Error: ' + error.response.data.errorMessage)
        })
      }

    }
	}
</script>

<style scoped>
.file-drag {
	background-image: url(@/assets/woman-teaching.jpg);
}

.circle-1 {
	background: #F7EBFF 0% 0% no-repeat padding-box;
	border-radius: 100%;
	opacity: 1;
	padding: 32px;
}

.circle-2 {
	background: #E5BBFF 0% 0% no-repeat padding-box;
	opacity: 1;
	border-radius: 100%;                   
	padding: 32px;
}

.circle-3 {
	background: var(---a01fef) 0% 0% no-repeat padding-box;
	padding: 32px;
	background: #A01FEF 0% 0% no-repeat padding-box;
	opacity: 1;
	border-radius: 100%;
	background: var(---a01fef) 0% 0% no-repeat padding-box;
	background: #A01FEF 0% 0% no-repeat padding-box;
	opacity: 1;
}

.call-out{
	font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-60)/var(--unnamed-line-spacing-75) var(--unnamed-font-family-dm-serif-display);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: center;
font: normal normal normal 60px/75px DM Serif Display;
letter-spacing: 0px;
color: #F9F9F9;
text-transform: uppercase;
opacity: 1;
}

</style>