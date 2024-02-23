//settled promise
const m = Promise.resolve({id : 1, name : 'Jack'});
m.then(user => console.log(user));

const n = Promise.reject(new Error('Reason for Rejection...'));
n.catch(err => console.log(err.message));

//parallel promise
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Calling Facebook API...');
        // resolve(1);
        reject(new Error('Facebook API Failed!...'));
    }, 1000)
});

const q = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Calling Tweeter API....');
        resolve(2);
    }, 1000);
});

Promise.all([p, q]).then(ans => { console.log(ans) }).catch(err => { console.log(err.message)});
Promise.race([p, q]).then(ans => { console.log(ans) }).catch(err => { console.log(err.message)});