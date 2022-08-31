const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
    res.json({msg: `Logged in! username: ${req.body.username} & password: ${req.body.password}`});
});

module.exports = router;