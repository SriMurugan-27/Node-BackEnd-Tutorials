const express = require('express');
const route = express.Router();
const { Genre, validateGenre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
// const asynMiddleware = require('../middleware/async');

route.get('/',async (req, res, next) => {
    throw new Error('Could not get the genres');
    const genres = await Genre.find().sort('genre')
    res.send(genres);
});

route.get('/:id',async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Movie not Found!');
    res.send(genre);
})

route.post('/', auth,async (req, res) => {
    const { error } = validateGenre(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let genre = new Genre({ genre: req.body.genre });
    genre = await genre.save();
    res.send(genre);
});

route.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, { genre: req.body.genre }, { new: true });
    if(!genre) return res.status(404).send('Movie not found');

    res.send(genre);
});

route.delete('/:id', [auth, admin],async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if(!genre){
        return res.status(404).send('Movie not found');
    }
    res.send(genre);
});


module.exports = route;