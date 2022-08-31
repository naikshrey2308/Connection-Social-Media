const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    '_id': {
        index: true,
        unique: true
    },

    'name': {
        'first':{
            type: Types.String,
            required:true,
        },
        'last':{
            type: Types.String,
            required:true,
        }
    },

    'username': {
        type: Types.String,
        unique: true,
        required: true,
    },

    'mobileNumber': {
        type: Types.String,
        required:true,
        match: /^d{10}$/
    },

    'location': {
        'country': {
            type: Types.String,
            required:true,
        },
        'state': {
            type: Types.String,
            required:true,
        },
        'city': {
            type: Types.String,
            required:true,
        }
    },

    'dob': {
        type: Types.Date,
        required:true,
    },

    'password': {
        type: Types.String,
        required: true,
    },

    'email': {
        type: Types.String,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },

    'profilePic': {
        'imageType': {
            type: Types.String,
            match: /^d{3|4}$/,
        },
        'name': {
            type: Types.String,
        }
    },

    'bio': {
        type: Types.String,
        maxLength: 200,
    },

    'followers':{
        type: Types.Number,
        required:true
    },

    'following':{
        type: Types.Number,
        required:true
    }
});

const User = mongoose.model('User', userSchema);