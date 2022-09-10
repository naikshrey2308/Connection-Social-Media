const express = require("express");
const User = require("../schema/user");
const router = express.Router();
const multer =require("multer");
const upload = multer({ dest: './images/profilePics' });

/**
 * This function would log the user into the website.
 * Authentication function
 */
router.post("/login", (req, res) => {
    // find a user from the database
    User.findOne({
        username: req.body.username,
    }).then(data => {
        isLoggedIn = false;
        
        // if either username is incorrect
        if(data == null) {
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
        $or: [{ username: req.body.username }, { email: req.body.email }]
    }).then((data)=>{
        console.log(data.length);
        if(data.length){
            var matched_data="email";
            if(data.username==req.body.username){
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
                country:req.body.country,
                state:req.body.state,
                city:req.body.city
            }

            if(req.body.profilePic.name!=null){
                upload.single(req.body.username);
            }
            // User.insert({
            //     'name':req.body.name,
            //     'username':req.body.username,
            //     'mobileNumber':req.body.mobileNumber,
            //     'location':location,
            //     'dob':req.body.dob,
            //     'password':req.body.password,
            //     'email':req.body.email,
            //     'bio':req.body.bio
            // })

            res.json(req.body);
        }
    })
});

module.exports = router;