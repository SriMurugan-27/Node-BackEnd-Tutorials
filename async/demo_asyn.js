// console.log('1');
// setTimeout(() => {
//     console.log('3');
// }, 2000);
// console.log('2');

//Problem 
// const user = getUser(1);
// console.log(user);
// function getUser(id){
//     setTimeout(() => { 
//         console.log('Database Datas...');
//         return { id : id, name : 'somename'};
//     }, 2000);

//     return 1;
// };

//Solution were callbacks, promises and async/await
//Asynchoronous
// getUser(1, (user) => {
//     console.log('user', user);
//     getRepositories(user.name, (getName) => {
//         getCommits(getName, (commit) => { console.log(commit) });
//         //continue nexting callbacks function result in callback hell
//     });
// });

//Solution for callback functions
getUser(1, getRepositories);

function getRepositories(user){
    getRepositories(user.name, getName);
}

function getName(name){
    getCommits(name);
}

function getCommits(commit){
    console.log(commit);
}

//Synchoronous
// console.log('before');
// const user = getUser(1);
// const resp = getRepositories(user.name);
// console.log('after');

function getUser(id, callbacks){
    setTimeout(() => {
        console.log('Reading the data from the database');
        callbacks( { id: id, name : 'somename'});
    }, 2000);
}

function getRepositories(username, callbacks){
    setTimeout(() => {
        console.log('Display the repositories...');
        callbacks(['resp1', 'resp2', 'resp3']);
    },2000);
}

function getCommits(resp, callbacks){
    setTimeout(() => {
        console.log('Committing the repositoreies...');
        callbacks(['commit']);
    }, 2000);
}




