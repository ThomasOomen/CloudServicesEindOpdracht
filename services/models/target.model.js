const mongoose = require('mongoose');

const targetSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    picture: {
        required: true,
        type: String,
    },
    hints:[{
        required: false,
        type: String,
    }],
    score:[{
        type: Object,
        required: false,
    }],
    created_at: {
        default: Date.now(),
        type: Date,
    }
});

const target = mongoose.model('target', targetSchema);
module.exports = target;
module.exports.get = (callback, limit) => {
    target.find(callback).limit(limit);
};
