const Flights = require('../models/flightModel');
const { createFlight, getFlight,getFlightById } = require('../services/flightService');

const createFlightController = async (req,res,next) => {
    try{
        const flightData = req.body;
        const newFlightId = await createFlight(flightData);
        if(!newFlightId){
            res.send({
                message: "new flight not created"
            })
            return;
        }
        res.status(201).send({
            message: "FLight Added",
            id: newFlightId
        })
    } catch(err){
        next(err);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
const getFlightController = async (req,res,next) => {
    try{
       const {arrival, departure, date} = req.query;
       const flights = await getFlight({arrival, departure, date});
       res.send(flights);
    } catch(err){
        next(err);
    }
}

const getFlightByIdController = async (req,res,next) => {
    try{
        let {id} = req.params;
        const flight = await getFlightById(id);
        res.send(flight);
     } catch(err){
         next(err);
     }
}

const deleteFlightController = async (req,res,next) => {
    try{
        let {id} = req.params;
        res.send(await Flights.findByIdAndDelete(id));
    } catch(err){
        next(err);
    }
}

module.exports = {
    createFlightController,
    getFlightController,
    getFlightByIdController,
    deleteFlightController
}