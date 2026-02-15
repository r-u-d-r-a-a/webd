const User = require('../models/userModel');
const Flights = require('../models/flightModel');
const Bookings = require('../models/bookingModel');

const createBooking = (email, flightNumber) => {
    try{
        let newBooking = new Bookings({
            userEmail: email,
            flightNumber: flightNumber
        });
        return newBooking.save();
    } catch(e){
        console.log(e);
    }
}

const getBooking = async(email) =>
{
  try{
    const bookings = await Bookings.find({
        userEmail: email
    })
    const user = await User.findOne({
        email: email
    },{
        firstName: 1,
        lastName: 1,
        email: 1
    });
    const promiseArray = bookings.map((booking) => Flights.find({
        flightNumber: booking.flightNumber
    }))

    let flightDetails = await Promise.all(promiseArray);

    return {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        bookings: flightDetails
    }
  } catch(error){
    console.log(error.message)
  }
}

module.exports = {
    createBooking,
    getBooking
}