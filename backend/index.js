const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Routes Index
const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);

app.get("/", (req, res) => {
    // CORS policy would block the request if this is not specified
    res.header("Access-Control-Allow-Origin", "*");
    res.json({msg: "hello"});
});

app.listen(4000, () => {
    console.info("Node server started!");
});