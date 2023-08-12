/**
* @description Course section database operations
* @version 1.0
* @since  Monday, 17 07 2023, at 10:20: 13 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { ICourseMaterial, ICourseSection } from "../../logic/lms-interfaces";
import CourseSectionMaterial from "../../models/course-models/course-material";
import CourseSection from "../../models/course-models/course-section";
import { ILogic } from "../IOperations";

const createCourseSectionMaterial: ILogic = {
    name: "createCourseSectionMaterial",
    callback: async function (collection: { sectionId: string, materials: Array<ICourseMaterial> }) {
        try {
            let courseSection = await CourseSection.findOne({ _id: collection.sectionId })
            let courseSectionMaterial:any =[];
            if(courseSection){
                if (courseSection) { courseSectionMaterial = await CourseSectionMaterial.insertMany(collection.materials) }
                courseSection.material = [...(await CourseSectionMaterial.find({sectionId:collection.sectionId}).select(['_id']))] as any
                await courseSection.save()
            }
            return courseSectionMaterial;
        } catch (error) {
            console.log(error)
        }
    }
}



const findCourseSectionMaterialByID: ILogic = {
    name: "findCourseSectionMaterialByID",
    callback: async (courseSectionMaterialId: String) => await CourseSectionMaterial.findOne({ _id: courseSectionMaterialId }).populate('displayBGColor')
}

const getAllSectionMaterialPerSectionId: ILogic = {
    name: "getAllSectionMaterialPerSectionId",
    callback: async (sectionId: string) => (await CourseSection.findOne({ _id: sectionId })
        .populate({path: 'material',populate: 'displayBGColor'}))?.material
}
const getMaterialById: ILogic = {
    name: "getMaterialById",
    callback: async (materialId: string) => (await CourseSectionMaterial.findOne({ _id: materialId }))
}

const updateCourseSectionMaterial: ILogic = {
    name: "updateCourseSectionMaterial",
    callback: async function (collection: { filter: { _id: string }, update: ICourseSection }) {
        return await CourseSectionMaterial.findOneAndUpdate({ _id: collection.filter._id },{...collection.update});
    }
}

const deleteCourseSectionMaterial: ILogic = {
    name: "deleteCourseSectionMaterial",
    callback: async function (collection: { filter: { _id: string } }) {
        let material = await getMaterialById.callback(collection.filter._id);
        if(!material){throw new Error('material does not exist')}
        console.log(material)
        let relatedSection = await CourseSection.findOne({material:collection.filter._id})
        if(relatedSection){
            let materialsOfSection:Array<string> =  JSON.parse(JSON.stringify(relatedSection.material));
            relatedSection.material = materialsOfSection.filter(v=>v.toString() != collection.filter._id) as any
            relatedSection.save();
        }
        return (await material.deleteOne());
    }
}


export default [createCourseSectionMaterial, findCourseSectionMaterialByID, getAllSectionMaterialPerSectionId, updateCourseSectionMaterial, deleteCourseSectionMaterial, getMaterialById]