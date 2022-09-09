const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const ChatSchema = mongoose.Schema({
    'id':{
        unique:true,
        'id1':{
            type:Types.ObjectId,
            required:true
        },
        'id2':{
            type:Types.ObjectId,
            required:true
        }
    },
    'chats':{
        type : Types.Array, //of object {time,content,flag}
    }
}) 

// another collection for storing with whom the user had chat before
// diff contacts => sent,recieved 
// for the opposite user it will be recieved and sent
// shrey --- shruti
// sender --- reciever
// [
// {
//     time:
//     content:
//     flag: 1 (SEND) 0
// }
// ]
