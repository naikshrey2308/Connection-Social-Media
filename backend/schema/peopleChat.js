const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const PeopleChat = mongoose.Schema({
    'name':{
        type:Types.String,
        required:true,
        unique:true
    },
    'people':{
        type : Types.Array, //[{uname,profilePic}]
    }
}) 

