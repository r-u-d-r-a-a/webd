var regExName = /^[a-zA-Z]{3,10}$/;
var regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var regExPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const User = require("../models/user");

const getUsers = async () => {
  try {
    return User.find();
  } catch (error) {
    return error.message;
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404);
      return { error: "Failed to login, User not found!", status: 404 };
    }
    if (password != user.password) {
      res.status(401);
      return { error: "Invalid Credentials" };
    }
    res.status(200);
    return { data: user };
  } catch (err) {
    console.log(err);
    return { message: "Error logging in user", error: err };
  }
};

const addUser = async (body) => {
  try {
    var { firstName, lastName, email, password } = new User(body);

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

    const newUser = new User({
      firstName,
      lastName,
      email,
      password
    });

    return await newUser.save();
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

const updateUser = async (req) => {
  try {
    const emailP = req.params.email;
    const { firstName, lastName, email, password } = new User(req.body);

    if (password.length < 5 || password.length > 50) {
      return {
        status: 400,
        message: "Password length is not valid",
      };
    }

    if (!password.match(regExPassword)) {
      return {
        status: 400,
        message: "Password format is invalid",
      };
    }

    // if(firstName.length<5 || firstName.length>50 || lastName.length>50 || lastName.length>50 ){
    //     return {
    //         status:400,
    //         message:"Name length is not valid"
    //     }

    // }

    if (!firstName.match(regExName) || !lastName.match(regExName)) {
      return {
        status: 400,
        message: "Name format is invalid",
      };
    }

    const check = await User.findOne({ email: emailP });

    if (!check) {
      return {
        status: 404,
        message: "No such email found!!",
      };
    }

    if (email != emailP) {
      return {
        status: 404,
        message: "Email field cannot be updated!!",
      };
    }

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    const userUpdation = await User.findOneAndUpdate(
      { email },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }
    );

    if (!userUpdation) {
      return {
        status: 404,
        message: "No such email found",
      };
    }

    return {
      status: 200,
      message: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    };
  } catch (error) {
    console.error("Error updating User:", error.message);
    return {
      status: 500,
      message: "User cannot be updated",
    };
  }
};

const deleteUser = async (req) => {
  try {
    const { email } = req.body;

    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return {
        status: 404,
        message: "No such Email found",
      };
    } else {
      return {
        status: 200,
        message: user,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: error.message,
    };
  }
};

const addImg = async (req,path) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id,{
        path: path
    })
    return user;
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  userLogin,
  addImg
};
