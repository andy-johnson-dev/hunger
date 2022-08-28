require('dotenv').config({ path: __dirname + '../../../config.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const PORT = process.env.API_PORT;
const dbo = require('./database/conn')
const {getRecipes} = require('./database/recipe')
const {ObjectId} = require('mongodb')

dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
  });

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/recipes', (req, res) => {
    const db = dbo.getDb();
    let recipes = db.collection('recipes')
    recipes.find().toArray((err, items) => {
        if(err) {
            console.error(err)
            res.status(500).json({err: err})
            return
        }
        res.status(200).json(items)
    })
});

app.get('/recipes/:id', (req, res) => {
    const db = dbo.getDb();
    let recipes = db.collection('recipes')
    let id = new ObjectId(req.params.id)
    recipes.findOne({ _id: id }, function(err, item) {
        if(err) {
            console.error(err)
            res.status(404).json({err: err})
        }
        res.status(200).json(item)
    })
})

app.listen(PORT, () => {
    console.log('listening on port 3001');
})
