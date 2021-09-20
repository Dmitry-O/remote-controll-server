const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const controllerSchema = new Schema({
    serial: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    relays: [{
        type: Boolean,
        default: false
    }]
},
    {timestamps: true});

const Controllers = mongoose.model('Controller', controllerSchema);
module.exports = Controllers;