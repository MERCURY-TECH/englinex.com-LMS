/**
* @description Class scheduling operations
* @version 1.0
* @since  Friday, 21 07 2023, at 18:19: 08 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { AccountType, IClassSchedule } from "../../logic/lms-interfaces";
import Subscription from "../../models/account-models/Subscriptions/subscriptions-model";
import ClassSchedule from "../../models/account-models/class-models/schedules-class-model";
import Course from "../../models/course-models/course";
import User from "../../models/user-models/User";
import { ILogic } from "../IOperations";


const getAllValidSchedules: ILogic = {
    name: "getAllValidSchedules",
    callback: async () => await ClassSchedule.find({ datetime: { $gte: new Date() } }).populate(['course', 'student', 'lecturer'])
}

function isTimeClash(scheduledTime:Date, existingScheduleTime:Date,step:number){
    let timeDiff = Math.abs(scheduledTime.getTime()-existingScheduleTime.getTime())/(1000 * 60 * 60)
    return (timeDiff > step) ?  false : true
}

const createSchedule: ILogic = {
    name: "createSchedule",
    callback: async function (collection: IClassSchedule) {
        let step = 2
        let schedule = new Date(collection.datetime);
        let today: Date = new Date();
        if(!(await User.findOne({_id:collection.student}))) throw new Error('Student of ID ==> '+collection.student+ ' does not exist');
        if(!(await Course.findOne({_id:collection.course}))) throw new Error('Course of ID ==> '+collection.course+ ' does not exist');
        today.setHours(today.getHours() + 8);
        if (!(today < schedule)) throw new Error('Class needs to be scheduled at least 8 hours ahead of time')
        let subscription:any =  await Subscription.findOne({student:collection.student}).populate(['bundle','student']);
        if(!subscription) throw new Error('No valid subscription');

        if(((subscription.numberOfClassHoursConsumed as number) >=  subscription.bundle?.constraints.numberOfClassHours))
            throw new Error('You have used your total number of allocated time, you do not more have available time');
            subscription.numberOfClassHoursConsumed +=  step;

        let existingStudentSchedules = await ClassSchedule.find().and([{student:collection.student},{datetime: { $gte: new Date() }}]);
        
        for(let existingSchedule of existingStudentSchedules){
            if(isTimeClash(new Date(schedule), new Date(existingSchedule?.datetime as Date), step))
            {throw new Error('time clash with schedule ID'+ existingSchedule);}
        }

        return await new ClassSchedule(collection).save().then(async (t) => 
            {  
                await subscription.save()
                return t.populate(['student', 'course','relatedCourseMaterial','lecturer'])
            }).then(t => t);
    }
}

const getScheduleAssociatedTolecturer: ILogic = {
    name: "getScheduleAssociatedTolecturer",
    callback: async (lecturerId: string) => {
        let lecturersSchedules = (await ClassSchedule.find({lecturer: lecturerId}).where({datetime: { $gte: new Date()}}).populate(['course','student','lecturer','relatedCourseMaterial']).select(['-_id']));
        console.log(lecturerId, lecturersSchedules)
        return lecturersSchedules;
    }
}

const getSchedulesByCourse: ILogic = {
    name: "getSchedulesByCourse",
    callback: async (courseId: string) => await ClassSchedule.find({ course: courseId, datetime: { $gte: new Date() } }).populate(['student', 'course', 'lecturer','relatedCourseMaterial'])
}

const getSchedulesByStudent: ILogic = {
    name: "getSchedulesByStudent",
    callback: async (studentId: string | string[]) => {
        if (studentId instanceof Array) {
            return await ClassSchedule.find({ datetime: { $gte: new Date() } }).where('student').in([...studentId]).populate(['student', 'course'])
        }
        return await ClassSchedule.find({ student: studentId }).and([{ datetime: { $gte: new Date() } }]).populate(['student', 'course', 'lecturer','relatedCourseMaterial'])
    }
}

const cancelSchedule: ILogic = {
    name: "cancelSchedule",
    callback: async function (scheduleId: string) {
        let schedule = await ClassSchedule.findOne({ _id: scheduleId })
        if (!schedule) throw new Error('Schedule does not exist');
        let scheduledTime = new Date(schedule.datetime as Date);
        let today: Date = new Date();
        if (!((today.getHours() - scheduledTime.getHours()) <= 8)) throw new Error('Class scheduled can only be cnacelled 8 hours ahead of time')
        let subscription:any =  await Subscription.findOne({student:schedule.student}).populate('bundle');
        if(subscription){
            subscription.numberOfClassHoursConsumed = subscription.numberOfClassHoursConsumed - 2;
            await subscription.save();
        }
        return await ClassSchedule.findByIdAndDelete(scheduleId);
    }
}

const comfirmSchedule: ILogic = {
    name: "comfirmSchedule",
    callback: async function (scheduleId: string) {
        let schedule = await ClassSchedule.findOne({ _id: scheduleId })
        if (!schedule) throw new Error('Schedule does not exist');
        if (schedule) {
            let scheduleTime = new Date(schedule.datetime as Date);
            let today: Date = new Date();
            if (!(scheduleTime > today)) throw new Error('Time has alredy passed, class can not more be comfirmed')
            schedule.isConfirmed = true;
            if(schedule.liveClass){
                schedule.liveClass.roomID  = schedule._id.toString() as string;
            }
        }
        return await schedule.save().then(t => t.populate(['student', 'course'])).then(t => t);
    }
}



const assignLecturerToSchedule: ILogic = {
    name: "assignLecturerToSchedule",
    callback: async function(collection: {filter:{_id:string}, update:{lecturer:string}}) {
        let schedule:any = await ClassSchedule.findOne({_id:collection.filter._id});
        let existingLecturerSchedules = await ClassSchedule.find().and([{lecturer:collection.update.lecturer},{datetime: { $gte: new Date() }}]);
        let step = 2
        for(let existingSchedule of existingLecturerSchedules){
            if(isTimeClash(new Date(schedule.datetime), new Date(existingSchedule?.datetime as Date), step))
            throw new Error('time clash with schedule ID'+ existingSchedule._id);
        }
        if((await User.findOne({_id:collection.update.lecturer}))?.accountType != AccountType.lecturer)
        throw new Error('Invalid lecturer ID, User ID must be a lecturer ID')
        if(schedule) schedule.lecturer = collection.update.lecturer;
        return await schedule.save();
    }
}

export default [getSchedulesByStudent, cancelSchedule, createSchedule, getAllValidSchedules, getSchedulesByCourse, comfirmSchedule, getScheduleAssociatedTolecturer, assignLecturerToSchedule]