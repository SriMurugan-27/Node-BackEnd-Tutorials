
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(1);
        reject(new Error('message'));
    }, 2000)
});

p.then(result => console.log(result))
    .catch(err => console.log(err.message));

//converting the callbacks into promise

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading the data from the database');
            resolve( { id: id, name : 'somename'});
        }, 2000);
    })
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Display the repositories...');
            resolve(['resp1', 'resp2', 'resp3']);
        },2000);
    })
}

function getCommits(resp){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Committing the repositoreies...');
            resolve(['commit']);
        }, 2000);
    })
}

// getUser(1)
//     .then(user => getRepositories(user.name))
//     .then(repo => getCommits(repo[0]))
//     .then(commit => console.log(commit))
//     .catch(err => { console.log(err.message)});

//Async function and await

async function displayCommits(){
    try{
        const user = await getUser(1);
        const repo = await getRepositories(user.name);
        const commit = await getCommits(repo[0]);
        console.log(commit);
    }
    catch (err){
        console.log('Error', err.message);
    }
}

displayCommits();