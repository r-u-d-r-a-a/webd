const userController = require("../controllers/userController");
const flightController = require("../controllers/flightController");
const bookingController = require("../controllers/bookingController");
module.exports = (app) =>
{

    app.get('/users/get',userController.getUsers);

    app.post('/users/create',userController.createUsers);

    app.post('/users/login',userController.loginUsers);

    app.post('/flight/create', flightController.createFlightController);

    app.get('/flight', flightController.getFlightController);

    app.post('/booking/create', bookingController.createBookingController);

    app.get('/booking', bookingController.getbookingsController);

    app.get('/flight/:id', flightController.getFlightByIdController);

    app.delete('/flight/:id',flightController.deleteFlightController )

}