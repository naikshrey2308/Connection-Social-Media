const express = require("express");
const User = require("../schema/user");
const router = express.Router();


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
        }

        // send the response back to the user
        res.json({"data": data, "isLoggedIn": isLoggedIn});
    }).catch(err => {
        res.json({"err": err});
        console.log(err);
    });
});


module.exports = router;