const express = require("express");
const fs = require("fs");
const User = require("../schema/user");
const router = express.Router();
// const multer =require("multer");
// const upload = multer({ dest: './images/profilePics' });

/**
 * This function would log the user into the website.
 * Authentication function
 */
router.post("/login", (req, res) => {
    // find a user from the database
    User.findOne({
        username: req.username,
    }).then(data => {
        isLoggedIn = false;
        
        // if either username is incorrect
        if(data == null) {
            data = "User not found! Create an account if you don't have one.";
            isLoggedIn = false;
        }
        // or the passwords don't match
        else if(data.password != req.password) {
            data = "Invalid username or password supplied.";
            isLoggedIn = false;
        }
        // user authenticated
        else {
            data = "Logged in successfully!";
            isLoggedIn = true;

            // create session for the current user
            // ...

        }

        // send the response back to the user
        res.json({"data": data, "isLoggedIn": isLoggedIn});
    }).catch(err => {
        res.json({"err": err});
        console.log(err);
    });
});

router.post("/register", (req, res) => {
    var error={};
    var isRegistered=false;

    console.log(req.body);
    User.find({
        $or: [{ username: req.username }, { email: req.email }]
    }).then((data)=>{
        console.log(data.length);
        if(data.length){
            var matched_data="email";
            if(data.username==req.username){
                matched_data="username";
            }
            error.error=matched_data+" is already exist";
            res.json(
                {
                    "data":error,
                    "isRegistered":isRegistered
                });
        }
        else{
            var location={
                country:req.country,
                state:req.state,
                city:req.city
            }

            if(req.profilePic){
                console.log(req.profilePic);
                fs.createWriteStream(`../backend/images/profilePics/${req.username}.png`).write(req.profilePic);
            }
            // User.insert({
            //     'name':req.name,
            //     'username':req.username,
            //     'mobileNumber':req.mobileNumber,
            //     'location':location,
            //     'dob':req.dob,
            //     'password':req.password,
            //     'email':req.email,
            //     'bio':req.bio
            // })

            res.json(req);
        }
    })
});

module.exports = router;