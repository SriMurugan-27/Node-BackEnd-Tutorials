const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercise')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Error Occured...', err));

const courseschema = mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = new mongoose.model('Course', courseschema);

async function getCourses(){
    return await Course.find({ isPublished: true})
        .or([ { price: { $gte: 15 } }, { name: /.*by.*/i }]);
}

async function run(){
    const result = await getCourses();
    console.log(result);
}

run();