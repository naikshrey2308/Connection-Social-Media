const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({

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
        match: /^d{10}$/
    },

    'location': {
        'country': {
            type: Types.String,
        },
        'state': {
            type: Types.String,
        },
        'city': {
            type: Types.String,
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
        required: true,
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
        type: Types.Array,
        required: true,
        default: [],
    },

    'following':{
        type: Types.Array,
        required: true,
        default: 0,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;