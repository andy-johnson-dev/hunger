const express = require('express')
const dbo = require( __dirname + '../../../src/db/conn')
const {ObjectId} = require('mongodb')

const recipeRoutes = express.Router();
const COLLECTION_NAME = "recipes"


recipeRoutes.route('/recipes').get(async function( req, res) {
    const dbConnect = dbo.getDb();
    console.log
    dbConnect
        .collection(COLLECTION_NAME)
        .find()
        .toArray(function (err, result) {
            if(err) {
                res.status(400).send("Error retrieving recipes!");
            } else {
                res.json(result);
            }
        });
});

recipeRoutes.route('/recipes/keyword').get(async (req, res) => {
    const dbConnect = dbo.getDb();
    const agg = [{
        "$search": {
          "index": "ingredients",
          "text": {
            "query": `${req.query.search}`,
            "path": {
              "wildcard": "*"
            }
          }
        }}]
    dbConnect.collection(COLLECTION_NAME)
        .aggregate(agg).toArray((err, result) => {
            res.json(result)
        })
})

recipeRoutes.route('/recipes/phrase').get(async (req, res) => {
    const dbConnect = dbo.getDb();
    console.log(req.query.search)
    const agg = [{
        "$search": {
          "index": "default",
          "phrase": {
            "query": `${req.query.search}`,
            "path": {
              "wildcard": "*"
            }
          }
        }}]
    dbConnect.collection(COLLECTION_NAME)
        .aggregate(agg).toArray((err, result) => {
            res.json(result)
        })
})


recipeRoutes.route('/recipes/:id').get(async function(req, res) {
    const dbConnect = dbo.getDb();
    console.log(req.params.id)
    dbConnect.collection(COLLECTION_NAME)
        .findOne({_id: new ObjectId(req.params.id)}, (err, result) => {
            if(err) {
                res.send(`Error while trying to find recipe with id ${req.body.id}`)
            } else{
                res.json(result)
            }
        });
});


recipeRoutes.route('/recipes/:id').delete((req, res) => {
    const dbConnect = dbo.getDb();
    const record = {_id: req.params.id};

    dbConnect.collection(COLLECTION_NAME)
        .deleteOne(record, (err, result) => {
            if (err){
                res.status(400).send(`Error while trying to delete recipe with id ${record._id}!`)
            } else {
                console.log('1 document deleted.');
                res.status(200).json({'status': 'success', 'message': 'Document deleted.'})
            }
        });
})

recipeRoutes.route('/recipes/rate/:id').put((req, res) => {
    const dbConnect = dbo.getDb();
    const query = {_id: new ObjectId(req.params.id)}
    console.log(req.params.id)
    const updates = {$set: {"rating.score": req.body.rating}, $inc: {"rating.votes": req.body.numVotes}}

    dbConnect.collection(COLLECTION_NAME)
        .updateOne(query, updates, (err, result) => {
            if(err) {
                res.status(400).send(`Error while updating recipe with id: ${req.params.id}!`)
            } else {
                console.log(`Document with id: ${req.params.id} has been updated `)
                res.status(200).json({'status': 'success', 'message': 'Document updated.'})
            }
        }) 
})

recipeRoutes.route('/recipes').post((req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect.collection(COLLECTION_NAME)
        .insertOne(req.body, (err, result) => {
            if(err){
                res.status(400).send('Error while creating new recipe')
            } else {
                res.status(201).send('Document created')
            }
        })
})



module.exports = recipeRoutes