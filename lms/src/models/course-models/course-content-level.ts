/**
* @description Course Content level
* @version 1.0
* @since 2023, 07, Friday, 14,19, 33, 53 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";



const CourseContentlevelSchema = new mongoose.Schema({
    ranking: {type:Number, unique:[true,'Only one instance of a level with this number can exist'], require:[true, 'you must provide the ranking']},
    title: { type: String, required: [true, 'please provide a title for the level'], unique:[true,'Only one instance of a level with this title can exist'] }
});
const CourseContentlevel = mongoose.model('CourseContentlevel', CourseContentlevelSchema);

export default CourseContentlevel;