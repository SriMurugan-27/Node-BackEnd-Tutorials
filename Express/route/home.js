const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    // res.send('Home Page!!!');
    res.render('index', { title : 'My Express App' , heading : 'Hello World' });
});

module.exports = route;