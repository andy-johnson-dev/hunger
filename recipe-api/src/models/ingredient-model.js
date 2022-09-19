var mongoose = require('mongoose')



const IngredientSchema =
    new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Name is required.']
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required and must be greater than 0.']
        },
        measurement: String,
        notes: String
    }, { _id: false });

const Ingredient = mongoose.model('Ingredient', IngredientSchema)

module.exports = {
    Ingredient: Ingredient,
    IngredientSchema: IngredientSchema
}