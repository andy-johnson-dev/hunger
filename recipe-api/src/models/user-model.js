const mongoose = require('mongoose')

const User = mongoose.model("User",
    new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            require: true
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