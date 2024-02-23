const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/population')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Error Occurred...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website){
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
};

async function createCourse(name, author){
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
};

async function listCourse(){
    const courses = await Course.find()
                        .populate('author', 'name -_id')
                        .select('name author');
    console.log(courses);
}

//createAuthor('sandy', 'funny guy', 'sandy.com');
// createCourse('Node Course', '65c5bfa8fdf2062b30e4089c');
listCourse();