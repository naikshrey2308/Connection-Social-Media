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

router.get("/insertChat", (req, res) => {

    // make object passed according to this{body:{sender: , reciever: , chat: { text: ,time: ,flag:}}}

    let sender = req.body.sender;
    let reciever = req.body.reciever;
    Chat.find( { $or: [ { uname : { uname1 : reciever , uname2 : sender } }  , { uname : { uname1 : sender , uname2 : reciever } } ] }).then(
        (data)=>{
            if(data=={}){
                let chatObj = new Chat({
                    username:{
                        uname1 : sender,
                        uname2 : reciever
                    },
                    chats:[]
                });
                chatObj.chats.push({
                    text : req.body.chat.text ,
                    time : req.body.chat.time,
                    flag : 1
                })
                chatObj.save();
            }
            else{
                let flag = 0;
                if(data.username.uname1 === sender){
                    flag = 1;
                }
                // insert the obj accordingly
            }
        }
    )
});

module.exports = router;