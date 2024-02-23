const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

const genres = [
    { movieId : 1, genre : [ 'action', 'comedy'] },
    { movieId : 2, genre : [ 'adventure', 'fun'] },
    { movieId : 3, genre : [ 'horror', 'thriller'] }
];

app.get('/', (req, res) => {
    res.send('Welcome Movie Genres API...');
})
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.movieId === parseInt(req.params.id));
    if(!genre) return res.status(404).send('MovieID id not exists');
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const genre = {
        movieId : genres.length + 1,
        genre : req.body.genre
    }

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genres.push(genre);
    res.send(genres);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.movieId === parseInt(req.params.id));
    if(!genre) return res.status(404).send('MovieID is not exists');

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genres.splice(genres.length, )
    res.send(genres);
});

app.delete('/api/genres/:id', (req, res) => {

});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server up and Running port ${port}`));

function validateGenre(genre){
    const schema = {
        genre : Joi.array().items(Joi.string().min(3)).min(1)
    };

    return Joi.validate(genre, schema);
}