/**
* @description SocialMediaPost model
* @version 1.0
* @since 2023, 07, Wednesday, 12:15:37, 42 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";
const SocialMediaPostSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required:[true,'please provide User ID'] },
  tagLIst :[mongoose.Schema.Types.ObjectId],
  isPublic:{type:Boolean, default:true, required:true},
  content:{
    imageUrls:[String],
    articleText:{type:String, required:true}
  }
});
const SocialMediaPost = mongoose.model('SocialMediaPost', SocialMediaPostSchema);

export default SocialMediaPost;

