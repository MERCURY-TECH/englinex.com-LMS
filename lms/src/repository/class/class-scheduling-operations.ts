/**
* @description Class scheduling operations
* @version 1.0
* @since  Friday, 21 07 2023, at 18:19: 08 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

//IClassSchedule


import { IClassSchedule, ICourseMaterialColor } from "../../logic/lms-interfaces";
import ClassSchedule from "../../models/account-models/class-models/schedules-class-model";
import CourseMaterialColor from "../../models/course-models/course-content-colors";
import { ILogic } from "../IOperations";

const getAllValidSchedules:ILogic = {
    name: "getAllValidSchedules",
    callback: async () => await ClassSchedule.find({datetime:{$gte: new Date()}}).populate(['course','student'])
}

const createSchedule:ILogic = {
    name: "createSchedule",
    callback: async function (collection: IClassSchedule) {
        // run conditions here
        //   === >  make sure only students can create schedules
        //  ==== > ensure user is register for course
        let schedule = new Date(collection.datetime);
        let today:Date = new Date();
        today.setHours(today.getHours() + 6);
        
        if(!( today < schedule)) throw new Error('Class needs to be scheduled at least 6 hours ahead of time')
       return await new ClassSchedule(collection).save().then(t => t.populate(['student','course'])).then(t => t);
    }
}

const updateSchedule:ILogic = {
    name: "updateSchedule",
    callback: async () => await CourseMaterialColor.find()
}

const getSchedulesByCourse:ILogic = {
    name: "getSchedulesByCourse",
    callback: async (courseId:string) => await ClassSchedule.find({course:courseId}).populate(['student','course'])
}

const getSchedulesByLecturer:ILogic = {
    name: "getSchedulesByLecturer",
    callback: async (courseId:string) => await ClassSchedule.find({course:courseId}).populate(['student','course'])
}

const getSchedulesByStudent:ILogic = {
    name: "getSchedulesByStudent",
    callback: async (studentId:string) => await ClassSchedule.find({student:studentId}).populate(['student','course'])
}

const cancelSchedule:ILogic = {
    name: "cancelSchedule",
    callback: async function (scheduleId:string) {
        return await ClassSchedule.findByIdAndDelete(scheduleId);
    }
}

const comfirmSchedule:ILogic = {
    name: "comfirmSchedule",
    callback: async function (scheduleId:string) {
        // createthe class URL
        let schedule = await ClassSchedule.findOne({_id:scheduleId})
        if(!schedule) throw new Error('Schedule does not exist');  
        if(schedule){
            let scheduleTime = new Date(schedule.datetime as Date);
            let today:Date = new Date();
            if(!(scheduleTime>today)) throw new Error('Time has alredy passed, class can not more be comfirmed')
            schedule.isConfirmed =  true;
        }    
        return await schedule.save().then(t => t.populate(['student','course'])).then(t => t);
    }
}

export default [getSchedulesByStudent,  cancelSchedule, createSchedule, getAllValidSchedules, getSchedulesByCourse, getSchedulesByLecturer,updateSchedule, comfirmSchedule]