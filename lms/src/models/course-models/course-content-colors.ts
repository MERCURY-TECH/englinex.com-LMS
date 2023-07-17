/**
* @description Course Content Color
* @version 1.0
* @since 2023, 07, Friday, 14,19, 33, 53 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";



const CourseMaterialColorSchema = new mongoose.Schema({
    colorCode: {type:String, require:[true, 'you must provide the color code']},
    title: { type: String,  unique:[true,'Only one instance of a color with same title can exist'] ,required: [true, 'please provide a title for this colors'] }
});
const CourseMaterialColor = mongoose.model('CourseMaterialColor', CourseMaterialColorSchema);

export default CourseMaterialColor;