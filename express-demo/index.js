const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
const courses = [{ id: 1, name: 'course 1' }, { id: 2, name: 'course 1' }, { id: 3, name: 'course 1' }]

app.use(express.json());

app.get('/', (req, res) => {
    res.send('wahooooo ooho oo');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

//:year is a route parameter
// ?sortBy=name these are query paramaters. They are optional things we pass from frontend
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) { res.status(404).send('This course does not exist'); }
    res.send(course);

    //res.send(req.params);// request params
    //res.send(req.query);// query params
})

//POST
app.post('/api/courses', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const result = schema.validate({ name: req.body.name });
    console.log(result);
    // Normal Validation
    // if(!req.body.name || req.body.name.length != 3) {
    //     res.status(400).send('Name is required & should be min. 3 characters');
    //     return;
    // }
    //Validation using Joi
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }   

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

//PUT Request
// Look up the course
// If not existing, return 404
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('Course does not exists');
    }
    // Validate
    // If Invalid, return 400 bad request
    const { error } = validateCourse(req.body);   
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course)
})

//Validation Function
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    
    return schema.validate(course);
}

// Delete Request

// if id exists
app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // If id does not exists
    if (!course) {
        res.status(404).send('Course does not exists');
        return;
    }
    // courses.pop(req.params.id);
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(`Course ${req.params.id} successfully deleted`);
})

//PORT 
// In real world application, the port is going to be set dynamically & process is our global variable
// we can set enviroment port by running, set PORT=4000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})