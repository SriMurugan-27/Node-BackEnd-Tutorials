const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.send(courses);
});

const courses = [
    { id : 1, name : 'Course1' },
    { id : 2, name : 'Course2' },
    { id : 3, name : 'Course3' }
];

route.get('/:id', (req, res) => {
    const isCoursePresent = courses.find( c => c.id === parseInt(req.params.id));
    if(!isCoursePresent) return res.status(404).send('Course not Found!');
    res.send(isCoursePresent);
})

route.post('/', (req, res) => {
    const schema = {
        name : Joi.string().min(3).required()  
    };

    const result = Joi.validate(req.body, schema);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    const course = {
        id : courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(courses);
});

// app.get('/api/date/:year/:month', (req, res) => {
//     res.send(req.params);
// });

route.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Courses not exists');

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error);

    course.name = req.body.name;
    res.send(course);
})

route.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not exists');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

module.exports = route;