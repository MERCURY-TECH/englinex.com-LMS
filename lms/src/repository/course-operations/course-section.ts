/**
* @description Course section database operations
* @version 1.0
* @since  Monday, 17 07 2023, at 10:20: 13 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { ICourseSection } from "../../logic/lms-interfaces";
import Course from "../../models/course-models/course";
import CourseSection from "../../models/course-models/course-section";
import { ILogic } from "../IOperations";

const createCourseSections: ILogic = {
    name: "createCourseSections",
    callback: async function (collection: { courseId: string, sections: Array<ICourseSection> }) {
        let course = await Course.findOne({ _id: collection.courseId });
        let courseSections:any=[];
        if (course) {
            let courseContent = new Set(course.content);
            courseSections = await CourseSection.insertMany(collection.sections);
            for (let sections of courseSections) {courseContent.add(sections._id)}
            course.content = Array.from(courseContent);
            course.save();
        }
        return courseSections;
    }
}

const findCourseSectionByID: ILogic = {
    name: "findCourseSectionByID",
    callback: async (courseSectionId: String) => await CourseSection.findOne({ _id: courseSectionId })
}
const getAllCourseSectionPerCourseId: ILogic = {
    name: "getAllCourseSectionPerCourseId",
    callback: async (courseId: string) => await CourseSection.find({ courseId: courseId })
}

const updateCourseSection: ILogic = {
    name: "updateCourseSection",
    callback: async function (collection: { filter: { _id: string }, update: ICourseSection }) {
        return await CourseSection.findOneAndUpdate({ _id: collection.filter._id }, collection.update);
    }
}

const deleteCourseSection: ILogic = {
    name: "deleteCourseSection",
    callback: async function (collection: { filter: { _id: string } }) {
        return await CourseSection.findByIdAndRemove(collection.filter._id);
    }
}


export default [createCourseSections, findCourseSectionByID, getAllCourseSectionPerCourseId, updateCourseSection, deleteCourseSection]