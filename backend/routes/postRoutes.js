const express = require("express");
const router = express.Router();

// import schemas
const Post = require("../schema/post");

// initialize multer
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

router.post("/create", upload.single("post"), (req, res) => {
    const 
});