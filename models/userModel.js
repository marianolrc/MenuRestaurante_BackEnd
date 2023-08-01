const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name_surname: {
        type: String,
        required:[true, "Full Name is required, it cannot be empty"],
        unique: true
    },
    email: {
        type: String,
        required:[true, "Email is required, it cannot be empty"]
    },
    password: {
        type: String,
        required:[true, "Password is required, it cannot be empty"]
    },
    state: {
        type: String,
        enum:['active', 'inactive'],
        default: 'active',
        required:[true, "State is required, it cannot be empty"]
    },
    rol: {
        type: String,
        enum:['user', 'admin'],
        default: 'user',
        required:[true,"Rol is required, it cannot be empty"]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;