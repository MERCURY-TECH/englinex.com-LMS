/**
* @description Course section material model
* @version 1.0
* @since 2023, 07, Friday, 14,19, 30, 33 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/



//CourseSectionMaterialMaterial
import mongoose from "mongoose";
import { CourseMaterialType } from "../../logic/lms-interfaces";


function makePhoneticFieldsRequired(){
    // @ts-ignore
    return this.materialType == CourseMaterialType.phonetic
}


const CourseSectionMaterialSchema = new mongoose.Schema({
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseSection' },
    materialType: { type: String, enum: [...Object.values(CourseMaterialType)], require:[true,'you must provide the material type']},
    displayBGColor: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseMaterialColor' },
    title: { type: String, required: [true, 'please provide a Course Section Material title'] },
    sound: {
        type: String,
        required : makePhoneticFieldsRequired
    },
    englishText:  {
        type: String,
        required : makePhoneticFieldsRequired
    },
    description: { type: String, required: [true, 'please provide a Course Section Material description'] },
    content: { type: String, required: [true, 'please provide a Course Section Material content'] },
    answers: String,
    isPublic:{type:Boolean, default:true, required:true},
});
const CourseSectionMaterial = mongoose.model('CourseSectionMaterial', CourseSectionMaterialSchema);

export default CourseSectionMaterial;
