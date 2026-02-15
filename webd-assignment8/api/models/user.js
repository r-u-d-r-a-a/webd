const mongoose = require('mongoose');

module.exports = mongoose.model('info', {
    firstName : {type: String, default: ''},
    lastName : {type: String, default: ''},
    email : {type: String, default: ''},
    password : {type: String, default: ''},
    path: {type: String}
});