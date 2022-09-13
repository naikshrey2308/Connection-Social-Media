const express = require("express");
const User = require("../schema/user");
const router = express.Router();
// const browserHistory=require('react-router').browserHistory;



//image upload
const path = require("path");
const fs = require("fs");

const multer = require('multer');

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
    User.findOne({
        username: req.body.username,
    }).then(data => {
        isLoggedIn = false;
        console.log(data);
        // if either username is incorrect
        if(data == {}) {
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
            req.session.username=req.body.username;
            console.log(req.session);
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
    var error = {};
    var isRegistered = false;

    console.log(req.body);

    User.find({
        $or: [{ username: req.body.username }, { email: req.body.email }]
            }).then((data) => {
                if(data.length){
                    var matched_data = "email";
                    if(data.username == req.body.username){
                        matched_data = "username";
                    }
                    error.error = matched_data + " already exists!";
                    res.json({ "data" : error, "isRegistered" : false });
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
                'bio': req.body.bio
            });

            user.save((err, resp) => {
                if(err) {
                    console.log(err);
                    isRegistered = false;
                    res.json({ "isRegistered": false });
                } else {
                    console.log(resp);
                    isRegistered = true;
                    res.json({ "isRegistered": true });
                }
            });
        }
    });
});

router.post("/register/profilePic", upload.single("profilePic"), (req, res) => {
    if(fs.existsSync(`/images/profilePics/${req.body.username}.${req.body.fileType}`))
        res.json({ isUploaded: true });
    else
        res.json({ isUploaded: false });
});


/**
 * This request is for getting the current logged in user
 */
router.get("/current", (req, res) => {

});

/**
 * This request is for getting any other user
 */
router.get("/:id", (req, res) => {
    
    let isFound = false;
    
    User.findOne({
        "_id": req.params.id
    }).then((data) => {
        // if the user is not found
        if(data == null || data == {}) {
            isFound = false;
            res.json({ "isFound": isFound });
        } 
        // else if the user is found, send the details
        else {
            isFound = true;
            res.json({ "isFound": isFound, "user": data });
        }
    });

});

module.exports = router;