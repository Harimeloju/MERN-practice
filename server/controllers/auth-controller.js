const bcrypt = require("bcryptjs");
const User= require("../models/user-model.js");

const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("Welcome to mern by router");
    } catch (error) {
        console.log("Error");
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body);
        const {username,email,phone,password}=req.body;
        const userExist=await User.findOne({email});

      // res.status(201).json({ message: "User registered successfully" });
      if (userExist) {
        return res.status(400).json({ message: "email already exists" });
      }

      
      const userCreated = await User.create({ 
        username, 
         email,
          phone, 
          password, 
        });
  
      // res.status(201).json({ message: "User registered successfully" });
      res.status(201).json({ 
        msg: "registration succesfull",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(), 
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  const login =async(req,res)=>{
    try {
      const{email,password}=req.body;
      const userExist = await User.findOne({email});
      if(!userExist){
        return res.status(400).json({message:"Invalid Credentials"});
      }
      
      const isMatch = await  bcrypt.compare(password,userExist.password);
      //console.log(password);
      //console.log(userExist.password);
      //console.log(isMatch);
      if(isMatch){
        res.status(200).json({
          msg:"Login succesful",
          token: await userExist.generateToken(),
          userId : userExist._id.toString(),
        });
      }
      else{
        res.status(401).json({message:"Invalid email or password"});
      }
    } catch (error) {
      //res.status(500).json({ message: "Internal server error" });
      next(error);
    }
  };

//to send user data-user logic
const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = {
    home,
    register,
    login,
    user,
};
