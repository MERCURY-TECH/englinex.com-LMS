/**
* @description Course Operations
* @version 1.0
* @since  Monday, 17 07 2023, at 18:37: 36 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import { ICourseMaterialColor } from "../../logic/lms-interfaces";
import CourseMaterialColor from "../../models/course-models/course-content-colors";
import { ILogic } from "../IOperations";

const createCourseMaterialColor:ILogic = {
    name: "createCourseMaterialColor",
    callback: async function (collection: Array<ICourseMaterialColor>) {
       return await CourseMaterialColor.insertMany(collection);
    }
}


const getAllCourseMaterialColor:ILogic = {
    name: "getAllCourseMaterialColor",
    callback: async () => await CourseMaterialColor.find()
}


const deleteCourseMaterialColor:ILogic = {
    name: "deleteCourseMaterialColor",
    callback: async function (collection:{filter:{_id:string}}) {
        return await CourseMaterialColor.findByIdAndDelete({_id:collection.filter._id});
    }
}

export default [createCourseMaterialColor, getAllCourseMaterialColor, deleteCourseMaterialColor]