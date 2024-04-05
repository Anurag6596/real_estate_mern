import mongoose from "mongoose";

// creating user schema

const userSchema = new  mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    avatar:{
        type:String,
        default:  'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg',
    },
    password:{
        type: String,
        required: true,
    },
}, {timestamps: true}); 

// creating model


const User  = mongoose.model("User",userSchema);

export  default User;
