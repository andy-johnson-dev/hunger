const db = require('../models');
const Recipes = db.recipes;

exports.findAllRecipes = (req, res) => {
    Recipes.find({}, (err, recipes) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send(recipes)
        return;
    });
};

exports.findRecipeByKeyword = (req, res) => {
    const agg = [{
        "$search": {
            "index": "default",
            "text": {
                "query": `${req.query.search}`,
                "path": {
                    "wildcard": "*"
                }
            }
        }
    }]
    Recipes.aggregate(agg, (err, results) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send(results);
        return;
    });
};

exports.findRecipeByPhrase = (req, res) => {
    const agg = [{
        "$search": {
            "index": "default",
            "phrase": {
                "query": `${req.query.search}`,
                "path": {
                    "wildcard": "*"
                }
            }
        }
    }]
    Recipes.aggregate(agg, (err, results) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send(results);
        return;
    });
}

exports.findRecipeByIngredients = (req, res) => {
    var searchParams = (req.query.search).split('~')
    var queryArray = []

    // TODO: Create score based search for ingredients, currently all ingredients searched must be in recipe
    searchParams.forEach(param => {
        var itemQuery = {
            "text": {
                "query": `${param}`,
                "path": {
                    "wildcard": "*"
                }
            }
        }
        queryArray.push(itemQuery)
    })
    const agg = [{
        "$search": {
            "index": "ingredients",
            "compound": {
                "must": queryArray
            }
        }

    }]
    Recipes.aggregate(agg, (err, results) => {
        if (err) {
            res.status(500).send({ status: "error", message: "Uh oh, that's not right. . ." });
            return;
        }
        res.send(results);
        return;
    })
}

exports.findRecipeById = (req, res) => {
    Recipes.findOne({ _id: `${req.params.id}` }, (err, doc) => {
        if (err) {
            res.status(404).send({ message: `Unable to find record with id: [ ${req.params.id} ]` });
            return;
        }
        res.status(200).send(doc);
    })
}


exports.deleteRecipeById = (req, res) => {
    Recipes.findByIdAndDelete({ _id: `${req.params.id}` }, (err, doc) => {
        if (err) {
            res.status(404).send({ message: `Unable to find record with id: [ ${req.params.id} ]` })
            return;
        }
        res.status(204).send();
    })
}

exports.rateRecipe = (req, res) => {
    const updates = { $set: { "rating.score": req.body.rating }, $inc: { "rating.votes": req.body.numVotes } }
    Recipes.findByIdAndUpdate(`${req.params.id}`, updates, (err, doc) => {
        if (err) {
            res.status(404).send({ message: `Unable to find record with id: [ ${req.params.id} ]` })
        }
        res.status(200).send(doc);
    })
}

exports.createRecipe = (req, res) => {
    Recipes.create({
        name: req.body.name,
        url: req.body.url,
        photo: req.body.photo,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        nutrients: req.body.nutrients,
        rating: req.body.rating,
        time: req.body.time,
        notes: req.body.notes
    }, (err, doc) => {
        if (err.name === "ValidationError") {
            console.log(err)
            let errors = {}
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            res.status(400).send({ message: errors });
            return;
        }
        if (err) {
            res.status(500).send({ message: "oops. . . something went wrong." });
            console.log(err)
            return;
        }
        res.status(201).send();
        return;
    });
}
