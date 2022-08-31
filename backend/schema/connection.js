const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const connectionSchema = mongoose.Schema({
    'id':{
        required:true,
        unique:true,
        type:Types.ObjectId
    },
    'connection':{
        type:Types.Array, // array of object => {id:"",following:"",follower:"",type_of_connection:""}
    }
})

const Connection = mongoose.model('Connections', connectionSchema);