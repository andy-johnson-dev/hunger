const mongoose = require('mongoose')

const User = mongoose.model("User",
    new mongoose.Schema({
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            require: true
        },
        photo: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    }), 'users'
);

module.exports = User;