/**
* @description Student to lecturer relationship
* @version 1.0
* @since  Thursday, 20 07 2023, at 17:32: 26 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/
import mongoose from "mongoose";



const StudentLecturerRelationShipSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId,ref: 'User', require:[true, 'you must provide the students ID']},
    lecturer: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: [true, 'please provide the lecturers ID '] },
    course: { type: mongoose.Schema.Types.ObjectId,ref: 'Course', required:[true,'please provide User ID'] }
});
const StudentLecturerRelationShip = mongoose.model('StudentLecturerRelationShip', StudentLecturerRelationShipSchema);

export default StudentLecturerRelationShip;