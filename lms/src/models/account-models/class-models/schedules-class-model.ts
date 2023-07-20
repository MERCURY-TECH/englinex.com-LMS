/**
* @description Student to lecturer relationship
* @version 1.0
* @since  Thursday, 20 07 2023, at 17:32: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/
import mongoose from "mongoose";


const ClassScheduleSchema = new mongoose.Schema({
    Datetime: {type:Date, require:[true, 'you must provide the time']},
    course: { type: mongoose.Schema.Types.ObjectId,ref: 'Course', required:[true,'please provide User ID'] }
});
const ClassSchedule = mongoose.model('ClassSchedule', ClassScheduleSchema);

export default ClassSchedule;