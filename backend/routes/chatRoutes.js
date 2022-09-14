const express = require("express");
// const User = require("../schema/user");
const Chat = require("../schema/chat");
const People = require("../schema/peopleChat");
const router = express.Router();

router.post("/getAllChat", (req, res) => {
    var uname_= req.username;
    var chat=[];
    var people = [];
    People.find({ name: uname_} , { people:true }).then(
        (data) => {
            for(i in data){
                people.push(i);
            }
        }
    );
    for(i in people){
        Chat.find({ uname : { uname1 : uname_ , uname2 : i.uname } }  , { chats : true }).then(
            (data)=>{
                if(data===null){
                    Chat.find({ uname : { uname1 : i.uname , uname2 : uname_ } }   , { chats : true }).then(
                        (data)=> {
                            for(j in data){
                                chat.push({
                                    name : i.uname,
                                    profilePic : i.profilePic,
                                    chats : j
                                })
                            }
                        }
                    )
                }
            }
        )
    }
    res.json({ 'chat' : chat });
});

module.exports = router;