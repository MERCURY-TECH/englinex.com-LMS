/**
* @description Student to lecturer relationship
* @version 1.0
* @since  Thursday, 20 07 2023, at 17:32: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/
import mongoose from "mongoose";



const ClassScheduleSchema = new mongoose.Schema({
    datetime: {type:Date, required:[true, 'you must provide the time']},
    course: { type: mongoose.Schema.Types.ObjectId,ref: 'Course', required:[true,'please provide course ID'] },
    student: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required:[true,'please provide student ID'] },
    isConfirmed: {type:Boolean, default:false},
    classUrl:String
});
const ClassSchedule = mongoose.model('ClassSchedule', ClassScheduleSchema);

export default ClassSchedule;