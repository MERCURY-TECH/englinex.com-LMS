/**
* @description Course section database operations
* @version 1.0
* @since  Monday, 17 07 2023, at 10:20: 13 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { ICourseContentlevel } from "../../logic/lms-interfaces";
import CourseContentlevel from "../../models/course-models/course-content-level";
import { ILogic } from "../IOperations";





const createCourseContentLevel: ILogic = {
    name: "createCourseContentLevel",
    callback: async function (collection: { levels: Array<ICourseContentlevel> }) {
            console.log(collection.levels)
            return await CourseContentlevel.insertMany(collection.levels);
    }
}


const getAllContentLevels: ILogic = {
    name: "getAllContentLevels",
    callback: async () => await CourseContentlevel.find()
}


const deleteCourseContentlevel: ILogic = {
    name: "deleteCourseContentlevel",
    callback: async function (collection: { filter: { _id: string } }) {
        return await CourseContentlevel.findByIdAndDelete(collection.filter._id);
    }
}


export default [createCourseContentLevel, getAllContentLevels, deleteCourseContentlevel]