/**
* @description Permission model
* @version 1.0
* @since 2023, 06, Saturday, 03,17, 50, 28 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";
const UserPermissionSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required:[true,'please provide User ID'] },
  Role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required:[true,'please provide User ID']
  }
});

const UserPermission = mongoose.model('UserPermission', UserPermissionSchema);




export default UserPermission;