import mongoose from "mongoose";

const Role= mongoose.model('Role', new mongoose.Schema({
    Sid:{type:String, unique:true},
    actions:[{type:String}]
  }));
export default Role;

