const mongoose = require('mongoose');



const flight = mongoose.model('Flights', new mongoose.Schema({
    airlineName: String,
    departureDate: String,
    departureTime: String,
    arrivalDate: String,
    arrivalTime: String,
    travelTime: String,
    departureAirport: String,
    arrivalAirport: String,
    image: String, 
    layover: String,
    price: Number
}))



