<template>
	<DashboardTemplate>
		<div class="container px-md-5 py-3">
			<div class="rounded bg-body p-3">
				<!-- Form Head Row -->
				<div class="row">
					<div class="col">
						<p class="h2 fw-bold" style="font-family: 'Raleway', sans-serif;">New Course</p>
					</div>
					<div class="col-auto d-flex">
						<div  v-if="!this.toggleCreateToImportCourse" class="form-check form-switch form-check-reverse pt-3">
							<label class="form-check-label" for="makeCoursePublic">
								<span v-if="isPublic">
									<span class="badge primary-bg"><i class="bi-globe-europe-africa"></i> Public</span>
								</span>
								<span v-else>
									<small><span>Make Course Public</span></small>
								</span>
							</label>
							<input class="form-check-input" type="checkbox" role="switch" id="makeCoursePublic"
								@change="makePublic">
						</div>
						<div class="pt-3">
							<button class="btn btn-sm primary-button-outline px-5 mx-2">
								Save
								<div class="spinner-border spinner-border-sm text-dark" v-if="loader" role="status">
									<span class="visually-hidden">Loading...</span>
								</div>
							</button>
						</div>
						<div class="pt-3">
							<button  @click="()=>{this.toggleCreateToImportCourse = !this.toggleCreateToImportCourse}" 
								class="btn btn-sm primary-button-outline mx-2">
								<i v-if="!this.toggleCreateToImportCourse" class="bi-upload"></i>
								{{ this.toggleCreateToImportCourse? 'create via form':'Upload via CSV' }}
								
							</button>
						</div>
						<router-link class="h3 text-danger ms-3" :to="{ name: 'Courses' }"><i
								class="bi-x-circle"></i></router-link>
					</div>
				</div>
				<hr>
				<!-- End Form Head Row -->
				<form @submit.prevent="createCourse">
					<div v-if="!this.toggleCreateToImportCourse" class="row p-3">
						<div class="col-md-3">
							<div class="new-file-drag bg-light p-2 rounded-4"
								:style="{ backgroundImage: `url(${imagePath})` }"
								style="background-size: cover; background-position: center;">
								<div class="drag-zone p-3 rounded-4 text-center"
									style="background-color: #F7EBFF; border: 2px dashed #ccc; opacity: .8;">
									<p class="h1 primary-text"><i class="bi-image"></i></p>
									<p style="font-size: .85em">
										<small>Drag your photo here to start uploading</small>
									</p>
									<div class="row">
										<div class="col-5">
											<hr>
										</div>
										<div class="col-2 p-0">
											<p class="h4">OR</p>
										</div>
										<div class="col-5">
											<hr>
										</div>
									</div>
									<label class="btn btn-sm primary-button w-100 rounded-2" for="inputImage">
										Browse files
										<input type="file" @change="onImageSelected" class="visually-hidden"
											accept=".jpg, .jpeg, .png" id="inputImage" />
									</label>
								</div>
							</div>
						</div>
						<div class="col-md-5">
							<div class="mb-3">
								<input type="text" v-model="title" placeholder="Course Title" class="form-control" />
							</div>
							<div class="mb-3">
								<ckeditor :editor="editor" v-model="description"></ckeditor>
							</div>

							<p class="h4 mt-4">Course Tags</p>

							<div class="form-control">
								<div class="row p-1">
									<div class="col-12 border rounded">
										<p class="fw-semibold">Selected tags:</p>
										<small v-for="(tag, index) in tags" :key="tag" @click="removeFromTagsList(index)"
											class="d-inline-flex mb-3 me-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
											style="cursor: pointer;">{{ tag.title }}</small>
									</div>
									<div class="col-12">
										<p class="fw-semibold"><small>Create new tags:</small></p>
										<input type="text" v-model="tagNames" placeholder="Enter tag names..."
											class="form-control form-control-sm w-75 d-inline-flex"
											style="border: none; border-left: 1px solid grey; border-radius: 0" />
										<a @click="createTags" class="btn btn-sm primary-button d-inline-flex">
											Add
											<div class="spinner-border spinner-border-sm text-light" v-if="tagloader"
												role="status">
												<span class="visually-hidden">Loading...</span>
											</div>
										</a>
									</div>
								</div>
								<div class="bg-light p-3 mt-3 border rounded">
									<small v-for="tag in tagsList" :key="tag" @click="addToTagsList(tag)"
										class="d-inline-flex mb-3 me-1 px-2 py-1 fw-semibold primary-text bg-success-subtle border primary-bg-subtle rounded-3"
										style="cursor: pointer;">
										{{ tag.title }}
									</small>

								</div>
							</div>

						</div>

						<div class="col-md-4 p-2">
							<p class="h4">Course Content</p>
							<p class="h6">Section & Material</p>
							<p class="text-muted" style="font-size: .85em">
								<small>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
									incididunt ut labore et dol.
								</small>
							</p>
							<div class="content-drag bg-light p-2 rounded-4" @drop.prevent="onDrop">
								<div class="drag-zone p-3 rounded-4 text-center"
									style="background-color: #F7EBFF; border: 2px dashed #ccc;">
									<p class="h1 primary-text py-3"><i class="bi-folder-fill"></i></p>
									<p style="font-size: .85em">
										<small>Drag your course content <strong>CSV | JSON</strong> here to start
											uploading</small>
									</p>
									<div class="row my-4">
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
									<label class="btn btn-sm primary-button w-100 rounded-2" for="inputDoc">
										Browse Files
										<input type="file" @change="onDocumentSelected" class="visually-hidden"
											accept=".csv, .json" id="inputDoc" />
									</label>
								</div>
							</div>
						</div>
					</div>
				</form>
				<ImportCourseContent importSectionTitle="Course, section & Material" v-if="this.toggleCreateToImportCourse" />
			</div>
		</div>

	</DashboardTemplate>
</template>

<script>
import axios from 'axios';
import DashboardTemplate from '../components/DashboardTemplate.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImportCourseContent from '../components/misc/course-management/ImportCourseContent.vue'
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
	name: 'DashboardCreateCourse',
	props: {
	},
	components: {
		DashboardTemplate,
		ckeditor: CKEditor.component,
		ImportCourseContent
	},
	data() {
		return {
			toggleCreateToImportCourse: false,
			imagePath: '',
			editor: ClassicEditor,
			tagNames: '',
			tagsList: [],
			tags: [],
			image: null,
			coverimage: "",
			title: '',
			description: '',
			isPublic: false,
			content: [],
			loader: false,
			tagloader: false
		}
	},
	mounted() {
		this.fetchTags();
	},
	methods: {
		makePublic() {
			if (this.isPublic) { this.isPublic = false } else { this.isPublic = true }
		},
		onDrop(e) {
			console.log('files-dropped', [...e.dataTransfer.files])
		},

		createTags() {
			this.tagloader = true
			if (this.tagNames.length === 0) { alert('Empty tags list'); this.tagloader = false } else {
				const arr = this.tagNames.split(",");
				const tagList = [];
				arr.forEach(function (tagin) {
					tagList.push({
						title: tagin
					})
				});

				axios.post('create-tags', tagList)
					.then(response => {
						console.log(response);
						alert('Tags successfully created');
						this.fetchTags();
						this.tagNames = '';
						this.tagloader = false;
					})
					.catch(error => {
						// Handle the error
						alert('An error occured. Please try again later')
						this.tagloader = false
						console.log(error);
					});
			}
		},

		async fetchTags() {
			axios.get('get-tags/')
				.then(response => {
					this.tagsList = response.data.message.tags;
				})
				.catch(error => {
					// Handle the error
					console.log(error);
				});
		},

		createCourse() {
			this.loader = true
			const arr = [];

			arr.push({
				coverimage: this.coverimage,
				title: this.title,
				description: this.description,
				isPublic: this.isPublic,
				tags: this.tags,
				content: this.content
			});

			axios.post('create-courses', arr)
				.then(response => {
					if (this.image !== null) {
						const fd = new FormData();
						fd.append('upload', this.image);
						axios.patch('cover-image/' + response.data.message.courses[0]._id, fd)
							.then(() => {
								alert('Course created with success')
								this.loader = false
								this.$router.push({ name: 'GetSingleCourse', params: { id: response.data.message.courses[0]._id } });
							})
							.catch(error => {
								alert('An error occured. Please try again later')
								this.loader = false;
								console.log(error)
							})

					} else {
						alert('Course created with success')
						this.loader = false;
						this.$router.push('/admin/dashboard/courses')
						console.log(response.data)
					}

				})
				.catch(error => {
					alert('An error occured. Please try again later')
					this.loader = false;
					console.log(error)
				})
		},

		addToTagsList(tag) {
			if (!this.tags.includes(tag)) { this.tags.push(tag); } else { alert('Tag already included') }
		},

		removeFromTagsList(index) {
			this.tags.splice(index, 1);
		},

		onImageSelected(event) {
			this.image = event.target.files[0];
			this.imagePath = URL.createObjectURL(this.image);
			this.coverimage = this.image.name;
			alert('Image selected: ' + this.coverimage);
		},

		onDocumentSelected(event) {
			const file = event.target.files[0];
			this.readFileContent(file);
		},

		readFileContent(file) {
			const reader = new FileReader();

			reader.onload = (e) => {
				console.log(e.target.result)
				const content = JSON.parse(e.target.result);
				this.processFileContent(content);
			};

			reader.readAsText(file);
		},

		processFileContent(content) {
			// Do something with the content (e.g., store it in a Vue data property)
			this.content = content;
			console.log(this.content)
			alert('Your file has been uploaded');
		},
	}
}
</script>