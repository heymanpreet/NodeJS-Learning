const express = require('express');
const router = express.Router();

const courses = [{ id: 1, name: 'course 1' }, { id: 2, name: 'course 1' }, { id: 3, name: 'course 1' }]

// we willl remove /api/courses from all the routes as we have mentioned in index.js
router.get('/', (req, res) => {
    res.send(courses);
})

//:year is a route parameter
// ?sortBy=name these are query paramaters. They are optional things we pass from frontend
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) { res.status(404).send('This course does not exist'); }
    res.send(course);

    //res.send(req.params);// request params
    //res.send(req.query);// query params
})

//POST
router.post('/', (req, res) => {

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
    if (result.error) return res.status(400).send(result.error.details[0].message);
    
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
router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course does not exists');
    // If Invalid, return 400 bad request
    const { error } = validateCourse(req.body);   
    if (error) return res.status(400).send(error.details[0].message);
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
router.delete('/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // If id does not exists
    if (!course) return res.status(404).send('Course does not exists');
    // if id exists
    const index = courses.indexOf(course);
    courses.splice(index,1);
    return res.send(`Course ${req.params.id} successfully deleted`);
})

module.exports = router;
