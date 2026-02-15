const mongoose = require('mongoose');

const Booking = mongoose.model(
    'booking',
    new mongoose.Schema({
        userEmail:{
            type: String,
        },
        flightNumber:{
            type: String,
        }
        
    })
)

module.exports = Booking;