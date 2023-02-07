const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;

db.user = require('./user-model')
db.role = require('./role-model')
db.recipes = require('./recipe-model')
db.ingredient = require('./ingredient-model')
db.refreshToken = require('./refresh-token-model')

db.ROLES = ["user", "admin", "moderator"]

module.exports = db;