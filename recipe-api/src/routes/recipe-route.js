const { authJWT } = require('../middleware');
const controller = require('../controllers/recipe-controller.js')



// recipeRoutes.route('/recipes').get(async function (req, res) {
//     const recipes = await Recipes.find({});
//     res.send(recipes)
// });

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
    app.get("/recipes/ingredient", [authJWT.verifyToken], controller.findRecipeByIngredients)
    app.get("/recipes/:id", [authJWT.verifyToken], controller.findRecipeById)
    app.put("/recipes/rate/:id", [authJWT.verifyToken], controller.rateRecipe)
    app.delete("/recipes/:id", [authJWT.verifyToken, authJWT.isAdmin], controller.deleteRecipeById)
    app.post("/recipes", [authJWT.verifyToken], controller.createRecipe)
    // app.get("/recipes/user", [authJWT.verifyToken], controller.userBoard);

    // app.get(
    //     "/recipes/admin",
    //     [authJWT.verifyToken, authJWT.isAdmin],
    //     controller.adminBoard
    // );
};


// recipeRoutes.route('/recipes/phrase').get(async (req, res) => {
//     const dbConnect = dbo.getDb();
//     console.log(req.query.search)
//     const agg = [{
//         "$search": {
//             "index": "default",
//             "phrase": {
//                 "query": `${req.query.search}`,
//                 "path": {
//                     "wildcard": "*"
//                 }
//             }
//         }
//     }]
//     dbConnect.collection(COLLECTION_NAME)
//         .aggregate(agg).toArray((err, result) => {
//             res.json(result)
//         })
// })

