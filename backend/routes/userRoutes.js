const express = require("express");
const router = express.Router();

router.get("/view/:id", (req, res) => {
    res.json({id: req.params.id, msg: "Shruti"});
});

module.exports = router;