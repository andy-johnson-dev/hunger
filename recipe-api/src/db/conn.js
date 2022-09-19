const { ServerApiVersion } = require('mongodb');
const db = require('../models')
const Role = db.role;
const connectionString = process.env.DB_URI
const connectionKey = process.env.DB_KEY


exports.dbConnect = db.mongoose.connect(connectionString, {
    ssl: true,
    sslKey: connectionKey,
    sslCert: connectionKey,
    serverApi: ServerApiVersion.v1,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to MongoDB");

    initial();
}).catch(err => {
    console.error("Connection error", err)
    process.exit();
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error: ", err)
                }
                console.log("added 'user' to roles collection")
            })

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error: ", err)
                }
                console.log("added 'admin' to roles collection")
            })
        }
    })
}