const flightService = require('../services/flightService');


module.exports = {

    async getFlights(req, res){

        try{
            const allFlights = await flightService.geFlights();
            if(allFlighs.length == 0){
                res.status(200).send({
                    message: "No Users in database"
                });
                return;
            }
            res.status(200).send({
               allUsers
            });
        } catch(err){
            next(err)
        }
    },

    async createFlights(req, res, next) {
        try {
            const flight = await flightService.createFlights(req.body);
    
            if (flight.error) {
                res.status(400).json({ error: flight.error });
                return;
            }
    
            if (!flight) {
                res.status(404).json({ error: 'Flight creation failed, no flight returned.' });
                return;
            }
    
            res.status(200).json(flight);
        } catch (error) {
            // Log the error for debugging purposes
            console.log('Flight object:', flight);
            console.error("Failed in createFlights:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}