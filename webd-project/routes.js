const userController = require("../controllers/userController");
const flightController = require("../controllers/flightController");

module.exports = (app) =>
{
    // app.get('/', (req, res) => {
    //     res.send('Hello')
    //   })

    app.get('/users/get',userController.getUsers);

    app.post('/users/create',userController.createUsers);

    app.post('/users/login',userController.loginUsers);

    app.post('/flight/create', flightController.createFlights);

    app.get('/flight/get', flightController.getFlights);

  
}