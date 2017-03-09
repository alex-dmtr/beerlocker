// Get the packages we need
var express = require('express')
var mongoose = require('mongoose')
// var Beer = require('./models/beer')
var bodyParser = require('body-parser')
var beerController = require('./controllers/beer')
var userController = require('./controllers/user')

mongoose.connect('mongodb://localhost:27017/beerlocker')

// Create our Express application
var app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router()

// Create endpoint handlers for /beers
router.route('/beers')
  .post(beerController.postBeers)
  .get(beerController.getBeers)

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(beerController.getBeer)
  .put(beerController.putBeer)
  .delete(beerController.deleteBeer)

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers)


// Register all our routes with /api
app.use('/api', router);

module.exports = app