const express = require("express");
const router = express.Router();

// import schemas
const { Post, postTypes } = require("../schema/post");

// initialize multer
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/posts/')
    },
    filename: function (req, file, cb) {
      if(req.body.postPic == null)
        return;
      req.body.fileType = path.extname(file.originalname);
      req.body.content.url = `${req.body.username}_${Date.now()}_${req.body.fileType}`;
      cb(null, req.body.content.url);
    }
});

const upload = multer({storage: storage});

router.post("/create", upload.single("postPic"), async (req, res) => {
    let isPosted = false;

    // if the post is not a text post, check image status
    if(req.body.type == postTypes.PIC_POST && !fs.existsSync(`/images/posts/${req.body.content.url}`)) {
        isPosted = false;
        return res.json({ "isPosted": isPosted });
    }
        
    // create a new post
    const post = new Post({
        user_id: req.body.user_id,
        type: req.body.type,
        content: req.body.content,
    });
    // save the post meta-data to the database
    await post.save((err, data) => {
        if(err) {
            console.log(err);
            isPosted = false;
        } else {
            isPosted = true;
        }
    });

    res.json({ "isPosted": isPosted });
});