const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    fullname:{
        type : String,
        required:true,
        minlength:5,
        maxlenght:20,
        unique:true
    },
    username:{
        type : String,
        required:true,
        minlength:5,
        maxlenght:50,
        unique:true

    },
    password:{
        type : String,
        required:true,
        minlength:6
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
},
    { timestamps:true}
);
module.exports = mongoose.model("User",UserSchema)