const { authJWT } = require('../middleware');
const controller = require('../controllers/recipe-controller.js')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/recipes", [authJWT.verifyToken], controller.findAllRecipes);
    app.get("/recipes/keyword", [authJWT.verifyToken], controller.findRecipeByKeyword)
    app.get("/recipes/phrase", [authJWT.verifyToken], controller.findRecipeByPhrase)
    app.get("/recipes/ingredient", [authJWT.verifyToken], controller.findRecipeByIngredients)
    app.get("/recipes/:id", [authJWT.verifyToken], controller.findRecipeById)
    app.put("/recipes/rate/:id", [authJWT.verifyToken], controller.rateRecipe)
    app.delete("/recipes/:id", [authJWT.verifyToken, authJWT.isAdmin], controller.deleteRecipeById)
    app.post("/recipes", [authJWT.verifyToken], controller.createRecipe)
};


