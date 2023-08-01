const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONN);
        console.log("DataBase MongoDB Connected");
    } catch(error) {
        console.log(error);
        throw new Error("Connection Error, Can't bring connection to database MongoDB");
    }
}

module.exports = {
    dbConnection
}