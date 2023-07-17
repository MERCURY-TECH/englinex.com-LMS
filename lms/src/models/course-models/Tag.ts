/**
* @description Course tags
* @version 1.0
* @since 2023, 07, Friday, 14,19, 33, 53 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";



const TagSchema = new mongoose.Schema({
    title: { type: String,  unique:[true,'Only one instance of a tag with same title can exist'] ,required: [true, 'please provide a title for this tag'] }
});
const Tag = mongoose.model('Tag', TagSchema);

export default Tag;