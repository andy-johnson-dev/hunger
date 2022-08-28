const dbo = require('./conn')


const collectionName = 'recipes'

async function getRecipes(req, res) {
    const db = dbo.getDb();
    let recipes = db.collection('recipes')
    return await recipes.find().toArray((err, items) => {
        if(err) {
            console.error(err)
            res.status(500).json({err: err})
            return
        }
        res.status(200).json(items)
    })
}


module.exports = {
    getRecipes
}