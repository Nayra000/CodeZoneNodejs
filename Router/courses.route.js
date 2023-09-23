const express =require('express');
const router = express.Router();



const {validateCourse} =require('../middleware/courseValidation')
const { getAllCourses,getCourse,updateCourse,addNewCourse, deleteCourse} = require('../controller/courses-controllers');







router.route('/')
    .get(getAllCourses)
    .post(validateCourse(),addNewCourse)



router.route('/:id') 
        .get(getCourse)
        .patch(updateCourse)
        .delete(deleteCourse)


module.exports=router


