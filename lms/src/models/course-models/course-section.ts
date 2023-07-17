/**
* @description Course section model
* @version 1.0
* @since 2023, 07, Friday, 14,19, 25, 38 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";
const CourseSectionSchema = new mongoose.Schema({
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseSection' },
    coverimage: String,
    // contentLevel:{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseContentlevel', required: [true, 'please provide the course section level'] },
    title: { type: String, required: [true, 'please provide a valid course section title'] },
    description: { type: String, required: [true, 'please provide a valid course section description'] },
    material: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseSectionMaterial'}],
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required:[true,'please provide the course ID']},
    createdBy: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required:[true,'please provide User ID'] },
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId,ref: 'User' }
});


const CourseSection = mongoose.model('CourseSection', CourseSectionSchema);

export default CourseSection;

