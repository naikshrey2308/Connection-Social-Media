const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const PeopleChat = mongoose.Schema({
    'id':{
        type:Types.ObjectId,
        required:true,
        unique:true
    },
    'people':{
        type : Types.Array, //[{personId}]
    }
}) 

