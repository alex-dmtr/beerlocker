var assert = require('assert')
const request = require('supertest')
const app = require('../app')


describe('Api', function() {

  let token = null
  const user = { username: 'obi-wan', password: 'kenobi' }

  context('Beer CRUD', function() {

    let beer = { name: 'Test Beer', type: 'Coder\'s favourite', quantity: 14, producer: 'Carlsberg'}
    
    it('should create a beer', function(done) {
        request(app)
        .post('/api/beers')
        .auth(user.username, user.password)
        .send(beer)
        .expect(201)        
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) done(err)

            let answer = res.body
            let data = answer.data
            assert.equal(data.name, beer.name)
            assert.equal(data.type, beer.type)
            assert.equal(data.quantity, beer.quantity)
            assert.equal(data.producer, beer.producer)

            beer = data
            done(err)
        })
    })
    it('should read the same beer', function(done) {
        request(app)
            .get('/api/beers/'+beer._id)
            .auth(user.username, user.password)
            .expect(200)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) done(err)

                assert.deepEqual(res.body, beer)

                done(err)
            })
    })
    it('should update beer quantity', function(done) {
        request(app)
            .put('/api/beers/'+beer._id)
            .auth(user.username, user.password)
            .send({quantity:beer.quantity-1})
            .expect(202)            
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err)

                assert.equal(res.body.quantity, beer.quantity-1)

                done(err)
            })
    })
    context('delete beer', function() {
        it('should delete the beer', function(done) {
            request(app)
                .delete('/api/beers/'+beer._id)
                .auth(user.username, user.password)
                .expect(200)
                .end(done)
        })
        it('should no longer find the beer', function(done) {
            request(app)
                .get('/api/beers/'+beer._id)
                .auth(user.username, user.password)
                .expect(404)
                .end(done)
        })

    })
  })

})