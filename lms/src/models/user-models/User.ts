/**
 * @author Mercury-Tech
 * @since v1.0.0 | 16 may 2023
 * @description Baro-vote user model
 */
import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    username: {
        required: [true, 'Provide user-name'],
        type: String,
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
    // electionStatus:[{
    //     candidateForPosition:{type:String, required:[true,'please provide an election status position'], default:'none'},
    //     session:String
    // }],
   votingsSessionsRegisteredFor: [String],
    biometry: String,
    profilePicture: String,
    voteCount: { required: true, type: Number, default: 0 },
    manifeste: String,
    description: String,
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
})

userSchema.pre('validate', async function (next: any) {
    if (this.isSuspended) throw new Error(' user account is suspsenced');
    // @ts-ignore
    this.username = this.email.trim().toLowerCase();
    next();
});

const User = mongoose.model('User', userSchema);
export default User;


