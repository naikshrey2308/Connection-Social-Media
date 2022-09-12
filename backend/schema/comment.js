const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const commentSchema = mongoose.Schema({
    'user_id': {
        type: Types.ObjectId,
        required: true,
    },

    'timestamp': {
        type: Types.Date,
    },

    'content': {
        type: Types.String,
    }
});