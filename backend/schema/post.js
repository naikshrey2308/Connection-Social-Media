const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const postTypes = {
    TEXT_POST: "text",
    PIC_POST: "pic"
}

const postSchema = mongoose.Schema({
    'user_id': {
        type: Types.Decimal128,
        required: true,
    },

    'likes': {
        type: Types.Array,
        default: [],
    },

    'comments': {
        type: Types.Array,
        default: [],
    },

    'type': {
        type: Types.String,
        required: true,
    },

    'content': {
        'caption': {
            type: Types.String,
        },
        'text': {
            type: Types.String,
        },
        'url': {
            type: Types.String,
        }
    },

}, 
{
    timestamps: true,
}
);

const Post = new mongoose.model('Post', postSchema);

module.exports = { "Post": Post, "postTypes": postTypes };