var regExName = /^[a-zA-Z]{3,10}$/;
var regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var regExPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const User = require("../models/userModel");

const getUsers = async () => {
    try{
        return User.find({
            
        },{
            email: 1,
            firstName: 1,
            lastName:1,
            type:1
        });
    } catch (error) {
      return error.message;
    }
  };

  const createUsers = async (body) =>
  {

    try{
    var { firstName, lastName, email, password, type } = new User(body);

    if(!firstName.match(regExName))
    {
        return {
            error: "Invalid first name"
        }
    }

    if(!lastName.match(regExName))
    {
        return {
            error: "Invalid last name"
        }
    }

    if(!email.match(regExEmail))
    {
        return {
            error: "Invalid email id"
        }
    }

    if (!password.match(regExPassword)) {
        return {
          error: "Password format is invalid",
        };
      }
  
      if (password.length < 5 || password.length > 50) {
        return {
          error: "Password length is not valid",
        };
      }

      var newUser = new User({
        firstName,
        lastName,
        email,
        password,
        type
      });
      return await newUser.save();
    }catch (error) {
        return error.message;
      }

  };

  const loginUsers = async (req,res) => {

    try{

        var { email, password } = req.body;

        const user = await User.findOne({email:email})

        if(!user)
        {
            res.status(404);
            return {error: "User not found"};
        }

        if(user.password!=password)
        {
            res.status(401);
            return {error: "Invalid credentials"};
        }

        res.status(200);
        return user;


    }catch(error) {
        return error.message;
    }

  };



module.exports = {
    getUsers,
    createUsers,
    loginUsers
  };