/**
* @description Course Operations
* @version 1.0
* @since  Monday, 17 07 2023, at 18:37: 36 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import { ITag } from "../../logic/lms-interfaces";
import Tag from "../../models/course-models/Tag";
import { ILogic } from "../IOperations";

const createTag:ILogic = {
    name: "createTag",
    callback: async function (collection: Array<ITag>) {
       return await Tag.insertMany(collection);
    }
}


const getAllTags:ILogic = {
    name: "getAllTags",
    callback: async () => await Tag.find()
}


const deleteTag:ILogic = {
    name: "deleteTag",
    callback: async function (collection:{filter:{_id:string}}) {
        return await Tag.findByIdAndDelete({_id:collection.filter._id});
    }
}

export default [createTag, getAllTags, deleteTag]