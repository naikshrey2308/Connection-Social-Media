const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

let baseURL = require("../index");
baseURL = baseURL.baseURL;

// import schemas
const { Post, postTypes } = require("../schema/post");

// initialize multer
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/posts/')
    },
    filename: function (req, file, cb) {
      if(req.body.type != postTypes.PIC_POST)
        return;
      req.body.fileType = path.extname(file.originalname);
      req.body.url = `${req.body.username}_${Date.now()}_${req.body.fileType}`;
      cb(null, req.body.url);
    }
});

const upload = multer({storage: storage});

router.post("/create", upload.single("postPic"), async (req, res) => {
    console.log(req.body);

    let isPosted = false;

    // if the post is not a text post, check image status
    if(!fs.existsSync(`${baseURL}/images/posts/${req.body.url}`)) {
        isPosted = false;
        console.log(`/images/posts/${req.body.url}`);
        return res.json({ "isPosted": isPosted });
    }
        
    // create a new post
    let content = {
        text: req.body.text,
        url: req.body.url,
        caption: req.body.caption,
    };

    const post = new Post({
        'username': req.body.username,
        'type': req.body.type,
        'content': content,
    });

    // save the post meta-data to the database
    await post.save((err, data) => {
        if(err) {
            console.log(err);
            isPosted = false;
            res.json({ "isPosted": isPosted });
        } else {
            console.log(data);
            isPosted = true;
            res.json({ "isPosted": true });
            return;
        }
    });
});


/**
 * This function finds all the posts posted by the username supplied in the get request
 */
router.get("/:username", (req, res) => {
    
    Post.find({
        username: req.params.username,
    }).then((data) => {
        res.json(data);
    });

});

module.exports = router;