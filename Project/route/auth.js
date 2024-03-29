const Joi = require('joi');
const express = require('express');
const route = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

route.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.status(400).send('Invalid email...');
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if(!isValid){
        return res.status(400).send('Incorrect Password!...');
    }

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(user){
    const userSchema = {
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, userSchema);
}

module.exports = route;