const userService = require('../services/userService');

module.exports = {

    async getUsers(req, res, next){

        try{
            const allUsers = await userService.getUsers();
            if(allUsers.length == 0){
                res.status(200).send({
                    message: "No Users in database"
                });
                return;
            }
            res.status(200).send({
               allUsers
            });
        } catch(err){
            next(err);
        }
    },

    async createUsers(req,res,next)
    {
        try
        {
            const user = await userService.createUsers(req.body);

            if(user.error) 
            {
                //res.json(error);
                res.status(400).json(user);
            }

            res.status(200).json(user);
        } catch(err){
            next(err)
        }
    },

    async loginUsers(req,res,next)
    {
        try{
            const user = await userService.loginUsers(req,res);
            res.json(user);
        }
        catch(err)
        {
            next(err);
        }
        
    },

    // async getBookingController(req,res,next)
    // {
    //     try{
    //         const booking = await userService.getBooking(req,res,next);
    //         res.json(booking);
    //     }
    //     catch(err)
    //     {
    //         next(err);
    //     }
    // }

}