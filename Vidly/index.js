const express = require('express');
const app = express();
const Joi = require('@hapi/joi');

genres = [{id:1,genre:'Action'}, {id:2,genre:'Adventure'}, {id:3,genre:'Comedy'}, {id:4,genre:'Horror'}];

// GET Genres
app.get('/', (req,res) => {
    res.send("Welcome to Vidly, Your Personal Movie Platform.");
})

// GET Genres
app.get('/api/genres', (req,res) => {
    res.send(genres);
})

// POST Genres
app.post('/api/genres', (req,res) => {
    // check for bad request
    const schema = Joi.object({
        genre: Joi.string().required()
    })
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    console.log(error);
    
    // Valid genre
    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre);
    res.send(genre)
})

// Put Genre
app.put('/api/genres/:id', (req,res) => {
    // check for invalid input
    const genreName = genres.find(g => g.id === parseInt(req.body.genre));
    if(!genreName) return res.status(404).send("Genre does not exist");
    const {error} = validateGenre(genreName.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Valid genre
    genreName.genre = req.body.genre;
    res.send(genreName)
})

// Delete Genre
app.delete('api/genres/:id', (req,res) => {
    // check for invalid input
    const genreName = genres.find(g => g.id === parseInt(req.body.genre));
    if(!genreName) return res.status(404).send("Genre does not exist");
    //Valid Genre
    const index = genres.indexOf(genreName);
    genres.splice(index,1);
    return res.send(genreName);

})

// Validate Function
function validateGenre(genre) {
    const schema = Joi.object({
        genre: Joi.string().required()
    })
    return schema.validate(genre);
}



const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Actively Listening on port 3000"));