const Flight = require('../models/flightModel');

const createFlight = async (flighData) => {
    try{
        let newFlight = new Flight(flighData);
        newFlight = await newFlight.save();
        return newFlight.id;
    } catch(error){
        console.log(error.message);
        console.log(`Error creating flight with data -> ${flighData}`);
    }
}

const getFlight = async (queryData) => {
    try{
        const {
            arrival, 
            departure,
            date
        } = queryData;
        let d = new Date(date)
        // {arrival: "Los Angeles International Airport", departure:"John F. Kennedy International Airport"}
        const flights = await Flight.find({
            $and:[
                {
                    arrival: arrival
                },{
                    departure: departure
                }
                ,{
                    departureDate: {$gte: d}
                }
            ] 
        })
        return flights;
    } catch(error){
        console.log(error.message);
        console.log(`Error fetching flight with data -> ${queryData}`);
    }
}

const getFlightById = async (id) => {
    try{
        return Flight.findById(id);
    } catch(e){
        console.log(error.message);
        console.log(`Error fetching flight with data -> ${id}`);
    }
}

module.exports = {
    createFlight,
    getFlight,
    getFlightById
}