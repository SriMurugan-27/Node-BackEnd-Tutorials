const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercise')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Error Occured...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
    const course = await Course.find({ isPublished: true, tags: 'backend' })
    .select({ name: 1, author: 1})
    .sort({ name: 1 });
    console.log(course);
}

getCourses();