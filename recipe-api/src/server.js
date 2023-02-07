require('dotenv').config({ path: __dirname + '../../../config.env' });

const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session')
const helmet = require('helmet');
const { dbConnect } = require('./db/conn');
const { cookie_secret } = require('./config/auth-config');


const PORT = process.env.API_PORT;
// var corsOptions = {
//     origin: "http://localhost:8081"
// }

const app = express();

// app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

dbConnect;

app.use(function (err, _req, res, next) {
    console.error(err.stack);
    res.status(500).send({ status: "ERROR", message: "Something broke, send help!" });
})

// app.use(function (req, res, next) {
//     req.session.nowInMinutes = Math.floor(Date.now() / 60)
//     next()
// })

//routes
require('./routes/auth-route')(app);
require('./routes/user-route')(app);
require('./routes/recipe-route')(app);

app.listen(PORT, () => {
    console.log('listening on port 3001');
});








