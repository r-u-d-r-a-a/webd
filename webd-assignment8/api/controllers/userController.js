const userServices = require('../services/userServices');

module.exports = {

    async getUsers(req, res){

        try{
            const user = await userServices.getUsers();
            res.json(user);
        }
        catch(err){
            next(err)
        }
    },

    async userLogin(req, res){

        try{
            console.log(req.body);
            const user = await userServices.userLogin(req,res);
            
            res.json(user);
        }
        catch(err){
            next(err)
        }
    },

    async addUser(req, res) {

        try{
            const user = await userServices.addUser(req.body);

            if(user.error) res.status(400).json(user);

            res.status(200).json(user);
        } catch(err){
            next(err)
        }
    },

    async updateUser(req, res){

        try{

            const user = await userServices.updateUser(req);

            res.status(user.status).json(user.message);

        }catch(err){
            next(err);
        }
    },

    async deleteUser(req, res){

        try{

            const user = await userServices.deleteUser(req);

            res.status(user.status).json(user.message);

        }catch(err){
            next(err);
        }
    },

    async addImg(req, res,next){
        try{
            const path = req.file.path
            const user = await userServices.addImg(req,path);

            res.status(201).json({
                id: req.params.id,
                path:user.path,
            });

        }catch(err){
            next(err);
        }
    }

}
