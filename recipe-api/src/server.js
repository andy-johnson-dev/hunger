require('dotenv').config({ path: __dirname + '../../../config.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose')

const PORT = process.env.API_PORT;
const dbo = require('./db/conn')

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(require('./routes/recipes'));

app.use(function(err, _req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke, send help!");
})

dbo.connectToServer(function(err) {
    if (err) {
        console.error(err);
        process.exit();
    }

    app.listen(PORT, () => {
        console.log('listening on port 3001');
    });
})


