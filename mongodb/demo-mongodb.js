const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Error Occured...' , err));


const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: [ 'web', 'mobile', 'device', 'laptop' ],
        lowercase: true,
        trim: true
    },
    author: String,
    // tags: {
    //     type: Array,
    //     validate: {
    //         validator: function(v){
    //             return v && v.length > 0;
    //         },
    //         message: 'Atleast one tage has to added!...'
    //     }
    // },
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback){
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'Atleast one tage has to added!...'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);
async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    });

    try{
        const result = await course.save();
        console.log(result);
    }catch(ex){ 
        for(fields in ex.errors)
            console.log(ex.errors[fields]);
    };
}

// createCourse();

async function getCourses(){
    //Paginations 
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course.find({ _id: '65c46855f8d91314306d761d' })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1})
    // .count();
    console.log(courses[0].price);
} 

getCourses();

// async function updateCourse(id){
//     const course = await Course.findById(id);
//     if(!course) return;

//     console.log(course);
//     course.isPublished = true;
//     course.author = 'Another Auther';

//     const result = await course.save();
//     console.log(result)
// }

async function updateCourse(id){
    // const result = await Course.update({ _id:id }, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });
    const result = await Course.findByIdAndUpdate( id, {
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, { new: true});

    console.log(result);
}

// updateCourse('65c212a26d5d540874a336b3');

async function removeCourse(id){
    // const course = await Course.deleteOne({ _id: id });
    // console.log(course);

    const result = await Course.findByIdAndRemove({ _id: id })
    console.log(result);
}

// removeCourse('65c212a26d5d540874a336b3');