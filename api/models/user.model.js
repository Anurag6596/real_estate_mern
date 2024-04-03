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
    password:{
        type: String,
        required: true,
    },
}, {timestamps: true}); 

// creating model


const user  = mongoose.model("User",userSchema);

export  default User;
