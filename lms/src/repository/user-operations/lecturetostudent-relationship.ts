/**
* @description Lecturer to student linking operations
* @version 1.0
* @since  Thursday, 20 07 2023, at 22:41: 30 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/
import { AccountType, IStudentLecturerRelationShip } from "../../logic/lms-interfaces";
import StudentLecturerRelationShip from "../../models/account-models/class-models/StudentLecturerAssignment";
import User from "../../models/user-models/User";
import { ILogic } from "../IOperations";
const { ObjectId } = require('mongodb');

const linkStudentToLecturer:ILogic = {
    name: "linkStudentToLecturer",
    callback: async function (relationship: IStudentLecturerRelationShip) {
        if(await StudentLecturerRelationShip.findOne().and([{course: ObjectId(relationship.course)},{student:ObjectId(relationship.student)}])){
            throw new Error('stundet has already been assigned alecturer for courseID '+ relationship.course);
        }

        if((await User.findOne({_id:relationship.lecturer}))?.accountType != AccountType.lecturer){
            throw new Error('Invalid lecturer ID, User ID must be a lecturer ID')
        }
        if((await User.findOne({_id:relationship.student}))?.accountType != AccountType.student){
            throw new Error('Invalid student ID, User ID must be a student ID')
        }

        return await new StudentLecturerRelationShip(relationship).save();
    }
}
const unLinkStudentToLecturer:ILogic = {
    name: "unLinkStudentToLecturer",
    callback: async function (relationship: IStudentLecturerRelationShip) {
       return await StudentLecturerRelationShip.findOneAndDelete().and([{course: ObjectId(relationship.course)},{student:ObjectId(relationship.student)}]);
    }
}

const getLinkedStudentAndLecturers:ILogic = {
    name: "getLinkedStudentAndLecturers",
    callback: async function () {
       return await StudentLecturerRelationShip.find().populate(['student', 'lecturer', 'course']);
    }
}

const getLinkedStudentAndLecturersPerCourse:ILogic = {
    name: "getLinkedStudentAndLecturersPerCourse",
    callback: async function (courseId:string) {
       return await StudentLecturerRelationShip.find({_id:courseId}).populate(['student', 'lecturer', 'course']);
    }
}

export default [linkStudentToLecturer, unLinkStudentToLecturer, getLinkedStudentAndLecturers, getLinkedStudentAndLecturersPerCourse];