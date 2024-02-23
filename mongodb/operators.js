async function getCourses(){
    //COMPARSION QUERY OPERATORS
    // eq (equals)
    // ne (not equals)
    // gt (greater than)
    // gte (greater than or equals)
    // lt (lesser than)
    // lte (lesser than or equals)
    // in
    // nin (not in)

    //LOGICAL OPERATORS or & and
    const courses = await Course
    // .find({ author: 'Mosh', isPublished: true })
    // .find({ price: { $gte: 10 }})
    // .find({ price: { $in : [10, 15, 20 ]}})
    .find()
    .and([ {author: 'Mosh'}, {isPublished: true}])
    .or([ {author: 'Mosh'}, {isPublished: true}])
    //REGULAR EXPRESSION

    //starts with mosh
    .find({ author: /^Mosh/ })

    //ends with mosh
    .find({ author: /Mosh$/i })

    //contains word mosh
.find({ author: /.*Mosh.*/i })
    .limit(1)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1});
    
    console.log(courses);
} 

getCourses();