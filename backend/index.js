const express = require("express");
const mongoose = require("mongoose");
// const morgan =  require("morgan");
const app = express();
const cors = require("cors");


const http = require('http').Server(express);

// create new socket.io instance linked with http server
const io = require('socket.io')(http);  

//handle the event like connection, disconnection
io.on('connection',function(socket){
    console.log("User connected");
    socket.on('disconnect',function(){
        console.log("user disconnected");
    })
})
http.listen(5000);

/**
 * Defines the configuration for the current node.js server
 * connection urls, passwords and other environment variables to be kept here
 * require('config') loads the default.json file in the config folder by default as an object
 */

const config = require('config');
const dbConfig = config.get('App.dbConfig.dbName');

// using middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//connect mongodb with node 
//create connection
mongoose.connect(dbConfig).then(
    () => {
        console.log('Congo!! Database Connected Successfully');
    }).catch(
        (err)=>{
            console.log('Not Connected '+err);
        }
    );

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