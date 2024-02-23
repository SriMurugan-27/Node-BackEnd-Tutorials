const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const courses = require('./route/courses');
const home = require('./route/home');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded( { extended : true }));
app.use(express.static('public'));
app.use(logger);
app.use(helmet());
app.use('/', home);
app.use('/api/courses', courses);


if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled');
}
// app.use(morgan('tiny'));

// console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
// console.log(`app : ${app.get('env')}`);

console.log('Apllication : ' + config.get('name'));
console.log('Mail : ' + config.get('mail.host'));
console.log('Password : ' + config.get('mail.password'));


const port = process.env.port || 3000;

app.listen(port, function() {
    console.log(`Server Up and Running in port ${port}`);
})

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}