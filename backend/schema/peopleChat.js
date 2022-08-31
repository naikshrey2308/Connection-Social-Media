const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const PeopleChat = mongoose.Schema({
    'id':{
        type:Types.ObjectId,
        rerquired:true,
        unique:true
    },
    'people':{
        type : Types.Array, //[{personId,id_}]
    }
}) 

