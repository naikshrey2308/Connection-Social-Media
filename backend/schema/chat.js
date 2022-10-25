const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const ChatSchema = mongoose.Schema({
    'username':{
        'uname1':{
            type:Types.String,
            required:true
        },
        'uname2':{
            type:Types.String,
            required:true
        }
    },
    'chats':{
        type : Types.Array, //of object {time,content,flag}
    }
}) 

module.exports = mongoose.model('chat',ChatSchema);
// another collection for storing with whom the user had chat before
// diff contacts => sent,recieved 
// for the opposite user it will be recieved and sent
// shrey --- shruti
// sender --- reciever
// [
// 
//     time:
//     content:
//     flag: 1 (SEND) 0
// }
// ]
