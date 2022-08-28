var mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    measurement: String,
    notes: String
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema)

module.exports = {
    Ingredient: Ingredient,
    IngredientSchema: IngredientSchema
}