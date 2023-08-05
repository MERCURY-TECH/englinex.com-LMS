<template>
	<div class="container px-md-5 py-3">
		<form class="rounded bg-body p-3">
			<div class="row p-3">
				<div class=" p-2">
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
							<label v-if="this.content.length" @click="uploadContent"
								class="btn btn-sm primary-button w-100 rounded-2" for="inputDoc">
								Upload file
								<div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
									<span class="visually-hidden">Loading...</span>
								</div>
							</label>
							<label v-if="!this.content.length" class="btn btn-sm primary-button w-100 rounded-2"
								for="inputDoc">
								Browse Files
								<input type="file" @change="onDocumentSelected" class="visually-hidden" accept=".csv, .json"
									id="inputDoc" />
							</label>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>
  
<script>
import axios from 'axios';

export default {
	name: 'ImportCourseContent',
	props: {
		importSectionTitle: String,
		importSectionDescription: String,
		targetEndPoint: String
	},
	components: {

	},
	created() {
		const preventDefaults = event => {
				event.preventDefault();
				event.stopPropagation();
			};

			const highlight = event => event.target.classList.add('highlight');
			const unhighlight = event => event.target.classList.remove('highlight');

			const getInputAndGalleryRefs = element => {
				const zone = element.closest('.upload_dropZone') || false;
				const gallery = zone.querySelector('.upload_file') || false;
				const input = zone.querySelector('input[type="file"]') || false;
				return { input: input, gallery: gallery };
			}

			const handleDrop = event => {
				const dataRefs = getInputAndGalleryRefs(event.target);
				dataRefs.files = event.dataTransfer.files;
				handleFiles(dataRefs);
			}


			const eventHandlers = zone => {

				const dataRefs = getInputAndGalleryRefs(zone);
				if (!dataRefs.input) return;

				// Prevent default drag behaviors
				['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
					zone.addEventListener(event, preventDefaults, false);
					document.body.addEventListener(event, preventDefaults, false);
				});

				// Highlighting drop area when item is dragged over it
				['dragenter', 'dragover'].forEach(event => {
					zone.addEventListener(event, highlight, false);
				});
				['dragleave', 'drop'].forEach(event => {
					zone.addEventListener(event, unhighlight, false);
				});

				// Handle dropped files
				zone.addEventListener('drop', handleDrop, false);

				// Handle browse selected files
				dataRefs.input.addEventListener('change', event => {
					dataRefs.files = event.target.files;
					handleFiles(dataRefs);
				}, false);

			}


			// Initialise ALL dropzones
			const dropZones = document.querySelectorAll('.upload_dropZone');
			for (const zone of dropZones) {
				eventHandlers(zone);
			}


			// No 'image/gif' or PDF or webp allowed here, but it's up to your use case.
			// Double checks the input "accept" attribute
			const isImageFile = file =>
				['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type);


			function previewFiles(dataRefs) {
				if (!dataRefs.gallery) return;
				for (const file of dataRefs.files) {
					let reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onloadend = function () {
						let img = document.createElement('img');
						img.className = 'upload_img mt-2';
						img.setAttribute('alt', file.name);
						img.src = reader.result;
						dataRefs.gallery.appendChild(img);
					}
				}
			}

			// Based on: https://flaviocopes.com/how-to-upload-files-fetch/
			const imageUpload = dataRefs => {

				// Multiple source routes, so double check validity
				if (!dataRefs.files || !dataRefs.input) return;

				const url = dataRefs.input.getAttribute('data-post-url');
				if (!url) return;

				const name = dataRefs.input.getAttribute('data-post-name');
				if (!name) return;

				const formData = new FormData();
				formData.append(name, dataRefs.files);

				fetch(url, {
					method: 'POST',
					body: formData
				})
					.then(response => response.json())
					.then(data => {
						console.log('posted: ', data);
						if (data.success === true) {
							previewFiles(dataRefs);
						} else {
							console.log('URL: ', url, '  name: ', name)
						}
					})
					.catch(error => {
						console.error('errored: ', error);
					});
			}


			// Handle both selected and dropped files
			const handleFiles = dataRefs => {

				let files = [...dataRefs.files];

				// Remove unaccepted file types
				files = files.filter(item => {
					if (!isImageFile(item)) {
						console.log('Not an image, ', item.type);
					}
					return isImageFile(item) ? item : null;
				});

				if (!files.length) return;
				dataRefs.files = files;

				previewFiles(dataRefs);
				imageUpload(dataRefs);
			}
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
			axios.post('import-course/', this.content)
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