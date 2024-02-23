const express = require('express');
const route = express.Router();
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');

route.get('/', async (req, res) => {
    const movie = await Movie.find().sort('title');
    res.send(movie);
});

route.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        return res.status(404).send('No such movie exists');
    }
    res.send(movie);
});

route.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre){
        return res.status(400).send('Invalid Genre!...');
    }

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre.id,
            genre: genre.genre
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    
    await movie.save();
    res.send(movie);
});

module.exports = route;
