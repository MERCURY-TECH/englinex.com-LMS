import { defineStore } from "pinia/dist/pinia";
import axios from 'axios';
// import { actionWrapper } from "@/helpers";

export const useCourseStore = defineStore('courseStore', {
    state: () => ({
        courses: [],
        tags:[],
        levels:[],
        colors:[]
    }),
    getters:{

        getCourseByCategory(){
            
        },
        getCourseByTags(tagsList){
            console.log(tagsList)
        },
        // complete search by tag and by keyword
        
        // filter course by difficulty level
        // get speicific course sections
    },
    actions:{
        evalutaeCourseDifficultyRange(courseId){
            let courseToRank = this.courses.find(courseItem=>courseItem._id === courseId);
            let rankingRange ={};
            if(courseToRank != undefined){
                if(! courseToRank.content.length) return {min:{ranking:0,title:'no level'},max:{ranking:0,title:'no level'}}
                courseToRank.content.forEach(section=>{
                    rankingRange[section.contentLevel.ranking] = section.contentLevel
                })
                let levels = Object.keys(rankingRange).sort((a,b)=>a-b);
                return {min:rankingRange[levels[0]],max:rankingRange[levels[levels.length-1]]};
            }
            
           
        },

        async fetchTags(){
            try {
                let response = await axios.get('get-tags/');
                this.tags = response.data.message.tags;
                return this.tags;
            } catch (error) {
                console.log(error);
            }
        },
        async createTag(newTagNames){          
            try {            
                if (newTagNames.length === 0)  return {success:false, message:'Empty tag list'} 
                else {
                const arr = newTagNames.split(",");
                const tagList = [];
                arr.forEach(function (tagin) {
                  tagList.push({
                    title: tagin
                  })
                });
                let newTags = (await  axios.post('create-tags/', tagList)).data.message.tags;
                this.tags = [...this.tags, ...newTags]
                
                return {success:true, message:`Tags successfully created`}
                }
            } catch (e) {
                    if(e.response != undefined) return {success:false, message:e.response.data.errorMessage}
                    return {success:false, message:'Action failed on platform because of ' + e.message}
                }
        },
        async editCourseByID(courseId,updates){
            try {
                let updatedCourse = await axios.patch('edit-courses/'+courseId, updates);
                if(updates['fd']) await axios.patch('cover-image/' + courseId, updates['fd'])
                this.courses.map((courseItem)=>{
                    if(courseItem._id === courseId) courseItem = updatedCourse;
                })
                return {success:true, message:`Course of ID - ${courseId} was updated succcesfully`}
            } catch (e) {
                if(e.response != undefined) return {success:false, message:e.response.data.errorMessage}
                return {success:false, message:'Action failed on platform because of ' + e.message}
            }
        },
        getRelatedCoursesByTags(courseId,courseTaglist){
            let relatedCourseSet =  new Set();
            courseTaglist.forEach((tag)=>{
                this.courses.forEach(course=> {
                    if(course.tags){
                        if(course.tags.toString().includes(tag.toString())) relatedCourseSet.add(course._id)
                    }
                })
            })
            return this.courses.filter(courseItem=> relatedCourseSet.has(courseItem._id) && courseId!=courseItem._id)
        },
        async getCourseById(courseId){
            if(!this.courses.length) await this.getAllCourses()
            return this.courses.filter((courseItem)=>courseItem._id === courseId)[0]
        },
        async deleteCourseSection(courseId,sectionId){
            try {
                await  axios.delete('delete/section/'+sectionId);
                this.courses.map((courseItem)=>{
                    if(courseItem._id === courseId) courseItem.content = courseItem.content.filter((item)=>item._id!=sectionId);
                })
                return {success:true, message:`Section of ID - ${sectionId} was deleted succcesfully`}
            } catch (e) {
                if(e.response != undefined) return {success:false, message:e.response.data.errorMessage}
                return {success:false, message:'Action failed on platform because of ' + e.message}
            }
        },
        async deleteCourseSectionMaterial(courseId, sectionId, materialId) {
            try {
                await  axios.delete('delete/material/'+materialId);
                this.courses.forEach((courseItem) => {
                    if (courseItem._id === courseId) {
                        courseItem.content.forEach((sectionItem) => {
                            if (sectionItem._id === sectionId) sectionItem.material = sectionItem.material.filter((material => material._id != materialId))
                        });
                    }
                });
                return { success: true, message: `Material of ID - ${materialId} was deleted succcesfully` }
            } catch (e) {
                if (e.response != undefined) return { success: false, message: e.response.data.errorMessage }
                return { success: false, message: 'Action failed on platform because of ' + e.message }
            }
        },
        async getAllCourses(){
            try {
                let response = await axios.get('get-all-courses/');
                this.courses = response.data.message.courses;
                return {success:true, message:'Collected user courses with success'}
            } catch (e) {
                if(e.response != undefined) return {success:false, message:e.response.data.errorMessage}
                return {success:false, message:'Action failed on platform because of ' + e.message}
            }
        },
        async deleteCourse(courseId){
            try {
                await axios.delete('delete/course/' + courseId);
                this.courses = this.courses.filter((course)=>course._id!=courseId);
                return {success:true, message:'Course deleted with success'}
            } catch (e) {
                if(e.response != undefined) return {success:false, message:e.response.data.errorMessage}
                return {success:false, message:'Action failed on platform because of ' + e.message}
            }
        },
        async createCourse(){

        },
        
       

    },
})
