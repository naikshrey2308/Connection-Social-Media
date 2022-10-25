const express = require("express");
// const User = require("../schema/user");
const Chat = require("../schema/chat");
const { USER1RECEIVER, USER1SENDER } = require("../schema/flags");
const Indicator = require("../schema/flags");
const People = require("../schema/peopleChat");
const User = require("../schema/user");
const router = express.Router();


router.post('/getPeopleForChat',(req,res)=>{
    var email_ = req.body.emailSession;
    var arrayPeople = [];
    // console.log("inside chat");

    People.findOne({email:email_}).then(
        (data)=>{
            if(data != null){
                // console.log("inside chat");
                arrayPeople = data.people;
                // console.log(arrayPeople);
                res.json({'people' : arrayPeople});
            }
        }
    );
    
    
})

router.post("/getAllChat", async (req, res) => {
    var uname_= req.body.username;
    var email_ = req.body.email;
    var chat=[];
    var people = [];
    await People.findOne({ email : email_}).then(
        (data) => {
            for(i of data.people){
                people.push(i);
            }
        }
    );
    for(i of people){
        await Chat.findOne({ uname : { uname1 : uname_ , uname2 : i.username } }).then(
            (data)=>{
                if(data===null){
                    Chat.find({ uname : { uname1 : i.username , uname2 : uname_ } } ).then(
                        (data)=> {
                            chat.push({
                                username : i.username,
                                profilePic : i.profilePic,
                                name : i.name,
                                chats : data.chats
                            })
                        }
                    )
                }
                else{
                    chat.push({
                        username : i.username,
                        profilePic : i.profilePic,
                        name : i.name,
                        chats : data.chats
                    })
                }
            }
        )
    }
    res.json({ 'chat' : chat });
});

router.post("/getChat",async (req,res)=>{
    var uname1_= req.body.username1;
    var uname2_= req.body.username2;
    // console.log(uname2_);
    // console.log(uname1_);
    
    // var email_ = req.body.email;
    var chat=[];
    var indicator;
    await Chat.findOne({ username : { uname1 : uname1_ , uname2 : uname2_ } }).then(
        (data)=>{
            if(data===null){
                Chat.findOne({ username : { uname1 : uname2_ , uname2 : uname1_ } } ).then(
                    (data_)=> {
                        if(data_==null){
                            chat = [];
                        }
                        else{
                            console.log(data_);
                            chat = data_.chats;
                            indicator = Indicator[1];
                            res.json({ 'chat' : chat ,'indicator':indicator});
                        }
                    }
                    )
                }
                else{
                    // console.log("inside else"+data);
                    
                    chat = data.chats;

                    // if(data.username)
                    indicator = Indicator[0];
                    // console.log(chat);
                res.json({ 'chat' : chat ,'indicator':indicator});
            }
        }
    )
    
})

router.post("/insertChat", (req, res) => {

    // make object passed according to this{body:{sender: , reciever: , chat: { text: ,time: ,flag:}}}

    let sender = req.body.chat.sender;
    let reciever = req.body.chat.reciever;
    Chat.findOne( { $or: [ { username : { uname1 : reciever , uname2 : sender } }  , { username : { uname1 : sender , uname2 : reciever } } ] }).then(
        (data)=>{
            // console.log(data);
            if(data===null){
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
                    flag : Indicator[0].sent
                });
                chatObj.save().then();
            }
            else{
                let flag = Indicator[1].sent;
                if(data.username.uname1 === sender){
                    flag = Indicator[0].sent;
                }
                let obj = new Chat(data);
                obj.chats.push({
                    text : req.body.chat.text ,
                    time : req.body.chat.time,
                    flag : flag
                });
                obj.save().then();
            }
        }
    )

    People.findOne({email:req.body.email_}).then(
        (data)=>{
            console.log("Inside people find");
            
            console.log(data);
            if(data===null){
                let obj = new People({
                    email : req.body.email_,
                    people : [req.body.user]
                });
                obj.save().then();
            }
            else{
                // console.log(data.people.findIndex(val => val==req.body.user));
                if(data.people.findIndex(val => val.username===req.body.user.username)!==-1){

                }
                else{
                    data.people.push(req.body.user);
                    console.log(data.people);
                    
                    let obj = new People(data);
                    obj.save().then();
                }
            }
        }
    )

    User.findOne({username:reciever}).then(
        (data)=>{
            const email_ = data.email;
            People.findOne({email:email_}).then(
                (data_)=>{
                    if(data_===null){
                        let obj = new People({
                            email : email_,
                            people : [{
                                name : req.body.name,
                                username : req.body.username,
                                profilePic : req.body.profilePic
                            }]
                        });
                        obj.save().then();
                    }
                    else{
                        if(data_.people.findIndex(val => val==req.body.user)!==-1){

                        }
                        else{
                        data_.people.push({
                            name : req.body.name,
                            username : req.body.username,
                            profilePic : req.body.profilePic ? req.body.profilePic : 'default.png'
                        });
                        data_.save().then();
                    }
                    }
                }
            )
        }
    )
});

module.exports = router;