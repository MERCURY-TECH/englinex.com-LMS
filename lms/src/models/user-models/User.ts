/**
* @description User model
* @version 1.0
* @since  Sunday, 16 07 2023, at 19:21: 52 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/



import mongoose from "mongoose";
import { encrytpUserPassword } from "../../logic";
import { AccountType } from "../../logic/lms-interfaces";

let userSchema = new mongoose.Schema({
    username: {
        required: [true, 'Provide user-name'],
        type: String,
    },
    accountType: {
        required: [true, 'Provide user-account type'],
        type: String,
        enum:[...Object.values(AccountType)],
        default:AccountType.student
    },
    firstname: {
        required: [true, 'Provide user firstname'],
        type: String,
    },
    lastname: {
        required: [true, 'Provide user lastname'],
        type: String,
    },
    email: {
        unique: [true, 'email already taken'],
        required: [true, 'Provide user email address'],
        type: String,
    },
    telephone: {
        required: [true, 'Provide user phone number'],
        type: String,
    },
    profilePicture: String,
    isActive: {
        type: Boolean,
        default: false,
        required: true
    },
    isSuspended: {
        type: Boolean,
        default: false,
        required: true
    },
    isRoot:{
        type: Boolean,
        default: false,
        required: true
    },
    password:{
        type:String,
        require:[true, 'please provide a password']
    },
    registeredCourses:[{type: mongoose.Schema.Types.ObjectId,ref: 'Course'}],
    currentSubcription: {type: mongoose.Schema.Types.ObjectId,ref: 'Subscription'}
})

userSchema.pre('validate', async function (next: any) {
    if (this.isSuspended) throw new Error(' user account is suspsenced');
    // @ts-ignore
    this.username = this.email.trim().toLowerCase();
    // @ts-ignore
    this.password = await encrytpUserPassword(this.password);
    next();
});

const User = mongoose.model('User', userSchema);
export default User;


