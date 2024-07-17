const mongoose = require("mongoose");

//const URI = "mongodb://127.0.0.1:27017/mern_admin_panel";
//const URI=process.env.MONGODB_URI;
//console.log("MongoDB URI:", URI);
const URI="mongodb+srv://haridharshanmeloju1820:Hari1820%23@cluster0.iafk7ao.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection fail");
    process.exit(0);
  }
};

module.exports = connectDb;