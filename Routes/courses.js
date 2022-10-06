const express = require("express");
const router = express.Router({mergeParams: true});
const { protect, authorize } = require('../Middleware/auth')

const {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
} = require('../controller/courses')
const Course = require('../Models/Courses')
const advancedResults = require('../Middleware/advancedResults');

router
    .route('/')
    .get(advancedResults(Course,{
        path: 'botcamp',
        select: 'name description'
    }),getCourses).post(protect,authorize('publisher','admin'),addCourse);
router
    .route('/:id')
    .get(getCourse)
    .put(protect,authorize('publisher','admin'),updateCourse)
    .delete(protect,authorize('publisher','admin'),deleteCourse);

module.exports = router;