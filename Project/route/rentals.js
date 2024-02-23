const express = require('express');
const mongoose = require('mongoose');
// const Fawn = require('fawn');
const route = express.Router();
const { Rental, validateRental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');

// Fawn.init(mongoose);

route.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental);
});

route.post('/', async (req, res) =>{
    const { error } = validateRental(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findById(req.body.customerId);
    if(!customer){
        return res.send(404).send('No such customer exists');
    }

    const movie = await Movie.findById(req.body.movieId);
    if(!movie){
        return res.status(404).send('No such movie exists');
    }

    if(movie.numberInStock === 0){
        return res.status(400).send('Movie not in-stock');
    }

    let rental = new Rental({
        customer: {
            _id: customer.id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie.id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});

route.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental){
        return res.status(404).send('Invalid rental!...');
    }
    res.send(rental);
})

module.exports = route;