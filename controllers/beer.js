var Beer = require('../models/beer')

// Create endpoint /api/beers for POSTS
exports.postBeers = function(req, res) {
    var beer = new Beer()

    beer.name = req.body.name
    beer.type = req.body.type
    beer.quantity = req.body.quantity
    beer.producer = req.body.producer
    
    beer.save(function(err) {
        if (err)
            res.send(error)
        res.status(201).send({message:'Beer added to the locker!', data:beer})
    })
}

// Create endpoint /api/beers for GET
exports.getBeers = function(req, res) {
    Beer.find(function(err, beers) {
        if (err)
            res.send(err)

        res.status(200).json(beers)
    })
}

// Create endpoint /api/beers/:beer_id for GET
exports.getBeer = function(req, res) {
    Beer.findById(req.params.beer_id, function(err, beer) {
        if (err || beer == null)
            res.status(404).send(err)
        else
          res.status(200).json(beer)
    })
}

// Create endpoint /api/beers/:beer_id for PUT
exports.putBeer = function(req, res) {
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.status(404).send(err)

    beer.quantity = req.body.quantity

    beer.save(function(err) {
      if (err)
        res.send(err)

      res.status(202).json(beer)
    })
  })
}

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteBeer = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Beer.findByIdAndRemove(req.params.beer_id, function(err) {
    if (err)
      res.send(err)

    res.status(200).json({ message: 'Beer removed from the locker!' })
  })
}

