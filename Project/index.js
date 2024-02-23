const express = require('express');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./route/genres');
const customers = require('./route/customers');
const movies = require('./route/movies');
const rentals = require('./route/rentals');
const users = require('./route/users');
const auth = require('./route/auth');
const error = require('./middleware/error');
const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');    

// winston.add(winston.transports.File, { filename: 'logfile.log' });
// winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });
const files = new winston.transports.File({ filename: 'combined.log' });
const console = new winston.transports.Console();

winston.add(console);
winston.add(files);
winston.remove(console);

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined...');
    process.exit(1);
};

const db = mongoose.connect('mongodb://localhost/vidly');
db.then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error : ' , err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

app.listen(5000, console.log('Server is Running...'));
