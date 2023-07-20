/**
* @description Course section database operations
* @version 1.0
* @since  Monday, 17 07 2023, at 10:20: 13 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { ICourse, ICourseContentlevel, ICourseMaterial, ICourseMaterialColor, ICourseSection } from "../../logic/lms-interfaces";
import Tag from "../../models/course-models/Tag";
import Course from "../../models/course-models/course";
import CourseMaterialColor from "../../models/course-models/course-content-colors";
import CourseContentlevel from "../../models/course-models/course-content-level";
import CourseSectionMaterial from "../../models/course-models/course-material";
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

const importCourseSection: ILogic = {
    name: "importCourseSection",
    callback: async function (collection: Array<ICourseSection>, courseId:any) {
            let importLevelsSet: Set<any> = new Set();
        let importLevelsMap: any = {};
        let existingLevelsMap: any = {};

        let importColorsSet: Set<any> = new Set();
        let importColorsMap: any = {};
        let existingColorsMap: any = {};

        (collection)?.map((section: any) => {
            (section.material as ICourseMaterial[]).map((material: any) => importColorsSet.add(JSON.stringify(material.displayBGColor)))
            return importLevelsSet.add(JSON.stringify(section.contentLevel))
        });

        Array.from(importLevelsSet).forEach((level: any) => {
            let levelParsed = JSON.parse(level);
            if (levelParsed) {
                importLevelsMap[levelParsed.title] = levelParsed
            }
        });

        let levelsInDB: Array<any> = [...(await CourseContentlevel.find().where('title').in(Object.keys(importLevelsMap) as Array<any>))];
        levelsInDB.map((level: any) => { existingLevelsMap[level.title as string] = level._id });

        for (let level in importLevelsMap) {
            if (existingLevelsMap[level] === undefined) {
                let newLevel = await new CourseContentlevel(importLevelsMap[level]).save();
                existingLevelsMap[level.toString()] = newLevel._id;
            }
        }

        let importColorsList: any = Array.from(importColorsSet);
        importColorsList.forEach((color: any) => {
            let colorParsed = JSON.parse(color);
            if (colorParsed) {
                importColorsMap[colorParsed.title] = colorParsed
            }
        });

        let colorsInDB: Array<any> = [...(await CourseMaterialColor.find().where('title').in(Object.keys(importColorsMap) as Array<any>))];
        colorsInDB.map((color: any) => { existingColorsMap[color.title as string] = color._id });
        for (let color in importColorsMap) {
            if (existingColorsMap[color] === undefined) {
                let newColor = await new CourseMaterialColor(importColorsMap[color]).save();
                existingColorsMap[color.toString()] = newColor._id;
            }
        }

        let sectionIDs: any = [];
        async function creatSectionMaterialStructure() {
            for(let section of collection as ICourseSection[]){
                if (section.contentLevel) {
                    if ((section.contentLevel as ICourseContentlevel).title) {
                        section.contentLevel = existingLevelsMap[(section.contentLevel as ICourseContentlevel).title];
                        section['createdBy'] = section.createdBy
                    }
                }
                for (let material of section.material as ICourseMaterial[]) 
                { material.displayBGColor = existingColorsMap[(material.displayBGColor as ICourseMaterialColor).title as string] }
                
                section.material = [...(await CourseSectionMaterial.insertMany(section.material)).map((newMaterial: any) => (newMaterial._id).toString())];
            }
            sectionIDs =[];
            (await CourseSection.insertMany(collection)).map((section: any) => { sectionIDs.push(section._id) })
            return sectionIDs;
        }
        await creatSectionMaterialStructure();
        let course = await Course.findOne({_id:courseId});
        
        if(course){
            course.content = [...course?.content,...sectionIDs ];
            ;
            return (await course.save());
        }
        return []
    }
}


export default [createCourseSections, findCourseSectionByID, getAllCourseSectionPerCourseId, updateCourseSection, deleteCourseSection, importCourseSection]