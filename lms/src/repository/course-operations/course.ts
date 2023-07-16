


import { ICourse } from "../../logic/lms-interfaces";
import Course from "../../models/course-models/course";
import { ILogic } from "../IOperations";


//create course
// create course sections
// create course materials
// update course
// delete course

// course management operations
const createCourse:ILogic = {
    name: "createCourse",
    callback: async function (collection: Array<ICourse>) {
       return await Course.insertMany(collection);
    },
    error: function (err: any): void {console.log(err.message)}
}

const findCourseByID:ILogic = {
    name: "findCourseByID",
    callback: async function (courseId:String) {
       return await Course.findOne({_id:courseId});
    },
    error: function (err: any): void {console.log(err.message)}
}
const getAllCourses:ILogic = {
    name: "getAllCourses",
    callback: async function () {
       return await Course.find();
    },
    error: function (err: any): void {console.log(err.message)}
}


const updateCourse:ILogic = {
    name: "updateCourse",
    callback: async function (collection:{filter:{_id:string}, update:ICourse}) {
        return await Course.findOneAndUpdate({_id:collection.filter._id},collection.update);
    },
    error: function (err: any): void {console.log(err.message)}
}

const deleteCourse:ILogic = {
    name: "deleteCourse",
    callback: async function (collection:{filter:{_id:string}}) {
        return await Course.findByIdAndDelete({_id:collection.filter._id});
    },
    error: function (err: any): void {console.log(err.message)}
}

// course section operations



export default [createCourse, findCourseByID, getAllCourses, updateCourse,deleteCourse]