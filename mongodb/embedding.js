const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/embedding')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Error occured...', err));

const authorSchema = mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [ authorSchema ]
}));

async function createCourse(name, authors){
    const course = await Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
};

async function listCourse(){
    const courses = await Course.find();
    console.log(courses);
};

async function updateCourse(id, name){
    const course = await Course.update({ _id: id }, {
        $set: {
            'author.name': name
        }
    });
    // course.author.name = name;
    // course.save();
};

async function removeAuthor(id){
    return await Course.update( { _id: id }, {
        $unset: {
            'author': ''
        }
    });
}

async function addAuthor(courseId, name){
    const course = await Course.findById(courseId);
    course.authors.push(name);
    course.save();
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

// createCourse('Node Course', [
//     new Author({ name: 'Kirito' }),
//     new Author({ name: 'Asuna' }),
//     new Author({ name: 'Eugue' })
// ]);

// addAuthor('65c5cab091f69223e0812f45', { name: 'Alice' });
removeAuthor('65c5cab091f69223e0812f45', '65c5cab091f69223e0812f44');
// updateCourse('65c5c5be0fa810145862f789', 'John Smith');
// removeAuthor('65c5c5be0fa810145862f789');
