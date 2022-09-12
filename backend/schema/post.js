const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
    'user_id': {
        type: Types.ObjectId,
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

    'contents': {
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

const Post = new mongoose.Model('Post', postSchema);

module.exports = Post;