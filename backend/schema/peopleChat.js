const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const PeopleChat = mongoose.Schema({
    'email':{
        type:Types.String,
        required:true,
        unique:true
    },
    'people':{
        type : Types.Array, //[{username,name,profilePic}]
    }
}) 

module.exports = mongoose.model('peopleChat',PeopleChat);