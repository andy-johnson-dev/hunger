const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;

db.user = require('./user-model')
db.role = require('./role-model')
db.recipes = require('./recipe_schema')
db.ingredient = require('./ingredient_schema')

db.ROLES = ["user", "admin"]

module.exports = db;