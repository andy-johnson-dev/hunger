require('dotenv').config({ path: __dirname + '../../../config.env' });

const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session')
const helmet = require('helmet');
const { dbConnect } = require('./db/conn');
const { cookie_secret } = require('./config/auth-config');

const PORT = process.env.API_PORT;
var corsOptions = {
    origin: "https://localhost:3001"
}

const app = express();


// require('./routes/user-route')(app);
// app.use(require('./routes/user-route'),)


app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieSession({
    name: "hunger-session",
    secret: cookie_secret,
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
}
))

dbConnect;

app.use(function (err, _req, res, next) {
    console.error(err.stack);
    res.status(500).send({ status: "ERROR", message: "Something broke, send help!" });
})

app.use(function (req, res, next) {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
})

//routes
require('./routes/auth-route')(app);
require('./routes/user-route')(app);
require('./routes/recipe-route')(app);

app.listen(PORT, () => {
    console.log('listening on port 3001');
});








