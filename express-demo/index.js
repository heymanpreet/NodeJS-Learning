const express = require('express');
const app = express();

const config = require('config');
const Joi = require('@hapi/joi');
const helmet = require('helmet'); // Help secure Express apps with various HTTP headers
const morgan = require('morgan'); // HTTP request logger middleware for node.js
const logging = require('./middleware/logging');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const courses = require('./routes/courses');
const home = require('./routes/home');

app.use(express.json()); // request.body
app.use(logging); // custom middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());

//Navigating to various Routers
app.use('/api/courses',courses);// we tell index.js that for any route with /api/courses, use courses route module.
app.use('/',home);

app.set('view engine','pug'); // Node will load the pug
app.set('views','./views'); // optional setting means to put all the template inside views folder

// Configuration
// console.log(`Application Name: ${config.get('name')}`);
// console.log(`Mail Server: ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);//search all files for password
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// env is by default set to DEV, we can change it using set NODE_ENV=development(no space between = & env)
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));   
    // console.log("Morgan Enabled...");
    startupDebugger("Morgan Enabled");
}
// Db Work
dbDebugger('Connected to Database');

//PORT 
// In real world application, the port is going to be set dynamically & process is our global variable
// we can set enviroment port by running, set PORT=4000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})