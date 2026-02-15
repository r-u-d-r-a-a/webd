const mongoose = require('mongoose');

const Flights = mongoose.model(
    'flights',
    new mongoose.Schema({
        airline:{
            type: String,
        },
        arrival:{
            type: String
        },
        departure: {
            type: String
        },
        duration: {
            type: String
        },
        departureDate: {
            type: Date
        },
        arrivalDate: {
            type: Date
        },
        price: {
            type: Number
        },
        layover: {
            type: Number
        },
        type: {
            type: String
        },
        providerName: {
            type: String
        },
        flightNumber: {
            type: Number
        }
    })
)

module.exports = Flights;