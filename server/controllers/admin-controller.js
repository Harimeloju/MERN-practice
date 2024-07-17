const User=require("../models/user-model");
const Contact=require("../models/contact-model");
//users logic
const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({},{password:0});//gives all users from db will not give password
        if(!users||users.length==0) return res.status(404).json({message:"No Users Found"});
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}


//to get all contacts logic
const getAllContacts=async(req,res)=>{
    try {
        const contacts=await Contact.find();
        if(!contacts||contacts.length==0) res.status(404).json({message:"No Contacts Found"});
        return res.status(200).json(contacts);
    } catch (error) {
      next(error);  
    }
}
//user delete logic
const deleteUserById=async(req ,res)=>{
    try {
        const id=req.params.id;//to get id of the user which is going to be deleted
        console.log(id);
        await User.deleteOne({ _id: id});//deletes user with matched id
        return res.status(200).json({message:"User Deleted Succesfully"});
    } catch (error) {
        next(error);
    }
}
//get single user data
const getUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await User.findOne({ _id: id }, { password: 0 });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
//updating user
const updateUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedUserData = req.body;//get updated usewr data
  
      const updatedData = await User.updateOne(
        { _id: id },
        {
          $set: updatedUserData,
        }
      );
      return res.status(200).json(updatedData);
    } catch (error) {
      next(error);
    }
  };
  const deleteContactById = async (req, res) => {
    try {
      const id = req.params.id;
      await Contact.deleteOne({ _id: id });
      return res.status(200).json({ message: "Contact Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  };
module.exports={getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById};