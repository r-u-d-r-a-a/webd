const mongoose = require('mongoose');

module.exports = mongoose.model('userInfo', new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String
    }
}))

