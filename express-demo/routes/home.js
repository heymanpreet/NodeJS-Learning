const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('wahooooo ooho oo');
    res.render('index', {title: 'My Express App',message: 'Hello'}); //for loading html
});

module.exports = router;