import mongoose from "mongoose";
import { routeSecurityLevel } from "../../logic/lms-interfaces";
import Role from "./Role";


const PermissionStructureSchema = new mongoose.Schema({
    version: { type: String, required: [true, 'Provide service version name'] },
    actions: [{
        name: { type: String, required: true },
        scope: { type: String, enum: Object.values(routeSecurityLevel), required: true },
    }]
})
PermissionStructureSchema.pre('save', async function (next:any) {
    
    let actions = this.actions.map(actionItem=>actionItem.name);
    await Role.updateOne({Sid:'root'},{ $set: { Sid:'root', actions } },
    { upsert: true });
})
const PermissionStructure = mongoose.model('PermissionStructure',PermissionStructureSchema );


export default PermissionStructure;