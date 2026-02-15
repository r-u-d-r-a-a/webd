const { createBooking, getBooking } = require('../services/bookingService');

const getbookingsController = async (req,res,next) => {
    try{
       const email = req.query.email;
       const bookings = await getBooking(email);
       if(!bookings){
        res.status(200).send({});
       }
       res.send(bookings);

    } catch(error){

    }
}

const createBookingController = async (req,res,next) => {
    try{
        const {flightNumber, email} = req.query;
        const booking = await createBooking(email, flightNumber);
        if(!booking){
            res.status(400).send({
                message: "booking not created"
            })
        }
        res.status(200).send(booking);
    } catch(e){
        next(e);
    }
}

module.exports = {
    createBookingController,
    getbookingsController
}