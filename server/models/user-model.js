const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
//model
const userSchema= new mongoose.Schema({
    username: {
        type: String,
        require:true,
    },
    email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
});
//hashing password
userSchema.pre("save", async function (next) {
    const user = this;
    console.log("actual data ", this);
  
    if (!user.isModified("password")) {
        return next();
    }
  
    try {
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRound);
      user.password = hashedPassword;
    } catch (error) {
       return next(error);
    }
  });
//define the model or the collection name

//json web token
userSchema.methods.generateToken=function(){
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
    "hyjuhfubhcvh",//jwt secret token
    {
      expiresIn:"30d",
    }
  );
  } catch (error) {
    console.error("Token error",error);
  }
};



const User=new mongoose.model("User",userSchema);
module.exports=User;