/**
* @description Course Operations
* @version 1.0
* @since  Monday, 17 07 2023, at 18:37: 36 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import RealTimeCommunicator from "../../api/socket/socket";
import { ICourse, ICourseContentlevel, ICourseMaterial, ICourseMaterialColor, ICourseSection, ITag } from "../../logic/lms-interfaces";
import Tag from "../../models/course-models/Tag";
import Course from "../../models/course-models/course";
import CourseMaterialColor from "../../models/course-models/course-content-colors";
import CourseContentlevel from "../../models/course-models/course-content-level";
import CourseSectionMaterial from "../../models/course-models/course-material";
import CourseSection from "../../models/course-models/course-section";
import { ILogic } from "../IOperations";
import mongoose from "mongoose";
import Repository from "../Repository";

const createCourse: ILogic = {
    name: "createCourse",
    callback: async function (collection: Array<ICourse>) {
        return await Course.insertMany(collection);
    }
}

const findCourseByID: ILogic = {
    name: "findCourseByID",
    callback: async (courseId: String) => await Course.findOne({ _id: courseId }) .populate(['tags', 'content'])
    .populate({
        path:'content',
        populate: { path: 'contentLevel' }
    })
    .populate({
        path:'content',
        populate: { path: 'material' }
    })
    .populate({
        path:'content',
        populate: { 
            path:'material',
            populate: 'displayBGColor' 
        }
    })
}
const getAllCourses: ILogic = {
    name: "getAllCourses",
    callback: async () => await Course.find()
    .populate(['tags', 'content'])
    .populate({
        path:'content',
        populate: { path: 'contentLevel' }
    })
    .populate({
        path:'content',
        populate: { path: 'material' }
    })
    .populate({
        path:'content',
        populate: { 
            path:'material',
            populate: 'displayBGColor' 
        }
    })
}


const updateCourse: ILogic = {
    name: "updateCourse",
    callback: async function (collection: { filter: { _id: string }, update: ICourse }) {
        return await Course.findOneAndUpdate({ _id: collection.filter._id }, collection.update);
    }
}

const deleteCourse: ILogic = {
    name: "deleteCourse",
    callback: async function (collection: { filter: { _id: string } }) {
        return await Course.findByIdAndDelete({ _id: collection.filter._id });
    }
}
const importCourse: ILogic = {
    name: "importCourse",
    callback: async function (collection: Array<ICourse>) {
        
        let importTagsSet: Set<any> = new Set();
        let existingTagMap: any = {};

        let importLevelsSet: Set<any> = new Set();
        let importLevelsMap: any = {};
        let existingLevelsMap: any = {};

        let importColorsSet: Set<any> = new Set();
        let importColorsMap: any = {};
        let existingColorsMap: any = {};

        for (let course of collection) {
            course.tags?.map((tag: any) => importTagsSet.add(tag));
            (course.content as ICourseSection[])?.map((section: any) => {
                (section.material as ICourseMaterial[]).map((material: any) => importColorsSet.add(JSON.stringify(material.displayBGColor)))
                return importLevelsSet.add(JSON.stringify(section.contentLevel))
            });
            course.tags?.map((tag: any) => importTagsSet.add(tag));

        }

        let importTagsList: any = Array.from(importTagsSet);
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

        // emit levels parsed
        (await Tag.find().where('title').in(Array.from(importTagsSet)))
            .map((existingTag: any) => { existingTagMap[existingTag.title as string] = existingTag._id })
        for (let tag of importTagsList) {
            if (existingTagMap[tag as string] === undefined) {
                let newTag = await new Tag({ title: tag }).save();
                existingTagMap[tag.toString()] = newTag._id;
            }
        }
        // emit tags  parsed
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

        async function creatSectionMaterialStructure() {
            for (let course of collection) {
                let associatedCourseTags:any = []
                for(let tag of course.tags as string[]){
                   associatedCourseTags.push(existingTagMap[tag])
                }
                course.tags =  associatedCourseTags;
                let sectionIDs: any = [];
                for(let section of course.content as ICourseSection[]){
                    if (section.contentLevel) {
                        if ((section.contentLevel as ICourseContentlevel).title) {
                            section.contentLevel = existingLevelsMap[(section.contentLevel as ICourseContentlevel).title];
                            section['createdBy'] = course.createdBy
                        }
                    }
                    for (let material of section.material as ICourseMaterial[]) 
                    { material.displayBGColor = existingColorsMap[(material.displayBGColor as ICourseMaterialColor).title as string] }
                    
                    section.material = [...(await CourseSectionMaterial.insertMany(section.material)).map((newMaterial: any) => (newMaterial._id).toString())];
                }
                (await CourseSection.insertMany(course.content)).map((section: any) => { sectionIDs.push(section._id) })
                course.content = sectionIDs;
            }
        }
        await creatSectionMaterialStructure()
        return (await Course.insertMany(collection));
    }
}

const importCourseWithTransaction: ILogic = {
    name: "importCourseWithTransaction",
    callback: async function (collection: Array<ICourse>) {
        const session = await mongoose.startSession();
        session.withTransaction( async () => {
            let importTagsSet: Set<any> = new Set();
            let existingTagMap: any = {};
    
            let importLevelsSet: Set<any> = new Set();
            let importLevelsMap: any = {};
            let existingLevelsMap: any = {};
    
            let importColorsSet: Set<any> = new Set();
            let importColorsMap: any = {};
            let existingColorsMap: any = {};
    
            for (let course of collection) {
                course.tags?.map((tag: any) => importTagsSet.add(tag));
                (course.content as ICourseSection[])?.map((section: any) => {
                    (section.material as ICourseMaterial[]).map((material: any) => importColorsSet.add(JSON.stringify(material.displayBGColor)))
                    return importLevelsSet.add(JSON.stringify(section.contentLevel))
                });
                course.tags?.map((tag: any) => importTagsSet.add(tag));
    
            }
    
            let importTagsList: any = Array.from(importTagsSet);
            Array.from(importLevelsSet).forEach((level: any) => {
                let levelParsed = JSON.parse(level);
                if (levelParsed) {
                    importLevelsMap[levelParsed.title] = levelParsed
                }
            });
    
            let levelsInDB: Array<any> = [...(await CourseContentlevel.find().session(session).where('title').in(Object.keys(importLevelsMap) as Array<any>))];
            levelsInDB.map((level: any) => { existingLevelsMap[level.title as string] = level._id });
    
            for (let level in importLevelsMap) {
                if (existingLevelsMap[level] === undefined) {
                    let newLevel = await new CourseContentlevel(importLevelsMap[level]).save({session});
                    existingLevelsMap[level.toString()] = newLevel._id;
                }
            }
    
            // emit levels parsed
            (await Tag.find().where('title').session(session).in(Array.from(importTagsSet)))
                .map((existingTag: any) => { existingTagMap[existingTag.title as string] = existingTag._id })
            for (let tag of importTagsList) {
                if (existingTagMap[tag as string] === undefined) {
                    let newTag = await new Tag({ title: tag }).save({session});
                    existingTagMap[tag.toString()] = newTag._id;
                }
            }
            // emit tags  parsed
            let importColorsList: any = Array.from(importColorsSet);
            importColorsList.forEach((color: any) => {
                let colorParsed = JSON.parse(color);
                if (colorParsed) {
                    importColorsMap[colorParsed.title] = colorParsed
                }
            });
    
            let colorsInDB: Array<any> = [...(await CourseMaterialColor.find().session(session).where('title').in(Object.keys(importColorsMap) as Array<any>))];
            colorsInDB.map((color: any) => { existingColorsMap[color.title as string] = color._id });
            for (let color in importColorsMap) {
                if (existingColorsMap[color] === undefined) {
                    let newColor = await new CourseMaterialColor(importColorsMap[color]).save({session});
                    existingColorsMap[color.toString()] = newColor._id;
                }
            }
    
            async function creatSectionMaterialStructure() {
                for (let course of collection) {
                    let associatedCourseTags:any = []
                    for(let tag of course.tags as string[]){
                       associatedCourseTags.push(existingTagMap[tag])
                    }
                    course.tags =  associatedCourseTags;
                    let sectionIDs: any = [];
                    for(let section of course.content as ICourseSection[]){
                        if (section.contentLevel) {
                            if ((section.contentLevel as ICourseContentlevel).title) {
                                section.contentLevel = existingLevelsMap[(section.contentLevel as ICourseContentlevel).title];
                                section['createdBy'] = course.createdBy
                            }
                        }
                        for (let material of section.material as ICourseMaterial[]) 
                        { material.displayBGColor = existingColorsMap[(material.displayBGColor as ICourseMaterialColor).title as string] }
                        
                        section.material = [...(await CourseSectionMaterial.insertMany(section.material,{session})).map((newMaterial: any) => (newMaterial._id).toString())];
                    }
                    (await CourseSection.insertMany(course.content, {session})).map((section: any) => { sectionIDs.push(section._id) })
                    course.content = sectionIDs;
                }
            }
            await creatSectionMaterialStructure()
            let createdCourses = (await Course.insertMany(collection, {session}))
            session.commitTransaction();
            session.endSession()
            return createdCourses;
          });
        
    }
}

// function mapAncestorsToChildren(section:ICourseSection){
//     let ancestorsToChildrenMap:any = []
//     if(!section.parent){
//         ancestorsToChildrenMap.push(section);
//     }
// }

// function getAncestors(section:ICourseSection){
//     let ancestors:any = {}
//     if(!section.parent){ ancestors[section.uuid as string] = {section} }
//    return ancestors;
// }


export default [createCourse, findCourseByID,importCourseWithTransaction, getAllCourses, updateCourse, deleteCourse, importCourse]