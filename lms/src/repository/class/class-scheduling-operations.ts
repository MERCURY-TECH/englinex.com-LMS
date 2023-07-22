/**
* @description Class scheduling operations
* @version 1.0
* @since  Friday, 21 07 2023, at 18:19: 08 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { IClassSchedule } from "../../logic/lms-interfaces";
import StudentLecturerRelationShip from "../../models/account-models/class-models/StudentLecturerAssignment";
import ClassSchedule from "../../models/account-models/class-models/schedules-class-model";
import CourseMaterialColor from "../../models/course-models/course-content-colors";
import { ILogic } from "../IOperations";

const getAllValidSchedules: ILogic = {
    name: "getAllValidSchedules",
    callback: async () => await ClassSchedule.find({ datetime: { $gte: new Date() } }).populate(['course', 'student'])
}

const createSchedule: ILogic = {
    name: "createSchedule",
    callback: async function (collection: IClassSchedule) {
        let schedule = new Date(collection.datetime);
        let today: Date = new Date();
        today.setHours(today.getHours() + 8);

        if (!(today < schedule)) throw new Error('Class needs to be scheduled at least 8 hours ahead of time')
        return await new ClassSchedule(collection).save().then(t => t.populate(['student', 'course'])).then(t => t);
    }
}

const getScheduleAssociatedTolecturer: ILogic = {
    name: "getScheduleAssociatedTolecturer",
    callback: async (lecturerId: string) => {
        let lecturerAssociatedStudents = (await StudentLecturerRelationShip.find({ lecturer: lecturerId }).select(['-_id', 'student'])).map((studentIdRef: any) => (studentIdRef.student as string).toString());
        lecturerAssociatedStudents = Array.from(new Set(lecturerAssociatedStudents));
        return await getSchedulesByStudent.callback(lecturerAssociatedStudents);
    }
}

const updateSchedule: ILogic = {
    name: "updateSchedule",
    callback: async () => await CourseMaterialColor.find({ datetime: { $gte: new Date() } })
}

const getSchedulesByCourse: ILogic = {
    name: "getSchedulesByCourse",
    callback: async (courseId: string) => await ClassSchedule.find({ course: courseId, datetime: { $gte: new Date() } }).populate(['student', 'course'])
}

const getSchedulesByStudent: ILogic = {
    name: "getSchedulesByStudent",
    callback: async (studentId: string | string[]) => {
        if (studentId instanceof Array) {
            return await ClassSchedule.find({ datetime: { $gte: new Date() } }).where('student').in([...studentId]).populate(['student', 'course'])
        }
        return await ClassSchedule.find({ student: studentId }).populate(['student', 'course'])
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
        }
        return await schedule.save().then(t => t.populate(['student', 'course'])).then(t => t);
    }
}

export default [getSchedulesByStudent, cancelSchedule, createSchedule, getAllValidSchedules, getSchedulesByCourse, updateSchedule, comfirmSchedule, getScheduleAssociatedTolecturer]