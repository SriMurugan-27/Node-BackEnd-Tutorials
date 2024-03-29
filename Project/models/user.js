const Joi = require('joi');
const mongoose =require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const userSchema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(5).max(100).required(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, userSchema);
};

module.exports.User = User;
module.exports.validateUser = validateUser;