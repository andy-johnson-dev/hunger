const { authJWT } = require('../middleware');
const controller = require("../controllers/user-controller.js");
const s3Controller = require('../controllers/s3-controller')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/test/all", controller.allAccess);
    app.get("/test/user", [authJWT.verifyToken], controller.userBoard);
    app.get("/test/admin", [authJWT.verifyToken, authJWT.isAdmin], controller.adminBoard);
    app.get("/users", controller.allAccess)
    app.get("/user/:key(*)", s3Controller.getImage)
}; 
