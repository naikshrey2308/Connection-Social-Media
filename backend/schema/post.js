const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const Post = mongoose.Schema({
    'id':{
        type:Types.ObjectId,
        required:true,
        unique:true
    },
    'userID':{
        type:Types.ObjectId,
        required:true,
    }
})