var mongoose = require('mongoose')
const Ingredient = require('./ingredient_schema');


const Recipes = mongoose.model("Recipes",

    new mongoose.Schema({
        name: String,
        url: String,
        photo: String,
        ingredients: [Ingredient.IngredientSchema],
        instructions: [String],
        nutrients: {
            calories: Number,
            protein: Number,
            carbs: Number,
            fats: Number,
        },
        rating: {
            score: Number,
            votes: Number
        },
        time: {
            marinadeTime: Number,
            marinadeTimeUnits: String,
            prepTime: Number,
            prepTimeUnits: String,
            cookTime: Number,
            cookTimeUnits: String,
            totalTimeMin: Number,
            totalTimeHours: String
        },
        notes: String
    }), 'recipes');


module.exports = Recipes;
