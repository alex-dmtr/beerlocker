// Get the packages we need
var express = require('express')
var mongoose = require('mongoose')
// var Beer = require('./models/beer')
var bodyParser = require('body-parser')
var passport = require('passport')
var beerController = require('./controllers/beer')
var userController = require('./controllers/user')
var authController = require('./controllers/auth')

mongoose.connect('mongodb://localhost:27017/beerlocker')

// Create our Express application
var app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(passport.initialize())

// Create our Express router
var router = express.Router()

// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers)

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer)

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers)


// Register all our routes with /api
app.use('/api', router);

module.exports = app