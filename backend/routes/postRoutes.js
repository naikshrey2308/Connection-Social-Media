const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

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

router.post("/create", upload.single("postPic"), (req, res) => {
    console.log(req.body);

    let isPosted = false;

    // if the post is not a text post, check image status
    if(!fs.existsSync(`/images/posts/${req.body.url}`)) {
        isPosted = false;
        console.log("hii");
        return res.json({ "isPosted": isPosted });
    }
        
    // create a new post
    let content = {
        text: req.body.text,
        url: req.body.url,
        caption: req.body.caption,
    };

    const post = new Post({
        'user_id': req.body.user_id,
        'type': req.body.type,
        'content': content,
    });

    console.log(post);

    // save the post meta-data to the database
    post.save((err, data) => {
        if(err) {
            console.log(err);
            isPosted = false;
        } else {
            console.log(data);
            isPosted = true;
        }
    });

    res.json({ "isPosted": isPosted });
});

module.exports = router;