const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genres){
    const genreSchema = {
        genre: Joi.string().min(3).required()
    };

    return Joi.validate(genres, genreSchema);
}

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
module.exports.genreSchema = genreSchema;