const express = require('express');
const app = express();
const genres = require('./routes/genres');
const Joi = require('@hapi/joi');
//To work with request body
app.use(express.json());
app.use('/api/genres',genres);

// GET Genres
app.get('/', (req,res) => {
    res.send("Welcome to Vidly, Your Personal Movie Platform.");
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Actively Listening on port 3000"));