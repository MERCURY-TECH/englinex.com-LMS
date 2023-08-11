<template>
	<div :class="[styleClasses,'col p-2']">
		<p class="h4">Course Content</p>
		<p class="h6">
			{{ this.importSectionTitle ? this.importSectionTitle : 'Section & Material' }}
		</p>
		<p class="text-muted" style="font-size: .85em">
			<small>
				{{ this.importSectionDescription ? this.importSectionDescription : `'Lorem ipsum dolor sit amet,
				consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dol.'`}}
			</small>
		</p>
		<div class="content-drag bg-light p-2 rounded-4">
			<div @drop="onDocumentSelected" class="drag-zone upload_dropZone p-3 rounded-4 text-center"
				style="background-color: #F7EBFF; border: 2px dashed #ccc;">
				<p class="h1 primary-text py-3"><i class="bi-folder-fill"></i></p>
				<p style="font-size: .85em">
					<small>Drag your course content <strong>CSV | JSON</strong> here to start
						uploading</small>
				</p>
				<div class="row my-4 upload_file">
					<div class="col-5">
						<hr>
					</div>
					<div class="col-2  p-0">
						<p class="h2">OR</p>
					</div>
					<div class="col-5">
						<hr>
					</div>
				</div>
				<label v-if="this.content.length" @click="uploadContent" class="btn btn-sm primary-button w-100 rounded-2"
					for="inputDoc">
					Upload file
					<div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</label>
				<label v-if="!this.content.length" class="btn btn-sm primary-button w-100 rounded-2" for="inputDoc">
					Browse Files
					<input type="file" @change="onDocumentSelected" class="visually-hidden" accept=".csv, .json"
						id="inputDoc" />
				</label>
			</div>
		</div>
	</div>
</template>
  
<script>
import axios from 'axios';

export default {
	name: 'ImportCourseContent',
	props: {
		importSectionTitle: String,
		importSectionDescription: String,
		targetEndPoint: String,
		styleClasses:String
	},
	components: {

	},
	data() {
		return {
			content: [],
			loader: false,
			buttonText: 'Browse Files'
		}
	},
	methods: {

		onDocumentSelected(event) {
			const file = event.target.files[0];
			this.readFileContent(file);
		},

		readFileContent(file) {
			const reader = new FileReader();

			reader.onload = (e) => {
				this.buttonText = 'loading ...'
				// add a boostrap progress bar
				console.log(e.target.result)
				const content = JSON.parse(e.target.result);
				this.processFileContent(content);
			};
			reader.readAsText(file);
		},

		processFileContent(content) {
			// Do something with the content (e.g., store it in a Vue data property)
			this.content = content;
			this.buttonText = 'uplad now'
			alert('Your file has been uploaded');
		},

		uploadContent() {
			this.loader = true
			axios.post(this.targetEndPoint, this.content)
				.then(() => {
					alert('Courses created with success')
					this.loader = false
					this.$router.push({ name: 'Courses' });
				})
				.catch(error => {
					alert('An error occured. Please try again later')
					this.loader = false;
					console.log(error)
				})
		}
	}
}
</script>