const { MongoClient, ServerApiVersion } = require('mongodb')
const connectionString = process.env.DB_URI 
const connectionKey = process.env.DB_KEY

console.log(connectionString)

const client = new MongoClient(connectionString, {
    sslKey: connectionKey,
    sslCert: connectionKey,
    serverApi: ServerApiVersion.v1
})

let dbConnection;

module.exports = {
    connectToServer: function(callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }
        
            dbConnection = db.db("hunger")
            console.log("Successfully connected to MongoDB.")

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    }
};