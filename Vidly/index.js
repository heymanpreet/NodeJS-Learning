const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
//To work with request body
app.use(express.json());

// genres = [{id:1,genre:'Action'}, {id:2,genre:'Adventure'}, {id:3,genre:'Comedy'}, {id:4,genre:'Horror'}];
genres = [];

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
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // console.log(req.body);
    
    // Valid genre
    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre);
    res.send(genre);
})

// Put Genre
app.put('/api/genres/:id', (req,res) => {
    // check for invalid input
    const genreName = genres.find(g => g.id === parseInt(req.params.id));
    // 404 Error check
    if(!genreName) return res.status(404).send("Genre does not exist");
    // 400 Error check
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Valid genre
    genreName.genre = req.body.genre;
    res.send(genreName)
})

// Delete Genre
app.delete('api/genres/:id', (req,res) => {
    // check for invalid input
    const genreName = genres.find(g => g.id === parseInt(req.params.genre));
    if(!genreName) return res.status(404).send("Genre does not exist");
    //Valid Genre
    const index = genres.indexOf(genreName);
    genres.splice(index,1);
    return res.send(`genre ${req.params.id} successfully deleted`);
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