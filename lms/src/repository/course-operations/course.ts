/**
* @description Course Operations
* @version 1.0
* @since  Monday, 17 07 2023, at 18:37: 36 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import { ICourse } from "../../logic/lms-interfaces";
import Course from "../../models/course-models/course";
import { ILogic } from "../IOperations";

const createCourse:ILogic = {
    name: "createCourse",
    callback: async function (collection: Array<ICourse>) {
       return await Course.insertMany(collection);
    }
}

const findCourseByID:ILogic = {
    name: "findCourseByID",
    callback: async (courseId:String) => await Course.findOne({_id:courseId})
}
const getAllCourses:ILogic = {
    name: "getAllCourses",
    callback: async () => await Course.find().populate(['content','content.material' ])
}


const updateCourse:ILogic = {
    name: "updateCourse",
    callback: async function (collection:{filter:{_id:string}, update:ICourse}) {
        return await Course.findOneAndUpdate({_id:collection.filter._id},collection.update);
    }
}

const deleteCourse:ILogic = {
    name: "deleteCourse",
    callback: async function (collection:{filter:{_id:string}}) {
        return await Course.findByIdAndDelete({_id:collection.filter._id});
    }
}

export default [createCourse, findCourseByID, getAllCourses, updateCourse,deleteCourse]