/**
* @description Course model
* @version 1.0
* @since 2023, 07, Wednesday, 12:15:37, 42 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema({
  
  tags :[{ type: mongoose.Schema.Types.ObjectId,ref: 'Tag' }],
  coverimage : String,
  title :{type:String, required:[true,'please provide a valid course title']},
  description:{type:String, required:[true,'please provide a valid course description']},
  isPublic:{type:Boolean, default:false, required:true},
  content:[{ type: mongoose.Schema.Types.ObjectId,ref: 'CourseSection' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required:[true,'please provide User ID'] },
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId,ref: 'User' }
});


// TODO ::  Add cascade deletion to services

const Course = mongoose.model('Course', CourseSchema);

export default Course;

