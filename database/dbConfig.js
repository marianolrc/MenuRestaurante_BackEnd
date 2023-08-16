const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DataBase MongoDB Connected");
    } catch(error) {
        console.log(error);
        throw new Error("Connection Error, Can't bring connection to database MongoDB");
    }

    mongoose.connection.on("connected", () => {
        console.log("Mongoose is connected");
      });
      
      mongoose.connection.on("disconnected", () => {
        console.log("Mongoose is disconnected");
      });
}

module.exports = {
    dbConnection
}