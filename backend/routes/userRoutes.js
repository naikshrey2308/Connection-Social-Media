const express = require("express");
const User = require("../schema/user");
const router = express.Router();
// const browserHistory=require('react-router').browserHistory;

let baseURL = require("../index");
baseURL = baseURL.baseURL; 

//image upload
const path = require("path");
const fs = require("fs");

const multer = require('multer');
const { response } = require("express");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/profilePics/')
    },
    filename: function (req, file, cb) {
      req.body.fileType = path.extname(file.originalname);
      cb(null, req.body.username + req.body.fileType) //Appending extension
    }
});

const upload = multer({storage: storage});

//session 



/**
 * This function would log the user into the website.
 * Authentication function
 */
router.post("/login", (req, res) => {
    // find a user from the database
    // console.log(req);
    let email='';
    User.findOne({
        username: req.body.username,
    }).then(data => {
        isLoggedIn = false;
        // console.log(data);
        // if either username is incorrect
        if(data == {} || data == null) {
            data = "User not found! Create an account if you don't have one.";
            isLoggedIn = false;
        }
        // or the passwords don't match
        else if(data.password != req.body.password) {
            data = "Invalid username or password supplied.";
            isLoggedIn = false;
        }
        // user authenticated
        else {
            data = "Logged in successfully!";
            isLoggedIn = true;
            email= data.email;
            // create session for the current user
            // req.session.username=req.body.username;
            // console.log(req.session);
            // ...

        }

        // send the response back to the user
        res.json({"data": data, "isLoggedIn": isLoggedIn,"username":req.body.username,"profilePic":req.body.profilePic,"name":req.body.name,"email":email});
        
    }).catch(err => {
        res.json({"err": err});
        console.log(err);
    });
});

router.post("/register", (req, res) => {
    var error = {};
    var isRegistered = false;

    // console.log(req.body);

    User.find({
        $or: [{ username: req.body.username }, { email: req.body.email }]
            }).then((data) => {
                if(data.length){
                    var matched_data = "email";
                    if(data.username == req.body.username){
                        matched_data = "username";
                    }
                    error.error = matched_data + " already exists!";
                    res.json({ "data" : error, "isRegistered" : false, "username":req.body.username });
                } 
                else {
                    var location = {
                        country:req.body.country,
                        state:req.body.state,
                        city:req.body.city
                    }

            var user = new User({
                'name': req.body.name,
                'username': req.body.username,
                'mobileNumber': req.body.mobileNumber,
                'location': location,
                'dob': req.body.dob,
                'password': req.body.password,
                'email': req.body.email,
                'bio': req.body.bio,
            });

            user.save((err, resp) => {
                if(err) {
                    console.log(err);
                    isRegistered = false;
                    res.json({ "isRegistered": false });
                } else {
                    // console.log(resp);
                    isRegistered = true;
                    res.json({ "isRegistered": true ,"username":req.body.username,"profilePic":req.body.profilePic,"name":req.body.name});
                }
            });
        }
    });
});

router.post("/register/profilePic", upload.single("profilePic"), (req, res) => {
    if(fs.existsSync(`${baseURL}/images/profilePics/${req.body.username}${req.body.fileType}`)) {
        User.findOne({
            username: req.body.username,
        }).then((data) => {
            if(data == {})
                res.json({ isUploaded: false });
            else {
                let user = new User(data);
                
                user.profilePic = { "name": req.body.username + req.body.fileType };

                console.log(user);

                user.save((err, msg) => {
                    if(err) {
                        console.log(err);
                        res.json({ isUploaded: false });
                    } else {
                        console.log(msg);
                    }
                });
            }
        });

        res.json({ isUploaded: true });
    }
    else
        res.json({ isUploaded: false });
});


/**
 * This request is for getting the current logged in user
 */
router.get("/current", (req, res) => {
    console.log("current user...");
});

/**
 * This request is for getting any other user
 */
router.get("getUser/:username", (req, res) => {
    
    let isFound = false;
    
    User.findOne({
        "username": req.params.username
    },{ password: false }).then((data) => {
        // if the user is not found
        if(data == null || data == {}) {
            isFound = false;
            res.json({ "isFound": isFound });
        } 
        // else if the user is found, send the details
        else {
            isFound = true;
            res.json({ isFound: isFound, user: data });
        }
    });

});

router.post('/follow',(req,res)=>{
    const email_ = req.body.email;
    User.find({email:email_}).then(
        (data)=>{
            // var follower = data.followers.push(window.sessionStorage.getItem("email"));
            // User.updateOne({email:email_},{$set:{followers:follower}});
        }
    );
    User.find({email:window.sessionStorage.getItem("email")}).then(
        (data)=>{
            var followings = data.following.push(email_);
            User.updateOne({email:window.sessionStorage.getItem("email")},{$set:{following:followings}});
        }
    );
});

router.get('/getRandomPeople', (req, res) => {
    console.log("in server");
    let array=[];
    User.find({}).limit(5).then((data)=>{
        // for(var i in data){
        //     array.push({
        //         name : i.name,
        //         profilePic : (i.profilePic) ? i.profilePic.name : null,
        //         email : i.email,
        //         subtitle : i.bio

        //     })
        // }
        res.json({"people": data});
    });
});

module.exports = router;